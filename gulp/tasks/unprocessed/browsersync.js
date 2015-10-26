'use strict';

// ---------------------------------------------------------------------------
// browsersync - Static server and synchronised browsers
// ---------------------------------------------------------------------------

gulp.task('browsersync', function(callback) {

    return browsersync({
        server: {
            baseDir: PATH.output,
            middleware: []
        },
        serveStatic: [],
        online: false, // reduce start-up time by setting this option to false
        notify: false
    }, callback);
});
