import AppDispatcher from 'es6!../dispatchers/AppDispatcher';
import ActionTypes from 'es6!../constants/ActionTypes';

export default {
    loadComments(story) {
        AppDispatcher.dispatch({
            type: ActionTypes.LOAD_COMMENTS_FOR_STORY,
            story
        })
    }
}