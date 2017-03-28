'use strict';

// require common
var common = require('./common.js');

/**
 * Default task to build test environment
 */
common.gulp.task('build:test', ['bower', 'styles', 'styles:vendor', 'scripts', 'scripts:vendor', 'fonts', /*'images',*/ 'views', 'views:partial'], function() {
    // styles
    common.gulp.src(common.dirs.temporary.styles.path + '/**/*.{css,scss,sass}')
        .pipe(common.gulp.dest('dist/styles'));

    // build html
    common.gulp.src(common.dirs.temporary.path + '/*.html')
        .pipe(common.gulp.dest('dist'));

    // build shared html
    common.gulp.src(common.dirs.temporary.shared.path + '/**/*.html')
        .pipe(common.gulp.dest('dist/shared'));

    // build components html
    common.gulp.src(common.dirs.temporary.components.path + '/**/*.html')
        .pipe(common.gulp.dest('dist/components'));

    // build fonts
    common.gulp.src(common.dirs.temporary.fonts.path + '/**/*.{eot,svg,ttf,woff,woff2}')
        .pipe(common.gulp.dest('dist/fonts'));

    // build images
    common.gulp.src(common.dirs.temporary.images.path + '/**/*.{png,jpeg,jpg,gif,svg}')
        .pipe(common.gulp.dest('dist/images'));

    // build sounds
    common.gulp.src(common.dirs.temporary.sounds.path + '/**/*.{mp4,ogg}')
        .pipe(common.gulp.dest('dist/sounds'));

    // scripts
    common.gulp.src(common.dirs.temporary.scripts.path + '/**/*.js')
        .pipe(common.gulp.dest('dist/scripts'));
});

/**
 * Default task to build production environment
 */
common.gulp.task('build:production', (callback) =>
    common.runSequence('clean', 'bower', ['scripts', 'styles', 'views', 'images', 'fonts'], 'inject', () => {
          var jsFilter = common.$.filter(['**/*.js', '!/bower_components/'], { restore: true });
          var cssFilter = common.$.filter('**/*.css', { restore: true });
          var cssAndJsFilter = common.$.filter(['**/*.js', '**/*.css'], { restore: true });

          //copy index to dist
          var stream = common.gulp.src('app/index.html')
          .pipe(common.$.useref())
          .pipe(jsFilter)
          .pipe(common.$.uglify())             // Minify any javascript sources
          .pipe(jsFilter.restore)
          .pipe(cssFilter)
          .pipe(common.$.csso())               // Minify any CSS sources
          .pipe(cssFilter.restore)
          .pipe(cssAndJsFilter)
          .pipe(common.$.rev())                // Rename the concatenated files (but not index.html)
          .pipe(cssAndJsFilter.restore)
          .pipe(common.$.revReplace())
          .pipe(common.gulp.dest(common.dirs.build.path));

          stream.on('end', callback);
          stream.on('error', callback);
        }
    )
);

common.gulp.task('build:coverage', (callback) =>
    common.runSequence('clean', 'bower', ['scripts:coverage', 'styles', 'views', 'images:dev', 'fonts'], 'inject', () => {
          var jsFilter = common.$.filter(['**/*.js', '!/bower_components/'], { restore: true });
          var cssFilter = common.$.filter('**/*.css', { restore: true });
          var cssAndJsFilter = common.$.filter(['**/*.js', '**/*.css'], { restore: true });

//          callback();
          //copy index to dist
          var stream = common.gulp.src('app/index.html')
          .pipe(common.$.useref())
          .pipe(jsFilter)
          .pipe(jsFilter.restore)
          .pipe(cssFilter)
          .pipe(common.$.csso())               // Minify any CSS sources
          .pipe(cssFilter.restore)
          .pipe(cssAndJsFilter)
          .pipe(common.$.rev())                // Rename the concatenated files (but not index.html)
          .pipe(cssAndJsFilter.restore)
          .pipe(common.$.revReplace())
          .pipe(common.gulp.dest(common.dirs.build.path));

          stream.on('end', callback);
          stream.on('error', callback);
        }
    )
);