'use strict';

const gulp           = require('gulp');
const $              = require('gulp-load-plugins')();
const browserSync    = require('browser-sync').create();

module.exports =  function(options) {
	return function() {

		if(options.proxy) {
			browserSync.init({
				proxy: options.proxy,
				notify: false,
			});
		}

		if(options.server) {
			browserSync.init({
				server: options.server,
				notify: false,
			});
		}
		gulp.watch(options.srcWatch).on('change', browserSync.reload);

	};
};