import React from 'react';
import './Comment.css';

const Comment = ({ comment }) => {
    return (
        <div className={'comment'}>
            <h2>{comment.name}</h2>
            <p className={'comment-email'}>{comment.email}</p>
            <p className={'comment-body'}>{comment.body}</p>
        </div>
    );
};

export default Comment;