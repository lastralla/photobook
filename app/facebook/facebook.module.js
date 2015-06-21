/* globals apikey */

(function() {
    'use strict';

    angular
        .module('pb.facebook', [
            'facebook'
        ])
        .config(function(FacebookProvider) { /* @ngInject */
            var myAppId = apikey;
            FacebookProvider.init(myAppId);
        });

    angular
        .module('pb.facebook')
            .directive('debug', function() {
                return {
                    restrict: 'E',
                    scope: {
                        expression: '=val'
                    },
                    template: '<pre>{{debug(expression)}}</pre>',
                    link: function(scope) {
                        // pretty-prints
                        scope.debug = function(exp) {
                            return angular.toJson(exp, true);
                        };
                    }
                };
            });
})();
