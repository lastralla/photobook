(function() {
    'use strict';

    angular
        .module('pb.common', []);

    /**
     * @ngdoc function
     * @name pb.common.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the photobookApp
     */
    angular
        .module('pb.common', [])
            .controller('pb.common.MainCtrl', function($scope) { /* @ngInject */
                // temp, this is just to show Karma is working. not writing any test for demo
                $scope.awesomeThings = [
                    'HTML5 Boilerplate',
                    'AngularJS',
                    'Karma'
                ];
            });
})();
