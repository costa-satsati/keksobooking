(function () {
    'use strict';

    var similarListingElement = document.querySelector('.map__pins');
    var mapElement = document.querySelector('.map');
    var pinMain = document.querySelector('.map__pin--main');
    var adForm = document.querySelector('.ad-form');
    var adFormElements = adForm.querySelectorAll('fieldset');

    var successHandler = function (listings) {
        window.data.listingObjects = listings;

        var fragment = document.createDocumentFragment();

        for (var i = 0; i < window.data.listingObjects.length; i++) {
            fragment.appendChild(window.pin.renderListing(window.data.listingObjects[i], i));
        }
        similarListingElement.appendChild(fragment);
    };

    var errorHandler = function (errorMessage) {
        var node = document.createElement('div');
        node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
        node.style.position = 'absolute';
        node.style.left = 0;
        node.style.right = 0;
        node.style.fontSize = '30px';

        node.textContent = errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
    };


    var mainPinClickHandler = function (evt) {
        var mapFadedElement = document.querySelector('.map--faded');

        if (mapFadedElement !== null &&
            (evt.button === 0 || evt.key === 'Enter')) {
            mapElement.classList.remove('map--faded');
            adForm.classList.remove('ad-form--disabled')

            // загрузить данные сервера
            window.load(successHandler, errorHandler);

            // enable ad form elements
            for (var i = 0; i < adFormElements.length; i++) {
                adFormElements[i].disabled = false;
            }

        }
    };



    pinMain.addEventListener('mousedown', mainPinClickHandler);
    pinMain.addEventListener('keydown', mainPinClickHandler);

    // перетаскивание
    pinMain.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        var startCoords = {
            x: evt.clientX,
            y: evt.clientY
        };

        var onMouseMove = function (moveEvt) {
            moveEvt.preventDefault();

            var shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
            };

            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            };

            pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
            pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

            window.form.setFormAddress(pinMain.offsetLeft, pinMain.offsetTop);

        };

        var onMouseUp = function (upEvt) {
            upEvt.preventDefault();

            mapElement.removeEventListener('mousemove', onMouseMove);
            mapElement.removeEventListener('mouseup', onMouseUp);

        };

        mapElement.addEventListener('mousemove', onMouseMove);
        mapElement.addEventListener('mouseup', onMouseUp);
    });

})();