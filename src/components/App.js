import React from 'react';

import normalize from 'less!normalize-less';
import style from 'less!../styles/main';

import StoryList from 'es6!./StoryList';
import StoryBox from 'es6!./StoryBox';

export default () => {
    return (
        <div>
            <StoryList />
            <StoryBox/>
        </div>
    );
}