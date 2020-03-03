(function () {
    'use strict';

    var pinMain = document.querySelector('.map__pin--main');
    var adForm = document.querySelector('.ad-form');
    var adFormElements = adForm.querySelectorAll('fieldset');
    var roomNumber = document.querySelector('#room_number');
    var capacity = document.querySelector('#capacity');

    for (var i = 0; i < adFormElements.length; i++) {
        adFormElements[i].disabled = true;
    }

    // Установить координаты в адрес
    document.querySelector('#address').value = pinMain.offsetLeft + ', ' + pinMain.offsetTop;

    // Валидация числа комнат и гостей
    var validateRoomCapacity = function () {

        if (capacity.value > roomNumber.value) {
            capacity.setCustomValidity('Количество комнат не соответствует Количество мест!');
        } else {
            capacity.setCustomValidity("");
        }

        adForm.reportValidity();

    };

    capacity.addEventListener('change', validateRoomCapacity);
    roomNumber.addEventListener('change', validateRoomCapacity);

})();

