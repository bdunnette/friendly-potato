var gulp = require('gulp'),
    foreach = require('gulp-foreach'),
    browserSync = require('browser-sync'),
    couchapp = require('gulp-couchapp'),
    install = require("gulp-install"),
    ensure = require('couchdb-ensure'),
    push = require('couchdb-push'),
    map = require('map-stream');

var couchappOptions = {
    attachments: 'app'
        // host: '127.0.0.1'
        // port: '5984'
        // auth:{username:admin, password:admin}
};

var dbHost = 'http://127.0.0.1:5984/';
var dbName = 'fgtc';

var pushDoc = function(file, cb) {
    push(dbHost + dbName, file.path, function(err, resp) {
        cb(err, resp);
    });
}

gulp.task('fixtures', function() {
    var fixtures = gulp.src('fixtures/*.json', {
        read: false
    });
    fixtures.pipe(map(pushDoc));
});

gulp.task('install', function() {
    return gulp.src(['./bower.json', './package.json'])
        .pipe(install());
});

gulp.task('push', function() {
    // ensure db exists before pushing to it
    ensure(dbHost + dbName, function(error, response) {
        return gulp.src('couchapp.js')
            .pipe(couchapp.push(dbName, couchappOptions));
    });
});

gulp.task('browser-sync', function() {

    // for more browser-sync config options: http://www.browsersync.io/docs/options/
    browserSync({

        // informs browser-sync to proxy our expressjs app which would run at the following location
        proxy: dbHost + dbName + '/_design/register/_rewrite',

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

gulp.task('default', ['install', 'push', 'browser-sync'], function() {
    gulp.watch(['couchapp.js', 'app/**'], ['push', 'bs-reload']);
});
