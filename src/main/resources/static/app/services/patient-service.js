(function() {
  'use strict';
  /**
    <patients> directive: displays a sortable list of patients, a query box
    and create/edit controls.
  */
  angular.module('hexagon')
  .factory('Patients', ['$http', '$mdDialog', function($http, $mdDialog) {
    var Patients = {
      create: function (patient) {
        return $http.post('/persons', patient)
      },

      delete: function (patient) {
        return  $http.delete(patient._links.self.href)
      },

      find: function (page, sort) {
        var url = '/persons?'
        var params = fillQueryPageAndSort(page, sort)
        return $http.get(url, params)
      },

      findByName: function (name, page, sort) {
        var url += '/persons/search/findByNameContaining?name='
        var params = fillQueryPageAndSort(page, sort)
        return $http.get(url, params)
      },

      update: function (patient) {
        return $http.put(patient._links.self.href, patient)
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

    return Patients
  }])
})()
