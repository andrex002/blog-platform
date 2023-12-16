import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { Spin } from 'antd';
import Markdown from 'react-markdown';

import { Notification } from '../Notification/Notification';
import { getPost } from '../../store/blogSlice';
import './ArticlePage.scss';

const ArticlePage = ({ slug }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPost(slug));
  }, []);
  const { currentPost, loading, error } = useSelector((state) => state.blog);

  if (!loading && currentPost !== null) {
    return (
      <section className="article-full">
        <div className="article-full__body">
          <div className="article">
            <div className="article__left">
              <div className="article__top">
                <h1 className="article__title">{currentPost.title}</h1>
                <div className="article__likes">{currentPost.favoritesCount}</div>
              </div>
              <div className="article__tags">
                {currentPost.tagList &&
                  currentPost.tagList.map((tag) => (
                    <div className="article__tag" key={tag}>
                      {tag}
                    </div>
                  ))}
              </div>
              <p className="article__text">{currentPost.description}</p>
            </div>
            <div className="article__right author">
              <div className="author__info">
                <div className="author__name">{currentPost.author.username}</div>
                <div className="author__post-date">{format(new Date(currentPost.updatedAt), 'MMMM d, yyyy')}</div>
              </div>
              <img className="author__avatar" src={currentPost.author.image} width={46} height={46} />
            </div>
          </div>
          <div className="article-full__content">
            <Markdown>{currentPost.body}</Markdown>
          </div>
        </div>
      </section>
    );
  } else if (error) {
    return <Notification>{error}</Notification>;
  }
  return <Spin size="large" className="articles__spin" />;
};

export default ArticlePage;
