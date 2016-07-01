'use strict';

var app = angular.module('testApp', ['ngRoute', 'catalog', 'user', 'mainMenu', 'ngAnimate', 'ui.bootstrap', 'core', 'ui.validate'])
  .config(['$locationProvider', '$routeProvider',
    function($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/catalog', {
          template: '<catalog></catalog>'
        }).
        when('/sign-up', {
          template: '<sign-up></sign-up>'
        }).
        when('/log-in', {
          template: '<log-in></log-in>'
        }).
        when('/log-out', {
          template: '<log-out></log-out>'
        }).
        otherwise('/catalog');
    }
  ]);