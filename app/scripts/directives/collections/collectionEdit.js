'use strict';

angular.module('nucleusApp')
.directive('collectionEdit', [
  'CollectionService',
  'GroupService',
  '$location',
  function(CollectionService, GroupService, $location)  {
    return {
      restrict: 'E',
      scope: {
        model: '=model',
        action: '=?action'
      },
      templateUrl: 'views/directives/collectionEdit.html',
      controller: function($scope, $element, $attrs) {
        // Preload groups
        GroupService.getAll().then(function(res) {
          $scope.groups = res.data.content;
        });
        var action = $attrs.action || 'edit';
        $scope.action = action;
        
        $scope.id = $scope.model.id;
        $scope.name = $scope.model.name;
        if (action === 'edit') {
          $scope.group = $scope.model.group.id;
        }

        $scope.cancel = function() {
          if (action === 'edit') {
            $scope.model.edit = false;
          } else {
            $location.url('/collections');
          }
        };

        $scope.save = function() {
          var data = {
            name: $scope.name,
            group_id: $scope.group
          };

          if (action === 'edit') {
            CollectionService.update($scope.id, data)
            .then(function(res){
              updateOriginalModel();
              // Finish edit
              $scope.model.edit = false;
            }, function(err) {
              console.log(err);
            });
          } else if (action === 'create') {
            CollectionService.create(data)
            .then(function(res) {
              updateOriginalModel();
              $location.url('/collections');
            }, function(err) {
              console.log(err);
            });
          }
        };

        function updateOriginalModel() {
          $scope.model.name = $scope.name;
          $scope.model.description = $scope.description;
          GroupService.get($scope.group).then(function(res) {
            $scope.model.group = res.data;
          }, function(err) {
            console.log(err);
          });
        }
      }
    };
  }
]);
