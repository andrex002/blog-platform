import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { signIn } from '../../store/blogSlice';
import css from '../SignUpPage/SignUpPage.module.scss';

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
    <section className={css.userForm}>
      <h2 className={css.userFormTitle}>Sign In</h2>
      <form className={css.userFormForm} onSubmit={handleSubmit(onSubmit)}>
        <label className={css.userFormLabel}>
          <span className={css.userFormInputName}>Email address</span>
          <input
            className={classNames([css.userFormInput, errors.email && css.userFormInputError])}
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
          {errors?.email && <p className={css.userFormErrorMessage}>{errors.email?.message}</p>}
        </label>

        <label className={css.userFormLabel}>
          <span className={css.userFormInputName}>Password</span>
          <input
            className={classNames([css.userFormInput, errors.password && css.userFormInputError])}
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Поле password не должно быть пустым' })}
          />
          {errors?.password && <p className={css.userFormErrorMessage}>{errors.password?.message}</p>}
        </label>
        <div className={css.userFormLine} />
        <button className={css.userFormBtn}>Login</button>
      </form>
      <div className={css.userFormInfo}>
        Don’t have an account?{' '}
        <Link to="/sign-up" className={css.userFormLink}>
          Sign Up
        </Link>
        .
      </div>
      {error && <div className={css.userFormErrorMessage}>{error}</div>}
    </section>
  );
}
