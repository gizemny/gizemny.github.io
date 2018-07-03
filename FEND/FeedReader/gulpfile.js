const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('default', function() {
    console.log('hello');
});

gulp.task('sass', function() {
    gulp.src('sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], function () {

    browserSync.init({
        server: "."
    });

    gulp.watch("sass/*.scss", ['sass']);
    gulp.watch("jasmine/spec/feedreader.js").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
