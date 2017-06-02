(function() {
  'use strict';
  angular.module('hexagon')
  .directive('editSpecialty', [function($http) {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        specialty: '='
      },
      templateUrl: 'edit-specialty.html',
      link: function (scope) {
        scope.cancel = function () {
          scope.$emit('hexagon-specialty-edit-cancel')
        }

        scope.confirm = function (){
          scope.$emit('hexagon-specialty-edit-confirm', scope.specialty)
        }
      }
    }
  }])
})()