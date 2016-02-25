(function() {
  'use strict';

  angular
    .module('red')
    .controller('CheckinCtrl', CheckinCtrl);

  /** @ngInject */
  function CheckinCtrl($scope, $http) {
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

    $scope.login = function(event) {
      event.preventDefault();

      $http({
        method: 'POST',
        url: COLONIST_POST_URL,
        data: {
          'colonist' : $scope.colonist
        }
      }).then(function(response){
        console.log(response);
      }, function(error){
        console.log(error);
      });

    //   //validate form
      if ($scope.validate && event.checkinForm.$invalid) {
        $scope.validate = false;
      }
      else {
        $scope.validate = true;
      }
    };
    // $scope.checkValid = function() {
    //    if($scope.colonist) {
    //      $scope.validate = false;
    //    }

    };

  }

})();
