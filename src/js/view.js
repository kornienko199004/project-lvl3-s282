export const renderHeaders = ({ headers }) => {
  const rssContainer = document.querySelector('.rss-chanels');
  rssContainer.childNodes.forEach(child => rssContainer.removeChild(child));
  headers.forEach((header) => {
    const rssTitle = document.createTextNode(header.title);
    const rssCaption = document.createTextNode(header.caption);
    const hElement = document.createElement('h5');
    const pElement = document.createElement('p');
    const divElement = document.createElement('div');
    hElement.append(rssTitle);
    pElement.append(rssCaption);
    divElement.append(hElement);
    divElement.append(pElement);
    pElement.classList.add('border-top');

    rssContainer.append(divElement);
  });
};

export const renderArticles = ({ articles }) => {
  const articlesList = document.querySelector('.list-group');
  articlesList.childNodes.forEach(child => articlesList.removeChild(child));

  articles.forEach(({ link, title }) => {
    const aElement = document.createElement('a');
    const liElement = document.createElement('li');
    const linkText = document.createTextNode(title);
    const button = document.createElement('button');
    button.className = 'btn btn-primary btn-modal';
    button.innerHTML = 'Посмотреть описание';

    liElement.className = 'list-group-item d-flex justify-content-between align-items-center border-left-0 border-right-0';
    aElement.href = link;
    aElement.append(linkText);
    liElement.append(aElement);
    liElement.append(button);
    articlesList.append(liElement);
  });
};

export const rssInvalid = (text) => {
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
};

export const invalidUrl = () => {
  rssInvalid('Неправильный формат RSS адреса');
};

export const repeatUrl = () => {
  rssInvalid('RSS канал уже добавлен');
};

export const netWorkTroubles = () => {
  rssInvalid('Ошибка сети или RSS адрес не существует');
};

export const validUrl = () => {
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
};

export const resetUrl = () => {
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
};

