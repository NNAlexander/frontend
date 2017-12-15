'use strict';

const gulp           = require('gulp');
const $              = require('gulp-load-plugins')();
const browserSync    = require('browser-sync').create();

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
				.pipe($.debug({title: 'SASS-Build src'}))
				.pipe($.sass())
				.pipe($.debug({title: 'SASS-Build Total'}))
				.pipe($.autoprefixer([options.autoprefixer]))
				.pipe($.debug({title: 'SASS-Build autoprefixer'}))
				.pipe($.groupCssMediaQueries())
				.pipe($.debug({title: 'group-css-media-queries'}))
				.pipe($.cleanCss())
				.pipe($.debug({title: 'SASS-Build cleanCSS'}))
				.pipe($.rename({suffix: '.min', prefix : ''}))
				.pipe($.debug({title: 'SASS-Build rename'}))
				.pipe(gulp.dest(options.dest));
	};
};