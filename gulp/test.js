'use strict';

// require common
var common = require('./common.js');
var through = require('through2');
var istanbul = require('istanbul');
var fs = require('fs');
var gprotractor = common.$.protractor;
// The protractor task
var gulpProtractorAngular = common.$.angularProtractor;
//var protractor = gprotractor.protractor;
// Start a standalone server
var webdriver_standalone = gprotractor.webdriver_standalone;
// Download and update the selenium driver
var webdriver_update = gprotractor.webdriver_update;
// Downloads the selenium webdriver
common.gulp.task('webdriver_update', webdriver_update);
// Start the standalone selenium server
// NOTE: This is not needed if you reference the
// seleniumServerJar in your protractor.conf.js
common.gulp.task('webdriver_standalone', webdriver_standalone);

var protractorRunner = function(done, autoStart){
    common.gulp.src(["./test/e2e/*.js"])
        .pipe(gulpProtractorAngular({
            'configFile': "./test/protractor.config.js",
            'debug': false,
            'autoStartStopServer': autoStart,
            'verbose': true
        }))
        .on('error', function(e) {
            console.log(e);
            done(e);
        })
        .on('end', function(){
            done();
        });
}

common.gulp.task('test:e2e', ['webdriver_update'], function(done) {
    
    common.runSequence('build:coverage', function() {
        
        common.browserSync.init({
            server: {
              baseDir: 'dist',
              routes: {
                '/assets': '/assets',
                '/components': '/components',
                '/shared': '/shared',
                '/scripts': '/scripts'
              }
            },
            port: 9000,
            open: false,
            ghostMode: false
        }, function(){
            
            protractorRunner(function(e){
                
                var collector = new istanbul.Collector();
                var reporter = new istanbul.Reporter(null, './test/build/reports/e2e');
                
                common.gulp.src('./test/build/coverage/*.json')
                        .pipe(through.obj(function (file, enc, callback) {
                            collector.add(JSON.parse(fs.readFileSync(file.path, 'utf8')));
                            return callback();
                        }))
                        .on('data', function(){})
                        .on('end', function () {
                            reporter.addAll([ 'text', 'text-summary', 'lcov', 'html' ]);
                            reporter.write(collector, false, function(e){
                                done();
                                common.browserSync.exit();
                            });
                        })
                        .on('error', function (e) {
                            console.log('error', e);
                        });


                
            }, true);
        });
    });
    
    
});

common.gulp.task('test:e2e-simple', ['webdriver_update'], function(done) {
    protractorRunner(done, false);
});