'use strict';

const gulp           = require('gulp');
const $              = require('gulp-load-plugins')();

function callTask(taskName, path, options) {
	options = options || {};
	options.taskName = taskName;
	gulp.task(taskName, function(callback) {
		let task = require(path).call(this, options);
		return task(callback);
	});
};


//==PUG to PHP
callTask('pug','./tasks/pug', 
	{
		src: ['app/index.pug', 'app/pug/**/*.pug', '!app/pug/**/_*.pug'] ,
		dest: {
			index: 'build',
			other: 'build/php',
		},
		pretty: false ,
	});
//====================================================================


//==SASS to CSS
callTask('sass','./tasks/sass', 
	{
		src: 'app/sass/**/*.sass',
		dest: 'build/css',
		autoprefixer: 'last 5 versions',
	});

callTask('sass-build','./tasks/sass-build', 
	{
		src: 'app/sass/**/*.sass',
		dest: 'build/css',
		autoprefixer: 'last 5 versions',
	});
//====================================================================


//==JS to JS
callTask('js','./tasks/js',
	{
		src: 'app/js/**/*.js' ,
		dest: 'build/js' ,
	});
//====================================================================

callTask('browserSync','./tasks/browserSync', { 
	proxy: 'Furniture',
	// server: 'app',
	srcWatch: ['app/*.html','app/js/**/*.js', 'app/preJS/**/*.js','app/css/**/*.css','app/*.php','app/*.pug', 'app/pug/**/*.pug'],
});


callTask('watch','./tasks/watch', { watch: {
	sass: ['app/sass/**/*.sass', 'app/rigger/sass/**/*sass'],
	js: 'app/preJS/**/*.js',
	pug: ['app/*.pug','app/pug/**/*.pug'],
	php: 'app/*.php',
}});

callTask('removeBuild','./tasks/removeBuild', { build: 'build'});
callTask('throwFiles','./tasks/throwFiles', { 
	src: {
		html: 'app/*.html',
		css: 'app/css/**/*.css',
		js: 'app/js/**/*.js',
		fonts: 'app/fonts/**/*.*',
		img: 'app/img/**/*.*',
		php: 'app/*php',
		other: ['app/.htaccess'],
	},
	dest: {
		html: 'build',
		css: 'build/css',
		js: 'build/js',
		fonts: 'build/fonts',
		img: 'build/img',
		php: 'build',
		other: 'build',
	}
});

callTask('imagemin','./tasks/imagemin', { src: 'app/img/**/*.*' , dest: 'app/img'});

gulp.task('dev', gulp.series('sass','js','pug',  gulp.parallel('watch','browserSync')));
gulp.task('default', gulp.series('dev'));

gulp.task('build', 
	gulp.series(
		gulp.parallel('removeBuild', 'imagemin', 'sass-build', 'js','pug'),'throwFiles'));