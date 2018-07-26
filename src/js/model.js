import rssRequest from './rssRequest';
import parser from './parser';
import validator from './validator';

export const data = {
  state: 'empty',
  headers: [],
  articles: [],
};

const linksList = new Set();

const getRssHeader = (doc) => {
  const title = doc.querySelector('title').innerHTML;
  const caption = doc.querySelector('description').innerHTML;
  return { title, caption };
};

const getRssArticles = (doc) => {
  const items = Array.from(doc.querySelectorAll('item'));
  return items.map((element) => {
    const link = element.querySelector('link').innerHTML;
    const title = element.querySelector('title').innerHTML;
    const description = element.querySelector('description').textContent;
    return { link, title, description };
  });
};

export const model = (url) => {
  if (validator(url) && !linksList.has(url)) {
    data.state = 'make request';

    rssRequest(url)
      .then((response) => {
        const doc = parser(response);
        const headers = getRssHeader(doc);
        const articles = getRssArticles(doc);

        data.headers = [headers, ...data.headers];
        data.articles = [...articles, ...data.articles];
        linksList.add(url);
        data.state = 'chanel added';
        data.state = 'empty';
      })
      .catch(() => {
        data.state = 'net troubles';
      });
  }
  if (linksList.has(url)) {
    data.state = 'repeat';
  }
  if (!validator(url)) {
    data.state = 'invalide';
  }
};

