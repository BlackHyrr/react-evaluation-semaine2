import { useSelector } from 'react-redux';
import './Post.css';
import { selectPostFromId, selectUserById} from '../../store/selectors';
import { Link } from 'react-router-dom';

const Post = ({ postId }) => {
    const post = useSelector(state => selectPostFromId(state, postId));
    const user = useSelector(state => post && selectUserById(state, post.userId));

    if (!post || !user) {
        return <div>Loading...</div>;
    }
    
    return (
        <div className='post'>
            <Link to={`/detail-post/${post.id}`}>
                <h2>{post.title}</h2>
            </Link>
            <p>Posted by: {user.name}</p>
            <p>{post.body}</p>
        </div>
    );
}

export default Post;