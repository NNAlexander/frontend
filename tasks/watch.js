'use strict';

const gulp           = require('gulp');
const $              = require('gulp-load-plugins')();


module.exports =  function(options) {
	return function() {
		$.watch(options.watch.sass, gulp.series('sass'));
		$.watch(options.watch.pug, gulp.series('pug'));
		$.watch(options.watch.js, gulp.series('js'));
	};
};