configModules();
startWithEntryModule();

function configModules() {
	var configs = {
		paths: {
			// runtime compilers
			text: 'lib/requirejs-text/text',
			es6: 'lib/requirejs-babel/es6',
			babel: 'lib/requirejs-babel/babel-5.8.34.min',
			// autoprefixer: 'lib/autoprefixer/autoprefixer',
			autoprefixer: 'https://rawgithub.com/ai/autoprefixer-rails/master/vendor/autoprefixer',

			// main libraries
			react: 'lib/react/react.min',
			'react-dom': 'lib/react/react-dom.min',
			'babel-polyfill': 'lib/babel-polyfill/browser-polyfill',
			flux: 'lib/flux/dist/Flux.min',
			EventEmitter: 'lib/EventEmitter/EventEmitter.min',
			classnames: 'lib/classnames/index',
			'normalize-less': 'lib/normalize-less/normalize'
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
				relativeUrls: true,
				plugins: [
					{
						name: 'autoprefixer',
						process: function (autoprefixer, source) {
							return autoprefixer.process(source).css;
						}
					}
				]
			}
		},
	    waitSeconds: 20
	};

	if (document.currentScript.dataset.env === 'development') {
		configs.paths.react = 'lib/react/react';
		configs.paths['react-dom'] = 'lib/react/react-dom';
		configs.paths.flux = 'lib/flux/dist/Flux',
		configs.paths.EventEmitter = 'lib/EventEmitter/EventEmitter';

		configs.config.less.env = 'development';
	}

	requirejs.config(configs);
}

function startWithEntryModule() {
	var count = 0;
	var completed = false;
	var toast = createToast();

	toast.show('0 module loaded.');

	requirejs.onResourceLoad = function (context, map, deps) {
		if (!completed) toast.show(pluralify((++ count) + ' module loaded.'));
	};

	require(
	    [
	        'es6!src/main'
	    ],
	    function () {
	    	completed = true;
	    	toast.hide();
	    }
	);

	function pluralify(text) {
		return text.replace(/\b(\d+?)\s[a-zA-Z]+?\b/, function (match, p1) {
			if (Number(p1) <= 1) return match;
			return match + 's';
		});
	}

	function createToast() {
		var container = document.createElement('div');
		container.style = 'position:absolute; z-index:100; margin:auto; top:0; bottom:0; left:0; right:0; width:200px; height:20px; line-height:20px; text-align:center;';
		document.body.appendChild(container);

		return {
			show: function (text) {
				container.textContent = text;
				container.style.display = 'block';
			},
			hide: function () {
				container.style.display = 'none';
			}
		}
	}
}
