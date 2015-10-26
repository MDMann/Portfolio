'use strict';

// ---------------------------------------------------------------------------
// lint - Lint HTML, Sass and JavaScript files
// ---------------------------------------------------------------------------

gulp.task('lint', gulp.parallel('lint-html5', 'lint-scss', 'lint-js'));
