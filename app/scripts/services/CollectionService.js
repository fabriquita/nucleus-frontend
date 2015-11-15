'use strict';

angular.module('nucleusApp')
.factory('CollectionService', [
  '$http',
  '$rootScope',
  '$window',
  function($http, $rootScope, $window) {
    return {
      create: function(data) {
        return $http.put($rootScope.getBackendUrl() + 'collections/', data, {
          //TODO: refactor this
          headers: {
            credentials: $window.sessionStorage.credentials,
            principal: $window.sessionStorage.principal
          }
        });
      },
      getAll: function(page, size) {
        return $http.get($rootScope.getBackendUrl() + 'collections/' + '?page=' + (page || 0) + '&size=' + (size || 10), {
          //TODO: refactor this
          headers: {
            credentials: $window.sessionStorage.credentials,
            principal: $window.sessionStorage.principal
          }
        });
      }
    };
  }
]);
