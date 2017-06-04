(function() {
  'use strict';
  /**
    <edit-patient> directive: provides a form for creastion & edition of patients,
    with cancel/ok buttons.
    Emits event 'hexagon-patient-edit-cancel' on cancel and
    'hexagon-patient-edit-confirm' on confirm.
    This directive changes the input patient, if this is not desired, pass it a
    copy of the original object (eg angular.copy)

    examples:
      Create patient: <edit-patient patient="{}">
      Edit patient: <edit-patient patient="ctrl.patient">
  */
  angular.module('hexagon')
  .directive('editPatient', [function($http) {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        patient: '='
      },
      templateUrl: 'app/templates/edit-patient.html',
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