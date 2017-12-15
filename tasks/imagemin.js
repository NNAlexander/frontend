'use strict';

const gulp           = require('gulp');
const $              = require('gulp-load-plugins')();


module.exports =  function(options) {
	return function() {
		return gulp.src(options.src)
			.pipe($.plumber({
				errorHandler: $.notify.onError( function(err) {
					return {
						title: 'imageMin',
						message: err.message
					};
				})
			}))
			.pipe($.debug({title: 'src'}))
			.pipe($.cache($.imagemin([
				$.imagemin.gifsicle({interlaced: true}),
				$.imagemin.jpegtran({progressive: true}),
				$.imagemin.optipng({optimizationLevel: 5}),
				// $.imagemin.svgo({
				// 	plugins: [
				// 		{removeViewBox: true},
				// 		{cleanupIDs: false}
				// 	]
				// })
			])))
			.pipe($.debug({title: 'imagemin'}))
			.pipe(gulp.dest(options.dest));
	};
};