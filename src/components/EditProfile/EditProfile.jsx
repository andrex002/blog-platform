import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Spin } from 'antd';

import { editProfile } from '../../store/blogSlice';

export function EditProfile() {
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
    },
  });

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const dataForm = { user: data };
    dispatch(editProfile(dataForm));
  };

  return (
    <section className="user-form">
      <h2 className="user-form__title">Edit Profile</h2>
      {loading && <Spin size="large" className="articles__spin" />}
      <form className="user-form__form" onSubmit={handleSubmit(onSubmit)}>
        <label className="user-form__label">
          <span className="user-form__input-name">Username</span>
          <input
            className={`user-form__input ${errors.username ? 'user-form__input--error' : ''}`}
            placeholder="username"
            {...register('username', {
              required: 'Поле email не может быть пустым',
            })}
          />
          {errors?.username && <p className="user-form__error-message">{errors.username?.message}</p>}
        </label>

        <label className="user-form__label">
          <span className="user-form__input-name">Email address</span>
          <input
            className={`user-form__input ${errors.email ? 'user-form__input--error' : ''}`}
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
          {errors?.email && <p className="user-form__error-message">{errors.email?.message}</p>}
        </label>
        <label className="user-form__label">
          <span className="user-form__input-name">New password</span>
          <input
            className={`user-form__input ${errors.password ? 'user-form__input--error' : ''}`}
            type="password"
            placeholder="New password"
            {...register('password', {
              required: 'Поле password не должно быть пустым',
              minLength: { value: 6, message: 'Password должно содержать не менее 6 символов' },
              maxLength: { value: 40, message: 'Password должно содержать не более 40 символов' },
            })}
          />
          {errors?.password && <p className="user-form__error-message">{errors.password?.message}</p>}
        </label>
        <label className="user-form__label">
          <span className="user-form__input-name">Avatar image (url)</span>
          <input
            className={`user-form__input ${errors.avatar ? 'user-form__input--error' : ''}`}
            placeholder="Avatar image"
            {...register('image', {
              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                message: 'Некорентный URL',
              },
            })}
          />
          {errors?.image && <p className="user-form__error-message">{errors.image?.message}</p>}
        </label>
        <button className="user-form__btn">Save</button>
      </form>
      {error && <div className="user-form__error-message">{error}</div>}
    </section>
  );
}
