var gulp = require('gulp'),
browserSync = require('browser-sync'),
couchapp = require('gulp-couchapp');

var couchappOptions = {
  attachments:'app'
  // auth:{username:admin, password:admin}
};

var dbName = 'fgtc';

gulp.task('push', function () {
  return gulp.src('couchapp.js')
    .pipe(couchapp.push(dbName, couchappOptions));
});

gulp.task('browser-sync', function() {

  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync({

    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://127.0.0.1:5984/' + dbName + '/_design/register/_rewrite',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,

    // open the proxied app in chrome
    //browser: ['google-chrome']
  });
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

gulp.task('default', ['push', 'browser-sync'], function() {
  gulp.watch(['couchapp.js','app/**/*.html','app/**/*.js','app/**/*.css'], ['push', 'bs-reload']);
});
