import React from 'react';

import { formatTime } from 'es6!../utils/format';

export default ({ story }) => {
    const { id, type, by, time, title, text, url, descendants, score } = story;

    return (
        <li className="story-brief" data-id={id} data-type={type}>
            <a href= {`#/${id}`} className="hot-area">
                <div className="brief" data-hn={type}>
                    <h3 title={title}>{title}</h3>
                    <span className="author">{by}</span>
                    <span className="time-ago">{formatTime(time * 1000)}</span>
                    {url && <span className="url" title={url}>{url}</span>}
                </div>
                <div className="comments">
                    <span className="icon descendants">{descendants}</span>
                    <span className="icon score">{score}</span>
                </div>
            </a>
        </li>
    );
};
