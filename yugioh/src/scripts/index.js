import { state, paths, cardData, audio } from "./constants.js";
import { getComputerCardId, checkDuelResults, playAudio } from "./engine.js";

/**
 * Atualiza o placar na tela.
 */
async function updateScore() {
  state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

/**
 * Mostra as cartas no campo de batalha.
 */
async function drawCardsInField(playerCardId, computerCardId) {
  state.fieldCards.player.src = cardData[playerCardId].img;
  state.fieldCards.computer.src = cardData[computerCardId].img;
}

/**
 * Mostra o resultado do duelo e atualiza o placar.
 */
async function showDuelResults(result) {
  state.cardSprites.name.innerText = result;
  state.cardSprites.type.innerText = "";
  
  if (result === "GANHOU") {
    state.score.playerScore++;
  } else if (result === "PERDEU") {
    state.score.computerScore++;
  }
  
  await updateScore();
}

/**
 * Reseta o duelo para a próxima rodada.
 */
async function resetDuel() {
  // Reseta visualmente a área de informações
  state.cardSprites.avatar.src = paths.cardBack;
  state.cardSprites.name.innerText = "Selecione";
  state.cardSprites.type.innerText = "uma carta";

  // Limpa as cartas do campo
  state.fieldCards.player.src = "";
  state.fieldCards.computer.src = "";

  // Esconde o botão de "Próximo Duelo"
  state.actions.button.style.display = "none";
  
  // Limpa as cartas das mãos
  await removeAllCardImages();
  
  // Compra novas cartas
  drawCards(3, state.playerSides.player1);
  drawCards(5, state.playerSides.computer);
}

/**
 * Função principal do duelo. É chamada ao clicar em uma carta.
 */
async function setCardsField(playerCardId) {
  // 1. Remove todas as cartas da mão (limpa a arena)
  await removeAllCardImages();

  // 2. Obtém a carta do computador
  // (CORREÇÃO: O nome da função estava errado)
  const computerCardId = await getComputerCardId();

  // 3. Mostra as cartas no campo
  await drawCardsInField(playerCardId, computerCardId);

  // 4. Verifica o resultado
  const duelResult = await checkDuelResults(playerCardId, computerCardId);

  // 5. Atualiza o placar e mostra o resultado
  await showDuelResults(duelResult);
  
  // 6. Mostra o botão de reset
  state.actions.button.style.display = "block";
}

/**
 * Remove as cartas da mão (limpa a arena para o duelo).
 */
async function removeAllCardImages() {
  let computerSide = document.getElementById(state.playerSides.computer);
  let playerSide = document.getElementById(state.playerSides.player1);
  
  computerSide.innerHTML = "";
  playerSide.innerHTML = "";
}

/**
 * Cria a imagem da carta na mão do jogador ou computador.
 */
async function createCardImage(idCard, fieldSide) {
  const cardImage = document.createElement("img");
  cardImage.setAttribute("height", "100px");
  cardImage.setAttribute("class", "card-item");
  
  if (fieldSide === state.playerSides.player1) {
    // É uma carta do jogador, define a imagem e o clique
    cardImage.setAttribute("src", cardData[idCard].img);
    cardImage.setAttribute("data-id", idCard);
    
    // Adiciona o evento de clique (função reutilizável)
    cardImage.addEventListener("click", () => setCardsField(idCard));
    
    // Adiciona hover para mostrar detalhes
    cardImage.addEventListener("mouseover", () => {
      drawSelectedCardDetails(idCard);
    });
  } else {
    // É uma carta do computador, mostra o verso
    cardImage.setAttribute("src", paths.cardBack);
  }

  return cardImage;
}

/**
 * Mostra os detalhes da carta (avatar, nome, tipo) no menu esquerdo.
 */
async function drawSelectedCardDetails(id) {
  state.cardSprites.avatar.src = cardData[id].img;
  state.cardSprites.name.innerText = cardData[id].name;
  state.cardSprites.type.innerText = "Tipo: " + cardData[id].type;
}

/**
 * "Compra" as cartas, desenhando-as na mão do jogador e do computador.
 */
async function drawCards(cardAmount, fieldSide) {
  const cardContainer = document.getElementById(fieldSide);
  
  for (let i = 0; i < cardAmount; i++) {
    // No Jo-Ken-Po, o jogador precisa ter 1 de cada (Pedra, Papel, Tesoura)
    const cardId = (fieldSide === state.playerSides.player1) ? i : await getComputerCardId();
    const cardImage = await createCardImage(cardId, fieldSide);
    cardContainer.appendChild(cardImage);
  }
}

/**
 * Função de inicialização do jogo.
 */
function init() {
  // Esconde o botão de reset
  state.actions.button.style.display = "none";
  
  // Toca a música de fundo
  audio.bgm.play();
  audio.bgm.volume = 0.1;
  
  // "Compra" as cartas
  drawCards(3, state.playerSides.player1); // 3 cartas para o jogador (0, 1, 2)
  drawCards(5, state.playerSides.computer); // 5 cartas aleatórias para o PC
}

// Inicia o jogo quando a página carrega
init();

// (CORREÇÃO: Adiciona o "ouvinte de clique" ao botão)
state.actions.button.addEventListener("click", () => {
  resetDuel();
});