import { watch } from 'melanke-watchjs';
import { validUrl, resetUrl, repeatUrl, netWorkTroubles, invalidUrl, renderArticles, renderHeaders, renderModal, hideModal } from './view';

export default class State {
  constructor() {
    this.rssUrlState = 'empty';
    this.modalState = 'hidden';
    this.modalNumber = -1;
    this.headers = [];
    this.articles = [];
    this.linksList = new Map();

    watch(this, 'rssUrlState', () => {
      switch (this.rssUrlState) {
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

    watch(this, 'headers', () => {
      renderHeaders(this.headers);
    });

    watch(this, 'articles', () => {
      renderArticles(this.articles);
    });

    watch(this, 'modalState', () => {
      switch (this.modalState) {
        case 'hidden':
          hideModal();
          break;
        case 'show':
          renderModal(this.articles[this.modalNumber]);
          break;
        default:
          break;
      }
    });
  }

  changeRssUrlStage(newStage) {
    this.rssUrlState = newStage;
  }

  changeModalState(newStage) {
    this.modalState = newStage;
  }

  changeModalNumber(newNumber) {
    this.modalNumber = newNumber;
  }

  headersAdd(newHeaders) {
    this.headers = [newHeaders, ...this.headers];
  }

  articlesAdd(newArticles) {
    this.articles = [...newArticles, ...this.articles];
  }

  linksListSet(newUrl, newArticles) {
    this.linksList.set(newUrl, newArticles);
  }
}
