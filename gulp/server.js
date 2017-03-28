'use strict';

// require common
var common = require('./common.js');

/**
 * Implements development server
 */
common.gulp.task('server:development', function() {
    common.runSequence('clean', 'bower', ['scripts', 'styles', 'images:dev', 'views', 'fonts'], 'inject', 'watch', function() {
        common.browserSync.init({
            server: {
                baseDir: ['app', '.tmp', 'bower_components'],
                routes: {
                    '/bower_components': 'bower_components/',
                    '/assets': '.tmp/assets',
                    '/assets/**/*.css': '.tmp/assets',
                    '/components': '.tmp/components',
                    '/shared': '.tmp/shared'
                }
            },
            port: 9000
        });
    });
});

common.gulp.task('server:build', function() {
    common.runSequence('build:production', function() {
        common.browserSync.init({
            server: {
              baseDir: 'dist',
              routes: {
                '/assets': '/assets',
                '/components': '/components',
                '/shared': '/shared',
                '/scripts': '/scripts'
              }
            },
            port: 9000
        });
    });
});
