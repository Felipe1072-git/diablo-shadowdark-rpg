# CLAUDE.md

This file provides guidance to Claude Code when working with this project.

## Sobre o Projeto

RPG de mesa homebrew inspirado na franquia **Diablo**. Criado por Paulo Souza (GitHub: Felipe1072-git).

- **Nome do sistema:** Diablo RPG
- **Documento principal:** `Diablo Homebrew RPG.md`
- **Versão atual:** 1.0 (Playtest)
- **Repositório:** https://github.com/Felipe1072-git/diablo-shadowdark-rpg

## Fluxo de Trabalho

O documento é editado no **Google Docs** e versionado no **GitHub** como Markdown:

1. Paulo edita o documento no **Google Docs**
2. Quando quiser salvar: `Arquivo → Fazer download → Markdown (.md)` e salvar na pasta do Drive
3. O arquivo fica disponível em: `G:\Meu Drive\Cool Side of RPG\Diablo RPG\Diablo Homebrew RPG.md`
4. Claude lê direto dessa pasta, copia para o repo local e commita no GitHub

**Repo local clonado em:** `C:\Users\Paulo Souza\Documents\Claude\Diablo RPG\repo\`

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

### Pendente (próxima conversa)
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
