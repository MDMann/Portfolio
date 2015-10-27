'use strict';

// ---------------------------------------------------------------------------
// process-markup - Collect static HTML files, process and copy to target
// ---------------------------------------------------------------------------

gulp.task('process-markup', function() {

    var assets = gulp.src(ASSETS.html) 
        .pipe(plugins.minifyHtml())
        .pipe(plugins.prettify())
        .pipe(gulp.dest(BUILD.html))
    ;

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

    return series(assets) // process streams in series preserving individual destination paths
        .pipe(plugins.plumber({ errorHandler: onError }))
    ;
});
