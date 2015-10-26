'use strict';

// ---------------------------------------------------------------------------
// copy-assets-html - Copy html files to build directory preserving paths
// ---------------------------------------------------------------------------

gulp.task('copy-assets-html', function () {

    var source = series(gulp.src(FILE.index), gulp.src(ASSETS.html, { base: PATH.assets }));
    var targetPath = PATH.output;

    return source
        .pipe(plugins.changed(targetPath))
        .pipe(gulp.dest(targetPath))
    ;
});
