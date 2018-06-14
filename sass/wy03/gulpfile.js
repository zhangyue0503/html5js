var gulp = require('gulp');
var sass = require('gulp-ruby-sass');

gulp.task('sass',function(){
    sass('demo.scss')
    .pipe(gulp.dest('./dest/demo.css'))
})

gulp.task('default',['sass'])