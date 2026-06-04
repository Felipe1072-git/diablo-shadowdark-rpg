# CLAUDE.md

This file provides guidance to Claude Code when working with this project.

## Sobre o Projeto

RPG de mesa homebrew inspirado na franquia **Diablo**. Criado por Paulo Souza (GitHub: Felipe1072-git).

- **Nome do sistema:** Diablo RPG
- **Documento principal:** `Diablo Homebrew RPG.md`
- **Versão atual:** 1.0 (Playtest)
- **Repositório:** https://github.com/Felipe1072-git/diablo-shadowdark-rpg

## Estrutura do Livro (meta do projeto)

O objetivo é organizar o Diablo RPG como um livro de regras completo, inspirado na estrutura do D&D 5e (2024). Estrutura alvo:

1. **Introdução** — Bem-vindo ao Santuário, como usar o livro
2. **Cap. 1: Jogando o Jogo** — Dados, atributos, testes, ações, combate, Mana, Pontos de Ação
3. **Cap. 2: Criando um Personagem** — Passo a passo, avanço de nível, Títulos e Renome
4. **Cap. 3: Classes** — 18 classes (já revisadas)
5. **Cap. 4: Origens** — Antecedentes e Espécies adaptados ao universo Diablo
6. **Cap. 5: Talentos** — Talentos de origem e gerais
7. **Cap. 6: Arsenal** — Armas, armaduras, itens mágicos, Matriz de Resistência
8. **Cap. 7: Magia** — Sistema de magia, lista de magias por classe
9. **Apêndice A: Santuário** — Lore, regiões, facções
10. **Apêndice B: Criaturas** — Estatísticas de monstros, demônios, anjos
11. **Apêndice C: Glossário**
12. **Cenários** — Módulos de aventura
13. **Fichas 2.0** — Ao final do livro

> A estrutura ainda está em discussão. Sempre consultar o usuário antes de reorganizar seções.

## Fluxo de Trabalho

O documento é editado no **Google Docs** e versionado no **GitHub** como Markdown.

**Duas pastas distintas — nunca misturar:**
- `G:\Meu Drive\Cool Side of RPG\Diablo RPG\` → pasta do **Google Drive** (somente arquivos de conteúdo, **sem git**)
- `C:\Users\Paulo Souza\Documents\Claude\Diablo RPG\repo\` → **repositório git** local (todos os commits e pushes rodam daqui)

**Passo a passo para salvar uma versão:**
1. Paulo edita no **Google Docs**
2. `Arquivo → Fazer download → Markdown (.md)` → salvar em `G:\Meu Drive\Cool Side of RPG\Diablo RPG\`
3. Claude copia o `.md` do Drive para o repo: `C:\Users\Paulo Souza\Documents\Claude\Diablo RPG\repo\`
4. Claude commita e faz push a partir do repo (nunca da pasta do Drive)

**Para compartilhar com os jogadores:** link direto do GitHub → https://github.com/Felipe1072-git/diablo-shadowdark-rpg

**Atenção:** o Google Drive cria `desktop.ini` em todas as subpastas, inclusive dentro de `.git`, corrompendo o repositório. Por isso o git **nunca deve rodar na pasta do Drive**.

## Convenções de Commit

Usar prefixos descritivos:
- `feat:` nova regra, classe, cenário ou mecânica
- `fix:` correção de erro ou inconsistência nas regras
- `docs:` atualização de texto, revisão ou reorganização
- `refactor:` reorganização do documento sem mudança de conteúdo

Sempre passar o link do commit para o usuário conferir as mudanças.

Sempre usar os pop-ups de escolha (AskUserQuestion) para perguntas de sim/não ou múltipla escolha — nunca fazer essas perguntas só em texto.

## Criação de Conteúdo

- É **estritamente proibido** inventar regras, mecânicas, nomes ou conteúdo de jogo sem consultar o usuário primeiro
- Sempre apresentar a ideia/sugestão e aguardar aprovação antes de escrever no documento
- Pode agir de forma criativa nas sugestões, mas a decisão final é sempre do usuário
- Nunca assumir que algo "faz sentido" mecanicamente sem confirmar com o usuário

## Revisão de Texto

- Manter a voz e personalidade do autor (Paulo) — nunca formalizar o tom
- Corrigir apenas gramática e clareza
- Mostrar diff (vermelho/verde) antes de commitar alterações de texto
- Passar o link do commit após cada push para o usuário conferir

## Status da Revisão do Documento

### Concluído
- **Capa:** nome do sistema atualizado para "Diablo RPG"
- **Introdução:** correções gramaticais, frase incompleta completada
- **Template de Cenário:** referência ao "Pearson" removida, cabeçalhos vazios removidos, conteúdo duplicado removido
- **Classes (todas as 18):** revisão completa
  - Cabeçalhos duplicados removidos (Amazona, Renegado e todas as classes com `# ---`)
  - Heading `### Dicas` adicionado em todas as classes
  - Seção Dicas escrita para o Warlock (única que estava faltando)
  - Typos, erros de concordância e referências incorretas corrigidos
  - Todas as referências a "Shadowdark" substituídas por "Diablo RPG"
  - Estrutura padronizada: Habilidades → Talentos → Dicas → Objetivos
- **Infraestrutura do repositório:**
  - `.gitignore` criado (desktop.ini, .gdoc, .docx, .pdf)
  - Pasta do Drive separada do repositório git
  - CLAUDE.md atualizado com fluxo definitivo

### Pendente (próxima conversa)
- **Estrutura do livro:** definir seções de Origens (Antecedentes/Espécies) e Talentos com o usuário
- **Sistema de Títulos e Renome**
- **Pontos de Ação**
- **Mana**
- **Sistema de Magia**
- **Arsenal**
- **Fichas 2.0**
- **Tempo**
- **Viagem**
- **Encontros**
- **Tesouros**
- Cenários: Senhor da Mentira, A Torre Esquecida, O Abatedouro Profano, O Monarca Louco, O Carcereiro das Cinzas, Sarcófago Escarlate, O Resgate
- **Registro de Campanha**
- **Handout - Caverna B**
- **Ideias**
- **Forte**
- **Matriz de Resistência**
