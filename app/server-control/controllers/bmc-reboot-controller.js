/**
 * Controller for bmc-reboot
 *
 * @module app/serverControl
 * @exports bmcRebootController
 * @name bmcRebootController
 */

window.angular && (function(angular) {
  'use strict';

  angular.module('app.serverControl').controller('bmcRebootController', [
    '$scope', '$window', 'APIUtils', 'dataService',
    function($scope, $window, APIUtils, dataService) {
      $scope.dataService = dataService;
      $scope.confirm = false;
      APIUtils.getLastRebootTime().then(
          function(data) {
            $scope.reboot_time = data.data;
          },
          function(error) {
            console.log(JSON.stringify(error));
          });
      $scope.rebootConfirm = function() {
        if ($scope.confirm) {
          return;
        }
        $scope.confirm = true;
      };
      $scope.reboot = function() {
        dataService.setUnreachableState();
        APIUtils.bmcReboot(function(response) {
          //@NOTE: using common event to reload server status, may be a better
          // event listener name?
          $scope.$emit('user-logged-in', {});
        });
      };
    }
  ]);
})(angular);
