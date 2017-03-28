'use strict';

var common = require('./gulp/common.js');
var requireDir = require('require-dir');

/**
 *  This will load all files in the gulp directory
 *  in order to load all gulp tasks
 */
requireDir('./gulp');

/**
 * Clean task clean temporaries directories
 */
common.gulp.task('clean', () => common.del([common.dirs.temporary.root.path, 'dist/*', '!dist/.git'], {dot: true}));

/**
 * Bower task launch bower install
 */
common.gulp.task('bower', () => {
    return common.$.bower()
    .pipe(common.gulp.dest(common.dirs.bower.path));
});

/**
 *  Default launch development server
 */
common.gulp.task('default', function() {
    common.gulp.start(['server:development']);
});