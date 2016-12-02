'use strict';

/**
 * @ngdoc function
 * @name ly.services:Message
 * @description
 * # Message Resource Api service
 * Message Resource for connecting Message api
 */

angular
  .module('istream')
  .factory('VideoHandler', VideoHandler);
function VideoHandler() {
  var factory = {};
  factory.getVideo = function (item) {
    return item;
  };
  return factory;
}
