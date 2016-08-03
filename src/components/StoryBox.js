import React from 'react';

import StoryStore from 'es6!../stores/StoryStore';
import CommentStore from 'es6!../stores/CommentStore';
import CommentAction from 'es6!../actions/CommentAction';

import CommentList from 'es6!./CommentList';

export default React.createClass({
    displayName: 'StoryBox',

    getInitialState() {
        return { story: null };
    },

    componentDidMount() {
        window.addEventListener('hashchange', this.showStory, false);
        CommentStore.addChangeListener(this.showComments);
    },

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.showStory, false);
        CommentStore.removeChangeListener(this.showComments);
    },

    showStory() {
        const storyId = location.hash.replace(/^\#\//, '');
        const story = StoryStore.getStoryById(storyId);

        if (!story) return;

        this.setState({ story });
        this.loadComments(story);
    },

    loadComments(story) {
        CommentAction.loadComments(story);
    },

    showComments() {
        this.forceUpdate();
    },

    render() {
        const { story } = this.state;

        if (story === null) return <div className="story-box"></div>;

        const { id, type, by, time, title, text, url, descendants, score, kids } = story;
        let list = null;
        let loading = false;

        if (isNonEmpty(kids)) {
            if (CommentStore.didCommentsRequestedByStoryId(id)) list = <CommentList ids={kids} />;
            else {
                loading = true;
                list = <div className="loader">Loading...</div>;
            }
        }

        return (
            <div className="story-box">
                <header>
                    <h3 className="title">{title}</h3>
                    <h6 className="url"><a href={url}>{url}</a></h6>
                </header>
                <article>
                    {/* <iframe src={url} /> */}
                </article>
                <footer {...(loading ? {className: 'loading'} : {})}>
                    {list}
                </footer>
            </div>
        );
    }
});

function isNonEmpty(array) {
    return Array.isArray(array) && array.length > 0;
}