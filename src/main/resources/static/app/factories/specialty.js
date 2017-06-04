(function() {
  'use strict';
  /**
    Provides CRUD API access for specialties.
  */
  angular.module('hexagon')
  .factory('Specialties', ['$http', '$mdDialog', function($http, $mdDialog) {
    var Specialties = {
      all: function () {
        var url = '/specialties?size=10000'
        return $http.get(url)
      },

      create: function (specialty) {
        return $http.post('/specialties', specialty)
      },

      delete: function (specialty) {
        return  $http.delete(specialty._links.self.href)
      },

      find: function (page, sort) {
        var url = '/specialties'
        var params = fillQueryPageAndSort(page, sort)
        return $http({
          method: 'GET',
          url: url, 
          params: params
        })
      },

      findByName: function (name, page, sort) {
        var url = '/specialties/search/findByNameContaining'
        var params = fillQueryPageAndSort(page, sort)
        params.name = name
        return $http({
          method: 'GET',
          url: url, 
          params: params
        })
      },

      populatePhysicians: function (specialty) {
        if (!specialty._links || !specialty._links.physicians) {
            specialty.physicians = []
          return Promise.resolve()
        }

        return $http.get(specialty._links.physicians.href)
        .then(function(response) {
          if (response.data._embedded && response.data._embedded.physicians) {
            specialty.physicians = response.data._embedded.physicians
          } else {
            specialty.physicians = []
          }
        })
      },

      update: function (specialty) {
        fixPhysiciansForUpdate(specialty)
        return $http.put(specialty._links.self.href, specialty)
      }
    }

    function fillQueryPageAndSort(page, sort) {
      var params = {
        size: 5,
        sort: sort.field + ',' + sort.direction
      }
      if (page) {
        params.page = page
      } else {
        params.page = 0
      }

      return params     
    }

    // fix object format for API
    function fixPhysiciansForUpdate (specialty) {
      delete specialty.physicians
    }

    return Specialties
  }])
})()
