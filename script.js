/* ============================================================
   KERNEL FIGHTER & CRUZADINHA - JAVASCRIPT CORE ENGINE
   Arquitetura Computacional • Sprint 3
   ============================================================ */

// Base de dados das 16 palavras e pistas técnicas (máx 15 palavras cada, sem siglas por extenso)
const WORDS_DATA = [
  { id: 1, term: "CPU", clue: "Cérebro do computador que executa instruções e processa os dados principais.", num: 1 },
  { id: 2, term: "ULA", clue: "Circuito da CPU que realiza operações matemáticas e comparações lógicas.", num: 2 },
  { id: 3, term: "UC", clue: "Unidade que gerencia o fluxo de instruções e controla outros componentes.", num: 3 },
  { id: 4, term: "REGISTRADORES", clue: "Espaços de memória ultrarrápida situados dentro do próprio processador.", num: 4 },
  { id: 5, term: "RAM", clue: "Memória volátil principal de leitura e escrita usada durante a execução.", num: 5 },
  { id: 6, term: "ROM", clue: "Memória permanente de fábrica somente de leitura com rotinas de inicialização.", num: 6 },
  { id: 7, term: "EEPROM", clue: "Memória não volátil que pode ser apagada e regravada eletricamente.", num: 7 },
  { id: 8, term: "FLASH", clue: "Memória regravável rápida muito utilizada em pendrives e cartões de memória.", num: 8 },
  { id: 9, term: "CACHE", clue: "Memória veloz intermediária que armazena dados requisitados recentemente pela CPU.", num: 9 },
  { id: 10, term: "MEMORIADEMASSA", clue: "Dispositivo de grande capacidade para guardar arquivos e programas permanentemente.", num: 10 },
  { id: 11, term: "DMA", clue: "Recurso que permite periféricos transferirem dados para a memória sem a CPU.", num: 11 },
  { id: 12, term: "ADDRESSBUS", clue: "Vias que conduzem os endereços físicos dos locais a serem acessados.", num: 12 },
  { id: 13, term: "DATABUS", clue: "Linhas físicas pelas quais trafegam os pacotes de dados processados.", num: 13 },
  { id: 14, term: "MICROCONTROLADOR", clue: "Chip único que integra processador, memórias e periféricos em circuito dedicado.", num: 14 },
  { id: 15, term: "DUALCORE", clue: "Processador constituído de dois núcleos físicos no mesmo circuito integrado.", num: 15 },
  { id: 16, term: "QUADCORE", clue: "Processador projetado com quatro núcleos físicos para processamento simultâneo.", num: 16 }
];

// Mapeamento exato do Tabuleiro da Cruzadinha (100% das 16 palavras interligadas)
const CROSSWORD_LAYOUT = [
  { word: "UC", row: 0, col: 4, dir: "H", num: 3 },
  { word: "CPU", row: 0, col: 5, dir: "V", num: 1 },
  { word: "QUADCORE", row: 2, col: 4, dir: "H", num: 16 },
  { word: "DUALCORE", row: 2, col: 7, dir: "V", num: 15 },
  { word: "EEPROM", row: 2, col: 16, dir: "V", num: 7 },
  { word: "DATABUS", row: 4, col: 6, dir: "H", num: 13 },
  { word: "FLASH", row: 5, col: 13, dir: "V", num: 8 },
  { word: "MICROCONTROLADOR", row: 6, col: 2, dir: "H", num: 14 },
  { word: "MEMORIADEMASSA", row: 6, col: 2, dir: "V", num: 10 },
  { word: "REGISTRADORES", row: 6, col: 5, dir: "V", num: 4 },
  { word: "RAM", row: 8, col: 0, dir: "H", num: 5 },
  { word: "ROM", row: 8, col: 0, dir: "V", num: 6 },
  { word: "CACHE", row: 9, col: 10, dir: "H", num: 9 },
  { word: "ADDRESSBUS", row: 12, col: 2, dir: "H", num: 12 },
  { word: "ULA", row: 12, col: 10, dir: "V", num: 2 },
  { word: "DMA", row: 14, col: 5, dir: "H", num: 11 }
];

