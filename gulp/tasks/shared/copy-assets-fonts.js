'use strict';

// ---------------------------------------------------------------------------
// copy-assets-fonts - Copy fonts to build directory preserving paths
// ---------------------------------------------------------------------------

gulp.task('copy-assets-fonts', function () {

    var source = gulp.src(ASSETS.fonts, { base: PATH.assets });
    var targetPath = PATH.output;

    return source
        .pipe(plugins.changed(targetPath))
        .pipe(gulp.dest(targetPath))
    ;
});
