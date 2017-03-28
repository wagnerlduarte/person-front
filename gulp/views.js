'use strict';

// require common
var common = require('./common.js');

/*
 * Implements view task
 */
common.gulp.task('views', () =>
    common.gulp.src(common.dirs.views.path)
        .pipe(common.gulp.dest(common.dirs.temporary.root.path))
        .pipe(common.gulp.dest(common.dirs.build.path))
);