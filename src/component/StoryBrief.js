import React from 'react';

export default ({ story }) => {
    const { id, type, author, timestamp, title, text, url, commentCount, score } = story;

    return (
        <li data-id={id} data-self="false" className="upvoted-false" data-type={type} id="story-{id}">
            <a href="#/article/{id}" className={type} data-hn={type}>
                <h3>{id} - {title}</h3>
                <span className="author">{author}</span>&nbsp; <span className="time-ago">{timestamp}</span>
                <span className="url">{url}</span>
            </a>
            <a href="#/comments/{id}" className="theme-bg-lighter-dark comments ">
                <i className="icon bubble-icon">{commentCount}</i>
                <span className="icon icon-thumbs-up upvote"></span>
                <span className="points">{score}</span>
            </a>
        </li>
    );
};