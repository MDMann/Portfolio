'use strict';

// ---------------------------------------------------------------------------
// process-js-pre - Process pre scripts: concat
// ---------------------------------------------------------------------------

gulp.task('process-js-pre', function() {

    var source = gulp.src(DEPENDENCIES); // gulp.src([ASSETS.jsPre]); // use customized version of modernizr}
    var filterRule = ['modernizr.js'];
    var targetFile = BUILD.jsFilePre;
    var targetPath = BUILD.js;

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
        .pipe(plugins.filter(filterRule))
        .pipe(plugins.plumber({ errorHandler: onError }))
        .pipe(plugins.concat(targetFile))
        .pipe(gulp.dest(targetPath))
    ;
});
