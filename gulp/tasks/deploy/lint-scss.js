'use strict';

// ---------------------------------------------------------------------------
// lint-scss - Cache and lint scss files
// ---------------------------------------------------------------------------

gulp.task('lint-scss', function() {

    var source = gulp.src([SASS.root, SASS.partials]);

    return source
        .pipe(plugins.cached('lint-scss-cache'))
        .pipe(plugins.scssLint())
        .pipe(plugins.scssLint.failReporter())
    ;
});
