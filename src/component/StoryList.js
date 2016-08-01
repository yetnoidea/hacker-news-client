import React from 'react';
import StoryBrief from 'es6!./StoryBrief';

export default ({ stories }) => {
    return (
        <ul className="list stories-list theme-border">
            {stories.map((story) => <StoryBrief story={story} key={story.id}/>)}
        </ul>
    );
};