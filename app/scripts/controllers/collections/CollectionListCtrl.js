'use strict';

angular.module('nucleusApp')
.controller('CollectionListCtrl', [
  '$scope',
  'CollectionService',
  '$location',
  function($scope, CollectionService, $location) {
    $scope.service = CollectionService;

    $scope.onCollectionsLoaded = function(res) {
      $scope.collections = res;
    };
    
  }
]);
