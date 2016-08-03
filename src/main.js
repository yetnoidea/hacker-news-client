import polyfill from 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import StoryStore from 'es6!./stores/StoryStore';
import CommentStore from 'es6!./stores/CommentStore';

import App from 'es6!./components/App';

import style from 'less!./styles/main';

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