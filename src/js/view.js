export const renderHeaders = ({ headers }) => {
  const rssContainer = document.querySelector('.rss-chanels');
  const headerElements = rssContainer.querySelectorAll('.rss-header');

  for (let i = headerElements.length - 1; i >= 0; i -= 1) {
    rssContainer.removeChild(headerElements[i]);
  }

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
    divElement.className = 'rss-header';
    pElement.classList.add('border-top');

    rssContainer.append(divElement);
  });
};

export const renderArticles = ({ articles }) => {
  const articlesList = document.querySelector('.list-group');
  const ListElements = articlesList.querySelectorAll('.list-group-item');

  for (let i = ListElements.length - 1; i >= 0; i -= 1) {
    articlesList.removeChild(ListElements[i]);
  }

  articles.forEach(({ link, title }) => {
    const aElement = document.createElement('a');
    aElement.innerHTML = title;
    const liElement = document.createElement('li');
    const button = document.createElement('button');
    button.className = 'btn btn-primary btn-description';
    button.innerHTML = 'Посмотреть описание';

    liElement.className = 'list-group-item d-flex justify-content-between align-items-center border-left-0 border-right-0';
    aElement.href = link;
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

export const showModal = ({ link, title, description }) => {
  const modalElement = document.querySelector('.modal');
  const bodyElement = document.querySelector('body');
  modalElement.style.display = 'block';
  bodyElement.classList.add('modal-open');

  const modalTitle = modalElement.querySelector('.modal-title');
  const modalDescription = modalElement.querySelector('.modal-body');
  const modalButtonLink = modalElement.querySelector('.modal-link');
  modalTitle.textContent = title;
  modalDescription.innerHTML = description;
  modalButtonLink.href = link;

  const divElement = document.createElement('div');
  divElement.className = 'modal-backdrop fade show';
  bodyElement.append(divElement);
};


export const closeModal = () => {
  const modalElement = document.querySelector('.modal');
  const bodyElement = document.querySelector('body');
  if (bodyElement.classList.contains('modal-open')) {
    modalElement.style.display = 'none';

    const divElement = document.querySelector('.modal-backdrop');
    bodyElement.removeChild(divElement);
    bodyElement.classList.remove('modal-open');
  }
};
