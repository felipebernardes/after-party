(function() {
  if (document.querySelector('.home').length === 0) return;

  const findOutButton = document.querySelector('.find-out-button');

  findOutButton.addEventListener('click', (ev) => {
    window.location.href = 'index.html';
  });
})();
