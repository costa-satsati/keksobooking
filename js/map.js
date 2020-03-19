'use strict';
(function () {

  var mapElement = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var pinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');


  var onSuccess = function (listings) {
    // добавить id к каждому обьявлению
    window.data.listingObjects = listings.map(function (el, index) {
      el.id = index;
      return el;
    });

    // отрисовать обьявления
    window.filter.render(window.data.listingObjects);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onMainPinClick = function (evt) {
    var mapFadedElement = document.querySelector('.map--faded');

    if (mapFadedElement !== null &&
      (evt.button === 0 || evt.key === 'Enter')) {
      mapElement.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      // загрузить данные сервера
      window.ajax.load(onSuccess, onError);

      // enable ad form elements
      window.form.setEnabled(false);

    }
  };

  pinMain.addEventListener('mousedown', onMainPinClick);
  pinMain.addEventListener('keydown', onMainPinClick);

  // перетаскивание
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var HEIGHT_LIMIT = {
      MIN:130,
      MAX:630
    };

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

      var topCoord, leftCoord;

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

    
      topCoord = Math.max(HEIGHT_LIMIT.MIN, Math.min(pinMain.offsetTop - shift.y, HEIGHT_LIMIT.MAX));
      leftCoord = Math.max(0, Math.min(pinMain.offsetLeft - shift.x, mapPins.offsetWidth - pinMain.offsetWidth));


      pinMain.style.top = topCoord  + 'px';
      pinMain.style.left = leftCoord + 'px';

      window.form.setAddress(pinMain.offsetLeft - Math.floor( pinMain.offsetWidth / 2), pinMain.offsetTop - pinMain.offsetHeight);

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
