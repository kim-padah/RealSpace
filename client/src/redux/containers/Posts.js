import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { listPosts } from '../modules/posts';
import PostList from '../../components/post/PostList';

const PostListContainer = () => {
  const { username } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector((state) => {
    return {
      posts: state.posts.posts,
      error: state.posts.error,
      loading: state.loading['post/LIST_POSTS'],
      user: state.user.user,
    };
  });

  useEffect(() => {
    const tag = searchParams.get('tag');
    const page = 1;
    dispatch(listPosts({ tag, username, page }));
  }, [dispatch, searchParams, username]);

  return (
    <PostList loading={loading} error={error} posts={posts} showWriteButton={user} />
  );
};

export default PostListContainer;
