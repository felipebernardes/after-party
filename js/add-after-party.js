(function() {
  if (document.querySelector('.add-after-party').length === 0) return;

  const saveButton = document.querySelector('.save-button');

  saveButton.addEventListener('click', (ev) => {
    window.location.href = 'index.html';
  });
})();
