'use strict';

// ---------------------------------------------------------------------------
// size - Display the total size of the build folder. (development/production)
// ---------------------------------------------------------------------------

gulp.task('size', function() {

    var source = gulp.src(PATH.output + '**/*');
    var filterRule = ['**/*', '!**/*.map', '!**/*.gz']; // exclude source maps and compressed files
    var size = plugins.size({ title: 'Build folder (' + env + '):', showFiles: false });

    return source
        .pipe(plugins.filter(filterRule))
        .pipe(size)
    ;
});
