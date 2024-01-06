import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

import { signUp } from '../../store/blogSlice';

import css from './SignUpPage.module.scss';

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
    <section className={css.userForm}>
      <h2 className={css.userFormTitle}>Create new account</h2>
      <form className={css.userFormForm} onSubmit={handleSubmit(onSubmit)}>
        <label className={css.userFormLabel}>
          <span className={css.userFormInputName}>Username</span>
          <input
            className={classNames([css.userFormInput, errors.username && css.userFormInputError])}
            placeholder="Username"
            {...register('username', {
              required: 'Поле username обязательно к заполнению',
              minLength: { value: 3, message: 'Имя пользователя должно содержать не менее 3 символов' },
              maxLength: { value: 20, message: 'Имя пользователя должно содержать не более 20 символов' },
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
              required: 'Поле email обязательно к заполнению',
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
            {...register('password', {
              required: 'Поле password обязательно к заполнению',
              minLength: { value: 6, message: 'Password должно содержать не менее 6 символов' },
              maxLength: { value: 40, message: 'Password должно содержать не более 40 символов' },
            })}
          />
          {errors?.password && <p className={css.userFormErrorMessage}>{errors.password?.message}</p>}
        </label>
        <label className={css.userFormLabel}>
          <span className={css.userFormInputName}>Repeat Password</span>
          <input
            className={classNames([css.userFormInput, errors.repeatPassword && css.userFormInputError])}
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
          {errors?.repeatPassword && <p className={css.userFormErrorMessage}>{errors.repeatPassword?.message}</p>}
        </label>
        <div className={css.userFormLine} />
        <div className={css.userFormInputWrapper}>
          <label className={css.userFormConcent}>
            <input
              className={css.userFormConcentCheckbox}
              type="checkbox"
              {...register('concent', {
                validate: (value) => {
                  return value || 'Вы должны согласиться с обработкой данных';
                },
              })}
            />
            <span className={css.userFormConcentText}>I agree to the processing of my personal information</span>
          </label>
          {errors?.concent && <p className={css.userFormErrorMessage}>{errors.concent?.message}</p>}
        </div>
        <button className={css.userFormBtn}>Create</button>
      </form>
      <div className={css.userFormInfo}>
        Already have an account?{' '}
        <Link to="/sign-in" className={css.userFormLink}>
          Sign In
        </Link>
        .
      </div>
    </section>
  );
}
