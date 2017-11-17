(async function() {
  if (document.querySelector('.index').length === 0) return;

  const addAfterPartyButton = document.querySelector('.add-after-party-button');
  const afterList = document.querySelector('#after-list');

  const afterPartyRequest = await fetch("https://after-party-21427.firebaseio.com/afters.json");
  const responseData = await afterPartyRequest.json();

  const afterPartyIds = Object.keys(responseData);
  const afterParties = Object.values(responseData)
                             .map((after, index) => {
                                after.id = afterPartyIds[index];
                                return after;
                              });

  function getMostVotedVenue(venues) {
    return venues.reduce((previous, current) => previous.votes > current.votes ? previous : current);
  }

  function createAfterPartiesMarkup(afterParties) {
    return afterParties.map((after, index) => {
        return `<li class="list__item">
          <h2 class="list__item__title">${after.name}</h2>
          <p class="list__item__detail">${getMostVotedVenue(after.venues).name}</p>
          <button data-after-id="${after.id}" class="btn-vote list__item__button" type="button" name="button">view</button>
        </li>`
    }).join("");
  }

  afterList.innerHTML = createAfterPartiesMarkup(afterParties);

  addAfterPartyButton.addEventListener('click', (ev) => {
    window.location.href = 'add-after-party.html';
  });

  const voteButtons = document.querySelectorAll('.btn-vote');

  voteButtons.forEach(b => {
    b.addEventListener('click', function() {
      localStorage.setItem("currentAfterParty", b.getAttribute("data-after-id"));
      window.location.href = 'vote-for-a-venue.html';
    });
  })
})();
