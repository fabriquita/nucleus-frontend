'use strict';

angular.module('nucleusApp')
.directive('userEdit', [
  'UserService',
  'GroupService',
  'RoleService',
  '$location',
  function(UserService, GroupService, RoleService, $location) {
    UserService.get();
    return {
      restrict: 'E',
      scope: {
        model: '=model',
        action: '=action'
      },
      templateUrl: 'views/directives/userEdit.html',
      controller: function($scope, $element, $attrs) {
        // Preload groups
        GroupService.getAll().then(function(res) {
          $scope.groups = res.data.content;
        });
        // Preload roles
        RoleService.getAll().then(function(res) {
          $scope.roles = res.data.content;
        });

        // Get action 'create' or 'edit'
        var action = $attrs.action;
        $scope.action = action;

        // TODO: refactor this
        // Get model values
        // 'edit' return a promise
        // 'create' return the model itself
        if (action === 'edit') {
          $scope.model.then(function(res) {
            $scope.id = res.data.id;
            $scope.firstName = res.data.firstName;
            $scope.lastName = res.data.lastName;
            $scope.userName = res.data.userName;
            // Don't get password
            //$scope.password = res.data.password;
            $scope.email = res.data.email;
            $scope.group = res.data.group.id;
            $scope.role = res.data.role.id;
            $scope.active = res.data.active;
          }, function(err) {
            console.log(err);
          });
        } else if (action === 'create') {
          $scope.id = $scope.model.id;
          $scope.firstName = $scope.model.firstName;
          $scope.lastName = $scope.model.lastName;
          $scope.userName = $scope.model.userName;
          $scope.password = $scope.model.password;
          $scope.repeatedPassword = $scope.model.repeatedPassword;
          $scope.email = $scope.model.email;
        }

        $scope.cancel = function() {
          if (action === 'edit') {
            //$scope.model.edit = false;
            $location.url('/users');
          } else {
            $location.url('/users');
          }
        };

        $scope.save = function() {
          var data = {
            firstName: $scope.firstName.trim(),
            lastName: $scope.lastName.trim(),
            userName: $scope.userName.trim(),
            // TODO: check this
            password: ($scope.password != undefined)? $scope.password.trim(): null,
            group_id: $scope.group,
            role_id: $scope.role,
            email: $scope.email,
            active: ($scope.active != undefined)? $scope.active: null
          };

          if (action === 'edit') {
            if (isValid()) {
              UserService.update($scope.id, data)
              .then(function(res){
                console.log('user updated');
                $location.url('/users');
                $scope.model.edit = false;
              }, function(err) {
                console.log(err);
              });
            } else {
              alert('Los password no coinciden');
            }
          } else if (action === 'create') {
            if (isValid()) {
              UserService.create(data)
              .then(function(res) {
                console.log('user created');
                $location.url('/users');
              }, function(err) {
                console.log('error creating user');
              });
            } else {
              alert('Los password no coinciden');
            }
          }
        };

        function isValid() {
          // TODO: review this validation
          var password = "";
          var repeatedPassword = "";
          if ($scope.password != undefined) {
            password = $scope.password.trim();
          }
          if ($scope.repeatedPassword != undefined) {
            repeatedPassword = $scope.repeatedPassword.trim();
          }
          if (password == repeatedPassword) {
            return true;
          } else {
            return false;
          }
        }

        function updateArchived() {
          $scope.active = $scope.active;
        }
      }
    };
  }
]);
