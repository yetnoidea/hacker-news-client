import AppDispatcher from 'es6!../dispatchers/AppDispatcher';
import ChangeableStore from 'es6!./ChangeableStore';
import SimpleHTTPClient from 'es6!../net/SimpleHTTPClient';
import ActionTypes from 'es6!../constants/ActionTypes';

const COMMENTS = Symbol('comments');
const IDS = Symbol('ids');
const REQUESTED_STORIES = Symbol('requested-stories');

class CommentStore extends ChangeableStore {
    constructor() {
        super();
        this[COMMENTS] = {};
        this[REQUESTED_STORIES] = {};
    }

    hasComment(id) {
        return Reflect.apply(Object.hasOwnProperty, this[COMMENTS], [id]);
    }

    getCommentById(id) {
        return this[COMMENTS][id];
    }

    addComment(id, comment) {
        this[COMMENTS][id] = comment;
    }

    didCommentsRequestedByStoryId(id) {
        return Boolean(this[REQUESTED_STORIES][id]);
    }
}

const store = new CommentStore();

export default store;

store.dispatchToken = AppDispatcher.register((action) => {
    switch (action.type) {
        case ActionTypes.LOAD_COMMENTS_FOR_STORY:
            loadCommentsForStory(action);
            break;
    }
});

const client = new SimpleHTTPClient();
client.middleware(JSON.parse);

function loadCommentsForStory(action) {
    const { story } = action;
    const { id, kids } = story;

    loadCommentsByIds(kids)
        .then(
            (shouldNotify) => {
                if (!shouldNotify) return;
                store[REQUESTED_STORIES][id] = true;
                store.emitChange();
            }, 
            (err) => {
                console.error(err);
            }
        );
}

function loadCommentsByIds(ids) {
    let requested = false;

    if (!Array.isArray(ids)) return Promise.resolve(null);

    const promises = ids.map((id) => {
        if (store.hasComment(id)) return null;

        return requestComment(id)
            .then((comment) => {
                if (!comment) return null;
                requested = true;
                return loadCommentsByIds(comment.kids);
            });
    });

    return Promise.all(promises).then(() => requested);
}

function requestComment(id) {
    return client
        .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then((comment) => {
            store.addComment(id, comment);
            return comment;
        })
        .catch((err) => {
            console.error(err);
            return null;
        });
}
