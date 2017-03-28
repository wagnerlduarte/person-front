'use strict';

// require common
var common = require('./common.js');

/**
 * Implements inject task
 */
common.gulp.task('inject', () => {
    var styles = common.gulp.src(common.dirs.temporary.root.path + '/**/*.{scss,css,sass}', { read: false });
    var scripts = common.gulp.src(common.dirs.temporary.root.path + '/**/*.js')
        .pipe(common.$.angularFilesort());

    var wiredepConfig = {
        directory: 'bower_components',
        ignorePath: '..'
    };

    return common.gulp.src('app/index.html')
        .pipe(common.$.inject(styles, { ignorePath: '.tmp' }))
        .pipe(common.$.inject(scripts, { ignorePath: '.tmp' }))
        .pipe(common.wiredep(wiredepConfig))
        .pipe(common.gulp.dest('app'));
});
