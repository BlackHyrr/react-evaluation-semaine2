import {configureStore} from "@reduxjs/toolkit";
import postSlice from "./Slice/postSlice";
import userSlice from "./Slice/userSlice";
import commentSlice from "./Slice/commentSlice";

const store = configureStore({
    reducer: {
        post: postSlice,
        user: userSlice,
        comment: commentSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    ])
})

export default store