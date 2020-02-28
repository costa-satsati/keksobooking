'use strict';

var similarListingElement = document.querySelector('.map__pins');
var mapElement = document.querySelector('.map');

var LISTING_TITLES = ['Дамблдор', 'Волдеморт', 'Доктор Стрендж', 'Гарри Поттер', 'Дамблдор', 'Волдеморт', 'Доктор Стрендж', 'Гарри Поттер'];
var TIMES = ['12:00', '13:00', '14:00'];
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

var generatesSimilarListings = function () {
    var similarListings = [];

    for (var i = 0; i < 8; i++) {
        similarListings.push({
            author: {
                avatar: 'img/avatars/user0' + (i + 1) + '.png'
            },
            offer: {
                title: LISTING_TITLES[i],
                address: '600, 350',
                price: '12 000',
                type: ['palace', 'flat', 'house', 'bungalo'],
                rooms: ['1', '2', '3', '4'],
                guests: ['1', '2', '3', '4', '5'],
                photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
                checkin: TIMES[Math.floor(Math.random() * TIMES.length)],
                checkout: TIMES[Math.floor(Math.random() * TIMES.length)],
                features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
            },
            location: {
                x: getRandomInt(0, mapElement.offsetWidth),
                y: getRandomInt(130, 630)
            }
        });
    }

    return similarListings;
};

var renderListing = function (listing) {
    var listingElement = pinTemplate.cloneNode(true);

    listingElement.querySelector('img').src = listing.author.avatar;
    listingElement.querySelector('img').alt = listing.offer.title;
    listingElement.style.left = listing.location.x + 'px';
    listingElement.style.top = listing.location.y + 'px';

    return listingElement;
};

var adForm = document.querySelector('.ad-form');
var adFormElements = adForm.querySelectorAll('fieldset');

for (var i = 0; i < adFormElements.length; i++) {
    adFormElements[i].disabled = true;
}

var mainPinClickHandler = function (evt) {
    var mapFadedElement = document.querySelector('.map--faded');

    if (mapFadedElement !== null &&
        (evt.button === 0 || evt.key === 'Enter')) {
        mapElement.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled')
        var fragment = document.createDocumentFragment();
        var mockListings = generatesSimilarListings();

        for (var i = 0; i < mockListings.length; i++) {
            fragment.appendChild(renderListing(mockListings[i]));
        }
        similarListingElement.appendChild(fragment);

        // enable ad form elements
        for (var i = 0; i < adFormElements.length; i++) {
            adFormElements[i].disabled = false;
        }
    }
};

var pinMain = document.querySelector('.map__pin--main');
pinMain.addEventListener('mousedown', mainPinClickHandler);
pinMain.addEventListener('keydown', mainPinClickHandler);


