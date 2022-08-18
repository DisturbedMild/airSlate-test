import gulp from 'gulp';
import browserSync from 'browser-sync';
import stylus from 'gulp-stylus';
import autoprefixer from 'gulp-autoprefixer';
import cleancss from 'gulp-clean-css';
import concat from 'gulp-concat';
import { deleteAsync } from 'del';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import pug from 'gulp-pug';
import webpack from 'webpack-stream';

function serve() {
  browserSync.create().init({
    server: {
      baseDir: 'dist/',
    },
  });
}

function scripts() {
  return gulp
    .src(['src/js/*.js'])
    .pipe(sourcemaps.init())
    .pipe(webpack({ mode: 'production' }))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}
function styles() {
  return gulp
    .src(['src/styles/*.styl'])
    .pipe(sourcemaps.init())
    .pipe(stylus({ 'include css': true }))
    .pipe(concat('main.min.css'))
    .pipe(autoprefixer())
    .pipe(cleancss())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function images() {
  return gulp
    .src(['src/assets/*.{gif,jpg,jpeg,ico,png,svg}'])
    .pipe(gulp.dest('dist/assets'));
}

function markup() {
  return gulp
    .src(['src/templates/index.pug'])
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('dist/'));
}

function cleandist() {
  return deleteAsync('dist/**/*', { force: true });
}

function buildcopy() {
  return gulp
    .src(['src/css/**/*.min.css', 'src/js/**.min.js', 'src/tempates/*.pug'], {
      base: 'src',
    })
    .pipe(gulp.dest('dist'));
}

function watcher() {
  gulp.watch(['src/js/*.js'], scripts);
  gulp.watch(['src/styles/*.styl'], styles);
  gulp.watch(['src/**/*.pug'], markup);
  gulp.watch('dist/**/*.html').on('change', browserSync.reload);
  gulp.watch('dist/**/main.min.css').on('change', browserSync.reload);
}

gulp.task(
  'build',
  gulp.series(cleandist, markup, styles, scripts, images, buildcopy)
);

gulp.task('default', gulp.parallel(markup, styles, scripts, serve, watcher));
