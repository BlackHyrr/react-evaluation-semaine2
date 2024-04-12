import React, { useEffect } from 'react';
import './home.css';
import Post from '../../components/Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllPosts } from '../../store/selectors';
import { fetchAllPosts } from '../../store/Slice/postSlice';
import { fetchAllUsers } from '../../store/Slice/userSlice';

const Home = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);
    const isLoading = useSelector(state => state.post.isLoading); 

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    useEffect(() => {
        if(posts.length === 0) {
            dispatch(fetchAllPosts());
        }
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    console.log(posts)
    return (
        <div>
            <h1>Homepage</h1>
            <div className='post-list'>
                {posts.map(post => {
                    return <Post key={post.id} postId={post.id} />;
                })}
            </div>
        </div>
    );
};

export default Home;