'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };

    var keys = grunt.file.readJSON('keys.json');

    require('load-grunt-tasks')(grunt);

    require('time-grunt')(grunt);

    grunt.initConfig({

        conf: appConfig,

        watch: {
            bower: {
                files: [
                    'bower.json'
                ],
                tasks: [
                    'wiredep'
                ]
            },
            js: {
                files: [
                    '<%= conf.app %>/{,*/}*.js'
                ],
                tasks: [
                    'newer:jshint:all',
                    'newer:jscs'
                ],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: [
                    'test/spec/{,*/}*.js'
                ],
                tasks: [
                    'newer:jshint:test',
                    'karma'
                ]
            },
            compass: {
                files: [
                    '<%= conf.app %>/{,*/}*.scss'
                ],
                tasks: [
                    'compass:server'
                ]
            },
            gruntfile: {
                files: [
                    'Gruntfile.js'
                ],
                tasks: [
                    'newer:jshint:all',
                    'newer:jscs'
                ]
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= conf.app %>/{,*/}*.html',
                    '.tmp/{,*/}*.css',
                    '<%= conf.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= conf.dist %>'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= conf.app %>/{,*/}*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: [
                    'test/spec/{,*/}*.js'
                ]
            }
        },

        jscs: {
            src: [
                'Gruntfile.js',
                '<%= conf.app %>/{,*/}*.js'
            ],
            options: {
                config: '.jscsrc',
                esnext: true,
                verbose: true
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= conf.dist %>/{,*/}*',
                        '!<%= conf.dist %>/.git{,*/}*'
                    ]
                }]
            },
            server: '.tmp'
            // ,
            // fresh: [
            //     '.tmp',
            //     '.sass-cache',
            //     'bower_components',
            //     'dist',
            //     'node_modules',
            // ]
        },

        wiredep: {
            app: {
                src: [
                    '<%= conf.app %>/index.html'
                ],
                ignorePath:  /\.\.\//
            },
            sass: {
                src: [
                    '<%= conf.app %>/{,*/}*.scss'
                ],
                ignorePath: /(\.\.\/){1,2}bower_components\//
            }
        },

        replace: {
            dist: {
                options: {
                    patterns: [{
                        match: 'facebookkey',
                        replacement: keys.prod.facebook
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: [
                        'app/index.html'
                    ],
                    dest: 'dist/'
                }]
            }
        },

        compass: {
            options: {
                sassDir: '<%= conf.app %>/',
                cssDir: '.tmp/app/',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= conf.app %>/images',
                javascriptsDir: '<%= conf.app %>',
                fontsDir: '<%= conf.app %>/common/fonts',
                importPath: './bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/common/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= conf.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        filerev: {
            dist: {
                src: [
                    '<%= conf.dist %>/**/*.js',
                    '<%= conf.dist %>/**/*.css',
                    '<%= conf.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= conf.dist %>/common/fonts/*'
                ]
            }
        },

        useminPrepare: {
            html: '<%= conf.app %>/index.html',
            options: {
                dest: '<%= conf.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: [
                                'concat',
                                'uglifyjs'
                            ]
                        },
                        post: {}
                    }
                }
            }
        },

        usemin: {
            html: [
                '<%= conf.dist %>/{,*/}*.html'
            ],
            css: [
                '<%= conf.dist %>/{,*/}*.css'
            ],
            options: {
                assetsDirs: [
                    '<%= conf.dist %>',
                    '<%= conf.dist %>/images'
                ]
            }
        },

        cssmin: {
            dist: {
                files: {
                    '<%= conf.dist %>/app/common/common.css': [
                        '.tmp/**/*.css'
                    ]
                }
            }
        },

        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/app',
                    src: [
                        '*.js',
                        '!oldieshim.js'
                    ],
                    dest: '.tmp/concat/app'
                }]
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= conf.app %>',
                    dest: '<%= conf.dist %>/app',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '**/*.html',
                        'app/{,*/}*.{webp}',
                        'fonts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= conf.dist %>/images',
                    src: [
                        'generated/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.',
                    src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
                    dest: '<%= conf.dist %>'
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= conf.app %>',
                dest: '.tmp/',
                src: '{,*/}*.css'
            }
        },

        concurrent: {
            server: [
                'compass:server'
            ],
            test: [
                'compass'
            ],
            dist: [
                'compass:dist'
            ]
        },

        karma: {
            unit: {
                configFile: 'test/karma.conf.js',
                singleRun: true
            }
        }
    });

    grunt.registerTask('mintest', [
        'useminPrepare',
        'usemin'
    ]);

    grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'wiredep',
            'concurrent:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'replace:dist',
        'useminPrepare',
        'concurrent:dist',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'newer:jscs',
        'test',
        'build'
    ]);
};
