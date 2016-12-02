(function() {
  'use strict';

  angular
    .module('istream')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .state('video', {
        url: '/video',
        templateUrl: 'app/main/videoPlayer.html',
        controller: 'VideoController',
        controllerAs: 'vm'
      })
      .state('category', {
        url: '/category',
        templateUrl: 'app/main/category.html',
        controller: 'CategoryController',
        controllerAs: 'vm'
      })
  }
})();
