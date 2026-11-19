# ⚔️ Kernel Fighter & Cruzadinha de Arquitetura Computacional

> **Atividade Avaliativa III — Game**  
> Disciplina: Arquitetura Computacional • Sprint 3  
> Desenvolvido em HTML5, CSS3 e JavaScript puro (Vanilla JS).

🔗 **Link do Site Publicado no GitHub Pages:**  
👉 [https://luisotaviosptech.github.io/jogo-arqcomp/](https://luisotaviosptech.github.io/jogo-arqcomp/)

---

## 🕹️ Sobre o Jogo

O **Kernel Fighter** é um jogo arcade interativo de combate contra chefão (*Boss Fight*) combinado com um modo clássico e completo de **Cruzadinha de Arquitetura Computacional**.

O projeto conta com **dois modos de jogo alternáveis** em tempo real:
1. 🥊 **Modo Boss Battle (Arcade):** Você é o *Byte Warrior* enfrentando o temível *Glitch Overlord (Kernel Panic)*. A cada turno, o Boss prepara um ataque e o terminal exibe uma pista conceitual. Para desferir um golpe crítico, o jogador precisa digitar a palavra correta. Se errar 3 vezes, o computador entra em colapso (*Game Over*); se acertar os 16 termos, o sistema é restaurado!
2. 🧩 **Modo Cruzadinha (Oficial):** Tabuleiro tradicional interativo com todas as **16 palavras cruzadas entre si**, pistas numeradas em Horizontais e Verticais, validação em tempo real com botão **Conferir**, contador de acertos e botão **Reiniciar**.

---

## 🎮 Como Jogar

### Modo Boss Battle
1. Leia com atenção a **Pista do Sistema** exibida no terminal.
2. Observe o número de letras disponíveis nos slots.
3. Digite o termo correspondente e pressione `[ENTER]` ou clique em **Desferir Golpe**.
4. **Acerto:** O lutador desfere um golpe com animação, partículas no Canvas e reduz a vida do Boss.
5. **Erro:** O Boss contra-ataca, a tela pisca em alerta e você perde 1 das suas 3 vidas.
6. Use o botão **Dica Cache** caso precise revelar a primeira letra.

### Modo Cruzadinha
1. Clique em qualquer casa do tabuleiro ou clique diretamente em uma das pistas na lista (Horizontais ou Verticais).
2. Digite as letras diretamente nas células (o cursor avança automaticamente para a próxima casa).
3. Use as setas do teclado e `Backspace` para navegar pelo tabuleiro.
4. Clique no botão **Conferir** para verificar as respostas:
   - Casas **verdes** indicam acerto;
   - Casas **vermelhas** indicam erro;
   - O contador de acertos no topo atualizará a pontuação (ex: `16 de 16 palavras certas`).
5. Clique no botão **Reiniciar** a qualquer momento para limpar todo o tabuleiro.

---

## 📚 As 16 Palavras e suas Pistas Conceituais

Todas as pistas foram elaboradas respeitando o limite máximo de 15 palavras, sem siglas por extenso e sem entregar a resposta:

| Nº | Termo | No Tabuleiro | Pista Conceitual |
| :---: | :--- | :--- | :--- |
| **1** | CPU | `CPU` | "Cérebro do computador que executa instruções e processa os dados principais." |
| **2** | ULA | `ULA` | "Circuito da CPU que realiza operações matemáticas e comparações lógicas." |
| **3** | UC | `UC` | "Unidade que gerencia o fluxo de instruções e controla outros componentes." |
| **4** | Registradores | `REGISTRADORES` | "Espaços de memória ultrarrápida situados dentro do próprio processador." |
| **5** | RAM | `RAM` | "Memória volátil principal de leitura e escrita usada durante a execução." |
| **6** | ROM | `ROM` | "Memória permanente de fábrica somente de leitura com rotinas de inicialização." |
| **7** | EEPROM | `EEPROM` | "Memória não volátil que pode ser apagada e regravada eletricamente." |
| **8** | Flash | `FLASH` | "Memória regravável rápida muito utilizada em pendrives e cartões de memória." |
| **9** | Cache | `CACHE` | "Memória veloz intermediária que armazena dados requisitados recentemente pela CPU." |
| **10** | Memória de massa | `MEMORIADEMASSA` | "Dispositivo de grande capacidade para guardar arquivos e programas permanentemente." |
| **11** | DMA | `DMA` | "Recurso que permite periféricos transferirem dados para a memória sem a CPU." |
| **12** | Address bus | `ADDRESSBUS` | "Vias que conduzem os endereços físicos dos locais a serem acessados." |
| **13** | Data bus | `DATABUS` | "Linhas físicas pelas quais trafegam os pacotes de dados processados." |
| **14** | Microcontrolador | `MICROCONTROLADOR` | "Chip único que integra processador, memórias e periféricos em circuito dedicado." |
| **15** | Dual Core | `DUALCORE` | "Processador constituído de dois núcleos físicos no mesmo circuito integrado." |
| **16** | Quad Core | `QUADCORE` | "Processador projetado com quatro núcleos físicos para processamento simultâneo." |

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estrutura semântica, Canvas 2D para efeitos de partículas.
- **CSS3:** Animações de sprites, layout em Grid e Flexbox, tipografia retrô arcade, efeito CRT scanlines.
- **JavaScript (ES6+):** Lógica da máquina de estados do combate, Web Audio API para síntese procedural de efeitos sonoros, sistema de navegação e conferência da grade da cruzadinha.

---

## 📂 Estrutura de Arquivos

```text
├── index.html        # Estrutura principal e layout dos dois modos
├── style.css         # Estilização arcade, HUD, animações e tabuleiro
├── script.js         # Lógica da luta, Web Audio, validações e cruzadinha
└── README.md         # Documentação completa do projeto
```
