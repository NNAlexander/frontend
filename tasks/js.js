'use strict';

const gulp           = require('gulp');
const $              = require('gulp-load-plugins')();

module.exports =  function(options) {
	return function() {
		return gulp.src(options.src)
			.pipe($.plumber({
				errorHandler: $.notify.onError( function(err) {
					return {
						title: 'Javascript',
						message: err.message
					};
				})
			}))
			.pipe($.debug({title: 'JS src'}))
			.pipe($.uglify())
			.pipe($.debug({title: 'JS uglify'}))
			.pipe($.rename({suffix: '.min', prefix : ''}))
			.pipe($.debug({title: 'JS rename'}))
			.pipe(gulp.dest(options.dest))
	};
};