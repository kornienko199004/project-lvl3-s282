import rssRequest from './rssRequest';
import parser from './parser';
import validator from './validator';
import state from './state';

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

const makeRequest = (url) => {
  if (validator(url) && !state.linksList.has(url)) {
    state.rssUrlState = 'make request';

    rssRequest(url)
      .then((response) => {
        const doc = parser(response);
        const headers = getRssHeader(doc);
        const articles = getRssArticles(doc);

        state.headers = [headers, ...state.headers];
        state.articles = [...articles, ...state.articles];
        state.linksList.add(url);
        state.rssUrlState = 'chanel added';
        state.rssUrlState = 'empty';
      })
      .catch(() => {
        state.rssUrlState = 'net troubles';
      });
  }
  if (state.linksList.has(url)) {
    state.rssUrlState = 'repeat';
  }
  if (!validator(url)) {
    state.rssUrlState = 'invalide';
  }
};

const showModal = (modalNumber) => {
  state.modalState = 'show';
  state.modalNumber = modalNumber;
};

const closeModal = () => {
  state.modalState = 'hidden';
};

export const addFormSubmitListener = () => {
  const formElement = document.querySelector('form');
  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const rssInput = document.getElementById('rssInput');
    makeRequest(rssInput.value);
  });
};

export const addModalWindowEvents = () => {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-description')) {
      const ulElement = e.target.parentElement.parentElement;
      for (let i = 0; i < ulElement.children.length; i += 1) {
        if (ulElement.children[i] === e.target.parentElement) {
          showModal(i);
        }
      }
    }
    if (e.target.classList.contains('close')) {
      closeModal();
    }
    if (e.target.classList.contains('modal')) {
      closeModal();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
      closeModal();
    }
  });
};
