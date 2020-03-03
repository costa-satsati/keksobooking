(function () {
    'use strict';

    var similarListingElement = document.querySelector('.map__pins');
    var cardTemplate = document.querySelector('#card')
        .content
        .querySelector('.map__card');

    var renderCard = function (listing) {
        var cardElement = cardTemplate.cloneNode(true);
        var popupClose = cardElement.querySelector('.popup__close');

        popupClose.addEventListener('click', destroyPopup);

        cardElement.querySelector('.popup__avatar').src = listing.author.avatar;
        cardElement.querySelector('.popup__title').text = listing.offer.title;

        return cardElement;
    };

    var destroyPopup = function (evt) {
        evt.target.parentNode.remove();
    };

    var displayPopup = function (evt) {
        var mapCard = document.querySelector('.map__card');
        var index = evt.target.parentNode.dataset.indexNumber;

        if (mapCard) {
            mapCard.remove();
        }

        //отрисуй карточку
        if (index) {
            similarListingElement.after(renderCard(window.data.listingObjects[index]));
        }
    }

    window.card = {
        displayPopup: displayPopup
    };

})();