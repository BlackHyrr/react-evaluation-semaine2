export const selectPostFromId = (state, postId) => state.post.posts.find(post => post.id === postId);
export const selectPost = state => state.post.post;
export const selectAllPosts = state => state.post.posts;
export const selectPostTitle = state => state.post.post.title;
export const selectPostBody = state => state.post.post.body;

export const selectAllUsers = state => state.user.users;
export const selectUserById = (state, userId) => state.user.users.find(user => user.id === userId);

export const selectAllComments = state => state.comment.comments;
export const selectComment = state => state.comment.comment;
export const selectCommentById = (state, commentId) => state.comment.comments.find(comment => comment.id === commentId);
export const selectCommentsByPostId = (state, postId) => state.comment.comments.filter(comment => comment.postId === postId);
export const selectCommentContent = state => state.comment.comment.content;