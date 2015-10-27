'use strict';

// ---------------------------------------------------------------------------
// clean - Delete contents of the build folder (development or production)
// ---------------------------------------------------------------------------

gulp.task('clean', function(callback) {
    del(PATH.output + '*', callback);
});
