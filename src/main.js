import polyfill from 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import App from 'es6!./components/App';

ReactDOM.render(<App />, getContainer());

function getContainer() {
    const id = 'container';
    let container = document.getElementById(id);

    if (container) return container;

    container = document.createElement('div');
    container.id = id;

    document.body.appendChild(container);

    return container;
}