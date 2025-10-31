// seleciona todos os cards
const boxes = document.querySelectorAll('.project-overview-box');

boxes.forEach(box => {
  box.style.cursor = 'pointer';
  
  box.addEventListener('click', () => {
    const url = box.dataset.url;
    const openPopup = box.dataset.popup === 'true';

    if (!url) return;

    if (openPopup) {
      // abre numa janela tipo popup
      window.open(url, '_blank', 'toolbar=no,menubar=no,width=1000,height=700,left=100,top=100');
    } else {
      // abre em nova aba
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  });
});
