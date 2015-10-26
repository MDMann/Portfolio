'use strict';

// ---------------------------------------------------------------------------
// process-js - Process JavaScript files
// ---------------------------------------------------------------------------

gulp.task('process-js', gulp.parallel('process-js-pre', 'process-js-post'));
