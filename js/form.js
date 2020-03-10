'use strict';
(function () {

    var pinMain = document.querySelector('.map__pin--main');
    var adForm = document.querySelector('.ad-form');
    var formReset = document.querySelector('.ad-form__reset');
    var adFormElements = adForm.querySelectorAll('fieldset');
    var roomNumber = document.querySelector('#room_number');
    var capacity = document.querySelector('#capacity');
    var avatarUpload = document.querySelector('#avatar');
    var avatarImage = document.querySelector('.ad-form-header__preview img');
    var Code = {
        OK: 200,
        ERROR: 400
    };

    for (var i = 0; i < adFormElements.length; i++) {
        adFormElements[i].disabled = true;
    }

    var setFormAddress = function (left, top) {
        document.querySelector('#address').value = left + ', ' + top;
    };

    // Установить координаты в адрес
    setFormAddress(pinMain.offsetLeft, pinMain.offsetTop);



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

    formReset.addEventListener('click', function () {
        adForm.reset();
    });

    avatarUpload.addEventListener('change', function () {
        if (avatarUpload.files && avatarUpload.files[0]) {
            avatarImage.src = URL.createObjectURL(avatarUpload.files[0]);
        }
    });

    adForm.addEventListener('submit', function (evt) {
        window.upload(new FormData(adForm), function (xhr) {
            switch (xhr.status) {
                case Code.OK:
                    console.log(xhr.status);
                    break;
                case Code.ERROR:
                    console.log(xhr.status);
                    break;
                default:
                    console.log('Unknown response!')
            }
        });
        evt.preventDefault();
    });


    window.form = {
        setFormAddress: setFormAddress
    };

})();

