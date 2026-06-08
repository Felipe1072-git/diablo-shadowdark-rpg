# Patch Notes — v1.2 Playtest

---

## Atualização 1.2 — Junho 2026

### 🧙 Gerador de Fichas — Rework Completo

O Gerador de Fichas recebeu a maior atualização desde seu lançamento. Redesenho visual, novas mecânicas e correções de layout em toda a ficha.

#### Recursos (PV, Mana, CA…)
- **Botões ±1 de PV e Mana** integrados diretamente nos cards coloridos — sem campo separado
- **Bônus de Dano** agora aparece como recurso no painel principal
- **Conj.** abreviado para caber no layout ao lado de ATK — sem quebrar linha

#### Mochila & Inventário
- **Capacidade de mochila** calculada automaticamente: Mod. FOR + Nível — contador de slots usados com aviso de sobrecarga
- **Armas de 2 mãos** ocupam 2 slots na mochila e bloqueiam automaticamente o slot Arma 2
- **Prefixos como lista dinâmica** — itens podem ter quantos prefixos forem necessários (suporta Caprichoso com múltiplos rolls)
- **Auto-parse "Prefixo / Sufixo"** — colar o nome completo do rolador separa os campos automaticamente
- **RD por tipo de dano** — campo Extra na adição de item, com datalist dos 9 tipos + Todos

#### Matriz de Resistência
- **Coluna ⚄ Atrib.** (laranja) — mostra o modificador do atributo base de cada resistência
- **Coluna 🛡 Itens** (azul) — soma RD de todos os itens equipados, incluindo a armadura
- **Coluna Extra** (renomeada de "Base") — bônus manual adicional
- **Total calculado em tempo real** — Atrib. + Itens + Extra
- **Cores padronizadas** com os modificadores de atributos: verde/vermelho/cinza

#### Talentos
- **Talentos Homebrew** — nova opção além das tabelas. Nome e descrição livres, badge azul distintivo
- **Edição inline** — clique no lápis para editar o nível de qualquer talento, ou nome + descrição dos homebrew
- Texto longo não transborda mais o card

#### Notas de Campanha
- **Notas estruturadas** — Objetivos (lista com recompensa + concluído), Missão Principal, Missões Secundárias, Rumores, NPCs, Facções (com reputação e contatos) e Bestiário (fraqueza e situação)
- Layout em duas colunas no desktop, coluna única no mobile
- Seções não reabrem sozinhas ao editar outros campos da ficha

#### Layout e UX
- **Tela de lista de personagens** redesenhada — cards com PV/Mana/CA em destaque, header com subtítulo
- **Cabeçalho da ficha** em coluna única com hierarquia visual clara — Nome → Classe → Nível → Título e Antecedente com efeito abaixo de cada um
- **Formulário mobile-first** — coluna única até tablet, sem campos transbordando
- Equipamento abaixo da Matriz de Resistência — mais espaço para os slots no desktop

#### Impressão
- **Condições ocultadas** — painel inútil para papel não aparece mais
- **PV e Mana atuais** aparecem como `___ / Máx` para preenchimento à mão
- **Mochila & Inventário** aparece na impressão sem botões interativos
- **Todos os botões** (±1, ✏, + Talento, Desequipar…) removidos do print
- **Cores preservadas** — verde/vermelho/laranja/roxo/azul em versões escurecidas para fundo branco
- **Lacaios** mantêm o fundo escuro com nome vermelho
- **Notas** com fundo claro azulado e campos brancos legíveis
- **Coluna Extra** da matriz — aparece apenas se o valor for diferente de zero

---

## Atualização 1.1 — Junho 2026

### 🗺️ Navegação — Criaturas Reorganizadas
O Apêndice A era uma página de 1843 linhas com um índice ilegível. Agora são **13 páginas separadas** no sidebar:

- **5 páginas de Bioma** (Gramados/Tristram, Pântanos/Kurast, Deserto/Lut Gholein, Selva/Toraja, Inferno) — cada um com seus grupos de criaturas e um chefe de bioma
- **7 páginas de Boss** (Andariel, Duriel, Azmodan, Belial, Mephisto, Baal, Diablo) — fraqueza em destaque no topo, minions, mini-chefe e ambas as formas na mesma página
- **Índice central** com tabelas de referência rápida por bioma, por boss e por tipo de criatura

Durante a sessão: clique o boss ou bioma no sidebar — tudo está ali, sem rolar.

### 🎲 Rolador de Tesouros — Melhorias
- **Botões de categoria** — filtra por Armas, Armaduras, Acessórios, Especial de Classe antes de rolar
- **Set Completo** — rola as 5 peças individuais de uma vez, cada uma com seus próprios afixos
- **Caprichoso** — rola 2 prefixos bônus automáticos; o termo "Caprichoso" não polui o nome do item exibido
- **Brutal / Imparável** — expandem o range de crítico em 1 (acumulável com outros efeitos)
- **Botão Limpar** substitui "Rolar Novamente" (que era redundante com o botão principal)
- **Loot de Bosses** — nova página dedicada com tabelas de drop por boss

### 📚 Itens Únicos e Sets — Goal 8 Concluído
Todos os sets canônicos das franquias D1/D2/D3/D4 foram adaptados para o sistema. **58 sets no total**, cobrindo as 18 classes:

