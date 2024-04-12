import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsers = createAsyncThunk(
    "tasks/fetchAllUsers",
    async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
            return response.data;
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: []
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.users = action.payload
            })
    }

})

export const {

} = userSlice.actions

export default userSlice.reducer;