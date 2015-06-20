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
        });
})();
