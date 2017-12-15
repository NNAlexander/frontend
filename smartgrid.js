var smartgrid      = require('smart-grid');

/* It's principal settings in smart grid project */
var settings = {
	filename: '_smart-grid',
	outputStyle: 'sass', /* less || scss || sass || styl */
	columns: 12, /* number of grid columns */
	offset: '30px', /* gutter width px || % */
	mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
	container: {
		maxWidth: '1280px', /* max-width оn very large screen */
		fields: '30px' /* side fields */
	},
	breakPoints: {
		xlg: {
			width: '1921px', /* -> @media (max-width: 1200px) */
			fields: '30px'
		},
		lg: {
			width: '1200px', /* -> @media (max-width: 1200px) */
			fields: '30px'
		},
		md: { 
			width: '992px',
			fields: '30px'
		},
		sm: {
			width: '768px',
			fields: '15px' /* set fields only if you want to change container.fields */
		},
		xs: {
			width: '576px',
			fields: '15px'
		}
	/* 
	We can create any quantity of break points.

	some_name: {
		width: 'Npx',
		fields: 'N(px|%|rem)',
		offset: 'N(px|%|rem)'
	}
	*/
	},
	"properties" : [], 
	"tab": "	",
	"oldSizeStyle": false
};

smartgrid('app/libs', settings);
