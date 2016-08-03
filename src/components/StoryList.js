import React from 'react';
import StoryBrief from 'es6!./StoryBrief';
import StoryStore from 'es6!../stores/StoryStore';
import StoryAction from 'es6!../actions/StoryAction';

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
                    <div className="loader">Loading...</div>
                </div>
            );
        
        return (
            <div className="side-list" onScroll={this.handleScroll}>
                <ul className="stories-list">
                    {stories.map((story) => <StoryBrief story={story} key={story.id}/>)}
                </ul>
            </div>
        );
    }
})