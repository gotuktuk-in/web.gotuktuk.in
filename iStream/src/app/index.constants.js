/* global malarkey:false, moment:false */
(function () {
  'use strict';

  angular
    .module('istream')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('API', "http://dev-video.47billion.com/rest/o/v1/")
})();
