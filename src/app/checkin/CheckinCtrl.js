(function() {
  'use strict';

  angular
  .module('red')
  .controller('CheckinCtrl', CheckinCtrl);

  /** @ngInject */
  function CheckinCtrl($scope, $state, $http, $cookies, MarsApiFactory) {

    //placeholder object for POST request to /colonist
    $scope.colonist = {};
    $scope.validate = false;
    $cookies.putObject('mars_cookie', undefined);

    // fetch all jobs
    MarsApiFactory.getJobs().then(function(response){
      $scope.jobs = response.data.jobs;
    }, function(error){
      // Handle err
    });

    $scope.login = function(event) {
      event.preventDefault();

      //validate form
      if ($scope.checkinForm.$invalid) {
        $scope.validate = true;
      }
      else {
        MarsApiFactory.postColonist($scope.colonist).then(function(response){
          $cookies.putObject('mars_cookie', response.data.colonist);
          $state.go('encounters');
        });
      }
    };
  }

})();
