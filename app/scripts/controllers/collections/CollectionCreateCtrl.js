'use strict';

angular.module('nucleusApp')
.controller('CollectionCreateCtrl', [
  '$scope',
  'CollectionService',
  function($scope, CollectionService) {
    $scope.model = {
      id: 0, name: ''
    };
  }
]);