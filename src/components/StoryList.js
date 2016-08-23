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
        this.loadingMore = false;
        this.setState({ stories: StoryStore.stories });
    },

    handleScroll(event) {
        if (this.loadingMore) return;
        if (!checkScrollToBottom(event.target, 20)) return;

        this.loadingMore = true;
        StoryAction.loadMoreStories();

        function checkScrollToBottom(scrollable, tolerance) {
            return scrollable.scrollHeight <= scrollable.scrollTop + scrollable.clientHeight + tolerance;
        }
    },

    render() {
        const { stories } = this.state;

        if (stories === null) 
            return (
                <div className="side-list loading">
                    <Loader event="loading">Loading...</Loader>
                </div>
            );

        const noMoreData = StoryStore.noMoreData();
        const event = noMoreData ? 'loaded': 'loading';
        const text = noMoreData ? 'no more data' : '';

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