(function() {
    'use strict';

    // originally from https://github.com/Ciul/angular-facebook
    angular
        .module('pb.facebook')
            .controller('pb.facebook.LoginCtrl', function($rootScope, $scope, $timeout, Facebook) { /* @ngInject */

                $rootScope.user = {};

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
                            $rootScope.user = response;
                        });
                    });
                };

                /**
                 * Logout
                 */
                $scope.logout = function() {
                    Facebook.logout(function() {
                        $scope.$apply(function() {
                            $rootScope.user = {};
                            $scope.logged = false;
                        });
                    });
                };
            });
})();
