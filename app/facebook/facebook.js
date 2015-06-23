/* globals FB, apikey */
(function() {
    'use strict';

    angular
        .module('pb.facebook')
        .service('FacebookService', function($q, Facebook) { /* @ngInject */

            var user;
            var authToken;

            var FacebookService = {
                isLogged: function() {
                    return $q(function(resolve) {
                        Facebook.getLoginStatus(function(response) {
                            if (response.status === 'connected') {
                                // set access token
                                authToken = response.authResponse.accessToken;

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
                                // set access token
                                authToken = response.authResponse.accessToken;

                                resolve(FacebookService.me());
                            }
                        }, {
                            /* jshint ignore:start */
                            /* jscs:disable */
                            scope: 'publish_actions',
                            return_scopes: true
                            /* jscs:enable */
                            /* jshint ignore:end */
                        });
                    });
                },

                doLogout: function() {
                    return $q(function(resolve) {
                        Facebook.logout(function(response) {
                            user = {};
                            resolve(user);
                        });
                    });
                },

                me: function() {
                    return $q(function(resolve) {
                        Facebook.api('/me', function(userObj) {
                            user = userObj;
                            resolve(user);
                        });
                    });
                },

                getPhotoAlbums: function() {
                    if (!user) {
                        throw 'No user';
                    }

                    return $q(function(resolve) {
                        Facebook.api('/' + user.id + '/albums',
                            function(response) {
                                if (response && !response.error) {
                                    resolve(response.data);
                                }
                            }
                        );
                    });
                },

                postPhoto: function(fileName, photoData, message, albumId) {
                    return $q(function(resolve, reject) {
                        postImageToFacebook(fileName, 'image/png', photoData, message, albumId)
                            .then(function(response) {
                                resolve(response);
                            }, function(response) {
                                reject(response);
                            });
                    });
                }
            };

            return FacebookService;

            // This function takes an array of bytes that are the actual contents of the image file.
            // In other words, if you were to look at the contents of imageData as characters, they'd
            // look like the contents of a PNG or GIF or what have you.  For instance, you might use
            // pnglib.js to generate a PNG and then upload it to Facebook, all from the client.
            //
            // Arguments:
            //   filename - the filename you'd like the uploaded file to have
            //   mimeType - the mime type of the file, eg: image/png
            //   imageData - an array of bytes containing the image file contents
            //   message - an optional message you'd like associated with the image

            function postImageToFacebook(filename, mimeType,
                imageData, message, albumId) {

                return $q(function(resolve, reject) {

                    /* jshint ignore:start */
                    /* jscs:disable */
                    // this is the multipart/form-data boundary we'll use
                    var boundary = '----ThisIsTheBoundary1234567890';

                    if (!albumId) {
                        albumId = "me";
                    }

                    // let's encode our image file, which is contained in the var
                    var formData = '--' + boundary + '\r\n';
                    formData += 'Content-Disposition: form-data; name="source"; filename="' + filename + '"\r\n';
                    formData += 'Content-Type: ' + mimeType + '\r\n\r\n';

                    for ( var i = 0; i < imageData.length; ++i ) {
                        formData += String.fromCharCode( imageData[ i ] & 0xff );
                    }

                    formData += '\r\n';
                    formData += '--' + boundary + '\r\n';
                    formData += 'Content-Disposition: form-data; name="message"\r\n\r\n';
                    formData += message + '\r\n';
                    formData += '--' + boundary + '--\r\n';

                    var xhr = new XMLHttpRequest();
                    var fbUrl = 'https://graph.facebook.com/v2.3/' + albumId + '/photos?access_token=' + authToken;

                    xhr.open( 'POST', fbUrl, true );
                    xhr.onload = function() {
                        if (xhr.status == 200) {
                            resolve(xhr.response);
                        } else {
                            reject(xhr.response);
                        }

                    };

                    xhr.setRequestHeader( "Content-Type", "multipart/form-data; boundary=" + boundary );
                    xhr.sendAsBinary( formData );

                    /* jscs:enable */
                    /* jshint ignore:end */
                });
            }

        });
})();
