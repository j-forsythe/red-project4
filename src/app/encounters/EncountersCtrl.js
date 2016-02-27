(function() {
  'use strict';

  angular
    .module('red')
    .controller('EncountersCtrl', EncountersCtrl);

  /** @ngInject */
  function EncountersCtrl($scope, $rootScope, $http, $cookies) {
    var ENCOUNTERS_GET_URL = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';
    $scope.encounters = {};

    $rootScope.userInfo = {
      name: $cookies.getObject('mars_cookie').name,
      job: $cookies.getObject('mars_cookie').job.name
    };

    $http({
      method: 'GET',
      url: ENCOUNTERS_GET_URL
    }).then(function(response){
      $scope.encounters = response.data.encounters;
    });
  }

})();