/* ============================================================
   SISTEMA DE ÁUDIO RETRÔ (WEB AUDIO API NATIVA)
   ============================================================ */
let audioCtx = null;
let soundEnabled = true;

function initAudio() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
}

function toggleAudio() {
  soundEnabled = !soundEnabled;
  const statusSpan = document.getElementById("soundStatus");
  const iconSpan = document.getElementById("soundIcon");
  if (soundEnabled) {
    statusSpan.textContent = "ON";
    iconSpan.textContent = "🔊";
  } else {
    statusSpan.textContent = "OFF";
    iconSpan.textContent = "🔇";
  }
}

function playTone(freq, type, duration, delay = 0) {
  if (!soundEnabled) return;
  initAudio();
  if (!audioCtx) return;

  setTimeout(() => {
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Audio fallback silencioso
    }
  }, delay);
}

function sfxHit() {
  playTone(220, "sawtooth", 0.12, 0);
  playTone(440, "square", 0.15, 60);
  playTone(880, "triangle", 0.2, 120);
}

function sfxDamage() {
  playTone(150, "sawtooth", 0.25, 0);
  playTone(90, "square", 0.35, 80);
}

function sfxWin() {
  const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
  notes.forEach((n, i) => playTone(n, "square", 0.2, i * 120));
}

function sfxLose() {
  const notes = [300, 260, 220, 180, 130];
  notes.forEach((n, i) => playTone(n, "sawtooth", 0.25, i * 140));
}

/* ============================================================
   ESTADO DO MODO BOSS BATTLE
   ============================================================ */
let battleQueue = [];
let currentBattleIndex = 0;
let playerLives = 3;
let maxLives = 3;
let bossHp = 16;
let maxBossHp = 16;
let comboCount = 0;
let revealedHintLetters = 0;
let battleFinished = false;

// Elementos da DOM do combate
const playerHpBar = document.getElementById("playerHpBar");
const bossHpBar = document.getElementById("bossHpBar");
const playerLivesContainer = document.getElementById("playerLives");
const livesText = document.getElementById("livesText");
const bossHpText = document.getElementById("bossHpText");
const clueText = document.getElementById("clueText");
const stepIndicator = document.getElementById("stepIndicator");
const slotsContainer = document.getElementById("slotsContainer");
const termInput = document.getElementById("termInput");
const feedbackMsg = document.getElementById("feedbackMsg");
const comboBanner = document.getElementById("comboBanner");
const arenaStage = document.getElementById("arenaStage");
const playerSprite = document.getElementById("playerSprite");
const bossSprite = document.getElementById("bossSprite");
const playerActionBalloon = document.getElementById("playerActionBalloon");
const bossActionBalloon = document.getElementById("bossActionBalloon");
const dangerFlash = document.getElementById("dangerFlash");

// Canvas para partículas e efeitos visuais
const fxCanvas = document.getElementById("fxCanvas");
const ctx = fxCanvas ? fxCanvas.getContext("2d") : null;
let particles = [];

function resizeCanvas() {
  if (fxCanvas && arenaStage) {
    fxCanvas.width = arenaStage.clientWidth;
    fxCanvas.height = arenaStage.clientHeight;
  }
}
window.addEventListener("resize", resizeCanvas);

/* ============================================================
   INICIALIZAÇÃO DO JOGO
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  resizeCanvas();
  requestAnimationFrame(particleLoop);
  initBattle();
  buildCrosswordGrid();
  renderCrosswordClues();

  // Escuta digitação no input de ataque
  termInput.addEventListener("input", handleInputChange);
  termInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleAttackSubmit();
    }
  });

  // Habilita áudio no primeiro clique
  document.body.addEventListener("click", () => initAudio(), { once: true });
});

/* ============================================================
   LÓGICA DO MODO BOSS BATTLE
   ============================================================ */
