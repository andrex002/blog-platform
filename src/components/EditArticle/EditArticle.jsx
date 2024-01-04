import css from '../NewArticle/NewArticle.module.scss';

export function EditArticle() {
  return (
    <section className={css.newArticle}>
      <h1 className={css.title}>Edit article</h1>
      <form className={css.form}>
        <label className={css.label}>
          <span className={css.inputName}>Title</span>
          <input className={css.input} placeholder="Title" />
        </label>
        <label className={css.label}>
          <span className={css.inputName}>Short description</span>
          <input className={css.input} placeholder="Short description" />
        </label>
        <label className={css.label}>
          <span className={css.inputName}>Text</span>
          <textarea className={`${css.input} ${css.textarea}`} placeholder="Text" />
        </label>
        <div className={css.tags}>
          <label className={css.inputName}>Tags</label>
          <div className={css.tagsBlock}>
            <div className={css.fields}>
              <div className={css.field}>
                <input className={css.tagsInput} placeholder="tag" />
                <button className={css.btnDelete} type="button">
                  Delete
                </button>
              </div>
              <div className={css.field}>
                <input className={css.tagsInput} placeholder="tag" />
                <button className={css.btnDelete} type="button">
                  Delete
                </button>
              </div>
            </div>
            <button className={css.btnAdd} type="button">
              Add Tag
            </button>
          </div>
        </div>
        <button className={css.submit}>Send</button>
      </form>
    </section>
  );
}
