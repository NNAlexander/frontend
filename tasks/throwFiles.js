'use strict';

const gulp           = require('gulp');

module.exports =  function(options) {
	return function( done) {
		var buildHTML   = gulp.src(options.src.html).pipe(gulp.dest(options.dest.html));

		var BuildCSS    = gulp.src(options.src.css).pipe(gulp.dest(options.dest.css));

		var buildJS     = gulp.src(options.src.js).pipe(gulp.dest(options.dest.js));

		var buildImg    = gulp.src(options.src.img).pipe(gulp.dest(options.dest.img));

		var buildFonts  = gulp.src(options.src.fonts).pipe(gulp.dest(options.dest.fonts));

		var buildFonts  = gulp.src(options.src.php).pipe(gulp.dest(options.dest.php));

		var buildOther  = gulp.src(options.src.other).pipe(gulp.dest(options.dest.other));
		done();
	}
};
