import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Spin } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { editProfile } from '../../store/blogSlice';
import css from '../SignUpPage/SignUpPage.module.scss';

export function EditProfile({ history }) {
  const { user, error, loading } = useSelector((state) => state.blog);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: user.username,
      email: user.email,
      image: user.image,
    },
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const dataForm = { user: data };
    dispatch(editProfile(dataForm));
    history.push('/');
  };

  return (
    <section className={css.userForm}>
      <h2 className={css.userFormTitle}>Edit Profile</h2>
      {loading && <Spin size="large" className={css.articlesSpin} />}
      <form className={css.userFormForm} onSubmit={handleSubmit(onSubmit)}>
        <label className={css.userFormLabel}>
          <span className={css.userFormInputName}>Username</span>
          <input
            className={classNames([css.userFormInput, errors.username && css.userFormInputError])}
            placeholder="username"
            {...register('username', {
              required: 'Поле email не может быть пустым',
            })}
          />
          {errors?.username && <p className={css.userFormErrorMessage}>{errors.username?.message}</p>}
        </label>

        <label className={css.userFormLabel}>
          <span className={css.userFormInputName}>Email address</span>
          <input
            className={classNames([css.userFormInput, errors.email && css.userFormInputError])}
            placeholder="Email address"
            {...register('email', {
              required: 'Поле email не должно быть пустым',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'email должен быть корректным почтовым адресом',
              },
            })}
          />
          {errors?.email && <p className={css.userFormErrorMessage}>{errors.email?.message}</p>}
        </label>
        <label className={css.userFormLabel}>
          <span className={css.userFormInputName}>New password</span>
          <input
            className={classNames([css.userFormInput, errors.password && css.userFormInputError])}
            type="password"
            placeholder="New password"
            {...register('password', {
              required: 'Поле password не должно быть пустым',
              minLength: { value: 6, message: 'Password должно содержать не менее 6 символов' },
              maxLength: { value: 40, message: 'Password должно содержать не более 40 символов' },
            })}
          />
          {errors?.password && <p className={css.userFormErrorMessage}>{errors.password?.message}</p>}
        </label>
        <label className={css.userFormLabel}>
          <span className={css.userFormInputName}>Avatar image (url)</span>
          <input
            className={classNames([css.userFormInput, errors.image && css.userFormInputError])}
            placeholder="Avatar image"
            {...register('image', {
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                message: 'Некорентный URL',
              },
            })}
          />
          {errors?.image && <p className={css.userFormErrorMessage}>{errors.image?.message}</p>}
        </label>
        <button className={css.userFormBtn}>Save</button>
      </form>
      {error && <div className={css.userFormErrorMessage}>{error}</div>}
    </section>
  );
}

EditProfile.propTypes = {
  history: PropTypes.object,
};
