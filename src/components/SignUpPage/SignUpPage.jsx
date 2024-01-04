import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import './SignUpPage.scss';
import { signUp } from '../../store/blogSlice';

export function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const { authorized } = useSelector((state) => state.blog);
  if (authorized) {
    return <Redirect to="/" />;
  }
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const dataForm = { user: data };
    dispatch(signUp(dataForm));
  };

  return (
    <section className="user-form">
      <h2 className="user-form__title">Create new account</h2>
      <form className="user-form__form" onSubmit={handleSubmit(onSubmit)}>
        <label className="user-form__label">
          <span className="user-form__input-name">Username</span>
          <input
            className={`user-form__input ${errors.username ? 'user-form__input--error' : ''}`}
            placeholder="Username"
            {...register('username', {
              required: 'Поле username обязательно к заполнению',
              minLength: { value: 3, message: 'Имя пользователя должно содержать не менее 3 символов' },
              maxLength: { value: 20, message: 'Имя пользователя должно содержать не более 20 символов' },
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
              required: 'Поле email обязательно к заполнению',
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'email должен  быть корректным почтовым адресом',
              },
            })}
          />
          {errors?.email && <p className="user-form__error-message">{errors.email?.message}</p>}
        </label>
        <label className="user-form__label">
          <span className="user-form__input-name">Password</span>
          <input
            className={`user-form__input ${errors.password ? 'user-form__input--error' : ''}`}
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Поле password обязательно к заполнению',
              minLength: { value: 6, message: 'Password должно содержать не менее 6 символов' },
              maxLength: { value: 40, message: 'Password должно содержать не более 40 символов' },
            })}
          />
          {errors?.password && <p className="user-form__error-message">{errors.password?.message}</p>}
        </label>
        <label className="user-form__label">
          <span className="user-form__input-name">Repeat Password</span>
          <input
            className={`user-form__input ${errors.repeatPassword ? 'user-form__input--error' : ''}`}
            name="repeatPassword"
            type="password"
            placeholder="Repeat Password"
            {...register('repeatPassword', {
              required: 'Поле repeat password обязательно к заполнению',
              validate: (value, formValues) => {
                return value === formValues.password || 'Пароль не совпадает';
              },
            })}
          />
          {errors?.repeatPassword && <p className="user-form__error-message">{errors.repeatPassword?.message}</p>}
        </label>
        <div className="user-form__line" />
        <div className="user-form__input-wrapper">
          <label className="user-form__concent">
            <input
              className="user-form__concent-checkbox"
              type="checkbox"
              {...register('concent', {
                validate: (value) => {
                  return value || 'Вы должны согласиться с обработкой данных';
                },
              })}
            />
            <span className="user-form__concent-text">I agree to the processing of my personal information</span>
          </label>
          {errors?.concent && <p className="user-form__error-message">{errors.concent?.message}</p>}
        </div>
        <button className="user-form__btn">Create</button>
      </form>
      <div className="user-form__info">
        Already have an account?{' '}
        <Link to="/sign-in" className="user-form__link">
          Sign In
        </Link>
        .
      </div>
    </section>
  );
}
