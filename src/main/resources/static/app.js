(function() {
  'use strict';

  var hexagon = angular.module('hexagon', ['ngMaterial', 'ngMessages', 'ngCpfCnpj'])

  hexagon.controller('MainController', function($scope, $http) {
    $scope.currentNavItem = 'patients'
    $scope.specialties = []
  })
})()
