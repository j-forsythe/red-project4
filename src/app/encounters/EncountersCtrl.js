(function() {
  'use strict';

  angular
  .module('red')
  .controller('EncountersCtrl', EncountersCtrl);

  /** @ngInject */
  function EncountersCtrl($scope, $http, $cookies, $state, MarsApiFactory) {
    // $scope.encounters = {};

    $scope.swipeLeft = function() {
      $state.go('report');
    };

    $scope.userInfo = {
      name: $cookies.getObject('mars_cookie').name,
      job: $cookies.getObject('mars_cookie').job.name
    };

    MarsApiFactory.getEncounters().then(function(response){
      $scope.encounters = response.data.encounters;
    });
  }

})();
