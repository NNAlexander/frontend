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
//====================================================================
//====================================================================


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


//==BrowserSync
callTask('browserSync','./tasks/browserSync', { 
	proxy: 'server',
	// server: 'app',
	srcWatch: [ 
	'build/js/**/*.js',
	'build/css/**/*.css',
	'build/*.php',
	],
});
//====================================================================


//==Watch
callTask('watch','./tasks/watch', { watch: {
	sass: 'app/sass/**/*.sass',
	js: 'app/js/**/*.js',
	pug: ['app/*.pug','app/pug/**/*.pug'],
}});
//====================================================================

//==Delete build folder
callTask('removeBuild','./tasks/removeBuild', { build: 'build'});
//====================================================================

//==Minimaze images
callTask('imagemin','./tasks/imagemin', { src: 'app/img/**/*.*' , dest: 'build/img'});
//====================================================================

//==Throw files in the build folder
callTask('throwFiles','./tasks/throwFiles', { 
	src: {
		fonts: 'app/fonts/**/*.*',
		php: 'app/php/**/*php',
		other: ['app/.htaccess'],
	},
	dest: {
		fonts: 'build/fonts',
		php: 'build/php',
		other: 'build',
	}
});
//====================================================================

//Development task
gulp.task('dev', 
	gulp.series('sass','js','pug','imagemin','throwFiles',
		gulp.parallel('watch','browserSync')));
//====================================================================

//==Default Task
gulp.task('default', gulp.series('dev'));
//====================================================================

//Build Task
gulp.task('build', 
	gulp.series('removeBuild',
		gulp.parallel('imagemin', 'sass-build', 'js','pug','throwFiles')));
//====================================================================