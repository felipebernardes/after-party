(function() {
  if (document.querySelector('.vote').length === 0) return;

  const afterParties = JSON.parse(localStorage.getItem("afterParties"));
  const currentAfterPartyId = localStorage.getItem("currentAfterParty");
  const currentAfterParty = afterParties[currentAfterPartyId];
  const afterPartyVenues = currentAfterParty.venues;

  function createVenuesMarkup() {
    return afterPartyVenues.map((venue, index) => {
        return `<li class="list__item">
                  <h2 class="list__item__title">${venue.name}</h2>
                  <p class="list__item__detail">${venue.votes}</p>
                  <button data-venue-id="${index}" data-venue-votes="${venue.votes}" class="btn-vote list__item__button" type="button" name="button">vote</button>
                </li>`
    }).join("");
  }

  const voteButtons = document.querySelectorAll('.btn-vote');

  voteButtons.forEach(b => {
    b.addEventListener('click', function() {
      venueId = b.getAttribute("data-venue-id");
      votes = b.getAttribute("data-venue-votes");
      console.log(venueId);
      console.log(votes);

      const url = "https://after-party-21427.firebaseio.com/afters/${currentAfterParty}/venues/${venueId}/votes.json";
      fetch(url, {
        method: "PUT",
        body: {
          votes: votes++
        }
      });

      window.location.href = 'index.html';
    });
  })

})();
