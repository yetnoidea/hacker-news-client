import React from 'react';

import CommentStore from 'es6!../stores/CommentStore';

import Comment from 'es6!./Comment';

const CommentList = ({ ids }) => {
    if (isEmptyIds(ids)) return null;

    return (
        <ul className="comment-list">
            {ids.map((id) => {
                const comment = CommentStore.getCommentById(id);

                if (!comment) return null;

                return (
                    <li className="comment" data-id={id} key={id}>
                        <Comment comment={comment} />
                        <CommentList ids={comment.kids} />
                    </li>
                );
            })}
        </ul>
    );
};

export default CommentList;

function isEmptyIds(ids) {
    return !(ids && ids.length > 0);
}