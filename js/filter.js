'use strict';

(function () {
    var PriceRange = {
        LOW: 'low',
        MIDDLE: 'middle',
        HIGH: 'high'
    };
    var similarListingElement = document.querySelector('.map__pins');
    var filterForm = document.querySelector('.map__filters');
    var filterType = document.querySelector('#housing-type');
    var filterRooms = document.querySelector('#housing-rooms');
    var filterPrice = document.querySelector('#housing-price');
    var filterGuests = document.querySelector('#housing-guests');


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


    var isInPriceRange = function (range, price) {
        switch (range) {
            case PriceRange.LOW:
                if (price > 0 && price <= 10000) {
                    return true;
                } else {
                    return false;
                }
                break;
            case PriceRange.MIDDLE:
                if (price >= 10000 && price <= 50000) {
                    return true;
                } else {
                    return false;
                }
                break;
            case PriceRange.HIGH:
                if (price >= 50000) {
                    return true;
                } else {
                    return false;
                }
                break;
            default:
                return false;
        }
    };


    filterForm.addEventListener('change', function (evt) {
        var mapCard = document.querySelector('.map__card');
        // массив из выбранных в фильтре удобств
        var selectedFeatures = Array.from(document.querySelectorAll('#housing-features input[name=features]:checked'))
            .map(function (el) {
                return el.value;
            });

        if (mapCard) {
            mapCard.remove();
        }

        // очистить карту от всех обьявлений
        document.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (el) {
            el.remove();
        });

        render(window.data.listingObjects.filter(function (el) {
            // условия фильтров
            var conditionType = filterType.value === 'any' ? true : el.offer.type === filterType.value;
            var conditionPrice = filterPrice.value === 'any' ? true : isInPriceRange(filterPrice.value, el.offer.price);
            var conditionGuests = filterGuests.value === 'any' ? true : el.offer.guests == filterGuests.value;
            var conditionRooms = filterRooms.value === 'any' ? true : el.offer.rooms == filterRooms.value;
            var conditionFeatures = selectedFeatures.length > 0 ? selectedFeatures.every(function (val) { return el.offer.features.includes(val); }) : true;

            return conditionType && conditionPrice && conditionGuests && conditionRooms && conditionFeatures;
        }));

    });


    window.filter = {
        render: render
    };

})();