// ===========================================================================
// gulpfile.js for Gulp 4.0
// ===========================================================================

var env = process.env.NODE_ENV || 'development';

var gulp 			= require('gulp');

var PATH = {
    assets:         './assets/',
    bower:          './bower_components/',
    sass:           './sass/',
    output:         './builds/development/'
};

if (env === 'production') {PATH.output = './builds/production/'}

var FILE = {
    index:          './assets/index.html'
};

var DEPENDENCIES = [
	PATH.bower + 'jquery/dist/jquery.js',
	PATH.bower + 'modernizr/modernizr.js'
];

var ASSETS = [
    PATH.assets + 'fonts/**/*webfont*',
    PATH.assets + 'html/**/*.html',
    PATH.assets + 'images/**/*',
    PATH.assets + 'js/pre/**/*.js',
    PATH.assets + 'js/post/**/*.js'
];

var BUILD = {
    // Folders
    css: 			PATH.output + 'css/',
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

var SASS = {
    // Framework, e.g. Bootstrap or Foundation
    framework: 		PATH.bower + 'bootstrap-sass-official/assets/stylesheets/',
    // Application
    root:           PATH.sass + 'app.scss',
    partials:       PATH.sass + '**/_*.scss'
};