'use strict';

// ---------------------------------------------------------------------------
// compile-sass - Compile Sass files and write CSS file to build directory
// ---------------------------------------------------------------------------

gulp.task('compile-sass', function() {

    var source = gulp.src(SASS.root);
    var include = [SASS.framework]; // include paths to external sass files here, e.g. bootstrap or foundation
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

    return source
        .pipe(plugins.plumber({ errorHandler: onError }))
            .pipe(plugins.sass({includePaths: include})) 
            .pipe(plugins.rename(targetFile))
        .pipe(gulp.dest(targetPath))
    ;
});
