(function () {
  'use strict';

  angular
    .module('istream')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
        creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment, $rootScope, $state, $localStorage, $sessionStorage) {
      var vm = this;

      console.log($state.$current.parent.self.name);
      switch ($state.current.name) {
        case 'video':
          vm.videoPlayer = true;
          vm.home = false;
          break;
        case 'category':
          vm.videoPlayer = false;
          vm.home = false;
          vm.videoPlayerCategory = true;
          break;
        default:
          vm.home = true;
          vm.videoPlayer = false;
      }

      // "vm.creationDate" is available by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();
    }
  }

})();
