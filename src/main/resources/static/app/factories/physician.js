(function() {
  'use strict';
  /**
    Provides CRUD API access for physicians.
  */
  angular.module('hexagon')
  .factory('Physicians', ['$http', '$mdDialog', function($http, $mdDialog) {
    var Physicians = {
      create: function (physician) {
        fixSpecialtyForUpdate(physician)
        return $http.post('/physicians', physician)
      },

      delete: function (physician) {
        return  $http.delete(physician._links.self.href)
      },

      find: function (page, sort) {
        var url = '/physicians'
        var params = fillQueryPageAndSort(page, sort)
        return $http({
          method: 'GET',
          url: url, 
          params: params
        })
      },

      findByName: function (name, page, sort) {
        var url = '/physicians/search/findByNameContaining'
        var params = fillQueryPageAndSort(page, sort)
        params.name = name
        return $http({
          method: 'GET',
          url: url, 
          params: params
        })
      },

      populateSpecialties: function (physician) {
        if (!physician._links || !physician._links.specialties) {
          physician.specialties = []
          return Promise.resolve()
        }

        return $http.get(physician._links.specialties.href).then(function(response) {
          if (response.data._embedded && response.data._embedded.specialties) {
            physician.specialties = response.data._embedded.specialties
          } else {
            physician.specialties = []
          }
        })
      },

      update: function (physician) {
        fixSpecialtyForUpdate(physician)
        return $http.put(physician._links.self.href, physician)
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
    function fixSpecialtyForUpdate (physician) {
      if (physician.specialties) {
        physician.specialties = physician.specialties.map(function (specialty) {
          return specialty._links.self.href
        })
      }
    }

    return Physicians
  }])
})()
