(function() {
  'use strict';

  angular
    .module('red')
    .controller('ReportCtrl', ReportCtrl);

  /** @ngInject */
  function ReportCtrl($scope, $http) {
    var ALIENS_GET_URL = 'https://red-wdp-api.herokuapp.com/api/mars/aliens';
    var ALIENS_POST_URL = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';
    $scope.aliens = {};

    $http({
      method: 'GET',
      url: ALIENS_GET_URL
    }).then(function(response){
      $scope.aliens = response.data.aliens;
    }, function(error){
      console.log(error);
    });

    $scope.reportSubmit = function(event) {
      event.preventDefault();

    $http({
      method: 'POST',
      url: ALIENS_POST_URL,
      data: {
        'aliens': $scope.aliens
      }
    }).then(function(response){
      console.log(response);
    }, function(error){
      console.log(error);
    });
  };
}

})();
