'use strict';

// ---------------------------------------------------------------------------
// watch - Watch and copy changed sources to build directory or compile sass
// ---------------------------------------------------------------------------

gulp.task('observe', function() {

	var sourceFonts  = [ASSETS.fonts];
	var sourceImages = [ASSETS.images];
	var sourcejsPre  = [ASSETS.jsPre];
    var sourcejsPost = [ASSETS.jsPost];
    var sourceMarkup = [FILE.index, ASSETS.html];
    var sourceStyles = [SASS.root, SASS.partials];

    gulp.watch(sourceFonts,  gulp.series('copy-assets-fonts', browsersync.reload));
    gulp.watch(sourceImages, gulp.series('copy-assets-images', browsersync.reload));
    gulp.watch(sourcejsPre,  gulp.series(gulp.parallel('process-js-pre'), browsersync.reload));
    gulp.watch(sourcejsPost, gulp.series(gulp.parallel('process-js-post'), browsersync.reload));
    gulp.watch(sourceMarkup, gulp.series(gulp.parallel('copy-assets-html'), browsersync.reload));
    gulp.watch(sourceStyles, gulp.series(gulp.parallel('compile-sass'), browsersync.reload));

    // Linting temporarily disabled to fix initial errors

    // gulp.watch(sourceFonts,  gulp.series('copy-assets-fonts', browsersync.reload));
    // gulp.watch(sourceImages, gulp.series('copy-assets-images', browsersync.reload));
    // gulp.watch(sourcejsPre,  gulp.series(gulp.parallel('lint-js', 'process-js-pre'), browsersync.reload));
    // gulp.watch(sourcejsPost, gulp.series(gulp.parallel('lint-js', 'process-js-post'), browsersync.reload));
    // gulp.watch(sourceMarkup, gulp.series(gulp.parallel('lint-html5', 'copy-assets-html'), browsersync.reload));
    // gulp.watch(sourceStyles, gulp.series(gulp.parallel('lint-scss', 'compile-sass'), browsersync.reload));

});
