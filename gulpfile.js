var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    flatten = require('gulp-flatten'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    ngAnnotate = require('gulp-ng-annotate'),
    sass = require('gulp-sass');


// Copy all bower files
gulp.src(['bower_components/*/*.min.js', 'bower_components/*/release/*.min.js', 'bower_components/*/dist/*.min.js'])
  .pipe(flatten())
  .pipe(gulp.dest('app/public/js'));

gulp.src(['bower_components/*/*.min.css','bower_components/*/dist/*.min.css'])
  .pipe(flatten())
  .pipe(gulp.dest('app/public/css'));


/*
	Scripts tasks
*/
gulp.task('scripts', function(){
	gulp.src(['dev/js/modules/**/*.js','dev/js/controllers/**/*.js','dev/js/**/*.js'])
		.pipe(plumber())
		.pipe(rename({suffix:'.min'}))
    .pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(gulp.dest('app/public/js'))
		.pipe(reload({stream:true}));
});

/*
	Style tasks
*/
gulp.task('styles', function(){
	gulp.src('dev/scss/**/*.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest('app/public/css'))
		.pipe(reload({stream:true}));
});

/*
	HTML Tasks
*/
gulp.task('html', function(){
	gulp.src(['app/views/layouts/**/*.handlebars', 'app/views/**/*.handlebars'])
	.pipe(reload({stream:true}));
});


/*
	Browser Sync reload
*/
gulp.task('browser-sync', function(){
  browserSync.init({
    port: 3000,
    proxy: {
      target: 'localhost:3002',
      ws: true
    }
  });
});

/*
	Watch tasks
*/
gulp.task('watch', function(){
	gulp.watch('dev/js/**/*.js', ['scripts']);
	gulp.watch('dev/scss/**/*.scss', ['styles']);
  gulp.watch(['app/views/layouts/**/*.handlebars', 'app/views/**/*.handlebars'], ['html']);
});

/*
	default tasks
*/

gulp.task('default', ['scripts', 'styles', 'html', 'browser-sync', 'watch']);
