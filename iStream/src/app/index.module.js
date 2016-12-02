(function () {
  'use strict';

  angular
    .module('istream', [
      'angular-loading-bar',
      'ngStorage',
      'underscore',
      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'ngResource',
      'ui.router',
      'ui.bootstrap',
      'toastr'
    ])
    .config(function ($sceDelegateProvider) {
      $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between  and *.
        //'http://*.*/**'
        'http://111.118.241.70:5051/**'
      ]);
    })

    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
      cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
      cfpLoadingBarProvider.latencyThreshold = 1;
      //cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Custom Loading Message...</div>';
    }]);


})();