function initBattle() {
  // Embaralha as 16 palavras para cada partida ser única!
  battleQueue = [...WORDS_DATA].sort(() => Math.random() - 0.5);
  currentBattleIndex = 0;
  playerLives = 3;
  bossHp = 16;
  comboCount = 0;
  revealedHintLetters = 0;
  battleFinished = false;

  updateHud();
  loadCurrentQuestion();
  showAnnouncement("ROUND 1", "FIGHT!");
}

function updateHud() {
  // Atualiza corações do jogador
  const hearts = playerLivesContainer.querySelectorAll(".heart");
  hearts.forEach((h, idx) => {
    if (idx < playerLives) {
      h.classList.add("active");
    } else {
      h.classList.remove("active");
    }
  });

  const playerPct = (playerLives / maxLives) * 100;
  playerHpBar.style.width = `${Math.max(0, playerPct)}%`;
  livesText.textContent = `${playerLives}/${maxLives}`;

  // Atualiza barra de vida do boss
  const bossPct = (bossHp / maxBossHp) * 100;
  bossHpBar.style.width = `${Math.max(0, bossPct)}%`;
  bossHpText.textContent = `${bossHp}/${maxBossHp}`;

  // Combo
  if (comboCount >= 2) {
    comboBanner.textContent = `COMBO x${comboCount}!`;
    comboBanner.classList.remove("hidden");
  } else {
    comboBanner.classList.add("hidden");
  }
}

function loadCurrentQuestion() {
  if (currentBattleIndex >= battleQueue.length) {
    triggerVictory();
    return;
  }

  const currentItem = battleQueue[currentBattleIndex];
  stepIndicator.textContent = `TERMO ${currentBattleIndex + 1} DE 16`;
  clueText.textContent = `"${currentItem.clue}"`;

  revealedHintLetters = 0;
  termInput.value = "";
  termInput.disabled = false;
  termInput.focus();

  renderSlots(currentItem.term, "");
  feedbackMsg.className = "feedback-msg";
  feedbackMsg.textContent = `Dica: ${currentItem.term.length} letras. Digite e pressione [ENTER]!`;
}

function renderSlots(targetTerm, typedVal) {
  slotsContainer.innerHTML = "";
  const cleaned = typedVal.toUpperCase().replace(/[^A-Z]/g, "");

  for (let i = 0; i < targetTerm.length; i++) {
    const slot = document.createElement("div");
    slot.className = "slot-box";

    if (i < cleaned.length) {
      slot.textContent = cleaned[i];
      slot.classList.add("filled");
    } else if (i < revealedHintLetters) {
      slot.textContent = targetTerm[i];
      slot.classList.add("revealed-hint");
    } else {
      slot.textContent = "_";
    }

    slotsContainer.appendChild(slot);
  }
}

function handleInputChange() {
  if (battleFinished) return;
  const currentItem = battleQueue[currentBattleIndex];
  termInput.value = termInput.value.toUpperCase();
  renderSlots(currentItem.term, termInput.value);
}

function requestHint() {
  if (battleFinished) return;
  const currentItem = battleQueue[currentBattleIndex];
  if (revealedHintLetters < currentItem.term.length - 1) {
    revealedHintLetters++;
    renderSlots(currentItem.term, termInput.value);
    feedbackMsg.className = "feedback-msg";
    feedbackMsg.textContent = `💡 Letra revelada: ${currentItem.term.slice(0, revealedHintLetters)}`;
    playTone(520, "triangle", 0.1);
  }
}

function handleAttackSubmit() {
  if (battleFinished) return;
  const currentItem = battleQueue[currentBattleIndex];
  const typed = termInput.value.trim().toUpperCase().replace(/[\s-]/g, "");

  if (!typed) {
    feedbackMsg.className = "feedback-msg error";
    feedbackMsg.textContent = "⚠️ Digite uma palavra antes de desferir o golpe!";
    return;
  }

  termInput.disabled = true;

  if (typed === currentItem.term) {
    // ACERTOU! GOLPE NO BOSS!
    handlePlayerSuccess(currentItem);
  } else {
    // ERROU! CONTRA-ATAQUE DO BOSS!
    handleBossCounter(currentItem);
  }
}

