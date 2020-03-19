'use strict';
(function () {


  var similarListingElement = document.querySelector('.map__pins');
  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var renderCard = function (listing) {
    var cardElement = cardTemplate.cloneNode(true);
    var popupClose = cardElement.querySelector('.popup__close');
    var popupFeatures = cardElement.querySelector('.popup__features');
    var popupPhotos = cardElement.querySelector('.popup__photos');

    popupClose.addEventListener('click', onCardClose);
    document.addEventListener('keydown', onCardClose);

    cardElement.querySelector('.popup__avatar').src = listing.author.avatar;
    cardElement.querySelector('.popup__title').textContent = listing.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = listing.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = listing.offer.price + '&#x20bd;<span>/ночь</span>';
    cardElement.querySelector('.popup__type').textContent = listing.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = listing.offer.rooms + ' комнаты для ' + listing.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + listing.offer.checkin + ', выезд до' + listing.offer.checkout;
    // отобразить удобства
    if (listing.offer.features.length > 0) {
      for (var i = 0; i < listing.offer.features.length; i++) {
        popupFeatures.querySelector('.popup__feature--' + listing.offer.features[i]).style.display = '';
      }
    } else {
      popupFeatures.style.display = 'none';
    }

    // отобразить картинки
    if (listing.offer.photos.length > 0) {
      var photoImages = createPhotos(listing.offer.photos, popupPhotos.querySelector('.popup__photo'));

      popupPhotos.innerHTML = '';
      popupPhotos.appendChild(photoImages);
    } else {
      popupPhotos.style.display = 'none';
    }

    cardElement.querySelector('.popup__description').textContent = listing.offer.description;

    return cardElement;
  };

  var createPhotos = function (photos, imageTemplate) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      var imageElement = imageTemplate.cloneNode();
      imageElement.src = photos[i];
      fragment.appendChild(imageElement);
    }

    return fragment;
  };

  var onCardClose = function (evt) {
    var mapCard = document.querySelector('.map__card');
    var activePin = document.querySelector('.map__pin--active');

    if (mapCard && (evt.key === 'Escape' || evt.type === 'click')) {
      mapCard.remove(); 
      activePin.classList.remove('map__pin--active');    
      document.removeEventListener('keydown', onCardClose);
    }
  };

  var displayPopup = function (evt) {
    var mapCard = document.querySelector('.map__card');
    var activePin = document.querySelector('.map__pin--active');
    var index = evt.target.parentNode.dataset.indexNumber;

    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }

    if (mapCard) {
      mapCard.remove();
    }

    evt.currentTarget.classList.add('map__pin--active');

    // отрисуй карточку

    if (index) {
      similarListingElement.after(renderCard(window.data.listingObjects[index]));
    }
  };

  window.card = {
    displayPopup: displayPopup
  };

})();
