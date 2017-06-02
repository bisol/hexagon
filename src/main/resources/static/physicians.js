(function() {
  'use strict';
  angular.module('hexagon')
  .directive('physicians', ['$http', '$mdDialog', function($http, $mdDialog) {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'physicians.html',
      link: function (scope) {
        scope.editingPhysician = false
        scope.page = 0
        scope.physicians = []
        scope.querying = false
        scope.queryText = ''
        scope.sort = 'name'
        scope.sortDirection = 'asc'
        scope.sortDirectionUi = false // false == asc, true == reverse
        scope.sortIconName = 'keyboard_arrow_up'
        scope.specialties = []
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
          queryPhysicians(0)
        }

        scope.createPhysician = function (ev) {
          scope.editingPhysician = true
          scope.currentPhysician = {}
        }

        scope.deletePhysician = function (ev, item) {
          scope.querying = true
          $http.delete(item._links.self.href)
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

        function queryPhysicians (pageDirection) {
          scope.querying = true
          var url = '/physicians?'
          if (scope.queryText) {
            url += '/physicians/search/findByNameContaining?name=' + scope.queryText + '&'
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
          if (!physician._links || !physician._links.specialties) return

          $http.get(physician._links.specialties.href)
          .then(function(response) {
            if (response.data._embedded && response.data._embedded.specialties) {
              physician.specialties = response.data._embedded.specialties
            } else {
              physician.specialties = []
            }
          })
          .catch(function(error) {
            scope.querying = false
            $mdDialog.show($mdDialog.alert().title(':(').textContent('There was an error fetching specialties of physician ' + physician.name).ok('Ok'))
          })
        }

        scope.$on('hexagon-physician-edit-cancel', function () {
          scope.editingPhysician = false
        })

        scope.$on('hexagon-physician-edit-confirm', function (ev, physician) {
          scope.editingPhysician = false
          scope.querying = true

          // fix object format for API
          if (physician.specialties) {
            physician.specialties = physician.specialties.map(function (specialty) {
              return specialty._links.self.href
            })
          }

          var promise
          if (physician._links) {
            promise = $http.put(physician._links.self.href, physician)
          } else {
            promise = $http.post('/physicians', physician)
          }

          promise.then(function(response) {
            scope.querying = false
            queryPhysicians(0)
          })
          .catch(function(error) {
            scope.querying = false
            $mdDialog.show($mdDialog.alert().title(':(').textContent('There was an error').ok('Ok'))
          })
        })

        queryPhysicians()

        $http.get('/specialties')
        .then(function(response) {
          if (response.data) {
            scope.specialties = response.data._embedded.specialties
          }
        })
        .catch(function(error) {
          scope.querying = false
          $mdDialog.show($mdDialog.alert().title(':(').textContent('There was an error'))
        })
      }
    }
  }])
})()
