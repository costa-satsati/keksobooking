'use strict';
(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderListing = function (listing) {
    var listingElement = pinTemplate.cloneNode(true);

    listingElement.querySelector('img').src = listing.author.avatar;
    listingElement.querySelector('img').alt = listing.offer.title;
    listingElement.style.left = (listing.location.x - PIN_WIDTH / 2) + 'px';
    listingElement.style.top = (listing.location.y - PIN_HEIGHT) + 'px';

    listingElement.dataset.indexNumber = listing.id;
    listingElement.addEventListener('click', window.card.displayPopup);

    return listingElement;
  };

  window.pin = {
    renderListing: renderListing
  };
})();
