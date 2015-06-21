/* globals $ */

(function() {
    'use strict';

    angular
        .module('pb.facebook')
            .directive('pbUploader', function(Utils, FacebookService) { /* @ngInject */
                return {
                    restrict: 'E',
                    scope: {
                        album: '=',
                        desc: '='
                    },
                    templateUrl: '/uploader/pb.uploader.html',
                    link: function(scope) {
                        $('#uploader').change(function(e) {
                            var reader;
                            var fileName;

                            if (this.files && this.files[0]) {
                                // TODO strip file ext from fileName and put png instead
                                fileName = this.files[0].name;
                                reader = new FileReader();

                                // Prepare image preview
                                reader.onload = function(evt) {
                                    var img = document.getElementById('uploadImage');
                                    $(img).attr('src', evt.target.result);
                                };
                                reader.readAsDataURL(this.files[0]);

                                // Decode data for Facebook post
                                Utils
                                    .decodeImageAsBase64(this.files[0])
                                    .then(function(decodedFile) {
                                        FacebookService.preparePhotoPost(fileName, decodedFile,
                                            scope.desc, scope.album);
                                    });
                            }

                        });
                    }
                };
            });
})();
