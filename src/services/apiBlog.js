export default class ApiBlog {
  _baseUrl = 'https://blog.kata.academy/';

  _getResource = async (url, params) => {
    let fetchUrl = new URL(url, this._baseUrl);
    if (params) {
      for (let key in params) {
        fetchUrl.searchParams.append(key, params[key]);
      }
    }
    let result = await fetch(fetchUrl);
    return await result.json();
  };

  getArticlesList = async (page = 1) => {
    console.log(page);
    const url = '/api/articles';
    const limit = 5;
    const offset = limit * (page - 1);
    const params = {
      limit,
      offset,
    };
    return this._getResource(url, params).then((data) => {
      data.totalPages = Math.ceil(data.articlesCount / limit);
      data.page = page;
      return data;
    });
  };

  getArticle = async (slug) => {
    const url = `api/articles/${slug}`;
    return this._getResource(url).then((data) => {
      return data;
    });
  };
}
