'use strict';

// ---------------------------------------------------------------------------
// process-js - Process scripts: concat
// ---------------------------------------------------------------------------

gulp.task('process-js-post', function() {

    var vendor = gulp.src(DEPENDENCIES)
        .pipe(plugins.filter(['**/*.js', '!modernizr.js']))
    ;

    var post = gulp.src(ASSETS.jsPost);

    var targetFile = BUILD.jsFile;
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

    return series(vendor, post)
        .pipe(plugins.plumber({ errorHandler: onError }))
        .pipe(plugins.concat(targetFile))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(targetPath))
        .pipe(plugins.gzip())
        .pipe(gulp.dest(targetPath))
    ;
});
