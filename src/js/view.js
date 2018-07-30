export const renderHeaders = (headers) => {
  const headersContainer = document.getElementById('headers-container');
  const headersList = document.querySelector('.rss-chanels');
  headersList.remove();

  const headersListNew = document.createElement('div');
  headersListNew.className = 'col-lg- rss-chanels';

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

    headersListNew.append(divElement);
  });
  headersContainer.append(headersListNew);
};

export const renderArticles = (articles) => {
  const articlesContainer = document.getElementById('articles-container');
  const articlesList = document.querySelector('.list-group');
  articlesList.remove();

  const articlesListNew = document.createElement('ul');
  articlesListNew.className = 'list-group';

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
    articlesListNew.append(liElement);
  });
  articlesContainer.append(articlesListNew);
};

export const rssInvalid = (text) => {
  const captionElement = document.getElementById('urlStatus');
  const inputElement = document.getElementById('rssInput');

  captionElement.innerHTML = text;
  captionElement.classList.remove('text-muted');
  captionElement.classList.remove('text-success');
  captionElement.classList.add('text-danger');
  inputElement.classList.add('is-invalid');
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
  captionElement.classList.remove('text-muted');
  captionElement.classList.remove('text-danger');
  captionElement.classList.add('text-success');
  inputElement.classList.remove('is-invalid');
  inputElement.classList.add('is-valid');
};

export const blockForm = () => {
  const inputElement = document.getElementById('rssInput');
  const buttonElement = document.getElementById('button-submit');
  inputElement.disabled = true;
  buttonElement.disabled = true;
};

export const unBlockForm = () => {
  const inputElement = document.getElementById('rssInput');
  const buttonElement = document.getElementById('button-submit');
  inputElement.disabled = false;
  buttonElement.disabled = false;
};

export const resetUrl = () => {
  const captionElement = document.getElementById('urlStatus');
  const inputElement = document.getElementById('rssInput');
  const rssInput = document.getElementById('rssInput');

  rssInput.value = '';

  captionElement.innerHTML = 'Добавте в новостную ленту Ваши любимые RSS каналы';
  captionElement.classList.add('text-muted');
  captionElement.classList.remove('text-danger');
  captionElement.classList.remove('text-success');
  inputElement.classList.remove('is-invalid');
  inputElement.classList.remove('is-valid');
};

export const renderModal = ({ link, title, description }) => {
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


export const hideModal = () => {
  const modalElement = document.querySelector('.modal');
  const bodyElement = document.querySelector('body');
  if (bodyElement.classList.contains('modal-open')) {
    modalElement.style.display = 'none';

    const divElement = document.querySelector('.modal-backdrop');
    bodyElement.removeChild(divElement);
    bodyElement.classList.remove('modal-open');
  }
};
