configModules();
startWithEntryModule();

function configModules() {
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
}

function startWithEntryModule() {
	var count = 0;
	var completed = false;
	var toast = createToast();

	toast.show(getToastText(0));

	requirejs.onResourceLoad = function (context, map, deps) {
		if (!completed) toast.show(getToastText(++ count));
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

	function getToastText(moduleCount) {
		if (moduleCount > 1) return moduleCount + ' modules loaded.';
		return moduleCount + ' module loaded';
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
