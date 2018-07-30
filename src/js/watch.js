import { watch } from 'melanke-watchjs';
import { validUrl, resetUrl, repeatUrl, netWorkTroubles, invalidUrl, renderArticles, renderHeaders, renderModal, hideModal, blockForm, unBlockForm } from './view';

export default (data) => {
  watch(data, 'rssUrlState', () => {
    switch (data.rssUrlState) {
      case 'make request':
        validUrl();
        blockForm();
        break;
      case 'empty':
        resetUrl();
        unBlockForm();
        break;
      case 'invalide':
        invalidUrl();
        break;
      case 'net troubles':
        netWorkTroubles();
        unBlockForm();
        break;
      case 'repeat':
        repeatUrl();
        break;
      default:
        break;
    }
  });

  watch(data, 'headers', () => {
    renderHeaders(data.headers);
  });

  watch(data, 'articles', () => {
    renderArticles(data.articles);
  });

  watch(data, 'modalState', () => {
    switch (data.modalState) {
      case 'hidden':
        hideModal();
        break;
      case 'show':
        renderModal(data.articles[data.modalNumber]);
        break;
      default:
        break;
    }
  });
};
