// Objeto que armazena o estado manual do jogo
export const state = {
  score: {
    playerScore: 0,
    computerScore: 0,
    scoreBox: document.getElementById("score_points"),
  },
  cardSprites: {
    avatar: document.getElementById("card-image"),
    name: document.getElementById("card-name"),
    type: document.getElementById("card-type"),
  },
  fieldCards: {
    player: document.getElementById("player-field-card"),
    computer: document.getElementById("computer-field-card"),
  },
  playerSides: {
    player1: "player-cards",
    computer: "computer-cards",
  },
  actions: {
    button: document.getElementById("next-duel"),
  },
};

// Constantes de caminhos
export const paths = {
  player: "./src/assets/icons/",
  cardBack: "./src/assets/icons/card-back.png",
};

// Dados das Cartas (Regras do Jo-Ken-Po)
export const cardData = [
  {
    id: 0,
    name: "Dragão Branco",
    type: "Papel",
    img: `${paths.player}dragon.png`,
    beats: [1], // Ganha do Mago Negro (Pedra)
  },
  {
    id: 1,
    name: "Mago Negro",
    type: "Pedra",
    img: `${paths.player}magician.png`,
    beats: [2], // Ganha do Exodia (Tesoura)
  },
  {
    id: 2,
    name: "Exodia",
    type: "Tesoura",
    img: `${paths.player}exodia.png`,
    beats: [0], // Ganha do Dragão Branco (Papel)
  },
];

// Constantes de Áudio
export const audio = {
  bgm: document.getElementById("bgm"),
  win: new Audio("./src/assets/audios/win.wav"),
  lose: new Audio("./src/assets/audios/lose.wav"),
};