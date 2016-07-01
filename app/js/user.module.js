'use strict';

angular.
  module('user', ['core.services']).
  component('signUp', {
    templateUrl: 'tpl/sign-up.template.html',
    controller: ['$location', 'userService', function($location, userService) {
      var self = this;
      this.user = {};

      //userService.deleteAllUsers();
      if (userService.isAuth()) $location.path('/');

      this.submitForm = function(data, form) {
        if (form.$valid && data.password === data.confirmPassword) {
          if (userService.userExist(data.email)) {
            self.userExist = true;
            console.log('Email exist');
            return false;
          }
          else {
            self.userExist = false;
            userService.addUser(data.email, data.password);
            userService.userLogIn(data.email, data.password);
            $location.path('/');
            console.log('Saved');
          }
        }
      }
    }]
  }).
  component('logIn', {
    templateUrl: 'tpl/log-in.template.html',
    controller: ['$location', 'userService', '$rootScope', function($location, userService, $rootScope) {
      var self = this;
      self.invalidUser = false;

      if (userService.isAuth()) $location.path('/');

      this.submitForm = function(data, form) {
        if(userService.checkUser(data.email, data.password)) {
          userService.userLogIn(data.email, data.password);
          self.invalidUser = false;

          $location.path('/');
          console.log('Log in');
        }
        else {
          self.invalidUser = true;
          console.log('invalidUser');
          return false;
        }
      }
    }]
  }).
  component('logOut', {
    templateUrl: '',
    controller: ['$location', 'userService', function($location, userService) {
      userService.userLogOut();
      $location.path('/log-in');
    }]
  });