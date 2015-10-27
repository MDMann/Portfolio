'use strict';

// ---------------------------------------------------------------------------
// help - Displays a list of tasks and subtasks
// ---------------------------------------------------------------------------

gulp.task('help', function() {

    console.log('')
    console.log(' Usage')
    console.log('̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅')
    console.log(' gulp [TASK] [OPTIONS...]')
    console.log('')
    console.log('')
    console.log(' Builds')
    console.log('̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅')
    console.log(' local            Start with: gulp [TASK]')
    console.log(' deploy           Start with: NODE_ENV=deploy gulp [TASK]')        
    console.log('')
    console.log('')
    console.log(' Available tasks')
    console.log('̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅̅')
    console.log(' ···············  Run gulp without a task to build and watch your project. (default)')
    console.log(' clean  ········  Delete contents of the build folder.')
    console.log(' compile-sass  ·  Compile stylesheets.')
    console.log(' build  ········  Clean build directory and build project.')
    console.log(' help  ·········  Display this help text.')
    console.log(' lint  ·········  Lint HTML, Sass and JavaScript files.')
    console.log(' size  ·········  Display the total size of the build folder.')
    console.log(' watch  ········  Watch for changes and reload + synchronise browsers.')
    console.log('')
});
