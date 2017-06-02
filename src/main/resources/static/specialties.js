(function() {
  'use strict';
  angular.module('hexagon')
  .directive('specialties', ['$http', '$mdDialog', function($http, $mdDialog) {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'specialties.html',
      link: function (scope) {
        scope.editingSpecialty = false
        scope.page = 0
        scope.specialties = []
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
          querySpecialties(0)
        }

        scope.createSpecialty = function (ev) {
          scope.editingSpecialty = true
          scope.currentSpecialty = {}
        }

        scope.deleteSpecialty = function (ev, item) {
          scope.querying = true
          $http.delete(item._links.self.href)
          .then(function(response) {
            scope.querying = false
            querySpecialties(0)
          })
          .catch(function(error) {
            scope.querying = false
            $mdDialog.show($mdDialog.alert().title(':(').textContent('There was an error').ok('Ok'))
          })
        }

        scope.editSpecialty = function (ev, item) {
          scope.editingSpecialty = true
          scope.currentSpecialty = angular.copy(item)
        }

        scope.navigateNext = function () {
          querySpecialties(1)
        }

        scope.navigatePrevious = function () {
          querySpecialties(-1)
        }

        scope.resetPage = function () {
          scope.page = 0
          scope.totalPages = 0
          querySpecialties()
        }

        function querySpecialties (pageDirection) {
          scope.querying = true
          var url = '/specialties?'
          if (scope.queryText) {
            url += '/specialties/search/findByNameContaining?name=' + scope.queryText + '&'
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
              scope.specialties = response.data._embedded.specialties
              scope.specialties.forEach(fetchSpecialtyPhysicians)

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

        function fetchSpecialtyPhysicians (specialty) {
          if (!specialty._links || !specialty._links.physicians) return

          $http.get(specialty._links.physicians.href)
          .then(function(response) {
            if (response.data._embedded && response.data._embedded.physicians) {
              specialty.physicians = response.data._embedded.physicians
            } else {
              specialty.physicians = []
            }
          })
          .catch(function(error) {
            scope.querying = false
            $mdDialog.show($mdDialog.alert().title(':(').textContent('There was an error fetching physicians of specialty ' + specialty.name).ok('Ok'))
          })
        }

        scope.$on('hexagon-specialty-edit-cancel', function () {
          scope.editingSpecialty = false
        })

        scope.$on('hexagon-specialty-edit-confirm', function (ev, specialty) {
          scope.editingSpecialty = false
          scope.querying = true

          var promise
          if (specialty._links) {
            promise = $http.put(specialty._links.self.href, specialty)
          } else {
            promise = $http.post('/specialties', specialty)
          }

          promise.then(function(response) {
            scope.querying = false
            querySpecialties(0)
          })
          .catch(function(error) {
            scope.querying = false
            $mdDialog.show($mdDialog.alert().title(':(').textContent('There was an error').ok('Ok').ok('Ok'))
          })
        })

        querySpecialties()
      }
    }
  }])
})()
