import { useParams } from 'react-router-dom';
import './PostForm.css';
import Form from '../../../components/Form/Form';
import postFormConfig from '../../../config/formConfig/postFormConfig';
import { useDispatch, useSelector } from 'react-redux';
import { addPostInState, addPosts, fetchPostWithId, resetPost, setPostBody, setPostTitle, updatePost } from '../../../store/Slice/postSlice';
import { selectPost, selectPostBody, selectPostTitle } from '../../../store/selectors';
import { useEffect } from 'react';

const PostForm = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const title = useSelector(selectPostTitle);
    const body = useSelector(selectPostBody);
    const post = useSelector(selectPost)

    useEffect(() => {
        if (postId) {
            dispatch(fetchPostWithId(postId));
        }
    }, [dispatch, postId]);

    useEffect(() => {
        if (post) {
            dispatch(setPostTitle(post.title));
            dispatch(setPostBody(post.body));
        } else {
            dispatch(resetPost());
        }
    }, [dispatch, post]);

    const handleAddPost = () => {
        if(postId) {
            dispatch(updatePost(post));
        } else {
            dispatch(addPostInState());
            dispatch(addPosts(post))
        }

        resetPost();
    }

    const postConfig = postFormConfig(title, body);

    return (
        <div className='post-form'>
            <Form 
                formConfig={postConfig} 
                addEntityAction={handleAddPost} 
                actions={{setPostTitle, setPostBody}} 
            />
        </div>
    );
}

export default PostForm;