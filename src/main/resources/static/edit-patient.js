(function() {
  'use strict';
  angular.module('hexagon')
  .directive('editPatient', [function($http) {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        patient: '='
      },
      templateUrl: 'edit-patient.html',
      link: function (scope) {
        scope.cancel = function () {
          scope.$emit('hexagon-patient-edit-cancel')
        }

        scope.confirm = function (){
          scope.$emit('hexagon-patient-edit-confirm', scope.patient)
        }
      }
    }
  }])
})()