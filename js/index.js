(function() {
  if (document.querySelector('.index').length === 0) return;

  const addAfterPartyButton = document.querySelector('.add-after-party-button');

  addAfterPartyButton.addEventListener('click', (ev) => {
    window.location.href = 'add-after-party.html';
  });
})();
