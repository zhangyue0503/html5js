const gulp = require("gulp")
const cssmin = require('gulp-cssmin')
const sass = require('gulp-sass')(require('node-sass'))
const unlify = require("gulp-uglify")
const babel = require("gulp-babel")
const htmlmin = require("gulp-htmlmin")

const autoPrefixer = require("gulp-autoprefixer")

const del = require('del')

const server = require('gulp-webserver')

const fileInclude = require('gulp-file-include')

// gulp.task('cssHandler', function () {
//     return gulp.src('./src/css/*.css')
//         .pipe(cssmin())
//         .pipe(gulp.dest('./dist/css/'))
// })




const cssHandler = function () {
    return gulp.src('./src/css/*.css')
        // .pipe(autoPrefixer({
        //     browsers: [
        //         'last 2 versions'
        //     ]
        // }))
        .pipe(autoPrefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('./dist/css/'))
}

const sassHandler = function () {
    return gulp.src('./src/css/*.scss')
        .pipe(sass())
        .pipe(autoPrefixer())
        .pipe(gulp.dest('./dist/css/'))
}

const jsHandler = function () {
    return gulp.src("./src/js/*.js")
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(unlify())
        .pipe(gulp.dest("./dist/js/"))
}

const htmlHandler = function () {
    return gulp.src("./src/pages/*.html")
        .pipe(fileInclude({
            prefix: '@-@',   // 标识符
            basepath: './src/components/' // 路径
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
        }))
        .pipe(gulp.dest("./dist/"))
}

const imgHandler = function () {
    return gulp.src("./src/images/**")
        .pipe(gulp.dest("./dist/images/"))
}

const delHandler = function () {
    return del(['./dist/'])
}

const serverHandler = function () {
    return gulp.src('./dist')
        .pipe(server({
            host: 'localhost',
            port: '9998',
            livereload: true,
            open: './index.html',

        }))
}

const watchHandler = function () {
    gulp.watch('./src/**/*', gulp.parallel(cssHandler, sassHandler, jsHandler, htmlHandler, imgHandler))

}

module.exports.cssHandler = cssHandler
module.exports.sassHandler = sassHandler
module.exports.jsHandler = jsHandler
module.exports.htmlHandler = htmlHandler
module.exports.imgHandler = imgHandler
module.exports.delHandler = delHandler

// module.exports.default = gulp.parallel(cssHandler, sassHandler, jsHandler, htmlHandler, imgHandler)

module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(cssHandler, sassHandler, jsHandler, htmlHandler, imgHandler),
    serverHandler,
    watchHandler
)


