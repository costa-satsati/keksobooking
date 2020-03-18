'use strict';

(function () {
  var Code = {
    OK: 200,
    ERROR: 400
  };
  var MAIN_PIN_LOCATION = 'left: 570px; top: 375px;';
  var mapElement = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var filterForm = document.querySelector('.map__filters');
  var formReset = document.querySelector('.ad-form__reset');
  var adFormElements = adForm.querySelectorAll('fieldset');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var address = document.querySelector('#address');
  var avatarUpload = document.querySelector('#avatar');
  var avatarImage = document.querySelector('.ad-form-header__preview img');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');
  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var setEnabledForm = function (flag) {
    for (var i = 0; i < adFormElements.length; i++) {
      adFormElements[i].disabled = flag;
    }
  };

  setEnabledForm(true);

  var setFormAddress = function (left, top) {
    address.value = left + ', ' + top;
  };

  // Установить координаты в адрес
  setFormAddress(pinMain.offsetLeft, pinMain.offsetTop);


  var validateRoomCapacity = function () {
    if (capacity.value <= roomNumber.value) {
      capacity.setCustomValidity('');
    } else {
      capacity.setCustomValidity('Количество комнат не соответствует Количество мест!');
    }

    adForm.reportValidity();
  };


  capacity.addEventListener('change', validateRoomCapacity);
  roomNumber.addEventListener('change', validateRoomCapacity);

  avatarUpload.addEventListener('change', function () {
    if (avatarUpload.files && avatarUpload.files[0]) {
      avatarImage.src = URL.createObjectURL(avatarUpload.files[0]);
    }
  });

  type.addEventListener('change', function () {

    switch (type.value) {
      case 'bungalo':
        price.min = 0;
        price.placeholder = 0;
        break;
      case 'house':
        price.min = 5000;
        price.placeholder = 5000;
        break;
      case 'palace':
        price.min = 10000;
        price.placeholder = 10000;
        break;
      case 'flat':
        price.min = 1000;
        price.placeholder = 1000;
        break;

    }
  });
  timein.addEventListener('change', function () {

    timeout.value = timein.value;
  });
  timeout.addEventListener('change', function () {

    timein.value = timeout.value;
  });

  var resetScreen = function () {
    adForm.reset();
    filterForm.reset();
    setEnabledForm(true);
    mapElement.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    // вернуть координаты main pin
    pinMain.style = MAIN_PIN_LOCATION;
    setFormAddress(pinMain.offsetLeft, pinMain.offsetTop);

    // очистить карту от всех обьявлений
    document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (el) {
      el.remove();
    });

  };

  formReset.addEventListener('click', resetScreen);

  adForm.addEventListener('submit', function (evt) {
    window.ajax.upload(new FormData(adForm), function (xhr) {
      switch (xhr.status) {
        case Code.OK:
          document.querySelector('main').appendChild(successTemplate.cloneNode(true));
          break;
        case Code.ERROR:
          document.querySelector('main').appendChild(errorTemplate.cloneNode(true));
          break;
      }
    });
    evt.preventDefault();
  });

  document.body.addEventListener('click', function () {
    var successDiv = document.querySelector('.success');

    if (successDiv !== null) {
      successDiv.remove();
      resetScreen();
    }
  });

  var onPopupEscPress = function (evt) {
    var successDiv = document.querySelector('.success');
    var mapCard = document.querySelector('.map__card');

    if (evt.key === 'Escape' && successDiv !== null) {
      successDiv.remove();
      resetScreen();
    }

    if (evt.key === 'Escape' && mapCard !== null) {
      mapCard.remove();
    }
  };

  document.addEventListener('keydown', onPopupEscPress);

  window.form = {
    setFormAddress: setFormAddress,
    setEnabledForm: setEnabledForm
  };

})();

