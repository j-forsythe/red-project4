(function() {
  'use strict';

  angular
    .module('red')
    .controller('ReportCtrl', ReportCtrl);

  /** @ngInject */
  function ReportCtrl($scope, $state, $http, $cookies, $filter) {
    var ALIENS_GET_URL = 'https://red-wdp-api.herokuapp.com/api/mars/aliens';
    var ALIENS_POST_URL = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';
    $scope.aliens = {};
    $scope.validate = false;

    $scope.report = {
      colonist_id: $cookies.getObject('mars_cookie').id,
      date: $filter('date')(new Date(), 'yyyy-MM-dd')
    };

    $http({
      method: 'GET',
      url: ALIENS_GET_URL
    }).then(function(response){
      $scope.aliens = response.data.aliens;
    });

    $scope.reportSubmit = function(event) {
      event.preventDefault();

      if ($scope.reportAlien.$invalid) {
        $scope.validate = true;
      }
      else {
    $http({
      method: 'POST',
      url: ALIENS_POST_URL,
      data: {
        'encounter': $scope.report
      }
    }).then(function(response){
      $cookies.putObject('mars_cookie', response.data.aliens);
      $state.go('encounters');
    });
  }
};
}

})();
