var gulp = require('gulp');

//引用外包
var tpl = require('gulp-tpl');
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-clean-css'),
    transport = require("gulp-seajs-transport"),
    sass = require('gulp-sass'),
    sourcemaps = require("gulp-sourcemaps"),
    concatSeajs = require("gulp-seajs-concat");

//参数 {version} 控制版本号
var option = {
    cwd: './src',
    dist: './dist',
    version: '20170309'
}

var paths = {
	sass: './src/**/*.scss'
}

option.tpl = option.cwd  + '/js/tpl';
option.src = option.dist + '/' + option.version;
option.js = option.cwd + '/js/**/*.js';


//压缩seajs
gulp.task('transport', function () {
    return gulp.src([option.js, '!./src/js/base.js'])
         .pipe(transport())
         .pipe(concatSeajs())
         .pipe(uglify())
        .pipe( gulp.dest( option.src + '/js' ) )
});

//将lib.js合并到最新版本
gulp.task('scriptLib', function () {
    return gulp.src('./src/js/lib/lib.js')
        .pipe(uglify())
        .pipe( gulp.dest( option.src + '/js/lib' ) );
});

//将base.js合并到最新版本
gulp.task('base', function () {
    return gulp.src('./src/js/base.js')
        .pipe(uglify())
        .pipe( gulp.dest( option.src + '/js' ) );
});

//图片合到最新版本
gulp.task('image', function () {
    return gulp.src(['./src/images/**/*.png', './src/images/**/*.jpg', './src/images/**/*.gif', './src/images/**/*.ico'])
        .pipe( gulp.dest( option.src + '/images' ) );
});

//css合并最新版本
gulp.task('minify-css', function () {
    return gulp.src(option.cwd+'/css/**/*.css')
        // .pipe( concat('index.css') )
        .pipe( minifyCss({compatibility: { properties: { iePrefixHack: true } }}) )
        .pipe( gulp.dest( option.src + '/css' ) )
})

//将*.tpl 编译成*.js
gulp.task('tpl', function () {
    return gulp.src(option.tpl+'/**/*.tpl')
        .pipe(tpl())
        .pipe( gulp.dest(option.tpl) )
});

//将所有的tpl移到最新版本
gulp.task('tplPub', ['tpl'], function() {
  return gulp.src(option.tpl+'/**/*.js')
    // .pipe(concat('tpl.js'))
    // .pipe( seajsCombo() )
    .pipe(uglify())
    .pipe(gulp.dest(option.src+'/tpl'));
});

//将公共文件合并到lib.js 此任务可根据自己项目自定义 如果改变需要单独运行此任务
gulp.task('libConcat', function () {
    return gulp.src(['./src/js/lib/jq.js',
                    './src/js/lib/jquery.cookie.js',
                    './src/js/lib/sea.js',
                    './src/js/lib/template.js'])
            .pipe( concat('lib.js') )
            .pipe(uglify())
            .pipe( gulp.dest( './src/js/lib' ) )
});

//监听tpl
gulp.task('watch', function () {
   gulp.watch(option.tpl+'/**/*.tpl', ['dev']);
   gulp.watch(paths.sass, ['sass']);
});


//dev 开发可跑此任务，建议watch来监听
gulp.task('dev', [ 'tpl']);

gulp.task('default', [ 'dev', 'sass', 'watch']);

gulp.task('sass', function () {
    return gulp.src(paths.sass)
        		.pipe(sourcemaps.init())
        		.pipe(sass().on('error', sass.logError))
       			.pipe(sourcemaps.write())
        		.pipe(gulp.dest(option.cwd));
});

//运行他前，先改版本号
gulp.task('publish', [ 'tpl', 'transport', 'minify-css', 'scriptLib', 'base', 'image', 'tplPub']);

