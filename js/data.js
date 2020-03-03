(function () {
    'use strict';

    var LISTING_TITLES = ['Дамблдор', 'Волдеморт', 'Доктор Стрендж', 'Гарри Поттер', 'Дамблдор', 'Волдеморт', 'Доктор Стрендж', 'Гарри Поттер'];
    var TIMES = ['12:00', '13:00', '14:00'];
    var mapElement = document.querySelector('.map');

    var getRandomInt = function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    var generatesSimilarListings = function () {
        var similarListings = [];

        for (var i = 0; i < 8; i++) {
            similarListings.push({
                author: {
                    avatar: 'img/avatars/user0' + (i + 1) + '.png'
                },
                offer: {
                    title: LISTING_TITLES[i],
                    address: '600, 350',
                    price: '12 000',
                    type: ['palace', 'flat', 'house', 'bungalo'],
                    rooms: ['1', '2', '3', '4'],
                    guests: ['1', '2', '3', '4', '5'],
                    photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
                    checkin: TIMES[Math.floor(Math.random() * TIMES.length)],
                    checkout: TIMES[Math.floor(Math.random() * TIMES.length)],
                    features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
                },
                location: {
                    x: getRandomInt(0, mapElement.offsetWidth),
                    y: getRandomInt(130, 630)
                }
            });
        }

        return similarListings;
    };

    window.data = {
        generatesSimilarListings: generatesSimilarListings
    };

})();