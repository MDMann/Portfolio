'use strict';

// ---------------------------------------------------------------------------
// lint-js - Cache and lint javascript files
// https://github.hc.ag/dragon/rocket-imprint/raw/master/.eslintrc
// ---------------------------------------------------------------------------

gulp.task('lint-js', function() {

    var source = gulp.src(ASSETS.jsPre, ASSETS.jsPost);

    return source
        .pipe(plugins.cached('lint-js-cache'))
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.formatEach('stylish', process.stderr)) // on error see: http://eslint.org/docs/rules/
    ;
});
