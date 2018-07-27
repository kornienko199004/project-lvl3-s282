import { watch } from 'melanke-watchjs';
import { validUrl, resetUrl, repeatUrl, netWorkTroubles, invalidUrl, renderArticles, renderHeaders, renderModal, hideModal } from './view';

const state = {
  rssUrlState: 'empty',
  modalState: 'hidden',
  modalNumber: -1,
  headers: [],
  articles: [],
  linksList: new Set(),
};

watch(state, 'rssUrlState', () => {
  switch (state.rssUrlState) {
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

watch(state, 'headers', () => {
  renderHeaders(state.headers);
});

watch(state, 'articles', () => {
  renderArticles(state.articles);
});

watch(state, 'modalState', () => {
  switch (state.modalState) {
    case 'hidden':
      hideModal();
      break;
    case 'show':
      renderModal(state.articles[state.modalNumber]);
      break;
    default:
      break;
  }
});

export default state;
