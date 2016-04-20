//https://travismaynard.com/writing/getting-started-with-gulp 
//https://www.smashingmagazine.com/2014/06/building-with-gulp/
// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require("del");

gulp.task( "clean", function() {
    return del(["dist"]);
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});


// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
        .pipe(concat('all.js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
gulp.task('minify-css', function () {
    gulp.src('src/styles/**.css') 
    .pipe(concat('all.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/css'));
});
// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts', 'minify-css']);
});

// Default Task
gulp.task('default', ['clean','lint', 'scripts','minify-css', 'watch']);