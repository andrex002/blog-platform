import { Pagination, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import { Notification } from '../Notification/Notification';
import { getPosts } from '../../store/blogSlice';
import { ArticleItem } from '../ArticlesItem/ArticlesItem';
import './ArticlesList.scss';

function ArticlesList() {
  const dispatch = useDispatch();
  const { posts, loading, currentPage, totalPosts, error } = useSelector((state) => state.blog);
  const onLoadPageArticles = (page) => {
    dispatch(getPosts(page));
  };
  return (
    <section className="articles">
      {error && <Notification>{error}</Notification>}
      {loading ? (
        <Spin size="large" className="articles__spin" />
      ) : (
        <ul className="articles__list">
          {posts.map((post, i) => {
            return <ArticleItem key={i + post.slug} post={post} />;
          })}
        </ul>
      )}

      <Pagination
        className="articles__pagination"
        defaultCurrent={1}
        current={currentPage}
        total={totalPosts}
        defaultPageSize={5}
        showSizeChanger={false}
        onChange={onLoadPageArticles}
      />
    </section>
  );
}

export default ArticlesList;
