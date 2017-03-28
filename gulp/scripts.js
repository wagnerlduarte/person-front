'use strict';

// require common
var common = require('./common.js');

/*
 * Implements javascript
 */
common.gulp.task('scripts', () =>
    common.gulp.src(common.dirs.scripts.path)
        .pipe(common.$.newer(common.dirs.temporary.root.path))
        .pipe(common.gulp.dest(common.dirs.temporary.root.path))
);

common.gulp.task('scripts:coverage', () =>
    common.gulp.src(common.dirs.scripts.path)
        .pipe(common.$.istanbul({coverageVariable: '__coverage__'}))
        .pipe(common.$.newer(common.dirs.temporary.root.path))
        .pipe(common.gulp.dest(common.dirs.temporary.root.path))
);

/*
 * Implements javascript vendor
 */
common.gulp.task('scripts:vendor', function() {
    return common.gulp.src(common.dirs.vendor.scripts)
        .pipe(common.gulp.dest(common.dirs.temporary.vendor))
        .pipe(common.$.connect.reload());
});

/*
 * Implements javascript jshint
 */
common.gulp.task('scripts:hint', function() {
    return common.gulp.src(common.dirs.scripts)
        .pipe(common.$.jshint())
        .pipe(common.$.jshint.reporter('default'))
        .pipe(common.$.connect.reload());
});