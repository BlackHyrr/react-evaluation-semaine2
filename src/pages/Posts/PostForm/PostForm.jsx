import { useParams } from 'react-router-dom';
import './PostForm.css';
import Form from '../../../components/Form/Form';
import postFormConfig from '../../../config/formConfig/postFormConfig';
import { useDispatch, useSelector } from 'react-redux';
import { addPostInState, fetchPostWithId, resetPost, setPostBody, setPostTitle, updatePost, updatePostInState } from '../../../store/Slice/postSlice';
import { selectPost, selectPostBody, selectPostTitle } from '../../../store/selectors';
import { useEffect } from 'react';

const PostForm = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const title = useSelector(selectPostTitle);
    const body = useSelector(selectPostBody);
    const post = useSelector(selectPost)

    // I was trying to get the post from the store to display it in the form... but it didn't work ¯\_(ツ)_/¯
    useEffect(() => {
        if (postId) {
            dispatch(fetchPostWithId(postId));
        }
        return () =>  {
            dispatch(resetPost());
        }
    }, [dispatch, postId]);

    const handleAddPost = () => {
        if(postId) {
            dispatch(updatePostInState(post));
            dispatch(updatePost(post));
        } else {
            dispatch(addPostInState(post));
            // dispatch(addPosts(post));  
            /*
            * The post is added twice if I do that and I don't know why
            * There are no problems for the comments despite me doing the same thing (╥﹏╥)
            */
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