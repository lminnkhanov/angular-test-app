'use strict';

angular.
  module('catalog', ['core.catalog']).
  component('catalog', {
    transclude: true,
    templateUrl: 'tpl/catalog.template.html',
    controller: ['$location', 'userService', 'Catalog', '$rootScope', function($location, userService, Catalog, $rootScope) {
      var self = this,
        srcDateFormat = "YYYY-MM-DD";

      if (!userService.isAuth()) $location.path('/log-in');

     // self.dt = "111";
      self.items = Catalog.query();
      self.search = {
        fromDate: null,
        toDate: null,
        inStock: false,
        priceFrom: null,
        priceTo: null,
        color: ""
      };

      this.orders = [];
      this.addGoods = function(item) {
        if (self.orders.indexOf(item) === -1) self.orders.push(item);
        $rootScope.$broadcast('addGoods', self.orders); // m.b store in local storage or use mediator service?
      }

      function isNull(value) {
        return value === null || value === undefined;
      }

      this.searchFunc = function(item) {
        //console.log(self.search);
        if(
            (!isNull(self.search.fromDate)
              && moment(item.date, srcDateFormat).diff(moment(self.search.fromDate)) < 0)
            || (!isNull(self.search.toDate)
              && moment(item.date, srcDateFormat).diff(moment(self.search.toDate)) >= 0)
            || (self.search.inStock === true && item.inStock === false)
            || (!isNull(self.search.priceFrom)
              && parseFloat(self.search.priceFrom) > parseFloat(item.price))
            || (!isNull(self.search.priceTo)
              && parseFloat(self.search.priceTo) <= parseFloat(item.price))
            || (self.search.color !== "" && self.search.color !== item.color)
        )
        {
          return false;
        }
        return true;
      }
    }]
  }).
  directive('rating', function () {
    function link (scope, element, attrs) {
      var fieldset = angular.element('<fieldset>');
      fieldset.addClass('rating');
      element.append(fieldset);

      for (var i = parseInt(attrs.starsCount); i > 0; i--) {
        var input = angular.element('<input>');
        input
          .attr('type', 'radio')
          .attr('name', attrs.prefix+'rating')
          .attr('value', i)
          .attr('id', attrs.prefix+'star'+i);
        if (Math.round(attrs.rating) === i) input.attr('checked', "checked");
        var label = angular.element('<label>').html(i).attr('for', attrs.prefix+'star'+i).attr('title', i);

        fieldset.append(input);
        fieldset.append(label);
      }
    }

    return {link: link};
  }).
    component('datePicker', {
      require: {
        catalogCtrl: '^catalog'
      },
      bindings: {
        dt: '='
      },
      templateUrl: 'tpl/date-picker.template.html',
      transclude: true,
      controller: ['$scope', function ($scope) {
        var self = this;

        this.format = "MMMM dd, yyyy";
        this.open = function() {
          self.popup.opened = true;
        };

        this.popup = {
          opened: false
        };
    }]
  });