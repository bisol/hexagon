/*
Physician edition.
Basicaly the same as patient edition, but with extra CRM & Specialty fields.
Edits the given physician and broadcasts result as an event.
*/
(function() {
  'use strict';
  angular.module('hexagon')
  .directive('editPhysician', [function($http) {
    return {
      restrict: 'E',
      replace: false,
      scope: {
        physician: '=',
        specialties: '='
      },
      templateUrl: 'edit-physician.html',
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
