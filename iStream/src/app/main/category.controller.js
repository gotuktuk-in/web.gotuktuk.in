(function () {
  'use strict';

  angular
    .module('istream')
    .controller('CategoryController', CategoryController);

  /** @ngInject */
  function CategoryController($scope, $state, $localStorage, $sessionStorage, $stateParams, $timeout,
                           toastr, $log, MainService, $sce, _, VideoHandler) {

    var vm = this;
    vm.catGroups = $localStorage.cat;
    vm.playMe = function (item, key) {
      $localStorage.data = item;
      $localStorage.color = key;
      //console.log(key)
      $state.go('video');
    };

    vm.resetStorage = function(){
      //$localStorage.$reset();
      $state.go('category');
    };

    vm.secondsToTime = function (secs) {
      var hours = Math.floor(secs / (60 * 60));
      var divisor_for_minutes = secs % (60 * 60);
      var minutes = Math.floor(divisor_for_minutes / 60);
      var divisor_for_seconds = divisor_for_minutes % 60;
      var seconds = Math.ceil(divisor_for_seconds);
      if (hours < 10) hours = '0' + hours;
      if (minutes < 10)  minutes = '0' + minutes;
      if (seconds < 10)  seconds = '0' + seconds;
      var obj = hours + ':' + minutes + ':' + seconds;
      return obj;
    };
  }
})();

