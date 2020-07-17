var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
// // create a task that ensures the `js` task is complete before
// // reloading browsers
// gulp.task('js-watch', function (done) {
//     browserSync.reload();
//     done();
// });



// use default task to launch Browsersync and watch JS files
// gulp.task('default', function () {

//     // Serve files from the root of this project
//     browserSync.init({
//         server: {
//             baseDir: "./"
//         }
//     });

//     // add browserSync.reload to the tasks array to make
//     // all browsers reload after tasks are complete.
//     gulp.watch("*.html", ['js-watch']);
// });

// Static server

// var gulp = require('gulp');

 var concat = require('gulp-concat');
var minify = require('gulp-minify-css');

var path = require('path');
const { src, dest } = require('gulp');
const { task } = require('gulp');
//const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const { series, parallel } = require('gulp');
var less = require('gulp-less');
const { watch } = require('browser-sync');

var serve= function(cb) {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("**/**/*.less").on("change", reload);
    gulp.watch("**/**/*.css").on("change", reload);
    gulp.watch("**/**/*.js").on("change", reload);
    gulp.watch("**/**/*.json").on("change", reload);
    // gulp.watch("**/**/*.html").on("change", reload);
    cb();
};
// var watch1 =function (done) {
//     browserSync.reload();
//     done();
// };
var dep=[
    'node_modules/angular/angular.js',
]
const js = function(cb){
    gulp.src(
    [
   ...dep,
    'src/app.module.js',
    'public/templates.js',
    'src/script/**/*.js',
    'src/common/**/*.js',
    // 'src/boot.js',

]
    )
    .pipe(sourcemaps.init())
    .pipe(ngAnnotate())
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('build/scripts/'));
   
    cb();
 };

// const js = function(cb){
//         gulp.src('src/**/*.js')
//         .pipe(concat('script.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('build/scripts/'));
//         cb();
//      };
const tpl = function(cb){
    gulp.src('s**/**/*.html')
    .pipe(templateCache({"module":"demo"}))
    .pipe(gulp.dest('public'));

        cb();
     };

const css =  function(cb){
        gulp.src('src/styles/*.css')
        .pipe(autoprefixer({
			cascade: false
		}))
        .pipe(concat('styles1.css'))
        .pipe(minify())
        .pipe(gulp.dest('build/styles/'));
        cb();
     };



 
const less1 = function (cb) {
   gulp.src('src/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(concat('styles.css'))
    // .pipe(minify())
    .pipe(gulp.dest('build/styles/'));
    cb();
};

const res =function(cb){
    gulp.src('src/img/*.png')
    .pipe(gulp.dest('build/img'))
  ;
  gulp.src('src/data/*.json').pipe(gulp.dest('build/data'))
    cb();
}
 exports.build = series(css,tpl, js,res,less1);
 exports.serve = series(serve);
// exports.default = series(clean,less1);
// exports.build = series(clean,less1,res);
exports.default = series(exports.build ,  exports.serve);
