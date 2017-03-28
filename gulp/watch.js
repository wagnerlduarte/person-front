'use strict';

// require common
var common = require('./common.js');

/*
 * Implements watch task
 */
common.gulp.task('watch', function() {
    common.gulp.watch(common.dirs.scripts.path, ()                  => common.runSequence('scripts', 'inject', common.reload));
    common.gulp.watch(common.dirs.styles.path, ()                   => common.runSequence('styles', 'inject', common.reload));
    common.gulp.watch([common.dirs.views.path, '!app/index.html'], ()   => common.runSequence('views', 'inject', common.reload));
});