const gulp = require('gulp');
const concat  = require('gulp-concat');
const server  = require('browser-sync');
const sass  = require('gulp-sass');
const del  = require('del');
const express  = require('gulp-express');
const flatten  = require('gulp-flatten');

const paths = {
  dist: './dist/',
  serverfile: './server/server.js'
};

//server.create();

gulp.task('html', () => {
  return gulp.src('src/index.html')
  .pipe(gulp.dest(paths.dist))
  .pipe(server.reload({stream: true}));
});

gulp.task('htmltemplates', () => {
  return gulp.src([
      'src/components/**/*.html',
      'src/shared/**/*.html'
                  ])
  .pipe(flatten())
  .pipe(gulp.dest(paths.dist+"html/"))
  .pipe(server.reload({stream: true}));
});
gulp.task('scripts', () => {
  return gulp.src([
      'node_modules/angular/angular.min.js',
      'node_modules/angular-sanitize/angular-sanitize.min.js',
      'node_modules/angular-animate/angular-animate.min.js',
      'node_modules/angular-ui-router/release/angular-ui-router.min.js',
      'node_modules/angular-websocket/dist/angular-websocket.min.js',
      'node_modules/angular-timeago/dist/angular-timeago.js',
      'src/app.js',
      'src/components/**/*js',
      'src/shared/**/*js'
  ])
  .pipe(concat('all.js'))
  .pipe(gulp.dest(paths.dist+'scripts/'))
  .pipe(server.reload({stream: true}));
});

gulp.task('commonstyles', () => {
  return gulp.src('src/scss/*.scss')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(concat('common.css'))
  .pipe(gulp.dest(paths.dist+'styles/'))
  .pipe(server.reload({stream: true}));
});

gulp.task('clean', cb => del(paths.dist + '**/*', cb));

gulp.task('watchout', () => {
  gulp.watch('src/**/*js', ['scripts'])
  gulp.watch('src/scss/*.scss', ['commonstyles'])
  gulp.watch('src/index.html', ['html'])
});

gulp.task('server', function(){
  express.run([paths.serverfile]);
});

gulp.task('default', ['html', 'scripts', 'htmltemplates', 'commonstyles','client', 'watchout']);


gulp.task('client', () => {
  return server.init({
        files: [`${paths.dist}/**`],
        port: 5000,
        server: {
          baseDir: paths.dist
        }
  });
});

