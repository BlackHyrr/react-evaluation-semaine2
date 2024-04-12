import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async (postId) => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching comments for post: ${postId}`, error);
        }
    }
);

export const fetchAllComments = createAsyncThunk(
    "comments/fetchAllComments",
    async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/comments`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching comments`, error);
        }
    }
);

export const addComment = createAsyncThunk(
    "comments/addComment",
    async (comment) => {
        try {
            const response = await axios.post(`https://jsonplaceholder.typicode.com/comments`, {comment});
            return response.data;
        } catch (error) {
            console.error("Error adding comment:", error);
            return rejectWithValue(error.message);
        }
    }
);

const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        comment: {
            name: '',
            postId: 1,
            body: '',
            email: ''
        },
        comments: [],
        requestStatus: 'idle'
    },
    reducers: {
        setCommentName: (state, action) => {
            state.comment.name = action.payload;
        },
        setCommentBody: (state, action) => {
            state.comment.body = action.payload;
        },
        setCommentPostId: (state, action) => {
            state.comment.postId = action.payload;
        },
        setCommentEmail: (state, action) => {
            state.comment.email = action.payload;
        },
        addCommentInState: (state, action) => {
            const maxId = Math.max(...state.comments.map(comment => Number(comment.id)), 0);
            console.log(maxId);
            const newComment = {
                id: maxId + 1,
                postId: action.payload.postId,
                email: 'myemail@gmail.com',
                body: state.comment.body,
                name: state.comment.name
            };
            state.comments.push(newComment);
        },
        resetComment: (state) => {
            state.comment = {
                name: '',
                postId: 1,
                body: '',
                email: ''
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.comments = action.payload;
            state.requestStatus = 'fulfilled';
        }),
        builder.addCase(fetchAllComments.fulfilled, (state, action) => {
            state.comments = action.payload;
            state.requestStatus = 'fulfilled';
        }),
        builder.addCase(fetchComments.pending, (state, action) => {
            state.requestStatus = 'pending';
        }),
        builder.addCase(fetchComments.rejected, (state, action) => {
            state.requestStatus = 'rejected';
        }),
        builder.addCase(addComment.fulfilled, (state, action) => {
            state.comments.push(action.payload);
            state.requestStatus = 'fulfilled';
        }),
        builder.addCase(addComment.pending, (state, action) => {
            state.requestStatus = 'pending';
        }),
        builder.addCase(addComment.rejected, (state, action) => {
            state.requestStatus = 'rejected';
        });
    }
})

export const {
    setCommentName,
    setCommentBody,
    setCommentPostId,
    setCommentEmail,
    addCommentInState,
    resetComment
} = commentSlice.actions

export default commentSlice.reducer;