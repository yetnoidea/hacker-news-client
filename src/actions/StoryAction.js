import AppDispatcher from 'es6!../dispatchers/AppDispatcher';
import ActionTypes from 'es6!../constants/ActionTypes';

export default {
    loadInitialStories() {
        AppDispatcher.dispatch({
            type: ActionTypes.LOAD_STORIES_INITIALLY
        })
    },

    loadMoreStories() {
        AppDispatcher.dispatch({
            type: ActionTypes.LOAD_MORE_STORIES
        })
    }
}