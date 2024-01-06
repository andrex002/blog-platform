import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Likes } from '../../components/Likes/Likes';

import css from './ArticlesItem.module.scss';

export function ArticleItem({ post }) {
  const cutsText = (text, cut) => {
    text = text.trim();
    if (!text) return '';
    if (text.length <= cut) return text;
    let croppedText = text.substring(0, cut);
    croppedText = croppedText.substring(0, croppedText.lastIndexOf(' '));
    return `${croppedText}...`;
  };
  return (
    <li className={classNames([css.article, css.articlesItem])}>
      <div className={css.articleLeft}>
        <div className={css.articleTop}>
          <h2 className={css.articleTitle}>
            <Link to={`/articles/${post.slug}`} className={css.articleTitleLink} href="#">
              {cutsText(post.title, 50)}
            </Link>
          </h2>
          <Likes favoritesCount={post.favoritesCount} favorited={post.favorited} slug={post.slug} />
        </div>
        <div className={css.articleTags}>
          {post.tagList.map((tag, i) => (
            <div className={css.articleTag} key={i + tag}>
              {cutsText(tag, 30)}
            </div>
          ))}
        </div>
        <p className={css.articleText}>{cutsText(post.description, 300)}</p>
      </div>
      <div className={classNames([css.articleRight, css.author])}>
        <div className={css.authorInfo}>
          <div className={css.authorName}>{post.author.username}</div>
          <time className={css.authorPostDate} dateTime={format(new Date(post.updatedAt), 'yyyy-MM-d')}>
            {format(new Date(post.updatedAt), 'MMMM d, yyyy')}
          </time>
        </div>
        <img className={css.authorAvatar} src={post.author.image} width={46} height={46}></img>
      </div>
    </li>
  );
}

ArticleItem.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    favorited: PropTypes.bool,
    favoritesCount: PropTypes.number,
    description: PropTypes.string,
    author: PropTypes.shape({
      username: PropTypes.string,
    }),
    tagList: PropTypes.array,
    updatedAt: PropTypes.string,
  }),
};
