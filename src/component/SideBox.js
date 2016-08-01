import React from 'react';
import StoryList from 'es6!./StoryList';
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
        if (this.state.stories === null) return <div className="loading side-box" style={{height: '100%'}}></div>;
        return (
            <div className="side-box" onScroll={this.handleScroll} style={{height: '100%', width: '40%', overflowY: 'auto', overflowX: 'none'}}>
                <StoryList stories={this.state.stories} onScroll={this.handleScroll}/>
            </div>
        );
    }
})