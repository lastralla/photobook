/* globals apikey */
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
    .module('photobookApp', [
        'ngAnimate',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'facebook'
    ])
    .config(function($routeProvider) { /* @ngInject */
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .config(function(FacebookProvider) { /* @ngInject */
        var myAppId = apikey;
        FacebookProvider.init(myAppId);
    });
