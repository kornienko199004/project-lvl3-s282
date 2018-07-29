import rssRequest from './rssRequest';
import parser from './parser';
import validator from './validator';

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

const makeRequest = (state, url) => {
  if (validator(url) && !state.linksList.has(url)) {
    state.changeRssUrlStage('make request');

    rssRequest(url)
      .then((response) => {
        const doc = parser(response);
        const headers = getRssHeader(doc);
        const articles = getRssArticles(doc);

        state.headersAdd(headers);
        state.articlesAdd(articles);
        state.linksListSet(url, articles);
        state.changeRssUrlStage('chanel added');
        state.changeRssUrlStage('empty');
      })
      .catch(() => {
        state.changeRssUrlStage('net troubles');
      });
  }
  if (state.linksList.has(url)) {
    state.changeRssUrlStage('repeat');
  }
  if (!validator(url)) {
    state.changeRssUrlStage('invalide');
  }
};

const showModal = (state, modalNumber) => {
  state.changeModalState('show');
  state.changeModalNumber(modalNumber);
};

const closeModal = (state) => {
  state.changeModalState('hidden');
};

export const addFormSubmitListener = (state) => {
  const formElement = document.querySelector('form');
  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const rssInput = document.getElementById('rssInput');
    makeRequest(state, rssInput.value);
  });
};

export const addModalWindowEvents = (state) => {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-description')) {
      const ulElement = e.target.parentElement.parentElement;
      for (let i = 0; i < ulElement.children.length; i += 1) {
        if (ulElement.children[i] === e.target.parentElement) {
          showModal(state, i);
        }
      }
    }
    if (e.target.classList.contains('close')) {
      closeModal(state);
    }
    if (e.target.classList.contains('modal')) {
      closeModal(state);
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
      closeModal(state);
    }
  });
};

export const searchingForChanges = (state) => {
  const chanelsLinks = Array.from(state.linksList.keys());
  const chanelsArticlesSet = new Set();

  state.linksList.forEach((value) => {
    value.forEach(({ title }) => {
      chanelsArticlesSet.add(title);
    });
  });
  const readChanels = links => Promise.all(links.map(rssRequest));

  readChanels(chanelsLinks)
    .then((results) => {
      results.forEach((result, index) => {
        const doc = parser(result);
        const articles = getRssArticles(doc);
        const newChanelArticles = articles.filter(({ title }) => !chanelsArticlesSet.has(title));
        if (newChanelArticles.length > 0) {
          state.articlesAdd(newChanelArticles);
          const changedlLink = chanelsLinks[index];
          const oldArticles = state.linksList.get(changedlLink);
          state.linksListSet(changedlLink, articles);
          state.linksList.set(changedlLink, [...newChanelArticles, ...oldArticles]);
        }
      });
    })
    .finally(() => setTimeout(searchingForChanges, 5000, state));
};
