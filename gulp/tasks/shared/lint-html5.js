'use strict';

// ---------------------------------------------------------------------------
// lint-html5 - Cache and lint static HTML files
// ---------------------------------------------------------------------------

gulp.task('lint-html5', function() {

    var source = gulp.src(ASSETS.html);

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

    return source
        .pipe(plugins.plumber({ errorHandler: onError }))
        .pipe(plugins.cached('lint-html5-cache'))
        .pipe(plugins.html5Lint())
    ;
});
