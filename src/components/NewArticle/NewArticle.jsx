import React from 'react';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { createPost } from '../../store/blogSlice';

import css from './NewArticle.module.scss';

export function NewArticle({ history }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: { title: '', description: '', body: '', tagList: [] },
  });

  const { error } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const dataForm = { article: data };
    dispatch(createPost(dataForm));
    if (!error) {
      history.push('/');
    }
  };

  const { fields, append, remove } = useFieldArray({ name: 'tagList', control: control });

  return (
    <section className={css.newArticle}>
      <h1 className={css.title}>Create new article</h1>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={css.label}>
          <span className={css.inputName}>Title</span>
          <Controller
            rules={{
              required: 'Поле Title обязательно для заполнения',
              maxLength: {
                value: 150,
                message: 'Максимальная длинна заголовка 150 символов',
              },
            }}
            control={control}
            name="title"
            render={({ field }) => {
              return (
                <React.Fragment>
                  <input
                    className={classNames([css.input, errors.title && css.error])}
                    placeholder="Title"
                    {...field}
                  />
                  {errors?.title && <p className={css.errorMessage}>{errors.title?.message}</p>}
                </React.Fragment>
              );
            }}
          />
        </label>
        <label className={css.label}>
          <span className={css.inputName}>Short description</span>
          <Controller
            rules={{ required: 'Поле Short description обязательно для заполнения' }}
            control={control}
            name="description"
            render={({ field }) => {
              return (
                <React.Fragment>
                  <input
                    className={classNames([css.input, errors.description && css.error])}
                    placeholder="Short description"
                    {...field}
                  />
                  {errors?.description && <p className={css.errorMessage}>{errors.description?.message}</p>}
                </React.Fragment>
              );
            }}
          />
        </label>
        <label className={css.label}>
          <span className={css.inputName}>Text</span>
          <Controller
            rules={{ required: 'Поле Text обязательно для заполнения' }}
            control={control}
            name="body"
            render={({ field }) => {
              return (
                <React.Fragment>
                  <textarea
                    className={classNames([css.input, css.textarea, errors.body && css.error])}
                    placeholder="Text"
                    {...field}
                  />
                  {errors?.body && <p className={css.errorMessage}>{errors.body?.message}</p>}
                </React.Fragment>
              );
            }}
          />
        </label>
        <div className={css.tags}>
          <label className={css.inputName}>Tags</label>
          <div className={css.tagsBlock}>
            <div className={css.fields}>
              {fields.map((tag, i) => {
                return (
                  <div className={css.field} key={tag.id}>
                    <Controller
                      control={control}
                      name={`tagList.${i}`}
                      render={({ field }) => {
                        return (
                          <React.Fragment>
                            <input className={css.tagsInput} placeholder="tag" {...field} />
                            <button className={css.btnDelete} type="button" onClick={() => remove(i)}>
                              Delete
                            </button>
                          </React.Fragment>
                        );
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <button className={css.btnAdd} type="button" onClick={() => append('')}>
              Add Tag
            </button>
          </div>
        </div>
        <button className={css.submit}>Send</button>
      </form>
    </section>
  );
}

NewArticle.propTypes = {
  history: PropTypes.object,
};
