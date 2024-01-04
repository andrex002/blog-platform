import { Link, Redirect } from 'react-router-dom';
import '../SignUpPage/SignUpPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { signIn } from '../../store/blogSlice';

export function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });
  const dispatch = useDispatch();
  const { authorized, error } = useSelector((state) => state.blog);

  if (authorized) {
    return <Redirect to="/" />;
  }

  const onSubmit = (data) => {
    const dataForm = { user: data };
    dispatch(signIn(dataForm));
  };

  return (
    <section className="user-form">
      <h2 className="user-form__title">Sign In</h2>
      <form className="user-form__form" onSubmit={handleSubmit(onSubmit)}>
        <label className="user-form__label">
          <span className="user-form__input-name">Email address</span>
          <input
            className={`user-form__input ${errors.email ? 'user-form__input--error' : ''}`}
            placeholder="Email address"
            {...register('email', {
              required: 'Поле email не может быть пустым',
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
            {...register('password', { required: 'Поле password не должно быть пустым' })}
          />
          {errors?.password && <p className="user-form__error-message">{errors.password?.message}</p>}
        </label>
        <div className="user-form__line" />
        <button className="user-form__btn">Login</button>
      </form>
      <div className="user-form__info">
        Don’t have an account?{' '}
        <Link to="/sign-up" className="user-form__link">
          Sign Up
        </Link>
        .
      </div>
      {error && <div className="user-form__error-message">{error}</div>}
    </section>
  );
}
