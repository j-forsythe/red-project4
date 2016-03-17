(function() {
  'use strict';

  angular
  .module('red')
  .controller('ReportCtrl', ReportCtrl);

  /** @ngInject */
  function ReportCtrl($scope, $state, $http, $cookies, $filter, MarsApiFactory) {

    $scope.aliens = {};
    $scope.validate = false;

    $scope.report = {
      colonist_id: $cookies.getObject('mars_cookie').id,
      date: $filter('date')(new Date(), 'yyyy-MM-dd')
    };

    $scope.userInfo = {
      name: $cookies.getObject('mars_cookie').name,
      job: $cookies.getObject('mars_cookie').job.name
    };

    MarsApiFactory.getReport().then(function(response){
      $scope.aliens = response.data.aliens;
    });

    $scope.reportSubmit = function(event) {
      event.preventDefault();

      if ($scope.reportAlien.$invalid) {
        $scope.validate = true;
      }
      else {
        MarsApiFactory.postReport($scope.report).then(function(response){
          $state.go('encounters');
        });
      }
    };
  }

})();
