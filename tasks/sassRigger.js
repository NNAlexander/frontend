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
						title: 'SASS Rigger ',
						message: err.message
					};
				})
			}))
			.pipe($.debug({title: 'SASS Rigger src'}))
			.pipe($.sass())
			.pipe($.debug({title: 'SASS Rigger  Total'}))
			.pipe($.autoprefixer([options.autoprefixer]))
			.pipe($.debug({title: 'SASS Rigger  autoprefixer'}))
			.pipe($.cleanCss())
			.pipe($.debug({title: 'SASS Rigger cleanCSS'}))
			.pipe($.rename({suffix: '.min', prefix : ''}))
			.pipe($.debug({title: 'SASS Rigger rename'}))
			.pipe(gulp.dest(options.dest))
			// .pipe(browserSync.reload({stream: true}));
	};
};