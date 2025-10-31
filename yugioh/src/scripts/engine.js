import { cardData, audio } from "./constants.js";

/**
 * Obtém uma ID de carta aleatória para o computador.
 */
export async function getComputerCardId() {
  const randomIndex = Math.floor(Math.random() * cardData.length);
  return cardData[randomIndex].id;
}

/**
 * Lógica central do Jo-Ken-Po.
 * Verifica quem ganhou ou se houve empate.
 */
export async function checkDuelResults(playerCardId, computerCardId) {
  const playerCard = cardData.find((card) => card.id === playerCardId);
  
  if (playerCard.beats.includes(computerCardId)) {
    await playAudio("win");
    return "GANHOU";
  }

  if (playerCard.id === computerCardId) {
    return "EMPATOU";
  }

  await playAudio("lose");
  return "PERDEU";
}

/**
 * Função reutilizável para tocar áudio.
 */
export async function playAudio(status) {
  const audioToPlay = audio[status.toLowerCase()];
  if (audioToPlay) {
    audioToPlay.volume = 0.2;
    audioToPlay.play();
  }
}