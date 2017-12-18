const gulp = require('gulp');
const path = require('path');
const eslint = require('gulp-eslint');


gulp.task('default', ['test']);


gulp.task('test', () => gulp
    .src(['controllers/*.js','app.js'])
    .pipe(eslint({
        configFile: '.eslintrc.json',
        quiet: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);
