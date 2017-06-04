(function() {
  'use strict';
  /**
  Dependencies definition and main controller
  */
  var hexagon = angular.module('hexagon', [
                  'ngMaterial', // theming & layout
                  'ngMessages', // form error handling 
                  'ngCpfCnpj'   // form CPF validation
  ])

  hexagon.controller('MainController', function($scope, $http) {
    $scope.currentNavItem = 'patients'  // nav bar initialization
  })
})()
