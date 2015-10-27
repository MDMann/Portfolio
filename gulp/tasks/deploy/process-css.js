'use strict';

// ---------------------------------------------------------------------------
// process-css - Process styles: autoprefix, minify, concat and gzip
// ---------------------------------------------------------------------------

gulp.task('process-css', function() {

    var vendor = gulp.src(DEPENDENCIES)
        .pipe(plugins.filter(['**/*.css']))
    ;

    var application = gulp.src(BUILD.css + BUILD.cssFile)
        .pipe(plugins.autoprefixer())
    ;

    var targetFile = BUILD.cssFile;
    var targetPath = BUILD.css;

    // ---------------------------------------------------------------------------
    // onError - Error helper function
    // ---------------------------------------------------------------------------

    function onError(error) {
        plugins.notify.onError({
            icon: false,
            title: 'Error executing <%= error.plugin %>',
            message: 'Check your terminal.',
            sound: 'Purr'
        })(error);
        plugins.util.log(plugins.util.colors.red(
            'Error executing ' + error.plugin + ':',
            ' \n' + error.message
        ));

        this.emit('end');
    };

    // ---------------------------------------------------------------------------

    return series(vendor, application) // process streams in series
        .pipe(plugins.plumber({ errorHandler: onError }))
        .pipe(plugins.minifyCss())
        .pipe(plugins.concat(targetFile))
        .pipe(gulp.dest(targetPath))
        .pipe(plugins.gzip())
        .pipe(gulp.dest(targetPath))
    ;
});
