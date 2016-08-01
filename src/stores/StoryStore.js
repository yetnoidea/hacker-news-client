import AppDispatcher from 'es6!../dispatchers/AppDispatcher';
import ChangeableStore from 'es6!./ChangeableStore';
import SimpleHTTPClient from 'es6!../net/SimpleHTTPClient';
import ActionTypes from 'es6!../constants/ActionTypes';
import Selector from 'es6!../selectors/Selector';

const STORIES = Symbol('stories');
const IDS = Symbol('ids');
const READ_CURSOR = Symbol('read-cursor');
const READ_STEP = Symbol('read-step');

class StoryStore extends ChangeableStore {
    constructor() {
        super();
        this[STORIES] = {};
        this[IDS] = [];
        this[READ_CURSOR] = 0;
        this[READ_STEP] = 20;
    }

    get readCursor() {
        return this[READ_CURSOR];
    }

    get step() {
        return this[READ_STEP];
    }

    get stories() {
        return this[IDS].slice(0, this[READ_CURSOR]).map((id) => this[STORIES][id]);
    }

    noMoreData() {
        return this[READ_CURSOR] >= this[IDS].size
    }

    init(ids) {
        this[IDS] = ids.slice();
    }

    addStory(id, story) {
        this[STORIES][id] = story;
    }

    nextBatch() {
        return this[IDS].slice(this[READ_CURSOR], this[READ_CURSOR] + this[READ_STEP]);
    }

    stepForward() {
        this[READ_CURSOR] = Math.min(this[READ_CURSOR] + this[READ_STEP], this[IDS].length);
    }
}

const store = new StoryStore();

export default store;

store.dispatchToken = AppDispatcher.register((action) => {
    switch (action.type) {
        case ActionTypes.LOAD_STORIES_INITIALLY:
            loadStoriesInitially(action);
            break;
        case ActionTypes.LOAD_MORE_STORIES:
            loadMoreStories(action);
            break;
        case ActionTypes.SELECT_STORY:
            break;
    }
});

const client = new SimpleHTTPClient();
client.middleware(JSON.parse);

function loadStoriesInitially(action) {
    client
        .get('https://hacker-news.firebaseio.com/v0/newstories.json')
        .then((ids) => {
            store.init(ids);
            loadMoreStories();
        });
}

function loadMoreStories(action) {
    if (store.noMoreData()) return;

    const requestIds = store.nextBatch();
    const promises = requestIds.map(requestStory);
    store.stepForward();

    Promise.all(promises).then(() => store.emitChange());
}

function requestStory(id) {
    return client
        .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then((story) => {
            store.addStory(id, story);
            return story;
        })
        .catch((err) => {
            console.error(err);
            return null;
        });
}
