'use strict';

const gulp           = require('gulp');
const $              = require('gulp-load-plugins')();

module.exports =  function(options) {
	return function() {
		return gulp.src(options.src)
			.pipe($.plumber({
				errorHandler: $.notify.onError( function(err) {
					return {
						title: 'SASS',
						message: err.message
					};
				})
			}))
			.pipe($.debug({title: 'SASS src'}))
			.pipe($.sourcemaps.init())
			.pipe($.debug({title: 'sourcemapInit'}))
				.pipe($.sass())
				.pipe($.debug({title: 'SASS Total'}))
				.pipe($.autoprefixer([options.autoprefixer]))
				.pipe($.debug({title: 'SASS autoprefixer'}))
				.pipe($.cleanCss())
				.pipe($.debug({title: 'SASS cleanCSS'}))
				.pipe($.rename({suffix: '.min', prefix : ''}))
				.pipe($.debug({title: 'SASS rename'}))
			.pipe($.sourcemaps.write())
			.pipe($.debug({title: 'sourcemapWrite'}))
			.pipe(gulp.dest(options.dest))
	};
};