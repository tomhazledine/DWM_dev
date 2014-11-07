// Include gulp
var gulp         = require('gulp');

// Include Our Plugins
var sass         = require('gulp-ruby-sass');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');
var autoprefixer = require('autoprefixer-core');
var imagemin     = require('gulp-imagemin');
var cache        = require('gulp-cache');
var scsslint     = require('gulp-scss-lint');
var livereload   = require('gulp-livereload');
var jshint       = require('gulp-jshint');
var iconfont     = require('gulp-iconfont');
var iconfontCss  = require('gulp-iconfont-css');
var size         = require('gulp-size');
var lr           = require('tiny-lr');
var gutil        = require('gulp-util');
var plumber      = require('gulp-plumber');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var server       = lr();
var shell        = require('gulp-shell')

// This will handle our errors
var onError = function (err) {
  gutil.log(gutil.colors.red(err));
};

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('uncompressed/scss/*.scss')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(sass({sourcemap: true, sourcemapPath: '../../uncompressed/scss', style: 'compressed'}))
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer]))
    .pipe(sourcemaps.write('.'))
    .pipe(size({title: 'css'}))
    .pipe(gulp.dest('assets/css'))
    //.pipe(test)
    .pipe(livereload(server));
});

// Lets lint our CSS
gulp.task('scsslint', function() {
  gulp.src('uncompressed/scss/*.scss')
    .pipe(scsslint({'config': 'defaultLint.yml'}));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['uncompressed/js/jquery/jquery.js','uncompressed/js/vendor/*.js','uncompressed/js/custom/*.js'])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(concat('app.js'))
    .pipe(size({title: 'js'}))
    .pipe(gulp.dest('assets/js'))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(size({title: 'js.min'}))
    .pipe(gulp.dest('assets/js'))
    .pipe(livereload(server));
});

// Minify and transfer static JS files
gulp.task('staticjs', function() {
    return gulp.src(['uncompressed/js/static/*.js'])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js/static'))
    .pipe(livereload(server));
});

// Icon Font
var fontName = 'icons';

// Create icon fonts from SVG
gulp.task('iconfont', function(){
  gulp.src(['uncompressed/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
      //path: 'app/assets/css/templates/_icons.scss',
      targetPath: '../../scss/_icons.scss',
      fontPath: 'uncompressed/fonts/icons/'
    }))
    .pipe(iconfont({
      fontName: fontName,
      appendCodepoints:true
     }))
    .on('codepoints', function(codepoints, options) {
        // CSS templating, e.g.
        console.log(codepoints, options);
      })
    .pipe(gulp.dest('uncompressed/fonts/icons/'));
});

gulp.task('jslint', function() {
return gulp.src('uncompressed/js/custom/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Set up image minification
gulp.task('images', function() {
  return gulp.src('uncompressed/images/**')
  .pipe(cache(imagemin({ optimizationLevel: 9, progressive: true, interlaced: true })))
  .pipe(gulp.dest('assets/images'))
  .pipe(livereload(server));
});

// Fonts
gulp.task('fonts', function() {
    return gulp.src('uncompressed/fonts/**')
    .pipe(gulp.dest('assets/fonts/'));
});

// Livereload
gulp.task('listen', function(next) {
    server.listen(35728, function(err) {
        if (err) return console.log;
        next();
    });
});

// Shell Script for Jekyll
gulp.task('jekyll', shell.task('rm -rf _site/*; jekyll build'))

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('uncompressed/js/jquery/*.js', ['scripts']);
    gulp.watch('uncompressed/js/vendor/*.js', ['scripts']);
    gulp.watch('uncompressed/js/custom/*.js', ['scripts']);
    gulp.watch('uncompressed/js/static/*.js', ['staticjs']);
    gulp.watch('uncompressed/scss/*.scss', ['sass']);
    gulp.watch('uncompressed/images/**', ['images']);
    gulp.watch('uncompressed/fonts/**', ['fonts']);
    gulp.watch('uncompressed/icons/**', ['iconfont']);
    gulp.watch(['*.html','*.php','assets/**'],['jekyll']);

    gulp.watch(['_site/**']).on('change', function(file) {
        livereload(server).changed(file.path);
    });
});

// Default Task
gulp.task('default', ['watch']);
