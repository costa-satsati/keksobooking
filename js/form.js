'use strict';

(function () {
    var Code = {
        OK: 200,
        ERROR: 400
    };
    var MAIN_PIN_LOCATION = 'left: 570px; top: 375px;';
    var AVATAR_PLACEHOLDER = 'img/muffin-grey.svg';
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
    var imageUploader = document.querySelector('#images');
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
    
    var listingPhotoTemplate = document.querySelector('.ad-form__photo').cloneNode();

    // блокирует елементы форм     
    var setEnabled = function (flag) {
        var filterElements = filterForm.children;

        for (var i = 0; i < adFormElements.length; i++) {
            adFormElements[i].disabled = flag;
        }

        for (var i = 0; i < filterElements.length; i++) {
            filterElements[i].disabled = flag;
        }
    };

    setEnabled(true);

    var setAddress = function (left, top) {
        address.value = left + ', ' + top;
    };

    // Установить координаты в адрес
    setAddress(pinMain.offsetLeft, pinMain.offsetTop);


    var onValidateRoomCapacity = function () {
        if (capacity.value <= roomNumber.value) {
            capacity.setCustomValidity('');
        } else {
            capacity.setCustomValidity('Количество комнат не соответствует Количество мест!');
        }

        adForm.reportValidity();
    };


    capacity.addEventListener('change', onValidateRoomCapacity);
    roomNumber.addEventListener('change', onValidateRoomCapacity);

    // загрузка аватарки
    avatarUpload.addEventListener('change', function () {
        if (avatarUpload.files && avatarUpload.files[0]) {
            avatarImage.src = URL.createObjectURL(avatarUpload.files[0]);
        }
    });

    // загрузка картинок обьявления
    imageUploader.addEventListener('change', function () {
        var fragment = document.createDocumentFragment();
        if (imageUploader.files && imageUploader.files.length > 0) {
            for (var i = 0; i < imageUploader.files.length; i++) {
                var photoDiv = listingPhotoTemplate.cloneNode();
                var photoImg = document.createElement("img");
                photoDiv.classList.add('ad-form__photo--uploaded')
                photoImg.width = '70';
                photoImg.height = '70'; 
                photoImg.src = URL.createObjectURL(imageUploader.files[i]);
                photoDiv.appendChild(photoImg);
                fragment.appendChild(photoDiv);
            }
            document.querySelector('.ad-form__photo-container').appendChild(fragment);
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

    var onResetScreen = function () {
        adForm.reset();
        filterForm.reset();
        avatarImage.src = AVATAR_PLACEHOLDER;
        setEnabled(true);
        mapElement.classList.add('map--faded');
        adForm.classList.add('ad-form--disabled');

        // очистить картинки
        if (document.querySelector('.ad-form__photo--uploaded')){
            document.querySelectorAll('.ad-form__photo--uploaded').forEach(function(el){
                el.remove();
            });
        }

        // вернуть координаты main pin
        pinMain.style = MAIN_PIN_LOCATION;
        setAddress(pinMain.offsetLeft, pinMain.offsetTop);

        // очистить карту от всех обьявлений
        document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (el) {
            el.remove();
        });

    };

    formReset.addEventListener('click', onResetScreen);

    // обработчики попап
    var onPopupClick = function () {
        var successDiv = document.querySelector('.success');
        var errorDiv = document.querySelector('.error');

        if (successDiv !== null) {
            successDiv.remove();
            onResetScreen();
        }

        if (errorDiv !== null) {
            errorDiv.remove();
            onResetScreen();
        }

        document.body.removeEventListener('click', onPopupClick);
        document.removeEventListener('keydown', onPopupEscPress);
    };

    var onPopupEscPress = function (evt) {
        var successDiv = document.querySelector('.success');
        var errorDiv = document.querySelector('.error');

        if (evt.key === 'Escape' && successDiv !== null) {
            successDiv.remove();
            onResetScreen();
        }

        if (evt.key === 'Escape' && errorDiv !== null) {
            errorDiv.remove();
            onResetScreen();
        }

        document.body.removeEventListener('click', onPopupClick);
        document.removeEventListener('keydown', onPopupEscPress);

    };

    var onErrorButtonClick = function (evt) {
        var errorDiv = document.querySelector('.error');

        if (errorDiv !== null) {
            errorDiv.remove();
            onResetScreen();
        }

        document.body.removeEventListener('click', onPopupClick);
        document.removeEventListener('keydown', onPopupEscPress);

    };



    adForm.addEventListener('submit', function (evt) {
        window.ajax.upload(new FormData(adForm), function (xhr) {
            switch (xhr.status) {
                case Code.OK:
                    document.querySelector('main').appendChild(successTemplate.cloneNode(true));
                    document.body.addEventListener('click', onPopupClick);
                    document.addEventListener('keydown', onPopupEscPress);
                    break;
                case Code.ERROR:
                    document.querySelector('main').appendChild(errorTemplate.cloneNode(true));
                    document.body.addEventListener('click', onPopupClick);
                    document.addEventListener('keydown', onPopupEscPress);
                    document.querySelector('.error__button').addEventListener('click', onErrorButtonClick);
                    break;
            }
        });
        evt.preventDefault();
    });


    window.form = {
        setAddress: setAddress,
        setEnabled: setEnabled
    };

})();

