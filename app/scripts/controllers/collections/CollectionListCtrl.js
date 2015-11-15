'use strict';

angular.module('nucleusApp')
.controller('CollectionListCtrl', [
  '$scope',
  'CollectionService',
  '$location',
  function($scope, CollectionService, $location) {
    $scope.service = CollectionService;
    
  }
]);
