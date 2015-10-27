'use strict';

// ---------------------------------------------------------------------------
// process-images - Process image files
// ---------------------------------------------------------------------------

gulp.task('process-images', function() {

    var source = gulp.src(ASSETS.images);
    var targetPath = BUILD.images;

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
        .pipe(plugins.changed(targetPath))
        .pipe(plugins.imagemin())
        .pipe(gulp.dest(targetPath))
    ;
});
