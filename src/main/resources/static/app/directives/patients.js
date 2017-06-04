(function() {
  'use strict';
  /**
    <patients> directive: displays a sortable list of patients, a query box
    and create/edit controls.
  */
  angular.module('hexagon')
  .directive('patients', ['$http', '$mdDialog', 'Patients', function($http, $mdDialog, Patients) {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: '../templates/patients.html',
      link: function (scope) {
        scope.editingPatient = false  // togle FAB
        scope.page = 0                // pagination controls
        scope.patients = []           // patient list
        scope.querying = false        // lading animation control
        scope.queryText = ''          // patient query text
        scope.sort = {
          field: 'name',              // sorting field
          direction: 'asc',           // sort direction for REST query
          directionUi: false          // sort direction for UI list -> false == asc, true == reverse
        }
        scope.sortIconName = 'keyboard_arrow_up'
        scope.totalElements = 0       // pagination controls
        scope.totalPages = 0          // pagination controls

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
          queryPatients(0)
        }

        scope.createPatient = function (ev) {
          scope.editingPatient = true
          scope.currentPatient = {}
        }

        scope.deletePatient = function (ev, item) {
          scope.querying = true
          Patients.delete(item)
          .then(function(response) {
            scope.querying = false
            queryPatients(0)
          })
          .catch(function(error) {
            scope.querying = false
            $mdDialog.show($mdDialog.alert().title(':(').textContent('There was an error').ok('Ok'))
          })
        }

        scope.editPatient = function (ev, item) {
          scope.editingPatient = true
          scope.currentPatient = angular.copy(item)
        }

        scope.navigateNext = function () {
          queryPatients(1)
        }

        scope.navigatePrevious = function () {
          queryPatients(-1)
        }

        scope.resetPage = function () {
          scope.page = 0
          scope.totalPages = 0
          queryPatients()
        }

        /**
          Queries backend for patients. Chooses appropriate HTTP route and query
          atring based on sorting controls & query text
        */
        function queryPatients (pageDirection) {
          scope.querying = true
          var newPage = 0
          if (typeof pageDirection === 'number') {
            newPage = scope.page + pageDirection
            newPage = Math.min(newPage, scope.totalPages - 1)
            newPage = Math.max(0, newPage)
          }

          var patientsPromise
          if (scope.queryText) {
            patientsPromise = Patients.findByName(scope.queryText, newPage, sort)
          } else {
            patientsPromise = Patients.find(newPage, sort)
          }

          patientsPromise.then(function(response) {
            if (response.data) {
              scope.patients = response.data._embedded.persons
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

        /**
          handle <edit-patient> 'cancel' event
        */
        scope.$on('hexagon-patient-edit-cancel', function () {
          scope.editingPatient = false
        })

        /**
          handle <edit-patient> 'confirm' event
        */
        scope.$on('hexagon-patient-edit-confirm', function (ev, patient) {
          scope.editingPatient = false
          scope.querying = true

          var patientsPromise
          if (patient._links) {
          // patient came from the back end
            patientsPromise = Patients.update(patient)
          } else {  
            // new patient
            patientsPromise = Patients.create(patient)
          }

          patientsPromise.then(function(response) {
            scope.querying = false
            queryPatients(0)
          })
          .catch(function(error) {
            scope.querying = false
            $mdDialog.show($mdDialog.alert().title(':(').textContent('There was an error').ok('Ok').ok('Ok'))
          })
        })

        queryPatients()
      }
    }
  }])
})()
