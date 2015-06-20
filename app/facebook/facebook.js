(function() {
    'use strict';

    angular
        .module('pb.facebook')
        .service('FBUserService', function($q, Facebook) { /* @ngInject */
            var FBUserService = {
                isLogged: function() {
                    return $q(function(resolve) {
                        Facebook.getLoginStatus(function(response) {
                            if (response.status === 'connected') {
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        });
                    });
                },

                doLogin: function() {
                    return $q(function(resolve) {
                        Facebook.login(function(response) {
                            if (response.status === 'connected') {
                                resolve(FBUserService.me());
                            }
                        });
                    });
                },

                doLogout: function() {
                    return $q(function(resolve) {
                        Facebook.logout(function(response) {
                            resolve({});
                        });
                    });
                },

                me: function() {
                    return $q(function(resolve) {
                        Facebook.api('/me', function(userObj) {
                            resolve(userObj);
                        });
                    });
                }
            };

            return FBUserService;
        });
})();
