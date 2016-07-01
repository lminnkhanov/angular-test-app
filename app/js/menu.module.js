'use strict';

angular.
  module('mainMenu', ['core.services']).
  component('mainMenu', {
    templateUrl: 'tpl/main-menu.template.html',
    controller: ['$location', 'userService', '$scope', '$uibModal', function($location, userService, $scope, $uibModal) {
      var self = this;

      function setUserData() {
        self.authUser = userService.isAuth();
        self.userName = userService.getUserName();
      }

      self.goods = [];

      function setCart(e, goods) {
        self.goods = goods;
      }
      
      $scope.$on('userLogin', setUserData);
      $scope.$on('userLogout', setUserData);
      $scope.$on('addGoods', setCart);

      setUserData();

      this.open = function (size) {
        var modalInstance = $uibModal.open({
          animation: true,
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          size: size,
          resolve: {
            goods: function () {
              return self.goods;
            }
          }
        });
      };

    }]
  }).
  controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, goods) {

    $scope.goods = goods;

    $scope.ok = function () {
      $uibModalInstance.close();
    };
    $scope.deleteItem = function (item) {
      console.log(item);
      var index = $scope.goods.indexOf(item);
      if (index !== -1) $scope.goods.splice(index, 1);
    };
  });