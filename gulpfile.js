// ===========================================================================
// gulpfile.js for Gulp 4.0
// ===========================================================================

var env = process.env.NODE_ENV || 'development';

var browsersync     = require('browser-sync'),
    del             = require('del'),
    gulp            = require('gulp'),
    merge           = require('merge-stream'),
    plugins         = require('gulp-load-plugins')()

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

var DEPENDENCIES = [ // order ist important
    PATH.bower + 'modernizr/modernizr.js',
    PATH.bower + 'jquery/dist/jquery.js',
    PATH.bower + 'bootstrap-sass/assets/javascripts/bootstrap.js'
];

var ASSETS = {
    fonts:         [PATH.assets + 'fonts/**/*.eot',
                    PATH.assets + 'fonts/**/*.svg',
                    PATH.assets + 'fonts/**/*.ttf',
                    PATH.assets + 'fonts/**/*.woff',
                    PATH.assets + 'fonts/**/*.woff2',],
    html:           PATH.assets + 'html/**/*.html',
    images:         PATH.assets + 'images/**/*',
    jsPre:          PATH.assets + 'js/pre/**/*.js',
    jsPost:         PATH.assets + 'js/post/**/*.js'
};

var BUILD = {
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

var SASS = {
    // Framework, e.g. Bootstrap or Foundation
    framework:      PATH.bower + 'bootstrap-sass/assets/stylesheets/',
    // Application
    root:           PATH.sass + 'app.scss',
    partials:       PATH.sass + '**/_*.scss'
};

// ---------------------------------------------------------------------------
// Error Helper
// ---------------------------------------------------------------------------

var onError = function(error) {
    plugins.notify.onError({
        icon:       false,
        title:      '<%= error.plugin %>',
        subtitle:   '<%= error.message %>',
        message:    '<%= error.fileName %>',
        sound:      'Purr'
    })(error);
    this.emit('end');
    console.log(
        ' \n======================================',
        ' \nPlugin:   ' + error.plugin,
        ' \nError:    ' + error.message,
        ' \nFilename: ' + error.fileName,
        ' \nLine:     ' + error.lineNumber,
        ' \n======================================\n'
    );
};

// ---------------------------------------------------------------------------
// lint-html5 - Cache and lint static HTML files
// ---------------------------------------------------------------------------

gulp.task('lint-html5', function() {

    var source = gulp.src(ASSETS, { base: PATH.assets + 'html' }); // you can pipe additional instances here
    var filterRule = ['**/*.html'];

    return source
        .pipe(plugins.filter(filterRule))
        .pipe(plugins.cached('lint-html5-cache'))
        .pipe(plugins.html5Lint())
    ;
});

// ---------------------------------------------------------------------------
// compile-sass - Compile Sass files and write CSS file to build directory [TESTED]
// ---------------------------------------------------------------------------

gulp.task('compile-sass', function() {

    var source = gulp.src(SASS.root); // you can pipe additional instances here
    var include = SASS.framework; // include paths to external sass files here, e.g. bootstrap or foundation
    var targetFile = BUILD.cssFile;
    var targetPath = BUILD.css;

    return source
        .pipe(plugins.plumber({ errorHandler: onError }))
        .pipe(plugins.if(env === 'development', plugins.sourcemaps.init()))
            .pipe(plugins.sass({includePaths: include})) 
            .pipe(plugins.rename(targetFile))
            .pipe(plugins.size({ title: 'CSS', showFiles: false }))
        .pipe(plugins.if(env === 'development', plugins.sourcemaps.write('.')))
        .pipe(gulp.dest(targetPath))
    ;
});

// ---------------------------------------------------------------------------
// copy-assets - Copy assets to build directory preserving paths [TESTED]
// ---------------------------------------------------------------------------

gulp.task('copy-assets', function () {

    var source = [gulp.src(ASSETS.fonts, { base: 'assets' }),
                  gulp.src(ASSETS.images, { base: 'assets' }),
                  gulp.src(ASSETS.jsPost, { base: 'assets' })];
    var targetPath = PATH.output;

    return merge(source)
        .pipe(plugins.changed(targetPath))
        .pipe(plugins.size({ title: 'Assets', showFiles: false }))
        .pipe(gulp.dest(targetPath))
    ;
});

// ---------------------------------------------------------------------------
// copy-dependencies - Copy dependencies to build directory preserving paths [TESTED]
// ---------------------------------------------------------------------------

gulp.task('copy-dependencies', function () {

    var source = gulp.src(DEPENDENCIES, { base: '.' });
    var targetPath = PATH.output;

    return source
        .pipe(plugins.changed(targetPath))
        .pipe(plugins.size({ title: 'Dependencies', showFiles: false }))
        .pipe(gulp.dest(targetPath))
    ;
});

// ---------------------------------------------------------------------------
// inject-index - Inject css and javascript file references into index.html [TESTED]
// ---------------------------------------------------------------------------

gulp.task('inject-index', function () {

    var sourceCssVendor = gulp.src(DEPENDENCIES, { read: false }).pipe(plugins.filter(['**/*.css']));
    var sourceCss       = gulp.src(BUILD.css + BUILD.cssFile, { read: false }); 
    var sourceJsPre     = gulp.src(DEPENDENCIES, { read: false }).pipe(plugins.filter(['modernizr.js']));
    var sourceJsVendor  = gulp.src(DEPENDENCIES, { read: false }).pipe(plugins.filter(['**/*.js', '!modernizr.js']));
    var sourceJs        = gulp.src(ASSETS.jsPost);

    var source = gulp.src(FILE.index); // index.html source file containing injection comments
    var targetPath = PATH.output; // target path where index.html file will be copied to
    
    if (env === 'development') {
    
        return source
            .pipe(plugins.changed(targetPath))
            .pipe(plugins.inject(sourceCssVendor, { name: 'vendor', relative: false, addRootSlash: false  }))
            .pipe(plugins.inject(sourceCss, { relative: true, ignorePath: '.' + PATH.output }))
            .pipe(plugins.inject(sourceJsPre, { name: 'pre', relative: false, addRootSlash: false  }))
            .pipe(plugins.inject(sourceJsVendor, { name: 'vendor', relative: false, addRootSlash: false }))
            .pipe(plugins.inject(sourceJs, { relative: false }))
            .pipe(gulp.dest(targetPath))
        ;
    }
});

// ---------------------------------------------------------------------------
// inject-pages - Inject css and javascript file references into index.html [TESTED]
// ---------------------------------------------------------------------------

gulp.task('inject-pages', function () {

    var sourceCssVendor = gulp.src(DEPENDENCIES, { read: false }).pipe(plugins.filter(['**/*.css']));
    var sourceCss       = gulp.src(BUILD.css + BUILD.cssFile, { read: false }); 
    var sourceJsPre     = gulp.src(DEPENDENCIES, { read: false }).pipe(plugins.filter(['modernizr.js']));
    var sourceJsVendor  = gulp.src(DEPENDENCIES, { read: false }).pipe(plugins.filter(['**/*.js', '!modernizr.js']));
    var sourceJs        = gulp.src(ASSETS.jsPost);

    var source = gulp.src(ASSETS.html); // html source files containing injection comments
    var targetPath = BUILD.html; // target path where html files will be copied to

    if (env === 'development') {
    
        return source
            .pipe(plugins.changed(targetPath))
            .pipe(plugins.inject(sourceCssVendor, { name: 'vendor', relative: true, ignorePath: '../' }))
            .pipe(plugins.inject(sourceCss, { relative: false, ignorePath: 'builds/development/', addRootSlash: false, addPrefix: '..' }))
            .pipe(plugins.inject(sourceJsPre, { name: 'pre', relative: true, ignorePath: '../' }))
            .pipe(plugins.inject(sourceJsVendor, { name: 'vendor', relative: true, ignorePath: '../' }))
            .pipe(plugins.inject(sourceJs, { relative: true }))
            .pipe(gulp.dest(targetPath))
        ;
    }
});

// ---------------------------------------------------------------------------
// BrowserSync - Static server and synchronised browsers [TESTED]
// ---------------------------------------------------------------------------

gulp.task('browsersync', function(callback) {

    return browsersync({
        server: {
            baseDir: PATH.output,
            middleware: []
        },
        online: false, // reduce start-up time by setting this option to false
        notify: false
    }, callback);
});

// ---------------------------------------------------------------------------
// observe - Watch for changes and rerun dedicated tasks [TESTED]
// ---------------------------------------------------------------------------

gulp.task('observe', function() {
    gulp.watch(FILE.index, gulp.series('inject-index', browsersync.reload));
    gulp.watch(ASSETS.html, gulp.series('inject-pages', browsersync.reload));
    gulp.watch([SASS.root, SASS.partials], gulp.series('compile-sass', browsersync.reload));
    gulp.watch([ASSETS.jsPre, ASSETS.jsPost], gulp.series('copy-assets', browsersync.reload));
    gulp.watch(ASSETS.fonts, gulp.series('copy-assets', browsersync.reload));
    gulp.watch(ASSETS.images, gulp.series('copy-assets', browsersync.reload));
});

// ---------------------------------------------------------------------------
// clean - Delete current build directory (development/production) [TESTED]
// ---------------------------------------------------------------------------

gulp.task('clean', function(callback) {
    del(PATH.output + '*', callback);
});

// ---------------------------------------------------------------------------
// build - Clean build directory, install packages and process files
// ---------------------------------------------------------------------------

gulp.task('build', gulp.series('clean', gulp.parallel('compile-sass', 'copy-assets', 'copy-dependencies'), gulp.parallel('inject-index', 'inject-pages')));

// ---------------------------------------------------------------------------
// watch - Watch for changes and sync browsers
// ---------------------------------------------------------------------------

gulp.task('watch', gulp.series('browsersync', 'observe'));

// ---------------------------------------------------------------------------
// Default task
// ---------------------------------------------------------------------------

gulp.task('default', gulp.series('build', 'watch'));
