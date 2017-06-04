(function() {
  'use strict';
  /**
    <edit-specialty> directive: provides a form for creastion & edition of specialty,
    with cancel/ok buttons.
    Emits event 'hexagon-specialty-edit-cancel' on cancel and
    'hexagon-specialty-edit-confirm' on confirm.
    This directive changes the input specialty, if this is not desired, pass it a
    copy of the original object (eg angular.copy)

    examples:
      Create specialty: <edit-specialty specialty="{}">
      Edit specialty: <edit-specialty specialty="ctrl.specialty">
  */
  angular.module('hexagon')
  .directive('editSpecialty', [function($http) {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        specialty: '='
      },
      templateUrl: 'app/templates/edit-specialty.html',
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