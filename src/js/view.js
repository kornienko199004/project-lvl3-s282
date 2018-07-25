export default class View {
  constructor() {
    this.onSubmit = null;
  }

  addEvent() {
    const formElement = document.querySelector('form');
    formElement.addEventListener('submit', this.onSubmit);
  }

  getUrl() {
    const rssInput = document.getElementById('rssInput');
    return rssInput.value;
  }

  getRssHeader(doc) {
    const title = doc.querySelector('title').innerHTML;
    const caption = doc.querySelector('description').innerHTML;
    return { title, caption };
  }

  getRssArticles(doc) {
    const items = Array.from(doc.querySelectorAll('item'));
    return items.map((element) => {
      const link = element.querySelector('link').innerHTML;
      const title = element.querySelector('title').innerHTML;
      return { link, title };
    });
  }

  render(doc) {
    const header = this.getRssHeader(doc);
    const articles = this.getRssArticles(doc);
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

  rssInvalid(text) {
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
    this.rssInvalid('Неправильный формат RSS адреса');
  }

  repeatUrl() {
    this.rssInvalid('RSS канал уже добавлен');
  }

  netWorkTroubles() {
    this.rssInvalid('Ошибка сети или RSS адрес не существует');
  }

  validUrl() {
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

  resetUrl() {
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
