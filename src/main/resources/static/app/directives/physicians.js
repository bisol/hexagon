(function() {
  'use strict';
  /**
    <physicians> directive: displays a sortable list of physicians, a query box
    and create/edit controls.
  */
  angular.module('hexagon')
  .directive('physicians', ['$http', '$mdDialog', 'Physicians', 'Specialties', function($http, $mdDialog, Physician, Specialties) {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'app/templates/physicians.html',
      link: function (scope) {
        scope.editingPhysician = false // togle FAB
        scope.page = 0                 // pagination controls
        scope.physicians = []          // physicians list
        scope.querying = false         // lading animation control
        scope.queryText = ''           // patient query text
        scope.sort = {
          field: 'name',               // sorting field
          direction: 'asc',            // sort direction for REST query
          directionUi: false,           // sort direction for UI list -> false == asc, true == reverse
          iconName: 'keyboard_arrow_up'
        }
        scope.specialties = []         // physician specialties
        scope.totalElements = 0        // pagination controls
        scope.totalPages = 0           // pagination controls

        scope.toggleSortDirection = function () {
          if (scope.sort.direction === 'asc') {
            scope.sort.direction = 'desc'
            scope.sort.directionUi = true
            scope.sortIconName = 'keyboard_arrow_down'
          } else {
            scope.sort.direction = 'asc'
            scope.sort.directionUi = false
            scope.sortIconName = 'keyboard_arrow_up'
          }
          queryPhysicians(0)
        }

        scope.createPhysician = function (ev) {
          scope.editingPhysician = true
          scope.currentPhysician = {}
        }

        scope.deletePhysician = function (ev, item) {
          scope.querying = true
          Physician.delete(item)
          .then(function(response) {
            scope.querying = false
            queryPhysicians(0)
          })
          .catch(function(error) {
            scope.querying = false
            $mdDialog.show($mdDialog.alert().title(':(').textContent('There was an error').ok('Ok'))
          })
        }

        scope.editPhysician = function (ev, item) {
          scope.editingPhysician = true
          scope.currentPhysician = angular.copy(item)
        }

        scope.navigateNext = function () {
          queryPhysicians(1)
        }

        scope.navigatePrevious = function () {
          queryPhysicians(-1)
        }

        scope.resetPage = function () {
          scope.page = 0
          scope.totalPages = 0
          queryPhysicians()
        }

        /**
          Queries backend for physicians. Chooses appropriate HTTP route and query
          atring based on sorting controls & query text. This will populate physician's
          specialties on separate requests (physician query is lazy)
        */
        function queryPhysicians (pageDirection) {
          scope.querying = true
          var newPage = 0
          if (typeof pageDirection === 'number') {
            newPage = scope.page + pageDirection
            newPage = Math.min(newPage, scope.totalPages - 1)
            newPage = Math.max(0, newPage)
          }

          var physiciansPromise
          if (scope.queryText) {
            physiciansPromise = Physician.findByName(scope.queryText, newPage, scope.sort)
          } else {
            physiciansPromise = Physician.find(newPage, scope.sort)
          }

          physiciansPromise.then(function(response) {
            if (response.data) {
              scope.physicians = response.data._embedded.physicians
              scope.physicians.forEach(fetchPhysicianSpecialties)

              scope.totalPages = response.data.page.totalPages
              scope.page = response.data.page.number
              scope.totalElements = response.data.page.totalElements
              scope.querying = false
            }
          })
          .catch(function(error) {
            scope.querying = false
            $mdDialog.show($mdDialog.alert().title(':(').textContent('There was an error').ok('Ok'))
          })
        }

        function fetchPhysicianSpecialties (physician) {
          Physician.populateSpecialties(physician)
          .catch(function(error) {
            scope.querying = false
            $mdDialog.show($mdDialog.alert().title(':(')
            .textContent('There was an error fetching specialties of physician ' + physician.name).ok('Ok'))
          })
        }

        /**
          handle <edit-physician> 'cancel' event
        */
        scope.$on('hexagon-physician-edit-cancel', function () {
          scope.editingPhysician = false
        })

        /**
          handle <edit-physician> 'confirm' event
        */
        scope.$on('hexagon-physician-edit-confirm', function (ev, physician) {
          scope.editingPhysician = false
          scope.querying = true

          var physiciansPromise
          if (physician._links) {
            // physician came from the back end
            physiciansPromise = Physician.update(physician)
          } else {
            // new physician
            physiciansPromise = Physician.create(physician)
          }

          physiciansPromise.then(function(response) {
            scope.querying = false
            queryPhysicians(0)
          })
          .catch(function(error) {
            scope.querying = false
            $mdDialog.show($mdDialog.alert().title(':(').textContent('There was an error').ok('Ok'))
          })
        })

        queryPhysicians()

        Specialties.all().then(function(response) {
          if (response.data) {
            scope.specialties = response.data._embedded.specialties
          }
        })
        .catch(function(error) {
          scope.querying = false
          $mdDialog.show($mdDialog.alert().title(':(').textContent('There was an error').ok('Ok'))
        })
      }
    }
  }])
})()
