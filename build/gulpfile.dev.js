// 在build文件夹下创建gulpfile.dev.js文件， 该文件放置的时开发环境下调用的任务， 同时使用browser - sync实现编写程序的时候浏览器自动刷新的功能。


var gulp = require('gulp');
var sass = require('gulp-sass'); //sass
var jshint = require('gulp-jshint'); //js检查 ==> npm install --save-dev jshint gulp-jshint（.jshintrc：https://my.oschina.net/wjj328938669/blog/637433?p=1）  
var imagemin = require('gulp-imagemin'); //图片压缩 
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var Config = require('./gulpfile.config.js');
//======= gulp dev 开发环境下 ===============
function dev() {
    /** 
     * HTML处理 
     */
    gulp.task('html:dev', function () {
        return gulp.src(Config.html.src).pipe(gulp.dest(Config.html.dist)).pipe(reload({
            stream: true
        }));
    });
    /** 
     * assets文件夹下的所有文件处理 
     */
    gulp.task('assets:dev', function () {
        return gulp.src(Config.assets.src).pipe(gulp.dest(Config.assets.dist)).pipe(reload({
            stream: true
        }));
    });
    /** 
     * CSS样式处理 
     */
    gulp.task('css:dev', function () {
        return gulp.src(Config.css.src).pipe(gulp.dest(Config.css.dist)).pipe(reload({
            stream: true
        }));
    });
    /** 
     * SASS样式处理 
     */
    gulp.task('sass:dev', function () {
        return gulp.src(Config.sass.src).pipe(sass()).pipe(gulp.dest(Config.sass.dist)).pipe(reload({
            stream: true
        }));
    });
    /** 
     * js处理 
     */
    gulp.task('js:dev', function () {
        return gulp.src(Config.js.src).pipe(jshint('.jshintrc')).pipe(jshint.reporter('default')).pipe(gulp.dest(Config.js.dist)).pipe(reload({
            stream: true
        }));
    });
    /** 
     * 图片处理 
     */
    gulp.task('images:dev', function () {
        return gulp.src(Config.img.src).pipe(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })).pipe(gulp.dest(Config.img.dist)).pipe(reload({
            stream: true
        }));
    });
    gulp.task('dev', ['html:dev', 'css:dev', 'sass:dev', 'js:dev', 'assets:dev', 'images:dev'], function () {
        browserSync.init({
            server: {
                baseDir: Config.dist
            },
            notify: false
        });
        // Watch .html files  
        gulp.watch(Config.html.src, ['html:dev']);
        // Watch .css files  
        gulp.watch(Config.css.src, ['css:dev']);
        // Watch .scss files  
        gulp.watch(Config.sass.src, ['sass:dev']);
        // Watch assets files  
        gulp.watch(Config.assets.src, ['assets:dev']);
        // Watch .js files  
        gulp.watch(Config.js.src, ['js:dev']);
        // Watch image files  
        gulp.watch(Config.img.src, ['images:dev']);
    });
}
//======= gulp dev 开发环境下 ===============
module.exports = dev;