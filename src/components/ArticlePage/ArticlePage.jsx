import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Spin, Popconfirm } from 'antd';
import Markdown from 'react-markdown';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Notification } from '../Notification/Notification';
import { getPost, deletePost } from '../../store/blogSlice';
import { Likes } from '../../components/Likes/Likes';

import css from './ArticlePage.module.scss';

const ArticlePage = ({ slug, history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(slug));
  }, []);
  const { currentPost, user, loading, error } = useSelector((state) => state.blog);

  const onDeleteArticle = () => {
    dispatch(deletePost(slug));
    history.push('/');
  };
  if (!loading && currentPost !== null) {
    return (
      <section className={css.articleFull}>
        <div className={css.body}>
          <div className={css.article}>
            <div className={css.articleLeft}>
              <div className={css.articleTop}>
                <h1 className={css.articleTitle}>{currentPost.title}</h1>
                <Likes
                  favoritesCount={currentPost.favoritesCount}
                  favorited={currentPost.favorited}
                  slug={currentPost.slug}
                />
              </div>
              <div className={css.articleTags}>
                {currentPost.tagList &&
                  currentPost.tagList.map((tag) => (
                    <div className={css.articleTag} key={tag}>
                      {tag}
                    </div>
                  ))}
              </div>
              <p className={css.articleText}>{currentPost.description}</p>
            </div>
            <div className={css.articleRight}>
              <div className={css.author}>
                <div className={css.authorInfo}>
                  <div className={css.authorName}>{currentPost.author.username}</div>
                  <div className={css.authorPostDate}>{format(new Date(currentPost.updatedAt), 'MMMM d, yyyy')}</div>
                </div>
                <img className={css.authorAvatar} src={currentPost.author.image} width={46} height={46} />
              </div>
              {user.username === currentPost.author.username && (
                <div className={css.editBtns}>
                  <Popconfirm
                    title="Are you sure to delete this article?"
                    okText="Yes"
                    cancelText="No"
                    placement="rightTop"
                    onConfirm={onDeleteArticle}
                  >
                    <button className={classNames([css.editBtn, css.editBtnDel])} type="button">
                      Delete
                    </button>
                  </Popconfirm>
                  <Link
                    to={`/articles/${slug}/edit`}
                    className={classNames([css.editBtn, css.editBtnEdit])}
                    type="button"
                  >
                    Edit
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className={css.articleFullContent}>
            <Markdown>{currentPost.body}</Markdown>
          </div>
        </div>
      </section>
    );
  } else if (error) {
    return <Notification>{error}</Notification>;
  }
  return <Spin size="large" className={css.articlesSpin} />;
};

ArticlePage.propTypes = {
  slug: PropTypes.string,
  history: PropTypes.object,
};

export default ArticlePage;
