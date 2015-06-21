(function() {
    'use strict';

    // originally from https://github.com/Ciul/angular-facebook
    angular
        .module('pb.facebook')
            .controller('pb.facebook.LoginCtrl',
                function($rootScope, $scope, $timeout, Facebook, FacebookService) { /* @ngInject */
                $rootScope.user = {};

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

                $scope.IntentLogin = function() {
                    if (!$scope.logged) {
                        $scope.login();
                    }
                };

                $scope.login = function() {
                    FacebookService.doLogin().then(function(userObj) {
                        $scope.logged = true;
                        $rootScope.user = userObj;
                    });
                };

                $scope.logout = function() {
                    FacebookService.doLogout().then(function(emptyUserObj) {
                        $scope.logged = false;
                        $rootScope.user = emptyUserObj;
                    });
                    $rootScope.user = FacebookService.doLogout(); // promise
                };

                $scope.me = function() {
                    FacebookService.me().then(function(userObj) {
                        $rootScope.user = userObj;
                    });
                };

                $scope.getPhotoAlbums = function() {
                    FacebookService.getPhotoAlbums().then(function(albums) {
                        $scope.albums =  albums;
                    });
                };

                /**
                 * get initial login status
                 */
                FacebookService.isLogged().then(function(isLogged) {
                    if (isLogged) {
                        $scope.logged = true;
                        $scope.me();
                    } else {
                        $scope.logged = false;
                    }
                });
            });
})();
