var gulp = require('gulp');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');

var paths = {
    scripts: 'server/public/scripts/**/*.js',
    styles: 'server/public/styles/**/*.css',
    index: 'server/public/views/index.html',
    partials: ['server/public/views/**/*.html', '!server/public/views/index.html'],
  };

gulp.task('watch', function () {
    gulp.watch('js/*.js', ['jshint']);
  });

gulp.task('jshint', function () {
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
  });

gulp.task('default', ['jshint', 'watch']);