function handlePlayerSuccess(item) {
  comboCount++;
  bossHp = Math.max(0, bossHp - 1);
  updateHud();

  // Efeitos Sonoros e Visuais
  sfxHit();
  triggerPlayerAttackAnim();
  spawnHitParticles(fxCanvas.width * 0.75, fxCanvas.height * 0.5, "#00ffcc");
  showBalloon(playerActionBalloon, getRandomPlayerShout(item.term));

  feedbackMsg.className = "feedback-msg success";
  feedbackMsg.textContent = `💥 GOLPE CRÍTICO! "${item.term}" desferiu dano no Kernel!`;

  setTimeout(() => {
    currentBattleIndex++;
    if (bossHp <= 0 || currentBattleIndex >= battleQueue.length) {
      triggerVictory();
    } else {
      loadCurrentQuestion();
    }
  }, 1200);
}

function handleBossCounter(item) {
  comboCount = 0;
  playerLives = Math.max(0, playerLives - 1);
  updateHud();

  // Efeitos de Dano
  sfxDamage();
  triggerBossAttackAnim();
  spawnHitParticles(fxCanvas.width * 0.25, fxCanvas.height * 0.5, "#ff0055");
  showBalloon(bossActionBalloon, "ACCESS DENIED!");

  feedbackMsg.className = "feedback-msg error";
  feedbackMsg.textContent = `❌ RESPOSTA INCORRETA! O Boss contra-atacou! (Restam ${playerLives} vidas)`;

  setTimeout(() => {
    if (playerLives <= 0) {
      triggerGameOver();
    } else {
      termInput.disabled = false;
      termInput.value = "";
      termInput.focus();
      renderSlots(item.term, "");
    }
  }, 1200);
}

function triggerPlayerAttackAnim() {
  playerSprite.classList.add("hero-attack");
  setTimeout(() => {
    arenaStage.classList.add("shake-stage");
    bossSprite.classList.add("boss-hurt");
  }, 150);

  setTimeout(() => {
    playerSprite.classList.remove("hero-attack");
    arenaStage.classList.remove("shake-stage");
    bossSprite.classList.remove("boss-hurt");
  }, 600);
}

function triggerBossAttackAnim() {
  bossSprite.classList.add("boss-attack");
  dangerFlash.style.opacity = "0.7";

  setTimeout(() => {
    arenaStage.classList.add("shake-stage");
    playerSprite.classList.add("hero-hurt");
    dangerFlash.style.opacity = "0";
  }, 180);

  setTimeout(() => {
    bossSprite.classList.remove("boss-attack");
    arenaStage.classList.remove("shake-stage");
    playerSprite.classList.remove("hero-hurt");
  }, 600);
}

function showBalloon(balloonEl, text) {
  balloonEl.textContent = text;
  balloonEl.classList.add("show");
  setTimeout(() => balloonEl.classList.remove("show"), 1200);
}

function getRandomPlayerShout(term) {
  const shouts = [
    `${term} STRIKE!`,
    `HADOUKEN (${term})!`,
    `CIRCUIT BURST!`,
    `OVERCLOCK PUNCH!`,
    `EXECUTE: ${term}!`
  ];
  return shouts[Math.floor(Math.random() * shouts.length)];
}

function showAnnouncement(title, sub) {
  const overlay = document.getElementById("roundAnnouncement");
  document.getElementById("announcementTitle").textContent = title;
  document.getElementById("announcementSubtitle").textContent = sub;
  overlay.classList.remove("hidden");
  setTimeout(() => overlay.classList.add("hidden"), 1300);
}

/* ============================================================
   FIM DE JOGO (VITÓRIA / GAME OVER)
   ============================================================ */
