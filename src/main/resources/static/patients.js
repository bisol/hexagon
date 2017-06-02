(function() {
  'use strict';
  angular.module('hexagon')
  .directive('patients', ['$http', '$mdDialog', function($http, $mdDialog) {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'patients.html',
      link: function (scope) {
        scope.editingPatient = false
        scope.page = 0
        scope.patients = []
        scope.querying = false
        scope.queryText = ''
        scope.sort = 'name'
        scope.sortDirection = 'asc'
        scope.sortDirectionUi = false // false == asc, true == reverse
        scope.sortIconName = 'keyboard_arrow_up'
        scope.totalElements = 0
        scope.totalPages = 0

        scope.toggleSortDirection = function () {
          if (scope.sortDirection === 'asc') {
            scope.sortDirection = 'desc'
            scope.sortDirectionUi = true
            scope.sortIconName = 'keyboard_arrow_down'
          } else {
            scope.sortDirection = 'asc'
            scope.sortDirectionUi = false
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
          $http.delete(item._links.self.href)
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

        function queryPatients (pageDirection) {
          scope.querying = true
          var url = '/persons?'
          if (scope.queryText) {
            url += '/persons/search/findByNameContaining?name=' + scope.queryText + '&'
          }

          url += "size=5"

          if (typeof pageDirection === 'number') {
            var newPage = scope.page + pageDirection
            newPage = Math.min(newPage, scope.totalPages - 1)
            newPage = Math.max(0, newPage)
            url += '&page=' + newPage
          } else {
            url += '&page=0'
          }

          url += '&sort=' + scope.sort + ',' + scope.sortDirection

          $http.get(url)
          .then(function(response) {
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

        scope.$on('hexagon-patient-edit-cancel', function () {
          scope.editingPatient = false
        })


        scope.$on('hexagon-patient-edit-confirm', function (ev, patient) {
          scope.editingPatient = false
          scope.querying = true

          var promise
          if (patient._links) {
            promise = $http.put(patient._links.self.href, patient)
          } else {
            promise = $http.post('/persons', patient)
          }

          promise.then(function(response) {
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
