(async function() {
  if (document.querySelector('.vote').length === 0) return;

  const afterPartyRequest = await fetch("https://after-party-21427.firebaseio.com/afters.json");
  const afterParties = await afterPartyRequest.json();
  const currentAfterPartyId = localStorage.getItem("currentAfterParty");
  const currentAfterParty = afterParties[currentAfterPartyId];
  const afterPartyVenues = currentAfterParty.venues;

  const venueList = document.querySelector('#venue-list');
  const afterPartyName = document.querySelector('#after-party-name');

  function createVenuesMarkup() {
    return afterPartyVenues.map((venue, index) => {
        return `<li class="list__item">
                  <h2 class="list__item__title">${venue.name}</h2>
                  <p class="list__item__detail">${venue.votes}</p>
                  <button data-venue-id="${index}" data-venue-votes="${venue.votes}" class="btn-vote list__item__button" type="button" name="button">vote</button>
                </li>`
    }).join("");
  }
  
  afterPartyVenues.innerHTML = currentAfterParty.name;
  venueList.innerHTML = createVenuesMarkup(afterPartyVenues);

  const voteButtons = document.querySelectorAll('.btn-vote');

  voteButtons.forEach(b => {
    b.addEventListener('click', function() {
      venueId = b.getAttribute("data-venue-id");
      votes = parseInt(b.getAttribute("data-venue-votes"));
      console.log(venueId);
      console.log(votes);

      const url = `https://after-party-21427.firebaseio.com/afters/${currentAfterPartyId}/venues/${venueId}/votes.json`;
      console.log(url);
      fetch(url, {
        method: "PUT",
        body: JSON.stringify(votes+1),
      });

      //window.location.href = 'index.html';
    });
  })

})();
