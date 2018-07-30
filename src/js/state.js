import parser from './parser';

export default class State {
  constructor() {
    this.rssUrlState = 'empty';
    this.modalState = 'hidden';
    this.modalNumber = -1;
    this.headers = [];
    this.articles = [];
    this.linksList = new Map();
  }

  addRss(url, res) {
    const parseredObject = parser(res);
    const { headers } = parseredObject;
    const { articles } = parseredObject;

    this.headersAdd(headers);
    this.articlesAdd(articles);
    this.linksListSet(url, articles);
    this.changeRssUrlStage('chanel added');
    this.changeRssUrlStage('empty');
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
