'use strict';

(function () {
    var similarListingElement = document.querySelector('.map__pins');
    var filterForm = document.querySelector('.map__filters');
    var filterType = document.querySelector('#housing-type');
    var filterRooms = document.querySelector('#housing-rooms');


    var render = function (listings) {
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < listings.length; i++) {
            fragment.appendChild(window.pin.renderListing(listings[i], i));
        }
        similarListingElement.appendChild(fragment);

    };

    var successHandler = function (listings) {
        // добавить id к каждому обьявлению
        window.data.listingObjects = listings.map(function (el, index) {
            el.id = index;
            return el;
        });
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

    // загрузить данные сервера
    window.load(successHandler, errorHandler);

    filterForm.addEventListener('change', function (evt) {
        var mapCard = document.querySelector('.map__card');

        if (mapCard) {
            mapCard.remove();
        }

        // очистить карту от всех обьявлений
        document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (el) {
            el.remove();
        });     

        render(window.data.listingObjects.filter(function (el) {
            return (filterType.value === 'any' ? true : el.offer.type === filterType.value) &&
                (filterRooms.value === 'any' ? true : el.offer.rooms == filterRooms.value);
        }));

    });

    window.filter = {
        render: render
    };

})();