- Cada peça funciona como item Lendário individualmente
- Bônus progressivos (2 peças + set completo) ancorados nas habilidades de classe existentes
- Sets têm identidade distinta dentro da mesma classe (mobilidade × DPS × survivability)
- **24 armas únicas** da franquia documentadas com efeitos fixos

### 📖 Glossário — Atualização Completa
O glossário foi expandido com tudo que estava faltando:

- **Terminologia de itens corrigida** — Normal → Mágico → Raro → Lendário → Único → Set (nomenclatura alinhada com a franquia)
- **Prefixo e Sufixo** definidos com exemplos
- **DC de Conjuração** — a DC que sobe a cada feitiço bem-sucedido, finalmente documentada
- **9 Tipos de Dano** — tabela com Físico, Fogo, Gelo, Relâmpago, Veneno, Necrótico, Radiante, Psíquico e Arcano
- **Propriedades de Armas** — Haste, Trespassar, Finesse, Arremesso, Foco Mágico, Pesada, Versátil
- **Corrosão de Mundo** — tabela das faixas Normal/Pesadelo/Inferno e penalidades de Resistência
- **Origem, Mestria e "por cena"** adicionados à seção de Progressão

### 🔧 Correções e Padronização
- Abreviação **AP → PA** (Pontos de Ação) corrigida em todo o projeto
- Seção de **Mana no Livro do Jogador** revisada — atributo primário da Amazona, nomes de habilidades, remoção de mecânica obsoleta
- **Sistema de Magia** extraído para página própria na navegação do site
- Headers e terminologia padronizados em todos os arquivos
- Tabelas de classe com **zebra striping** e destaque visual do ultimate (nível 19)

---

**Junho 2026 — primeira versão pública**

### 🌐 Site Interativo
- Livro do Jogador, Classes e Livro do Mestre agora online com busca e navegação
- 18 classes com página individual — estuda antes da sessão 😈
- Deploy automático — qualquer atualização aparece em minutos

### ⚔️ Classes — Rework Completo (todas as 18)
Incorporei os feedbacks da última sessão e fiz uma revisão matemática completa das 18 classes do zero. Comparado à versão antiga do Drive, está irreconhecível — para melhor.

- Balanceamento de dano revisado com âncora matemática por tier (Nv 1/3/5/7/10)
- Custo de Mana coerente com a escala de cada classe
- Ultimates (nível 19) custam ◈◈◈ em todas as classes, sem exceção
- Escopo temporal unificado: **por cena** em todo o sistema
- ATK de lacaios e invocações padronizado em todas as classes com summons
- Identidade de cada classe preservada — os arquétipos que você conhece, só mais afiados

### 🛡️ Armaduras — Sistema Completamente Reformulado
O sistema de armaduras foi refeito do zero. A versão legada tinha inconsistências sérias de progressão e penalizava demais certas builds. O novo sistema tem uma lógica clara de três tiers:

| Armadura | Tipo | CA | RD | Requisito |
|---|---|---|---|---|
| Couro | Leve | 13 | — | — |
| Couro Reforçado | Leve | 14 | 1 | — |
| Brunea | Média | 15 | 1 | FOR 11 |
| Cota de Malha | Média | 16 | 2 | FOR 11 |
| Meia-Placa | Pesada | 17 | 2 | FOR 13 |
| Placa Completa | Pesada | 18 | 3 | FOR 13 |

- Armaduras leves somam **DES completa** à CA
- Armaduras médias somam **DES até +2** — recompensa builds híbridas sem quebrar a hierarquia
- Armaduras pesadas não somam DES, mas oferecem a maior RD do jogo
- Escudos agora são regra implícita pelo tipo de armadura da classe — sem duplicação de texto

### 📐 Padronização e Terminologia
Uma reformatação massiva foi aplicada em todos os arquivos. Se a versão do Drive parecia um rascunho, isso aqui é o livro de verdade:

- Todos os termos de distância padronizados: **Adjacente · Próximo · Distante**
- Tipos de dano canônicos e consistentes: Físico, Fogo, Gelo, Relâmpago, Veneno, Necrótico, Radiante, Psíquico, Arcano
- Regras de conjuração, combate e exploração revisadas e sem contradições
- Todas as regras necessárias para jogar estão no livro — sem precisar perguntar no grupo

### 📖 Livro do Jogador
- Seção **Tempo e Viagem** reescrita — acampamento, suprimentos, inverno e escuridão
- **Eras da Vida** adicionada ao Cap. 2 (Jovem/Maduro/Idoso)
- Matriz de Resistências revisada e consolidada

### 📕 Livro do Mestre
- **Calibração de Encontros** — tabelas de PV, ATK, dano e DC por nível
- **Riqueza Esperada por Nível** — guia de distribuição de ouro e itens
- Tabela de probabilidade de acerto (ATK × CA)

### 🗂️ Apêndices
- **Apêndice A: Criaturas** — bestiário completo com statblocks por bioma
- **Apêndice B: Glossário** — todos os termos do sistema em um lugar só, com classificação clara de condições e status
- 8 módulos de aventura prontos para jogar *(acesso exclusivo do Mestre)*
