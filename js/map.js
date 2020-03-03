(function () {
    'use strict';

    var similarListingElement = document.querySelector('.map__pins');
    var mapElement = document.querySelector('.map');
    var pinMain = document.querySelector('.map__pin--main');
    var adForm = document.querySelector('.ad-form');
    var adFormElements = adForm.querySelectorAll('fieldset');

    var mainPinClickHandler = function (evt) {
        var mapFadedElement = document.querySelector('.map--faded');

        if (mapFadedElement !== null &&
            (evt.button === 0 || evt.key === 'Enter')) {
            mapElement.classList.remove('map--faded');
            adForm.classList.remove('ad-form--disabled')
            var fragment = document.createDocumentFragment();         

            for (var i = 0; i < window.data.listingObjects.length; i++) {
                fragment.appendChild(window.pin.renderListing(window.data.listingObjects[i], i));
            }
            similarListingElement.appendChild(fragment);

            // enable ad form elements
            for (var i = 0; i < adFormElements.length; i++) {
                adFormElements[i].disabled = false;
            }
                     
        }
    };

    pinMain.addEventListener('mousedown', mainPinClickHandler);
    pinMain.addEventListener('keydown', mainPinClickHandler);

})();