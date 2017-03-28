'use strict';

// require common
var common = require('./common.js');

/**
 * Default task to deploy
 */
common.gulp.task('deploy:test', function() {
    // define machines
    var machines = ['gpaservice', 'user'];

    // iterate over machines
    for (m = 0; m <= machines.length; m++) {
        common.gulp.src('dist')
            .pipe(common.$.rsync({
                root: 'dist',
                hostname: machines[m],
                incremental: true,
                progress: true,
                recursive: true,
                destination: '/opt'
            }));
    };
});