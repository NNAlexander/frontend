'use strict';

const gulp           = require('gulp');
const $              = require('gulp-load-plugins')();


module.exports =  function(options) {
	return function() {
		$.watch(options.watch.sass, gulp.series('sass','sassRigger'));
		$.watch(options.watch.pug, gulp.parallel('pug','pug-php'));
		$.watch(options.watch.js, gulp.series('js'));
	};
};