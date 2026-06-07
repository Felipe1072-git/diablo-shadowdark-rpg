// Gerador de Fichas — Diablo RPG
// Carrega apenas na página /ficha/

(function() {
  'use strict';

  // ───── Estado ─────
  let personagens = [];
  let personagemAtual = null;
  let modoEdicao = false;

  // ───── Init ─────
  document.addEventListener('DOMContentLoaded', function() {
    const root = document.getElementById('ficha-app');
    if (!root) return; // não está na página de fichas
    carregarPersonagens();
    renderizarLista();
    bindEventos();
  });

  // ───── Persistência ─────
  function carregarPersonagens() {
    try {
      const raw = localStorage.getItem('diablo-rpg-fichas');
      personagens = raw ? JSON.parse(raw) : [];
    } catch(e) { personagens = []; }
  }

  function salvarPersonagens() {
    localStorage.setItem('diablo-rpg-fichas', JSON.stringify(personagens));
  }

  function criarPersonagemVazio() {
    return {
      id: Date.now().toString(),
      nome: '',
      classe: 'amazona',
      atribPrimario: '',
      nivel: 1,
      xp: 0,
      titulo: '',
      antecedente: '',
      attrs: { FOR: 10, DES: 10, CON: 10, INT: 10, SAB: 10, CAR: 10 },
      pvMax: 0, pvAtual: 0,
      manaMax: 0, manaAtual: 0,
      ca: 10, atk: 0,
      armadura: '',
      escudo: '',
      equipamento: { elmo:'', peito:'', luvas:'', perneiras:'', botas:'',
                     especial:'', amuleto:'', anel1:'', anel2:'',
                     arma1:'', arma2:'', cinto:'' },
      resistencias: { Fisico:0, Fogo:0, Gelo:0, Relampago:0, Veneno:0,
                      Necrotico:0, Radiante:0, Psiquico:0, Arcano:0 },
      talentos: [],
      notas: '',
      criadoEm: new Date().toISOString(),
      atualizadoEm: new Date().toISOString()
    };
  }

  // ───── Navegação entre views ─────
  function mostrar(viewId) {
    ['view-lista','view-criacao','view-ficha','view-levelup'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = id === viewId ? '' : 'none';
    });
    window.scrollTo(0, 0);
  }

  // ───── Eventos globais ─────
  function bindEventos() {
    // Novo personagem
    on('btn-novo', 'click', () => {
      personagemAtual = criarPersonagemVazio();
      modoEdicao = false;
      renderizarFormulario();
      mostrar('view-criacao');
    });

    // Cancelar criação
    on('btn-cancelar-criacao', 'click', () => mostrar('view-lista'));

    // Salvar criação
    on('btn-salvar-criacao', 'click', salvarPersonagemDoForm);

    // Voltar da ficha
    on('btn-voltar-lista', 'click', () => { renderizarLista(); mostrar('view-lista'); });

    // Editar ficha
    on('btn-editar-ficha', 'click', () => {
      modoEdicao = true;
      renderizarFormulario();
      mostrar('view-criacao');
    });

    // Excluir ficha
    on('btn-excluir-ficha', 'click', excluirPersonagem);

    // Export JSON
    on('btn-exportar', 'click', exportarJSON);

    // Import JSON
    on('btn-importar-trigger', 'click', () => document.getElementById('input-importar')?.click());
    on('input-importar', 'change', importarJSON);

    // Imprimir
    on('btn-imprimir', 'click', () => window.print());

    // Level up
    on('btn-levelup', 'click', iniciarLevelUp);
    on('btn-confirmar-levelup', 'click', confirmarLevelUp);
    on('btn-cancelar-levelup', 'click', () => mostrar('view-ficha'));

    // Salvar edições na ficha (campos inline)
    on('btn-salvar-ficha', 'click', salvarEdicoesInline);

    // Classe muda no form: atualizar atrib primário
    on('form-classe', 'change', () => atualizarAtribPrimarioSelect());

    // Rolar atributos
    on('btn-rolar-atributos', 'click', rolarAtributos);
  }

  function on(id, evt, fn) {
    const el = document.getElementById(id);
    if (el) el.addEventListener(evt, fn);
  }

  // ───── View: Lista ─────
  function renderizarLista() {
    const container = document.getElementById('lista-personagens');
    if (!container) return;
    if (personagens.length === 0) {
      container.innerHTML = '<p class="ficha-empty">Nenhum personagem criado ainda. Clique em <strong>Novo Personagem</strong> para começar.</p>';
      return;
    }
    container.innerHTML = personagens.map(p => {
      const cls = getClasse(p.classe);
      return `
        <div class="ficha-card" data-id="${p.id}">
          <div class="ficha-card-header">
            <span class="ficha-card-nome">${esc(p.nome || 'Sem nome')}</span>
            <span class="ficha-card-classe">${cls ? cls.nome : p.classe} · Nv ${p.nivel}</span>
          </div>
          <div class="ficha-card-info">
            <span>PV ${p.pvAtual}/${p.pvMax}</span>
            <span>Mana ${p.manaAtual}/${p.manaMax}</span>
            <span>CA ${p.ca}</span>
          </div>
          <div class="ficha-card-acoes">
            <button class="ficha-btn ficha-btn-primary btn-abrir" data-id="${p.id}">Abrir Ficha</button>
            <button class="ficha-btn ficha-btn-danger btn-del" data-id="${p.id}">✕</button>
          </div>
        </div>`;
    }).join('');

    container.querySelectorAll('.btn-abrir').forEach(btn => {
      btn.addEventListener('click', () => abrirPersonagem(btn.dataset.id));
    });
    container.querySelectorAll('.btn-del').forEach(btn => {
      btn.addEventListener('click', () => confirmarExclusao(btn.dataset.id));
    });
  }

  // ───── Abrir personagem ─────
  function abrirPersonagem(id) {
    personagemAtual = personagens.find(p => p.id === id);
    if (!personagemAtual) return;
    renderizarFicha();
    mostrar('view-ficha');
  }

  // ───── View: Criação/Edição ─────
  function renderizarFormulario() {
    const p = personagemAtual;
    setValue('form-nome', p.nome);
    setValue('form-nivel', p.nivel);
    setValue('form-xp', p.xp);
    setValue('form-titulo', p.titulo);
    setValue('form-antecedente', p.antecedente);
    setValue('form-notas', p.notas);

    // Populate classe select
    const selClasse = document.getElementById('form-classe');
    if (selClasse) {
      selClasse.innerHTML = CLASSES.map(c =>
        `<option value="${c.id}" ${c.id === p.classe ? 'selected' : ''}>${c.nome}</option>`
      ).join('');
    }
    atualizarAtribPrimarioSelect();

    // Atributos
    ['FOR','DES','CON','INT','SAB','CAR'].forEach(a => {
      setValue('form-' + a, p.attrs[a]);
      atualizarMod(a);
    });

    // Atualizar listeners dos inputs de atributo
    ['FOR','DES','CON','INT','SAB','CAR'].forEach(a => {
      const el = document.getElementById('form-' + a);
      if (el) {
        el.oninput = () => atualizarMod(a);
      }
    });

    setValue('form-armadura', p.armadura);
    setValue('form-escudo', p.escudo);

    // Equipamento
    Object.keys(p.equipamento).forEach(slot => {
      setValue('form-eq-' + slot, p.equipamento[slot]);
    });

    // Resistências
    Object.keys(p.resistencias).forEach(tipo => {
      setValue('form-res-' + tipo, p.resistencias[tipo]);
    });

    // Título do form
    const titulo = document.getElementById('form-titulo-pagina');
    if (titulo) titulo.textContent = modoEdicao ? 'Editar Personagem' : 'Novo Personagem';
  }

  function atualizarAtribPrimarioSelect() {
    const selClasse = document.getElementById('form-classe');
    const selPrimario = document.getElementById('form-atrib-primario');
    if (!selClasse || !selPrimario) return;

    const cls = getClasse(selClasse.value);
    if (!cls) return;

    selPrimario.innerHTML = cls.atribPrimario.map(a =>
      `<option value="${a}" ${a === (personagemAtual?.atribPrimario || cls.atribPrimario[0]) ? 'selected' : ''}>${a}</option>`
    ).join('');
  }

  function atualizarMod(attr) {
    const el = document.getElementById('form-' + attr);
    const modEl = document.getElementById('form-mod-' + attr);
    if (el && modEl) {
      const v = parseInt(el.value) || 10;
      const m = mod(v);
      modEl.textContent = (m >= 0 ? '+' : '') + m;
    }
  }

  function rolarAtributos() {
    ['FOR','DES','CON','INT','SAB','CAR'].forEach(a => {
      const val = rolar3d6();
      setValue('form-' + a, val);
      atualizarMod(a);
    });
  }

  function rolar3d6() {
    return [1,2,3].reduce(acc => acc + Math.ceil(Math.random() * 6), 0);
  }

  function salvarPersonagemDoForm() {
    const p = personagemAtual;
    p.nome = getValue('form-nome') || 'Sem nome';
    p.classe = getValue('form-classe') || 'amazona';
    p.atribPrimario = getValue('form-atrib-primario') || '';
    p.nivel = parseInt(getValue('form-nivel')) || 1;
    p.xp = parseInt(getValue('form-xp')) || 0;
    p.titulo = getValue('form-titulo') || '';
    p.antecedente = getValue('form-antecedente') || '';
    p.notas = getValue('form-notas') || '';
    p.armadura = getValue('form-armadura') || '';
    p.escudo = getValue('form-escudo') || '';

    // Atributos
    ['FOR','DES','CON','INT','SAB','CAR'].forEach(a => {
      p.attrs[a] = parseInt(getValue('form-' + a)) || 10;
    });

    // Calcular PV e Mana
    const cls = getClasse(p.classe);
    const primAttrVal = p.attrs[p.atribPrimario] || p.attrs['FOR'];
    p.manaMax = calcManaMax(p.nivel, primAttrVal);
    if (p.manaAtual === 0 || p.manaAtual > p.manaMax) p.manaAtual = p.manaMax;
    p.pvMax = calcPVMax(p.nivel, cls ? cls.dv : 8, p.attrs.CON);
    if (p.pvAtual === 0 || p.pvAtual > p.pvMax) p.pvAtual = p.pvMax;
    p.ca = calcCABase(cls || { id: p.classe }, p.attrs, p.armadura);

    // ATK = bônus de atributo primário
    p.atk = mod(primAttrVal);

    // Equipamento
    Object.keys(p.equipamento).forEach(slot => {
      p.equipamento[slot] = getValue('form-eq-' + slot) || '';
    });

    // Resistências
    Object.keys(p.resistencias).forEach(tipo => {
      p.resistencias[tipo] = parseInt(getValue('form-res-' + tipo)) || 0;
    });

    p.atualizadoEm = new Date().toISOString();

    if (!modoEdicao) {
      personagens.push(p);
    } else {
      const idx = personagens.findIndex(x => x.id === p.id);
      if (idx >= 0) personagens[idx] = p;
    }

    salvarPersonagens();
    renderizarFicha();
    mostrar('view-ficha');
  }

  // ───── View: Ficha ─────
  function renderizarFicha() {
    const p = personagemAtual;
    if (!p) return;
    const cls = getClasse(p.classe);
    const nomeCls = cls ? cls.nome : p.classe;
    const modAtribPrimario = mod(p.attrs[p.atribPrimario] || p.attrs['FOR'] || 10);

    // Cabeçalho
    setHTML('ficha-nome-display', `<span class="ficha-nome-grande">${esc(p.nome)}</span>`);
    setHTML('ficha-classe-display', `${nomeCls} <span class="ficha-sub">· Atrib. Primário: ${p.atribPrimario}</span>`);
    setHTML('ficha-nivel-display', renderBarraNivel(p.nivel));
    setText('ficha-xp-display', `${p.xp} / ${p.nivel * 10} XP`);
    setText('ficha-titulo-display', p.titulo || '—');

    // Recursos
    setText('ficha-pv-display', `${p.pvAtual} / ${p.pvMax}`);
    setText('ficha-mana-display', `${p.manaAtual} / ${p.manaMax}`);
    setText('ficha-ca-display', p.ca);
    const sinalAtk = p.atk >= 0 ? '+' : '';
    setText('ficha-atk-display', `${sinalAtk}${p.atk} + bônus de arma`);

    // Atributos
    const attrNomes = { FOR:'Força', DES:'Destreza', CON:'Constituição', INT:'Inteligência', SAB:'Sabedoria', CAR:'Carisma' };
    const tblBody = document.getElementById('ficha-atributos-body');
    if (tblBody) {
      tblBody.innerHTML = Object.entries(p.attrs).map(([a, v]) => {
        const m = mod(v);
        const sinal = m >= 0 ? '+' : '';
        return `<tr><td>${attrNomes[a]}</td><td class="ficha-val">${v}</td><td class="ficha-mod ${m<0?'neg':''}">${sinal}${m}</td></tr>`;
      }).join('');
    }

    // Habilidades de Classe
    if (cls) {
      const habBody = document.getElementById('ficha-habilidades-body');
      if (habBody) {
        habBody.innerHTML = cls.habilidades.map(h =>
          `<li class="ficha-habilidade">${esc(h)}</li>`
        ).join('');
      }
    }

    // Talentos
    const talentosBody = document.getElementById('ficha-talentos-body');
    if (talentosBody) {
      if (p.talentos.length === 0) {
        talentosBody.innerHTML = '<li class="ficha-empty-small">Nenhum talento ainda. Suba de nível para ganhar talentos.</li>';
      } else {
        talentosBody.innerHTML = p.talentos.map((t, i) =>
          `<li class="ficha-talento" data-idx="${i}">
            <span class="ficha-talento-nivel">Nv ${t.nivel || '?'}</span>
            <span class="ficha-talento-texto">${esc(t.texto)}</span>
            <button class="ficha-btn-icon btn-del-talento" data-idx="${i}" title="Remover talento">✕</button>
          </li>`
        ).join('');
        talentosBody.querySelectorAll('.btn-del-talento').forEach(btn => {
          btn.addEventListener('click', () => removerTalento(parseInt(btn.dataset.idx)));
        });
      }
    }

    // Equipamento
    const eqNomes = {
      elmo:'Elmo', peito:'Peito', luvas:'Luvas', perneiras:'Perneiras', botas:'Botas',
      especial:'Especial de Classe', amuleto:'Amuleto', anel1:'Anel 1', anel2:'Anel 2',
      arma1:'Arma 1', arma2:'Arma 2', cinto:'Cinto'
    };
    const eqBody = document.getElementById('ficha-equipamento-body');
    if (eqBody) {
      eqBody.innerHTML = Object.entries(eqNomes).map(([slot, nome]) =>
        `<tr>
          <td class="ficha-slot-nome">${nome}</td>
          <td><input type="text" class="ficha-input-inline" id="inline-eq-${slot}" value="${esc(p.equipamento[slot] || '')}" placeholder="—"></td>
        </tr>`
      ).join('');
    }

    // Armadura e Escudo
    setText('ficha-armadura-display', p.armadura || 'Nenhuma');
    setText('ficha-escudo-display', p.escudo || 'Nenhum');

    // Resistências
    const resNomes = {
      Fisico:'🛡️ Físico', Fogo:'🔥 Fogo', Gelo:'❄️ Gelo', Relampago:'⚡ Relâmpago',
      Veneno:'☣️ Veneno', Necrotico:'💀 Necrótico', Radiante:'✨ Radiante',
      Psiquico:'🧠 Psíquico', Arcano:'🔮 Arcano'
    };
    const resBody = document.getElementById('ficha-resistencias-body');
    if (resBody) {
      resBody.innerHTML = Object.entries(resNomes).map(([tipo, nome]) => {
        const val = p.resistencias[tipo] || 0;
        const attrBase = getAtribResistencia(tipo, p.atribPrimario);
        const modAttr = attrBase ? mod(p.attrs[attrBase] || 10) : '—';
        return `<tr>
          <td>${nome}</td>
          <td class="ficha-val">${attrBase ? modAttr : '—'}</td>
          <td><input type="number" class="ficha-input-inline ficha-input-small" id="inline-res-${tipo}" value="${val}" min="-20" max="50"></td>
          <td class="ficha-val ficha-total-rd">${attrBase ? (typeof modAttr === 'number' ? modAttr + val : val) : val}</td>
        </tr>`;
      }).join('');
    }

    // Notas
    const notasEl = document.getElementById('ficha-notas-input');
    if (notasEl) notasEl.value = p.notas || '';

    // PV / Mana atuais (campos editáveis no cabeçalho)
    setValue('inline-pv-atual', p.pvAtual);
    setValue('inline-mana-atual', p.manaAtual);

    // Atualizar botão level up
    const btnLvl = document.getElementById('btn-levelup');
    if (btnLvl) btnLvl.disabled = p.nivel >= 10;
  }

  function getAtribResistencia(tipo, atribPrimario) {
    const mapa = {
      Fisico: null,
      Fogo: 'INT', Gelo: 'INT', Relampago: 'INT',
      Veneno: 'CON',
      Necrotico: 'SAB', Psiquico: 'SAB',
      Radiante: 'CAR', Arcano: 'CAR'
    };
    return mapa[tipo];
  }

  function renderBarraNivel(nivel) {
    const faixas = [
      { min:1, max:4, label:'Normal' },
      { min:5, max:7, label:'Pesadelo' },
      { min:8, max:10, label:'Inferno' }
    ];
    const pips = Array.from({length:10}, (_, i) => {
      const n = i + 1;
      const ativo = n <= nivel;
      const faixa = faixas.find(f => n >= f.min && n <= f.max);
      return `<span class="nivel-pip ${ativo ? 'ativo' : ''} faixa-${faixa?.label?.toLowerCase()}" title="Nível ${n}">${n}</span>`;
    }).join('');
    return `<div class="nivel-barra">${pips}</div><span class="nivel-faixa">${faixas.find(f => nivel >= f.min && nivel <= f.max)?.label || ''}</span>`;
  }

  function salvarEdicoesInline() {
    const p = personagemAtual;
    if (!p) return;

    // Equipamento inline
    Object.keys(p.equipamento).forEach(slot => {
      const el = document.getElementById('inline-eq-' + slot);
      if (el) p.equipamento[slot] = el.value;
    });

    // Resistências inline
    Object.keys(p.resistencias).forEach(tipo => {
      const el = document.getElementById('inline-res-' + tipo);
      if (el) p.resistencias[tipo] = parseInt(el.value) || 0;
    });

    // Notas
    const notasEl = document.getElementById('ficha-notas-input');
    if (notasEl) p.notas = notasEl.value;

    // PV / Mana atuais
    const pvEl = document.getElementById('inline-pv-atual');
    const manaEl = document.getElementById('inline-mana-atual');
    if (pvEl) p.pvAtual = Math.min(parseInt(pvEl.value) || p.pvAtual, p.pvMax);
    if (manaEl) p.manaAtual = Math.min(parseInt(manaEl.value) || p.manaAtual, p.manaMax);

    p.atualizadoEm = new Date().toISOString();
    const idx = personagens.findIndex(x => x.id === p.id);
    if (idx >= 0) personagens[idx] = p;
    salvarPersonagens();

    mostrarToast('Ficha salva!');
    renderizarFicha();
  }

  function removerTalento(idx) {
    if (!personagemAtual) return;
    personagemAtual.talentos.splice(idx, 1);
    salvarPersonagens();
    renderizarFicha();
  }

  // ───── Level Up ─────
  function iniciarLevelUp() {
    const p = personagemAtual;
    if (!p || p.nivel >= 10) return;

    const cls = getClasse(p.classe);
    if (!cls) return;

    // Rolar 1d20
    const roll = Math.ceil(Math.random() * 20);
    const talento = encontrarTalento(cls.talentos, roll);

    const rollEl = document.getElementById('levelup-roll');
    const talentoEl = document.getElementById('levelup-talento-texto');
    const nivelEl = document.getElementById('levelup-nivel-atual');
    const selectEl = document.getElementById('levelup-select-talento');

    if (nivelEl) nivelEl.textContent = `Nível ${p.nivel} → ${p.nivel + 1}`;
    if (rollEl) rollEl.textContent = roll;
    if (talentoEl) talentoEl.textContent = talento?.text || '—';

    // Preencher select com todos os talentos (para escolha manual / resultado 20)
    if (selectEl) {
      selectEl.innerHTML = cls.talentos.map(t =>
        `<option value="${t.roll}" ${t.roll === talento?.roll ? 'selected' : ''}>[${t.roll}] ${t.text.substring(0, 80)}${t.text.length > 80 ? '…' : ''}</option>`
      ).join('');
      selectEl.addEventListener('change', () => {
        const chosen = cls.talentos.find(t => t.roll === selectEl.value);
        if (talentoEl && chosen) talentoEl.textContent = chosen.text;
      });
    }

    mostrar('view-levelup');
  }

  function encontrarTalento(talentos, roll) {
    return talentos.find(t => {
      if (t.roll.includes('-')) {
        const [min, max] = t.roll.split('-').map(Number);
        return roll >= min && roll <= max;
      }
      return parseInt(t.roll) === roll;
    });
  }

  function confirmarLevelUp() {
    const p = personagemAtual;
    if (!p) return;

    const selectEl = document.getElementById('levelup-select-talento');
    const cls = getClasse(p.classe);
    if (!cls || !selectEl) return;

    const rollSelecionado = selectEl.value;
    const talento = cls.talentos.find(t => t.roll === rollSelecionado);
    if (!talento) return;

    // Subir nível
    p.nivel += 1;

    // Aplicar talento simples automaticamente
    const aplicacao = aplicarTalentoSimples(p, talento.text);
    if (aplicacao) {
      if (aplicacao.tipo === 'attr') p.attrs[aplicacao.attr] += aplicacao.valor;
      if (aplicacao.tipo === 'pv') p.pvMax += aplicacao.valor;
      if (aplicacao.tipo === 'mana') p.manaMax += aplicacao.valor;
    }

    // Adicionar talento à lista
    p.talentos.push({ roll: rollSelecionado, texto: talento.text, nivel: p.nivel });

    // Recalcular stats
    const primAttrVal = p.attrs[p.atribPrimario] || p.attrs['FOR'] || 10;
    const novoManaMax = calcManaMax(p.nivel, primAttrVal);
    const novoPVMax = calcPVMax(p.nivel, cls.dv, p.attrs.CON);
    // Adicionar HP do novo nível
    const hpGanho = novoPVMax - p.pvMax;
    p.pvMax = novoPVMax;
    p.pvAtual = Math.min(p.pvAtual + hpGanho, p.pvMax);
    p.manaMax = novoManaMax;
    if (p.manaAtual > p.manaMax) p.manaAtual = p.manaMax;
    p.ca = calcCABase(cls, p.attrs, p.armadura);
    p.atk = mod(primAttrVal);
    p.atualizadoEm = new Date().toISOString();

    const idx = personagens.findIndex(x => x.id === p.id);
    if (idx >= 0) personagens[idx] = p;
    salvarPersonagens();

    mostrarToast(`Nível ${p.nivel} alcançado! +${hpGanho} HP`);
    renderizarFicha();
    mostrar('view-ficha');
  }

  // ───── Excluir ─────
  function excluirPersonagem() {
    if (!personagemAtual) return;
    confirmarExclusao(personagemAtual.id);
  }

  function confirmarExclusao(id) {
    const p = personagens.find(x => x.id === id);
    if (!p) return;
    if (!confirm(`Excluir "${p.nome}"? Esta ação não pode ser desfeita.`)) return;
    personagens = personagens.filter(x => x.id !== id);
    salvarPersonagens();
    personagemAtual = null;
    renderizarLista();
    mostrar('view-lista');
  }

  // ───── Export / Import ─────
  function exportarJSON() {
    if (!personagemAtual) return;
    const json = JSON.stringify(personagemAtual, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${personagemAtual.nome || 'personagem'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function importarJSON(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      try {
        const p = JSON.parse(ev.target.result);
        if (!p.id || !p.classe) throw new Error('Arquivo inválido');
        // Garantir novo id para evitar conflito
        const existe = personagens.find(x => x.id === p.id);
        if (existe) {
          if (!confirm('Já existe um personagem com este ID. Substituir?')) return;
          personagens = personagens.filter(x => x.id !== p.id);
        }
        personagens.push(p);
        salvarPersonagens();
        personagemAtual = p;
        renderizarFicha();
        renderizarLista();
        mostrar('view-ficha');
        mostrarToast('Personagem importado com sucesso!');
      } catch(err) {
        alert('Erro ao importar: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  // ───── Toast ─────
  function mostrarToast(msg) {
    let toast = document.getElementById('ficha-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'ficha-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 2500);
  }

  // ───── Helpers DOM ─────
  function getValue(id) { return document.getElementById(id)?.value || ''; }
  function setValue(id, val) { const el = document.getElementById(id); if (el) el.value = val ?? ''; }
  function setText(id, val) { const el = document.getElementById(id); if (el) el.textContent = val ?? ''; }
  function setHTML(id, val) { const el = document.getElementById(id); if (el) el.innerHTML = val ?? ''; }
  function esc(str) { return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

})();
