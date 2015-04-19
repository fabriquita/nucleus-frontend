'use strict';

angular.module('nucleusApp')
.factory('UserService', [
  '$http',
  '$window',
  function($http, $window) {
    var domain = document.domain;
    var url = 'http://' + domain + ':8080/user';

    return {
      create: function(data) {
        console.log(data);
        return $http.put(url + '/', data, {
          //TODO: refactor this
          headers: {
            credentials: $window.sessionStorage.credentials,
            principal: $window.sessionStorage.principal
          }
        });
      },
      update: function(id, data) {
        return $http.post(url + id, data);
      },
      delete: function(id) {
        return $http.delete(url + id);
      },
      getAll: function() {
        return $http.get(url + '/', {
          //TODO: refactor this
          headers: {
            credentials: $window.sessionStorage.credentials,
            principal: $window.sessionStorage.principal
          }
        });
      },
      get: function(id) {
        return $http.get(url + id);
      }
    };
  }
]);
