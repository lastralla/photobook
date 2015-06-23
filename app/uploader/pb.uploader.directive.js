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
                            var img;

                            if (this.files && this.files[0]) {
                                // TODO strip file ext from fileName and put png instead
                                fileName = this.files[0].name;
                                reader = new FileReader();
                                img = document.getElementById('uploadImage');

                                // Prepare image preview
                                reader.onload = function(evt) {
                                    $(img).attr('src', evt.target.result);
                                    $(img).attr('style', 'max-width:300px;width:100%;'); // temp hack
                                };
                                reader.readAsDataURL(this.files[0]);

                                // Decode data for Facebook post
                                Utils
                                    .decodeImageAsBase64(this.files[0])
                                        .then(function(decodedFile) {
                                            FacebookService.postPhoto(fileName, decodedFile,
                                                scope.desc, scope.album)
                                            .then(function(response) {
                                                scope.statusMessage = 'Photo uploaded!';

                                                scope.filepicker = undefined;
                                                scope.desc = '';
                                                scope.album = '';
                                                $(img).removeAttr('src');
                                                $(img).removeAttr('style');
                                            }, function(response) {
                                                scope.statusMessage = 'There was an error.';

                                                // TODO remove duplicate code
                                                scope.filepicker = undefined;
                                                scope.desc = '';
                                                scope.album = '';
                                                $(img).removeAttr('src');
                                                $(img).removeAttr('style');
                                            });
                                        })
                                        .then(function() {
                                            scope.statusMessage = 'Uploading photo...';
                                        });
                                // TODO: prepare post but prompt user before posting
                                // http://stackoverflow.com/questions/4999024/facebook-graph-api-upload-photo-using-javascript
                            }

                        });
                    }
                };
            });
})();