function triggerVictory() {
  battleFinished = true;
  sfxWin();
  const modal = document.getElementById("endGameModal");
  document.getElementById("modalBanner").textContent = "🏆 VICTORY!";
  document.getElementById("modalTitle").textContent = "O KERNEL FOI SALVO!";
  document.getElementById("modalDesc").textContent = "Você respondeu com precisão e destruiu completamente o Glitch Overlord!";

  document.getElementById("modalStats").innerHTML = `
    <div>⚡ <strong>Termos Dominados:</strong> 16 de 16</div>
    <div>❤️ <strong>Vidas Restantes:</strong> ${playerLives} de 3</div>
    <div>🔥 <strong>Maior Combo:</strong> x${Math.max(comboCount, 1)}</div>
    <div>🏅 <strong>Rank de Engenharia:</strong> MESTRE EM ARQUITETURA COMPUTACIONAL</div>
  `;
  modal.classList.remove("hidden");
}

function triggerGameOver() {
  battleFinished = true;
  sfxLose();
  const modal = document.getElementById("endGameModal");
  document.getElementById("modalBanner").textContent = "💀 K.O. // GAME OVER";
  document.getElementById("modalTitle").textContent = "BLUE SCREEN OF DEATH!";
  document.getElementById("modalDesc").textContent = "Você cometeu 3 erros e a CPU entrou em Kernel Panic irreversível.";

  document.getElementById("modalStats").innerHTML = `
    <div>❌ <strong>Erros:</strong> 3 de 3 (Falha de Sistema)</div>
    <div>🎯 <strong>Termos Acertados:</strong> ${16 - bossHp} de 16</div>
    <div>💡 <strong>Recomendação:</strong> Revise as pistas no Modo Cruzadinha e tente novamente!</div>
  `;
  modal.classList.remove("hidden");
}

function restartBattle() {
  closeModal();
  initBattle();
}

function closeModal() {
  document.getElementById("endGameModal").classList.add("hidden");
}

/* ============================================================
   MOTOR DE PARTÍCULAS NO CANVAS
   ============================================================ */
function spawnHitParticles(x, y, color) {
  for (let i = 0; i < 28; i++) {
    particles.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.5) * 12,
      size: Math.random() * 5 + 2,
      color: color,
      alpha: 1,
      char: Math.random() > 0.5 ? "1" : "0"
    });
  }
}

function particleLoop() {
  if (ctx && fxCanvas) {
    ctx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.025;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.font = "12px monospace";
      ctx.fillText(p.char, p.x, p.y);
      ctx.restore();
    }
  }
  requestAnimationFrame(particleLoop);
}

/* ============================================================
   SECTION 2: MOTOR DA CRUZADINHA (REQUISITOS SPTECH)
   ============================================================ */
const GRID_ROWS = 20;
const GRID_COLS = 18;
let cellMatrix = [];

function buildCrosswordGrid() {
  const board = document.getElementById("crosswordBoard");
  board.innerHTML = "";

  // Cria matriz 20x18
  cellMatrix = Array(GRID_ROWS).fill(null).map(() => Array(GRID_COLS).fill(null));

  // Mapeia onde há letras e números no grid
  CROSSWORD_LAYOUT.forEach((item) => {
    const dr = item.dir === "V" ? 1 : 0;
    const dc = item.dir === "H" ? 1 : 0;

    for (let i = 0; i < item.word.length; i++) {
      const r = item.row + dr * i;
      const c = item.col + dc * i;

      if (!cellMatrix[r][c]) {
        cellMatrix[r][c] = {
          solution: item.word[i],
          words: [item],
          num: i === 0 ? item.num : null
        };
      } else {
        cellMatrix[r][c].words.push(item);
        if (i === 0 && !cellMatrix[r][c].num) {
          cellMatrix[r][c].num = item.num;
        }
      }
    }
  });

  // Renderiza no DOM
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      const cellData = cellMatrix[r][c];
      const cellDiv = document.createElement("div");
      cellDiv.className = "cw-cell";

      if (cellData) {
        cellDiv.classList.add("active-cell");
        cellDiv.dataset.row = r;
        cellDiv.dataset.col = c;

        if (cellData.num) {
          const numSpan = document.createElement("span");
          numSpan.className = "cw-cell-num";
          numSpan.textContent = cellData.num;
          cellDiv.appendChild(numSpan);
        }

        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.className = "cw-input";
        input.dataset.row = r;
        input.dataset.col = c;
        input.dataset.solution = cellData.solution;

        input.addEventListener("input", (e) => handleCwInput(e, r, c));
        input.addEventListener("keydown", (e) => handleCwNav(e, r, c));
        input.addEventListener("focus", () => highlightRelatedClues(cellData.words));

        cellDiv.appendChild(input);
      } else {
        cellDiv.classList.add("empty");
      }

      board.appendChild(cellDiv);
    }
  }
}

