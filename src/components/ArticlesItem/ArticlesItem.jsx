import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './ArticlesItem.scss';

export function ArticleItem({ post }) {
  return (
    <li className="articles__item article">
      <div className="article__left">
        <div className="article__top">
          <h2 className="article__title">
            <Link to={`/articles/${post.slug}`} className="article__title-link" href="#">
              {post.title}
            </Link>
          </h2>
          <div className="article__likes">{post.favoritesCount}</div>
        </div>
        <div className="article__tags">
          {post.tagList.map((tag, i) => (
            <div className="article__tag" key={i + tag}>
              {tag}
            </div>
          ))}
        </div>
        <p className="article__text">{post.description}</p>
      </div>
      <div className="article__right author">
        <div className="author__info">
          <div className="author__name">{post.author.username}</div>
          <time className="author__post-date" dateTime={format(new Date(post.updatedAt), 'yyyy-MM-d')}>
            {format(new Date(post.updatedAt), 'MMMM d, yyyy')}
          </time>
        </div>
        <img className="author__avatar" src={post.author.image} width={46} height={46}></img>
      </div>
    </li>
  );
}
