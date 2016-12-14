(function () {
  'use strict';

  angular
    .module('istream')
    .controller('VideoController', VideoController);

  /** @ngInject */
  function VideoController($scope, $state, $localStorage, $sessionStorage, $stateParams, $timeout,
                           toastr, $log, MainService, $sce, _, VideoHandler, $window) {

    var vm = this;
    vm.appLink = false;
    var newItem = $localStorage.data;
    vm.catColor = $localStorage.color;
    vm.catGroups = $localStorage.cat;
    var hls;
    vm.playMe = function () {
      vm.PlayingData = newItem;
      if (Hls.isSupported()) {
        var video = document.getElementById('video');
        hls = new Hls();
        hls.loadSource(newItem.stream);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          video.play();
        });
      }
    };
    vm.playMe();

    vm.gotoTop = function() {
      $window.scrollTo(0, 0);
    };

    vm.playOther = function (item) {
      vm.PlayingData = item;
      if (hls) {
        var video = document.getElementById('video');
        hls.loadSource(item.stream);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          video.play();
        });
      }
      vm.gotoTop();
    };

    vm.appLinkOn = function () {
      vm.appLink = true;
    };
    vm.appLinkOff = function () {
      vm.appLink = false;
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

