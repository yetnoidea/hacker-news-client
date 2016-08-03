var require = {
		paths: {
				text: 'lib/text/text',
				es6: 'lib/requirejs-babel/es6',
				babel: 'lib/requirejs-babel/babel-5.8.34.min',
				react: 'lib/react/react.min',
				'react-dom': 'lib/react/react-dom.min',
				'babel-polyfill': 'lib/babel/browser-polyfill.min',
				flux: 'lib/flux/dist/Flux.min',
				EventEmitter: 'lib/eventEmitter/EventEmitter.min'
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
		}
};

console.log('APP_ENV: ', window.APP_ENV);

if (window.APP_ENV === 'development') {
		require.paths.react = 'lib/react/react';
		require.paths['react-dom'] = 'lib/react/react-dom';
}