import { Pagination, Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { Notification } from '../Notification/Notification';
import { getPosts } from '../../store/blogSlice';
import { ArticleItem } from '../ArticlesItem/ArticlesItem';

import css from './ArticlesList.module.scss';

function ArticlesList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts(currentPage));
  }, []);

  const { posts, loading, currentPage, totalPosts, error } = useSelector((state) => state.blog);
  const onLoadPageArticles = (page) => {
    dispatch(getPosts(page));
  };
  return (
    <section className={css.articles}>
      {error && <Notification>{error}</Notification>}
      {loading ? (
        <Spin size="large" className={css.articlesSpin} />
      ) : (
        <ul className={css.articlesList}>
          {posts.map((post, i) => {
            return <ArticleItem key={i + post.slug} post={post} />;
          })}
        </ul>
      )}

      <Pagination
        className={css.articlesPagination}
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
