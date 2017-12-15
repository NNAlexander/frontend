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


callTask('pug','./tasks/pug', { src: ['app/*.pug' ], dest: 'app', pretty: false });

callTask('pug-php','./tasks/pug-php', { src: 'app/*.not', dest: 'app', pretty: false });

callTask('js','./tasks/js', { src: 'app/preJS/**/*.js' , dest: 'app/js'});

callTask('sass','./tasks/sass', { src: 'app/sass/**/*.sass', dest: 'app/css', autoprefixer: 'last 5 versions'});
callTask('sassRigger','./tasks/sassRigger', { src: 'app/rigger/sass/**.*sass', dest: 'app/rigger/css', autoprefixer: 'last 5 versions'});

callTask('sass-build','./tasks/sass-build', { src: ['app/sass/**/*.sass','!app/sass/riggerSass'], dest: 'app/css', autoprefixer: 'last 5 versions'});

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

gulp.task('dev', gulp.series('sass','sassRigger','js','pug', 'pug-php', gulp.parallel('watch','browserSync')));
gulp.task('default', gulp.series('dev'));

gulp.task('build', 
	gulp.series(
		gulp.parallel('removeBuild', 'imagemin', 'sass-build','sassRigger', 'js','pug', 'pug-php'),'throwFiles'));