import validator from './validator';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.linksList = new Set();
  }

  initialize() {
    this.view.onSubmit = this.onSubmit.bind(this);
    this.view.addEvent();
  }

  requestRSS(url) {
    return this.model.request(url);
  }

  render(doc) {
    return this.view.render(doc);
  }

  onSubmit(e) {
    e.preventDefault();
    const url = this.view.getUrl();
    if (this.urlValidation(url)) {
      this.view.validUrl();
      this.requestRSS(url)
      .then(response => {
        this.render(response);
        this.view.resetUrl();
        this.linksList.add(url);
      })
      .catch((err) => {
        console.log(err);
        this.view.netWorkTroubles();
      });
    } else {
      if (this.linksList.has(url)) {
        this.view.repeatUrl();
      } else {
        this.view.invalidUrl();
      }
    }
  }

  urlValidation(link) {
    return validator(link) && !this.linksList.has(link);
  }
}