function handleCwInput(e, r, c) {
  const input = e.target;
  input.value = input.value.toUpperCase().replace(/[^A-Z]/g, "");

  if (input.value) {
    // Avança para a próxima casa na direção mais provável
    const cellData = cellMatrix[r][c];
    if (cellData && cellData.words.length > 0) {
      const wordObj = cellData.words[0];
      const dr = wordObj.dir === "V" ? 1 : 0;
      const dc = wordObj.dir === "H" ? 1 : 0;
      const nextInput = document.querySelector(`.cw-input[data-row="${r + dr}"][data-col="${c + dc}"]`);
      if (nextInput) nextInput.focus();
    }
  }
}

function handleCwNav(e, r, c) {
  let nr = r, nc = c;
  if (e.key === "Backspace" && !e.target.value) {
    // Volta uma casa
    const cellData = cellMatrix[r][c];
    if (cellData && cellData.words.length > 0) {
      const wordObj = cellData.words[0];
      const dr = wordObj.dir === "V" ? -1 : 0;
      const dc = wordObj.dir === "H" ? -1 : 0;
      const prevInput = document.querySelector(`.cw-input[data-row="${r + dr}"][data-col="${c + dc}"]`);
      if (prevInput) prevInput.focus();
    }
  } else if (e.key === "ArrowRight") nc++;
  else if (e.key === "ArrowLeft") nc--;
  else if (e.key === "ArrowDown") nr++;
  else if (e.key === "ArrowUp") nr--;

  if (nr !== r || nc !== c) {
    const nextInput = document.querySelector(`.cw-input[data-row="${nr}"][data-col="${nc}"]`);
    if (nextInput) {
      e.preventDefault();
      nextInput.focus();
    }
  }
}

function renderCrosswordClues() {
  const horizList = document.getElementById("horizontalCluesList");
  const vertList = document.getElementById("verticalCluesList");
  horizList.innerHTML = "";
  vertList.innerHTML = "";

  CROSSWORD_LAYOUT.forEach((item) => {
    const wordInfo = WORDS_DATA.find((w) => w.term === item.word);
    const li = document.createElement("li");
    li.className = "clue-item";
    li.dataset.word = item.word;
    li.innerHTML = `<strong>${item.num}.</strong> ${wordInfo ? wordInfo.clue : ""}`;

    li.addEventListener("click", () => {
      highlightWordInGrid(item);
    });

    if (item.dir === "H") {
      horizList.appendChild(li);
    } else {
      vertList.appendChild(li);
    }
  });
}

function highlightWordInGrid(wordObj) {
  document.querySelectorAll(".cw-cell").forEach((c) => c.classList.remove("highlighted"));
  document.querySelectorAll(".clue-item").forEach((ci) => ci.classList.remove("active-clue"));

  const clueEl = document.querySelector(`.clue-item[data-word="${wordObj.word}"]`);
  if (clueEl) clueEl.classList.add("active-clue");

  const dr = wordObj.dir === "V" ? 1 : 0;
  const dc = wordObj.dir === "H" ? 1 : 0;

  for (let i = 0; i < wordObj.word.length; i++) {
    const r = wordObj.row + dr * i;
    const c = wordObj.col + dc * i;
    const cellEl = document.querySelector(`.cw-cell[data-row="${r}"][data-col="${c}"]`);
    if (cellEl) cellEl.classList.add("highlighted");
  }

  const firstInput = document.querySelector(`.cw-input[data-row="${wordObj.row}"][data-col="${wordObj.col}"]`);
  if (firstInput) firstInput.focus();
}

