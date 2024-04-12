import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllPosts = createAsyncThunk(
    "posts/fetchAllPosts",
    async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching posts`, error);
        }
    }
);

export const fetchPostWithId = createAsyncThunk(
    "posts/fetchPostWithId", // Corrected action type
    async (postId) => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching post with id:${postId}`, error);
        }
    }
);

export const addPosts = createAsyncThunk(
    "posts/addPost",
    async (post) => {
        try {
            const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {post});
            return response.data;
        } catch (error) {
            console.error("Error adding post:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (postId) => {
        try {
            await axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
            return {id: postId};
        } catch (error) {
            console.error("Error deleting post:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async (post) => {
        try {
            const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, post);
            return response.data;
        } catch (error) {
            console.error("Error updating post:", error);
            return rejectWithValue(error.message);
        }
    }
);


const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: {
            userId: 1,
            title: '',
            body: '',
        },
        posts: [],
        requestStatus: 'idle'
    },
    reducers: {
        setPostTitle: (state, action) => {
            state.post.title = action.payload;
        },
        setPostBody: (state, action) => {
            state.post.body = action.payload;
        },
        updatePostInState: (state, action) => {
            const index = state.posts.findIndex(post => post.id === action.payload.id);
            state.posts[index] = action.payload;
        },
        addPostInState: (state, action) => {
            const maxId = Math.max(...state.posts.map(post => Number(post.id)), 0);
            const newPost = {
                userId: 1,
                id: maxId + 1,
                title: state.post.title,
                body: state.post.body,
            };
            state.posts.push(newPost);
        },
        resetPost: (state, action) => {
            state.post = {
                userId: 1,
                title: '',
                body: '',
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
            state.posts = action.payload,
            state.requestStatus = 'fulfilled'
        }),
        builder.addCase(fetchAllPosts.pending, (state, action) => {
            state.requestStatus = 'pending'
        }),
        builder.addCase(fetchAllPosts.rejected, (state, action) => {
            state.requestStatus = 'rejected'
        }),
        builder.addCase(deletePost.fulfilled, (state, action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload.id);
        }),
        builder.addCase(updatePost.fulfilled, (state, action) => {
            const index = state.posts.findIndex(post => post.id === action.payload.id);
            state.posts[index] = action.payload;
        }),
        builder.addCase(addPosts.fulfilled, (state, action) => {
            state.posts.push(action.payload);
        });;
    }

})

export const {
    setPostTitle,
    setPostBody,
    addPostInState,
    updatePostInState,
    resetPost
} = postSlice.actions

export default postSlice.reducer;