'use strict';

/**
 * @ngdoc function
 * @name photobookApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the photobookApp
 */
angular
    .module('photobookApp')
        .controller('MainCtrl', function($scope) {
            $scope.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
        });

// https://github.com/Ciul/angular-facebook
angular
    .module('photobookApp')
        .controller('FBController', function($scope, $timeout, Facebook) { /* @ngInject */

            $scope.user = {};

            $scope.logged = false;

            /**
             * Watch for Facebook to be ready.
             * There's also the event that could be used
             */
            $scope.$watch(
                function() {
                    return Facebook.isReady();
                },
                function(newVal) {
                    if (newVal) {
                        $scope.facebookReady = true;
                    }
                });

            // get initial login status
            Facebook.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    $scope.logged = true;
                    $scope.userWasAlreadyFBLogged = true;
                } else {
                    $scope.userWasAlreadyFBLogged = false;
                }
            });

            $scope.IntentLogin = function() {
                if (!$scope.logged) {
                    $scope.login();
                }
            };

            $scope.login = function() {
                Facebook.login(function(response) {
                    if (response.status === 'connected') {
                        $scope.logged = true;
                        $scope.me();
                    }
                });
            };

            $scope.me = function() {
                Facebook.api('/me', function(response) {
                    $scope.$apply(function() {
                        $scope.user = response;
                    });
                });
            };

            /**
             * Logout
             */
            $scope.logout = function() {
                Facebook.logout(function() {
                    $scope.$apply(function() {
                        $scope.user = {};
                        $scope.logged = false;
                    });
                });
            };
        });

angular
    .module('photobookApp')
        .directive('debug', function() {
            return {
                restrict: 'E',
                scope: {
                    expression: '=val'
                },
                template:   '<pre>{{debug(expression)}}</pre>',
                link:   function(scope) {
                    // pretty-prints
                    scope.debug = function(exp) {
                        return angular.toJson(exp, true);
                    };
                }
            };
        });

