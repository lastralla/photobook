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
