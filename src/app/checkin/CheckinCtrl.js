(function() {
  'use strict';

  angular
  .module('red')
  .controller('CheckinCtrl', CheckinCtrl);

  /** @ngInject */
  function CheckinCtrl($scope, $rootScope, $state, $http, $cookies) {
    var JOBS_GET_URL = 'https://red-wdp-api.herokuapp.com/api/mars/jobs';
    var COLONIST_POST_URL = 'https://red-wdp-api.herokuapp.com/api/mars/colonists';
    //placeholder object for POST request to /colonist
    $scope.colonist = {};
    $scope.validate = false;

    // fetch all jobs
    $http({
      method: 'GET',
      url: JOBS_GET_URL
    }).then(function(response){
      $scope.jobs = response.data.jobs;
    }, function(error){
      // Handle err
    });

    $cookies.putObject('mars_cookie', undefined);

    $scope.login = function(event) {
      event.preventDefault();

      //validate form
      if ($scope.checkinForm.$invalid) {
        $scope.validate = true;
      }
      else {
        $http({
          method: 'POST',
          url: COLONIST_POST_URL,
          data: {
            'colonist' : $scope.colonist
          }
        }).then(function(response){
          $cookies.putObject('mars_cookie', response.data.colonist);
          $state.go('encounters');
        });
      }
    };
  }

})();
