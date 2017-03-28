'use strict';

// require common
var common = require('./common.js');

/**
 * Implements images task
 */
common.gulp.task('images', () =>
    common.gulp.src(common.dirs.images.path)
        .pipe(common.$.imagemin({ optimizationLevel: 7, progressive: true }))
        .pipe(common.gulp.dest(common.dirs.temporary.root.path))
        .pipe(common.gulp.dest(common.dirs.build.path))
);

common.gulp.task('images:dev', () =>
    common.gulp.src(common.dirs.images.path)
        .pipe(common.gulp.dest(common.dirs.temporary.root.path))
        .pipe(common.gulp.dest(common.dirs.build.path))
);