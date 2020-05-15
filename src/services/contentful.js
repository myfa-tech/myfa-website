import Axios from 'axios';

const formatArticles = (articles) => {
  return articles.items.map(it => ({
    ...it.fields,
  }));
};

const fetchArticles = async () => {
  let axios = Axios.create({
    baseURL: process.env.BACKEND_URL,
  });

  const result = await axios.get(`/blog/articles`);

  return formatArticles(result.data.articles);
};

const fetchSingleArticle = async (id) => {
  let axios = Axios.create({
    baseURL: process.env.BACKEND_URL,
  });

  const result = await axios.get(`/blog${id}`);

  const articles = formatArticles(result.data.article);

  return articles[0];
};

export { fetchSingleArticle, fetchArticles };