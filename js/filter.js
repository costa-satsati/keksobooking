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

    for (var i = 0; i < (listings.length > 5 ? 5 : listings.length); i++) {
      fragment.appendChild(window.pin.renderListing(listings[i]));
    }
    similarListingElement.appendChild(fragment);

  };


  var isInPriceRange = function (range, price) {
    switch (range) {
      case PriceRange.LOW:
        if (price > 0 && price <= 10000) {
          return true;
        } else {
          return false;
        }
      case PriceRange.MIDDLE:
        if (price >= 10000 && price <= 50000) {
          return true;
        } else {
          return false;
        }
      case PriceRange.HIGH:
        if (price >= 50000) {
          return true;
        } else {
          return false;
        }
      default:
        return false;
    }
  };


  var updateListings = function () {
    var mapCard = document.querySelector('.map__card');
    var filteredListings = [];
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

    filteredListings = window.data.listingObjects.filter(function (el) {
      // условия фильтров
      var conditionType = filterType.value === 'any' ? true : el.offer.type === filterType.value;
      var conditionPrice = filterPrice.value === 'any' ? true : isInPriceRange(filterPrice.value, el.offer.price);
      var conditionGuests = filterGuests.value === 'any' ? true : el.offer.guests.toString() === filterGuests.value;
      var conditionRooms = filterRooms.value === 'any' ? true : el.offer.rooms.toString() === filterRooms.value;
      var conditionFeatures = selectedFeatures.length > 0 ? selectedFeatures.every(function (val) {
        return el.offer.features.includes(val);
      }) : true;

      return conditionType && conditionPrice && conditionGuests && conditionRooms && conditionFeatures;
    });

    render(filteredListings);
  };

  filterForm.addEventListener('change', window.util.debounce(function () {
    updateListings();
  }));


  window.filter = {
    render: render
  };

})();
