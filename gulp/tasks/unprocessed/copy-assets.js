'use strict';

// ---------------------------------------------------------------------------
// copy-assets - Copy assets to build directory preserving paths
// ---------------------------------------------------------------------------

gulp.task('copy-assets', gulp.parallel('copy-assets-fonts', 'copy-assets-html', 'copy-assets-images'));
