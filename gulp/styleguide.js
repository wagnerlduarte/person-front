'use strict';

// require common
var common = require('./common.js');

/*
 * Implements SASS Compile
 */
// Compile and automatically prefix stylesheets
common.gulp.task('styles:styleguide', () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  return common.gulp.src(common.dirs.styleguide.styles.path)
    .pipe(common.$.sourcemaps.init())
    .pipe(common.$.newer(common.dirs.temporary.root.path))
    .pipe(common.$.sass.sync({
      outputStyle: 'expanded',
      precision: 10
    }).on('error', common.$.sass.logError))
    .pipe(common.$.postcss([common.autoprefixer(AUTOPREFIXER_BROWSERS)]))
    .pipe(common.$.sourcemaps.write('.'))
    .pipe(common.gulp.dest(common.dirs.styleguide.destination.path))
    // Concatenate and minify styles
    // .pipe($.if('*.css', $.cssnano()))
    // .pipe($.size({title: 'styles'}))
    // .pipe($.sourcemaps.write('./'))
    // .pipe(gulp.dest('dist/styles'))
    // .pipe(gulp.dest('.tmp/styles'));
});