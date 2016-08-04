var configs = {
	paths: {
		text: 'lib/text/text',
		es6: 'lib/requirejs-babel/es6',
		babel: 'lib/requirejs-babel/babel-5.8.34.min',
		react: 'lib/react/react.min',
		'react-dom': 'lib/react/react-dom.min',
		'babel-polyfill': 'lib/babel/browser-polyfill.min',
		flux: 'lib/flux/dist/Flux.min',
		EventEmitter: 'lib/eventEmitter/EventEmitter.min',
		classnames: 'lib/classnames/index'
	},
	packages: [
		{
			name: 'less',
			location: 'lib/require-less',
			main: 'less'
		}
	],
	config: {
		less: {
			relativeUrls: true
		}
	},
    waitSeconds: 20
};

if (document.currentScript.dataset.env === 'development') {
	configs.paths.react = 'lib/react/react';
	configs.paths['react-dom'] = 'lib/react/react-dom';
}

requirejs.config(configs);

require(
    [
        'es6!src/main'
    ]
);