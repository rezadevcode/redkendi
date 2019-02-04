var gulp = require('gulp');

var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var input = ['app/scss/*.scss'];
var output = 'app/css';

gulp.task('clean', function() {
    return gulp.src([output], { read: false })
        .pipe(clean({ force: true }));
});

gulp.task('sass', ['clean'], function() {

    return gulp
        .src(input)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compact'}))
        .pipe(autoprefixer({browsers: ['last 2 versions', '> 5%', 'Firefox ESR']}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(output));
});

gulp.task('watch',function(){
	gulp.watch(input,['sass']);
})

gulp.task('build:dev', ['clean', 'watch']);
gulp.task('default', ['build:dev']);