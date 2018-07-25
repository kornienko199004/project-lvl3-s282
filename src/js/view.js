export default class View {
  constructor() {
    this.onSubmit = null;
  }

  addEvent() {
    const formElement = document.querySelector('form');
    formElement.addEventListener('submit', this.onSubmit);
  }

  static getUrl() {
    const rssInput = document.getElementById('rssInput');
    return rssInput.value;
  }

  static getRssHeader(doc) {
    const title = doc.querySelector('title').innerHTML;
    const caption = doc.querySelector('description').innerHTML;
    return { title, caption };
  }

  static getRssArticles(doc) {
    const items = Array.from(doc.querySelectorAll('item'));
    return items.map((element) => {
      const link = element.querySelector('link').innerHTML;
      const title = element.querySelector('title').innerHTML;
      return { link, title };
    });
  }

  render(doc) {
    const header = this.constructor.getRssHeader(doc);
    const articles = this.constructor.getRssArticles(doc);
    const rssContainer = document.querySelector('.rss-chanels');

    const rssTitle = document.createTextNode(header.title);
    const rssCaption = document.createTextNode(header.caption);
    const hElement = document.createElement('h5');
    const pElement = document.createElement('p');

    const articlesList = document.querySelector('.list-group');

    hElement.append(rssTitle);
    pElement.append(rssCaption);
    rssContainer.append(hElement);
    rssContainer.append(pElement);

    articles.forEach(({ link, title }) => {
      const aElement = document.createElement('a');
      const liElement = document.createElement('li');
      const linkText = document.createTextNode(title);

      liElement.className = 'list-group-item';
      aElement.href = link;
      aElement.append(linkText);
      liElement.append(aElement);
      articlesList.append(liElement);
    });
  }

  static rssInvalid(text) {
    const captionElement = document.getElementById('urlStatus');
    const inputElement = document.getElementById('rssInput');

    captionElement.innerHTML = text;
    if (captionElement.classList.contains('text-muted')) {
      captionElement.classList.remove('text-muted');
    }
    if (captionElement.classList.contains('text-success')) {
      captionElement.classList.remove('text-success');
    }
    if (!captionElement.classList.contains('text-danger')) {
      captionElement.classList.add('text-danger');
    }
    if (!inputElement.classList.contains('is-invalid')) {
      inputElement.classList.add('is-invalid');
    }
  }

  invalidUrl() {
    this.constructor.rssInvalid('Неправильный формат RSS адреса');
  }

  repeatUrl() {
    this.constructor.rssInvalid('RSS канал уже добавлен');
  }

  netWorkTroubles() {
    this.constructor.rssInvalid('Ошибка сети или RSS адрес не существует');
  }

  static validUrl() {
    const captionElement = document.getElementById('urlStatus');
    const inputElement = document.getElementById('rssInput');

    captionElement.innerHTML = 'Добавление RSS потока';
    if (captionElement.classList.contains('text-muted')) {
      captionElement.classList.remove('text-muted');
    }
    if (captionElement.classList.contains('text-danger')) {
      captionElement.classList.remove('text-danger');
    }
    if (!captionElement.classList.contains('text-success')) {
      captionElement.classList.add('text-success');
    }
    if (inputElement.classList.contains('is-invalid')) {
      inputElement.classList.remove('is-invalid');
    }
    if (!inputElement.classList.contains('is-valid')) {
      inputElement.classList.add('is-valid');
    }
  }

  static resetUrl() {
    const captionElement = document.getElementById('urlStatus');
    const inputElement = document.getElementById('rssInput');
    const rssInput = document.getElementById('rssInput');

    rssInput.value = '';

    captionElement.innerHTML = 'Добавте в новостную ленту Ваши любимые RSS каналы';
    if (!captionElement.classList.contains('text-muted')) {
      captionElement.classList.add('text-muted');
    }
    if (captionElement.classList.contains('text-danger')) {
      captionElement.classList.remove('text-danger');
    }
    if (captionElement.classList.contains('text-success')) {
      captionElement.classList.remove('text-success');
    }
    if (inputElement.classList.contains('is-invalid')) {
      inputElement.classList.remove('is-invalid');
    }
    if (inputElement.classList.contains('is-valid')) {
      inputElement.classList.remove('is-valid');
    }
  }
}
