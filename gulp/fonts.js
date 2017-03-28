'use strict';

// require common
var common = require('./common.js');

/**
 * Implements fonts task
 */
common.gulp.task('fonts', ()  => 
    common.gulp.src(common.dirs.fonts.path)
        .pipe(common.gulp.dest(common.dirs.temporary.root.path))
        .pipe(common.gulp.dest(common.dirs.build.path))
);