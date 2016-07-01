'use strict';

angular.
  module('core', []).
  filter('checkmark', function() {
    return function(input) {
      return input ? '\u2713' : '\u2718';
    };
  });

angular.
  module('core.services', ['LocalStorageModule', 'angular-md5']).
  factory('userService', ['localStorageService', '$rootScope', 'md5', function(localStorageService, $rootScope, md5) {
    return {
      hashPassword: function(password) {
        return md5.createHash(password);
      },
      userExist: function(email) {
        return !!this.getPassword(email);
      },
      getPassword: function(email) {
        return localStorageService.get(email);
      },
      addUser: function(email, password) {
        localStorageService.set(email, this.hashPassword(password));
      },
      deleteUser: function(email) {
        localStorageService.remove(email);
      },
      checkUser: function(email, password) {
        return this.getPassword(email) === this.hashPassword(password);
      },
      userLogIn: function(email, password) {
        if (this.checkUser(email, password)) {
          localStorageService.cookie.set('user_nm', email, 1);
          $rootScope.$broadcast('userLogin');
        }
      },
      userLogOut: function() {
        localStorageService.cookie.remove('user_nm');
        $rootScope.$broadcast('userLogout');
      },
      isAuth: function() {
        return !!localStorageService.cookie.get('user_nm');
      },
      getUserName: function() {
        return localStorageService.cookie.get('user_nm');
      },
      deleteAllUsers: function() {
        localStorageService.clearAll();
      }
    };
  }]);

angular.
  module('core.catalog', ['ngResource']).
  factory('Catalog', ['$resource', 
    function($resource) {
      return $resource('data/:carId.json', {}, {
        query: {
          method: 'GET',
          params: {carId: 'cars'},
          isArray: true
        }
      });
    }
  ]);