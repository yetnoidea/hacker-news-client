import React from 'react';

import { formatTime } from 'es6!../utils/format';

export default ({ comment }) => {
    const { by, time, text } = comment;

    return (
        <div className="comment">
            <div className="comment-meta">
                <span className="author">{by}</span>
                <span className="time">{formatTime(time * 1000)}</span>
            </div>
            <div className="comment-text" dangerouslySetInnerHTML={{ __html: text }}></div>
        </div>
    );
};