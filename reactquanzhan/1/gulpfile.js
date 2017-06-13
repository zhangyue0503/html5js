var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');

gulp.task('lint',function(){
	return gulp.src('compiled.js').pipe(jshint()).pipe(jshint.reporter('default'));
});

gulp.task('compress',function(){
	return gulp.src('compiled.js').pipe(uglify()).pipe(gulp.dest('build'));
});

gulp.task('default',['lint','compress']);