(function () {
  'use strict';

  angular
    .module('istream')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, $localStorage, $sessionStorage,  $state, $stateParams, $timeout, toastr, $log, MainService, $sce, _, VideoHandler) {
    var vm = this;
    vm.count = 2;
    vm.banner = 'test';
    vm.videoPlayer = false;
    vm.videoAll = false;
    vm.appLink = false;
    vm.colors = ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'];

    vm.getVideos = function () {
      vm.catGroups = [];
      MainService.getVideosList({}, function (response) {
        var allCats = response;
        var i = 0;
        vm.dataList = response;
        vm.category = _.groupBy(vm.dataList.videos, 'category');
        _.each(vm.category , function (group, key) {
          vm.catGroups.push({
            category: key,
            items: group,
            color : vm.colors[i]
          });
          i++;
        });
      }, function (err) {
        console.log(err);
        $scope.error = true;
      });
    };



    vm.getVideos();

    vm.playMe = function (item, key, cat) {
      $localStorage.data = item;
      $localStorage.color = key;
      $localStorage.cat = cat;
      $state.go('video');
    };

    vm.appLinkOn = function () {
      vm.appLink = true;
    };
    vm.appLinkOff = function () {
      vm.appLink = false;
    };

    vm.viewAll = function (cat, key) {
      $localStorage.cat = cat;
      $localStorage.color = key;
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

