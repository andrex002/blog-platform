export default class ApiBlog {
  _baseUrl = 'https://blog.kata.academy/';

  _setToken = (newToken) => {
    localStorage.setItem('blogToken', newToken);
  };
  getToken = () => {
    return localStorage.getItem('blogToken');
  };
  _deleteToken = () => {
    localStorage.removeItem('blogToken');
  };

  _getResource = async (url, params = null, method = 'GET', payload = null) => {
    let fetchUrl = new URL(url, this._baseUrl);
    const headers = {
      Accept: 'application/json',
    };
    const token = this.getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    if (params) {
      for (let key in params) {
        fetchUrl.searchParams.append(key, params[key]);
      }
    }
    const options = {
      method: method,
      headers: headers,
    };
    if (payload) {
      options.body = JSON.stringify(payload);
      headers['Content-Type'] = 'application/json';
    }

    const result = await fetch(fetchUrl, options);
    let response;
    if (result.status === 204) {
      response = {};
    } else {
      response = await result.json();
    }

    if (response?.user?.token) {
      this._setToken(response?.user?.token);
    }

    return response;
  };

  getArticlesList = async (page = 1) => {
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

  registration = async (userData) => {
    const url = 'api/users';
    return this._getResource(url, null, 'POST', userData).then((data) => {
      return data;
    });
  };

  authorization = async (userData) => {
    const url = 'api/users/login';
    return this._getResource(url, null, 'POST', userData).then((data) => {
      return data;
    });
  };

  editProfile = async (userData) => {
    const url = 'api/user';
    return this._getResource(url, null, 'PUT', userData).then((data) => {
      return data;
    });
  };

  getUserProfile = async () => {
    const url = 'api/user';
    return this._getResource(url).then((data) => {
      return data;
    });
  };
  logOutUser = async () => {
    return this._deleteToken();
  };
  createPost = async (postData) => {
    const url = 'api/articles';
    return this._getResource(url, null, 'POST', postData).then((data) => {
      return data;
    });
  };
  editPost = async ({ article, slug }) => {
    const url = `api/articles/${slug}`;
    return this._getResource(url, null, 'PUT', article).then((data) => {
      return data;
    });
  };
  deletePost = async (slug) => {
    const url = `api/articles/${slug}`;
    return this._getResource(url, null, 'DELETE').then((data) => {
      return data;
    });
  };
  favoritePost = async (slug) => {
    const url = `api/articles/${slug}/favorite`;
    return this._getResource(url, null, 'POST').then((data) => {
      return data;
    });
  };
  unfavoritePost = async (slug) => {
    const url = `api/articles/${slug}/favorite`;
    return this._getResource(url, null, 'DELETE').then((data) => {
      return data;
    });
  };
}
