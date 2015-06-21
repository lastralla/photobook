(function() {
    'use strict';

    /**
     * @ngdoc overview
     * @name photobookApp
     * @description
     * # photobookApp
     *
     * Main module of the application.
     */
    angular
        .module('pb.app', [
            'ngAnimate',
            'ngCookies',
            'ngMessages',
            'ngResource',
            'ngSanitize',
            'ngRoute',
            'ngTouch',
            'pb.common',
            'pb.facebook'
        ])
        .config(function($routeProvider) { /* @ngInject */
            $routeProvider
                .when('/', {
                    templateUrl: 'common/common.html',
                    controller: 'pb.common.MainCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }).run(function() {

            // Warning: The code used to post to facebook uses a mozilla-only method of XMLHttpRequest
            // Temporarily polyfilling XMLHttpRequest.sendAsBinary for other browsers.
            // TODO : do a cleaner patch or find a better way to post to FB

            /* jshint ignore:start */
            /* jscs:disable */
            if(!XMLHttpRequest.prototype.sendAsBinary){
                XMLHttpRequest.prototype.sendAsBinary = function(datastr) {
                    function byteValue(x) {
                        return x.charCodeAt(0) & 0xff;
                    }
                    var ords = Array.prototype.map.call(datastr, byteValue);
                    var ui8a = new Uint8Array(ords);
                    this.send(ui8a.buffer);
                };
            }
            /* jscs:enable */
            /* jshint ignore:end */
        });
})();
