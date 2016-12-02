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
    .factory('MainService', MainService);

function MainService($q, $resource, API) {
    var url = API;
    return $resource("",{},
      {
            getVideosList: {
                method: 'GET',
                url: url + 'videos',
                isArray: false
            }
        }
    );
}
