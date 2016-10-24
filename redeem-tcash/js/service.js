'use strict';

/**
 * @ngdoc function
 * @name ly.services:Message
 * @description
 * # Message Resource Api service
 * Message Resource for connecting Message api
 */


angular
    .module('tuktukCamp')
    .factory('tuktukService', tuktukService);

function tuktukService($resource) {
  $.urlParam = function (name) {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      return results[1] || 0;
  }

  var token = $.urlParam('tk');

  if(!token){
    return alert('invalid token');
  }

  var PREFIX = '';
  if(window.location.hostname === 'dev-web.gotuktuk.in'){
    PREFIX = 'dev-'
  }else if(window.location.hostname === 'stg-web.gotuktuk.in'){
    PREFIX = 'stg-'
  }if(window.location.hostname === 'training-web.gotuktuk.in'){
    PREFIX = 'training-'
  }

  var url = 'https://'+PREFIX+'api.gotuktuk.in/rest/v2/tcash/redeem';
    return $resource(
        "",
        {offerCode :"@offerCode"},
        {
            redeemOfferCode: {
                method: 'POST',
                url:   url,
                headers: {'Authorization': 'Basic '+token},
                isArray:false
            }
        }
    );
}
