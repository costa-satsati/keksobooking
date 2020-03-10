'use strict';
(function () {
    
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
            
            // отрисовать обьявления
            window.filter.render(window.data.listingObjects);

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