function highlightRelatedClues(words) {
  document.querySelectorAll(".clue-item").forEach((ci) => ci.classList.remove("active-clue"));
  words.forEach((w) => {
    const clueEl = document.querySelector(`.clue-item[data-word="${w.word}"]`);
    if (clueEl) clueEl.classList.add("active-clue");
  });
}

// Botão CONFERIR (Item 4 e 5 da Parte 2 do PDF)
function checkCrossword() {
  let correctWordsCount = 0;

  CROSSWORD_LAYOUT.forEach((item) => {
    const dr = item.dir === "V" ? 1 : 0;
    const dc = item.dir === "H" ? 1 : 0;
    let wordIsCorrect = true;

    for (let i = 0; i < item.word.length; i++) {
      const r = item.row + dr * i;
      const c = item.col + dc * i;
      const input = document.querySelector(`.cw-input[data-row="${r}"][data-col="${c}"]`);

      if (!input || input.value.toUpperCase() !== item.word[i]) {
        wordIsCorrect = false;
        break;
      }
    }

    const clueEl = document.querySelector(`.clue-item[data-word="${item.word}"]`);
    if (wordIsCorrect) {
      correctWordsCount++;
      if (clueEl) clueEl.classList.add("completed");
    } else {
      if (clueEl) clueEl.classList.remove("completed");
    }
  });

  // Validação visual casa a casa
  document.querySelectorAll(".cw-cell.active-cell").forEach((cell) => {
    const input = cell.querySelector(".cw-input");
    if (input && input.value) {
      if (input.value.toUpperCase() === input.dataset.solution) {
        cell.classList.add("correct");
        cell.classList.remove("wrong");
      } else {
        cell.classList.add("wrong");
        cell.classList.remove("correct");
      }
    } else {
      cell.classList.remove("correct", "wrong");
    }
  });

  const badge = document.getElementById("cwScoreBadge");
  badge.textContent = `${correctWordsCount} de 16 palavras certas`;

  if (correctWordsCount === 16) {
    sfxWin();
    badge.style.borderColor = "var(--neon-green)";
    badge.style.color = "var(--neon-green)";
    alert("🎉 Parabéns! Você completou 100% da Cruzadinha de Arquitetura Computacional!");
  } else {
    playTone(330, "square", 0.15);
  }
}

// Botão REINICIAR (Item 6 da Parte 2 do PDF)
function resetCrossword() {
  document.querySelectorAll(".cw-input").forEach((inp) => {
    inp.value = "";
  });
  document.querySelectorAll(".cw-cell").forEach((c) => {
    c.classList.remove("correct", "wrong", "highlighted");
  });
  document.querySelectorAll(".clue-item").forEach((ci) => {
    ci.classList.remove("active-clue", "completed");
  });

  const badge = document.getElementById("cwScoreBadge");
  badge.textContent = "0 de 16 palavras certas";
  badge.style.borderColor = "var(--border-neon)";
  badge.style.color = "var(--border-neon)";
  playTone(200, "triangle", 0.1);
}

/* ============================================================
   TROCA ENTRE MODOS (BOSS BATTLE <-> CRUZADINHA)
   ============================================================ */
function switchMode(mode) {
  const battleSec = document.getElementById("battleSection");
  const cwSec = document.getElementById("crosswordSection");
  const btnBattle = document.getElementById("btnModeBattle");
  const btnCw = document.getElementById("btnModeCrossword");

  if (mode === "battle") {
    battleSec.classList.add("active-section");
    cwSec.classList.remove("active-section");
    btnBattle.classList.add("active");
    btnCw.classList.remove("active");
    resizeCanvas();
    termInput.focus();
  } else {
    cwSec.classList.add("active-section");
    battleSec.classList.remove("active-section");
    btnCw.classList.add("active");
    btnBattle.classList.remove("active");
  }
}
