'use strict';

// export common require
exports.gulp             = require('gulp');
exports.$                = require('gulp-load-plugins')();
exports.runSequence      = require('run-sequence');
exports.del              = require('del');
exports.wiredep          = require('wiredep').stream;
exports.browserSync      = require('browser-sync').create();
exports.reload           = this.browserSync.reload;
exports.autoprefixer     = require('autoprefixer');

// export common dirs
exports.dirs = {
    scripts: {
        path: ['app/**/*.js', 'app/**/*.json']
    },
    styles: {
        path: 'app/**/*.{scss,css,sass}'
    },
    fonts: {
        path:  'app/**/*.{eot,svg,ttf,woff,woff2}'
    },
    images: {
        path: 'app/**/*.{png,jpeg,jpg,gif,svg,ico}'
    },
    views: {
        path:  'app/**/*.html'
    },
    vendor: {
        scripts: {
            path: 'bower_components/**/*.js'
        },
        styles: {
            path: 'bower_components/**/*.{scss,css,sass}'
        }
    },
    bower: {
        path: 'bower_components'
    },
    build: {
        path: 'dist'
    },
    temporary: {
        root: {
            path: '.tmp'
        },
        vendor: {
            path: '.tmp/bower_components'
        }
    }
};
