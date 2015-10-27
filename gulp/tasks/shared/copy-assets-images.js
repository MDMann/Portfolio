'use strict';

// ---------------------------------------------------------------------------
// copy-assets-images - Copy images to build directory preserving paths
// ---------------------------------------------------------------------------

gulp.task('copy-assets-images', function () {

    var source = gulp.src(ASSETS.images, { base: PATH.assets });
    var targetPath = PATH.output;

    return source
        .pipe(plugins.changed(targetPath))
        .pipe(gulp.dest(targetPath))
    ;
});
