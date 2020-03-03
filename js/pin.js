(function () {
    'use strict';
    
    var similarListingElement = document.querySelector('.map__pins');
    var pinTemplate = document.querySelector('#pin')
        .content
        .querySelector('.map__pin');

    var renderListing = function (listing) {
        var listingElement = pinTemplate.cloneNode(true);

        listingElement.querySelector('img').src = listing.author.avatar;
        listingElement.querySelector('img').alt = listing.offer.title;
        listingElement.style.left = listing.location.x + 'px';
        listingElement.style.top = listing.location.y + 'px';

        listingElement.addEventListener('click', window.card.renderCard);

        return listingElement;
    };

    //отрисуй первую карточку
    similarListingElement.after(window.card.renderCard(window.data.listingObjects[0]));

    window.pin = {
        renderListing: renderListing
    };
})();