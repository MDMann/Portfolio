// ===========================================================================
// gulpfile.js for Gulp 4.0
// ===========================================================================

env             = process.env.NODE_ENV || 'unprocessed';

browsersync     = require('browser-sync');
del             = require('del');
gulp            = require('gulp');
plugins         = require('gulp-load-plugins')();
series          = require('stream-series');

PATH = {
    assets:         './assets/',
    bower:          './bower_components/',
    sass:           './sass/',
    output:         './builds/unprocessed/'
};

if (env === 'processed') {PATH.output = './builds/processed/'}

FILE = {
    index:          './assets/index.html'
};

DEPENDENCIES = [ // order ist important
    PATH.bower + 'modernizr/modernizr.js',
    PATH.bower + 'jquery/dist/jquery.js',
    PATH.bower + 'bootstrap-sass/assets/javascripts/bootstrap.js'
];

ASSETS = {
    fonts:          [
                    PATH.assets + 'fonts/**/*.eot',
                    PATH.assets + 'fonts/**/*.svg',
                    PATH.assets + 'fonts/**/*.ttf',
                    PATH.assets + 'fonts/**/*.woff',
                    PATH.assets + 'fonts/**/*.woff2'
                    ],
    html:           PATH.assets + 'html/**/*.html',
    images:         [
                    PATH.assets + 'images/**/*.png',
                    PATH.assets + 'images/**/*.jpg',
                    PATH.assets + 'images/**/*.gif',
                    PATH.assets + 'images/**/*.ico'
                    ],
    jsPre:          PATH.assets + 'js/pre/**/*.js',
    jsPost:         PATH.assets + 'js/post/**/*.js'
};

BUILD = {
    // Folders
    css:            PATH.output + 'css/',
    fonts:          PATH.output + 'fonts/',
    html:           PATH.output + 'html',
    images:         PATH.output + 'images/',
    js:             PATH.output + 'js/',
    // Files
    cssFileVendor:  'vendor.css',
    cssFile:        'app.css',
    jsFilePre:      'pre.js',
    jsFileVendor:   'vendor.js',
    jsFile:         'app.js'
};

SASS = {
    // Framework, e.g. Bootstrap or Foundation
    framework:      PATH.bower + 'bootstrap-sass/assets/stylesheets/',
    // Application
    root:           PATH.sass + 'app.scss',
    partials:       PATH.sass + '**/_*.scss'
};

// ---------------------------------------------------------------------------
// Require gulp tasks for definied environments
// ---------------------------------------------------------------------------

if (env === 'unprocessed') {var requireDir  = require('require-dir')('./gulp/tasks/unprocessed', { recurse: true });}
if (env === 'processed') {var requireDir  = require('require-dir')('./gulp/tasks/processed', { recurse: true });}

// ---------------------------------------------------------------------------
// build - Clean build directory, install packages and process files
// ---------------------------------------------------------------------------

gulp.task('build', gulp.series('clean', gulp.parallel('compile-sass', 'process-js', 'copy-assets')));

// ---------------------------------------------------------------------------
// watch - Watch for changes and sync browsers
// ---------------------------------------------------------------------------

gulp.task('watch', gulp.series('browsersync', 'observe'));

// ---------------------------------------------------------------------------
// Default task
// ---------------------------------------------------------------------------

gulp.task('default', gulp.series('build', 'watch'));
