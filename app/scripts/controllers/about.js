'use strict';

/**
 * @ngdoc function
 * @name photobookApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the photobookApp
 */
angular
    .module('photobookApp')
    .controller('AboutCtrl', function($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });
