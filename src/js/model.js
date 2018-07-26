import { watch } from 'melanke-watchjs';
import rssRequest from './rssRequest';
import parser from './parser';
import validator from './validator';
import { validUrl, resetUrl, repeatUrl, netWorkTroubles, invalidUrl, renderArticles, renderHeaders, showModal, closeModal } from './view';

export const data = {
  state: 'empty',
  headers: [],
  articles: [],
};

const linksList = new Set();

const getRssHeader = (doc) => {
  const title = doc.querySelector('title').textContent;
  const caption = doc.querySelector('description').textContent;
  return { title, caption };
};

const getRssArticles = (doc) => {
  const items = Array.from(doc.querySelectorAll('item'));
  return items.map((element) => {
    const link = element.querySelector('link').textContent;
    const title = element.querySelector('title').textContent;
    const description = element.querySelector('description').textContent;
    return { link, title, description };
  });
};

export const submitUrl = (url) => {
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


watch(data, 'state', () => {
  switch (data.state) {
    case 'make request':
      validUrl();
      break;
    case 'empty':
      resetUrl();
      break;
    case 'invalide':
      invalidUrl();
      break;
    case 'net troubles':
      netWorkTroubles();
      break;
    case 'repeat':
      repeatUrl();
      break;
    default:
      break;
  }
});

watch(data, 'headers', () => {
  renderHeaders(data);
});

watch(data, 'articles', () => {
  renderArticles(data);
});

export const clickDescriptionButton = (buttonNumber) => {
  showModal(data.articles[buttonNumber]);
};

export const clickClose = () => {
  closeModal();
};
