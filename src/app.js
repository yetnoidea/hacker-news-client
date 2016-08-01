import polyfill from 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import SideBox from 'es6!./component/SideBox';

import StoryStore from 'es6!./stores/StoryStore';

ReactDOM.render(<SideBox />, getContainer());

function getContainer() {
    const id = 'container';
    let container = document.getElementById(id);

    if (container) return container;

    container = document.createElement('div');
    container.id = id;

    document.body.appendChild(container);

    return container;
}