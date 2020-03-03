(function () {
    'use strict';

    var pinTemplate = document.querySelector('#pin')
        .content
        .querySelector('.map__pin');

    var renderListing = function (listing, index) {
        var listingElement = pinTemplate.cloneNode(true);

        listingElement.querySelector('img').src = listing.author.avatar;
        listingElement.querySelector('img').alt = listing.offer.title;
        listingElement.style.left = listing.location.x + 'px';
        listingElement.style.top = listing.location.y + 'px';

        listingElement.dataset.indexNumber = index;
        listingElement.addEventListener('click', window.card.displayPopup);

        return listingElement;
    };

    

    window.pin = {
        renderListing: renderListing
    };
})();