'use strict';

const gulp           = require('gulp');

module.exports =  function(options) {
	return function( done) {

		var buildFonts  = gulp.src(options.src.fonts)
			.pipe(gulp.dest(options.dest.fonts));

		var buildPHP    = gulp.src(options.src.php)
			.pipe(gulp.dest(options.dest.php));

		var buildOther  = gulp.src(options.src.other)
			.pipe(gulp.dest(options.dest.other));
		done();
	}
};
