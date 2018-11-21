// 引入gulp
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');

// 定义压缩js的任务
gulp.task('js', function(){
  gulp
    .src('utils/demo.js')
    .pipe(uglify())
    // 发布
    .pipe(gulp.dest('pack/'))
});

gulp.task('css', function(){
  gulp
    .src('css/**.css')
    //压缩
    .pipe(minifyCss())
    //打包
    .pipe(concat('all.wxss'))
    //发布
    .pipe(gulp.dest('pack/'));
});

// 定义默认任务
gulp.task('default', ['js', 'css']);