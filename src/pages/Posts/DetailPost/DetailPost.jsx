import { useDispatch, useSelector } from "react-redux";
import './DetailPost.css';
import Post from "../../../components/Post/Post";
import { Link, useParams } from 'react-router-dom';
import { addComment, addCommentInState, fetchComments, resetComment, setCommentBody, setCommentName } from "../../../store/Slice/commentSlice";
import { selectComment, selectCommentsByPostId } from "../../../store/selectors";
import { useEffect } from "react";
import Comment from "../../../components/Comment/Comment";
import commentFormConfig from "../../../config/formConfig/commentFormConfig";
import Form from "../../../components/Form/Form";

const DetailPost = () => {
    let { postId } = useParams();
    postId = Number(postId);
    const selectCommentsForPost = (state) => selectCommentsByPostId(state, postId);
    const comments = useSelector(selectCommentsForPost);
    const comment = useSelector(selectComment);
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        // Necessary ? Somehow, I keep the scroll position when I go from Home to DetailPost...
    }, []);

    useEffect(() => {
        dispatch(fetchComments(postId));
    }, [dispatch, postId]);
    
    const handleAddComment = () => {
        dispatch(addCommentInState({ postId }))
        dispatch(addComment());
        dispatch(resetComment())
    }

    const commentConfig = commentFormConfig(comment.name, comment.body);

    return(
        <div className={'detail-post'}>
            <h1>Detail Post</h1>
            <Post postId={postId}/>
            <Link to={`/add-post/${postId}`}>
                <span className={'btn modify-btn'}>Edit</span>
            </Link>
            <div className={'comment-list'}>
                <h2>Comments</h2>
                {comments.length === 0 ? (
                    <p>No comments yet</p>
                ) : (
                    <p>{comments.length} commentaire(s)</p>
                )}
                
                {comments && comments.map(comment => <Comment key={comment.id} comment={comment} />)}
            </div>
            
            <Form 
                formConfig={commentConfig} 
                addEntityAction={handleAddComment}
                actions={{setCommentName, setCommentBody}}
            />
        </div>
    )
}

export default DetailPost;