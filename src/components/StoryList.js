import React from 'react';

import StoryStore from 'es6!../stores/StoryStore';
import StoryAction from 'es6!../actions/StoryAction';

import StoryBrief from 'es6!./StoryBrief';
import Loader from 'es6!./Loader';

export default React.createClass({
    displayName: 'SideBox',

    getInitialState() {
        return { stories: null };
    },

    componentDidMount() {
        StoryStore.addChangeListener(this.updateView);
        StoryAction.loadInitialStories();
    },

    componentWillUnmount() {
        StoryStore.removeChangeListener(this.updateView);
    },

    updateView() {
        this.setState({ stories: StoryStore.stories });
    },

    handleScroll(event) {
        if (checkScrollToBottom(event.target, 20)) StoryAction.loadMoreStories();

        function checkScrollToBottom(scrollable, tolerance) {
            return scrollable.scrollHeight <= scrollable.scrollTop + scrollable.clientHeight + tolerance;
        }
    },

    render() {
        const { stories } = this.state;

        if (stories === null) 
            return (
                <div className="side-list loading">
                    <Loader event="loading">Loading...</Loader>;
                </div>
            );

        let event = 'loading';
        let text = '';

        if (StoryStore.noMoreData()) {
            event = 'loaded';
            text = 'no more data';
        }

        return (
            <div className="side-list" onScroll={this.handleScroll}>
                <ul className="stories-list">
                    {stories.map((story) => <StoryBrief story={story} key={story.id}/>)}
                </ul>
                <div className="loader-tips">
                    <Loader event={event}>{text}</Loader>
                </div>
            </div>
        );
    }
})