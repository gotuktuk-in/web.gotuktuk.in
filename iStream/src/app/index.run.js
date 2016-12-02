(function() {
  'use strict';

  angular
    .module('istream')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
