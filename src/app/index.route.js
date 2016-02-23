(function() {
  'use strict';

  angular
    .module('red')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false,
        rewriteLinks: false
    });

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })

      .state('check-in', {
        url: '/checkin',
        templateUrl: 'app/checkin/check-in.html',
        controller: 'CheckinCtrl',
        controllerAs: 'checkin'
      })
      .state('encounters', {
        url: '/encounters',
        templateUrl: 'app/encounters/encounters.html',
        controller: 'EncountersCtrl'
      })
      .state('report', {
        url: '/report',
        templateUrl: 'app/report/report.html',
        controller: 'ReportCtrl'
      })
      .state('report-filed', {
        url: '/report-filed',
        templateUrl: 'app/report/report-filed',
        controller: 'ReportCtrl'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
