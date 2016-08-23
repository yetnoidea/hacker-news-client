import React from 'react';

import { formatTime } from 'es6!../utils/format';

export default ({ comment }) => {
    const { by, time, text, deleted } = comment;

    return (
        <div className="comment">
            <div className="comment-meta">
                <span className="author">{by || '[someone]'}</span>
                <span className="time">{formatTime(time * 1000)}</span>
            </div>
            <div className="comment-text" dangerouslySetInnerHTML={{ __html: (deleted ? '[deleted]' : text) }}></div>
        </div>
    );
};