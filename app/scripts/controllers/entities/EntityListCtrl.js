'use strict';

angular.module('nucleusApp')
.controller('EntityListCtrl', [
  '$scope',
  'EntityService',
  '$location',
  function($scope, EntityService, $location) {
    $scope.service = EntityService;
    
  }
]);