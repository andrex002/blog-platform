import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { favoritePost, unfavoritePost } from '../../store/blogSlice';

import css from './Likes.module.scss';

export function Likes({ favoritesCount, favorited, slug }) {
  const { authorized } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const onClickLiked = () => {
    if (authorized) {
      if (!favorited) {
        dispatch(favoritePost(slug));
      } else {
        dispatch(unfavoritePost(slug));
      }
    }
  };

  return (
    <div className={classNames([css.likes, favorited && css.likesRed])} onClick={onClickLiked}>
      {favoritesCount}
    </div>
  );
}

Likes.propTypes = {
  favoritesCount: PropTypes.number.isRequired,
  favorited: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
};
