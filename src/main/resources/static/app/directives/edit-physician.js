(function() {
  'use strict';
  /**
    <edit-physician> directive: provides a form for creastion & edition of patients,
    with cancel/ok buttons.
    Emits event 'hexagon-physician-edit-cancel' on cancel and
    'hexagon-physician-edit-confirm' on confirm.
    This directive changes the input physician, if this is not desired, pass it a
    copy of the original object (eg angular.copy).

    examples:
      Create physician: <edit-physician physician="{}" specialties="ctrl.specialties">
      Edit physician: <edit-physician physician="ctrl.physician" specialties="ctrl.specialties">
  */
  angular.module('hexagon')
  .directive('editPhysician', [function($http) {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        physician: '=',
        specialties: '='
      },
      templateUrl: 'app/templates/edit-physician.html',
      link: function (scope) {
        scope.specialtyQuery = ''
        scope.physician.specialties = scope.physician.specialties || []

        scope.cancel = function () {
          scope.$emit('hexagon-physician-edit-cancel')
        }

        scope.confirm = function (){
          scope.$emit('hexagon-physician-edit-confirm', scope.physician)
        }

        // filter specialties for autocomplete. 
        // return specialties starting with the user input
        scope.filterSpecialties = function (query) {
          if (!query) return scope.specialties

          var lowercaseQuery = angular.lowercase(query)
          var filter =  function filterFn(specialty) {
            return (specialty.name.indexOf(lowercaseQuery) === 0);
          }
          return scope.specialties.filter(filter)
        }
      }
    }
  }])
})()
