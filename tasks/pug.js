'use strict';

const gulp           = require('gulp');
const $              = require('gulp-load-plugins')();
// const browserSync    = require('browser-sync').create();

module.exports =  function(options) {
	return function() {
		return gulp.src(options.src)
			.pipe($.plumber({
				errorHandler: $.notify.onError( function(err) {
					return {
						title: 'PUG',
						message: err.message
					};
				})
			}))
			.pipe($.debug({title: 'PUG src'}))
			.pipe($.pug({pretty: options.pretty}))
			.pipe($.debug({title: 'PUG debug'}))
			.pipe($.htmlmin())
			.pipe($.debug({title: 'htmlmin'}))
			.pipe(gulp.dest(options.dest))
			// .pipe(browserSync.stream());
	};
};

