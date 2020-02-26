'use strict';

var generatesSimilarListings = function () {
    var similarListings = [];
    var listingObject = {
        author: {},
        offer: {},
        location: {}
    };

    for (var i = 1; i < 9; i++) {
        var listing = Object.create(listingObject);
        listing.author.avatar = 'img/avatars/user0' + i + '.png';
        similarListings.push(listing);
    }

    return similarListings;
}

console.log(generatesSimilarListings());

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');