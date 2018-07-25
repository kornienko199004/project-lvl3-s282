import rssRequest from './rssRequest';
import validator from './validator';
import render from './render';
import parser from './parser';

const formElement = document.querySelector('form');
const linksList = new Set();
const inputCaption = document.querySelector('#urlStatus');

export default () => {
  formElement.addEventListener('submit', (e) => {
    const rssInput = document.querySelector('#rssInput');
    const { value } = rssInput;
    e.preventDefault();
    if (validator(value) && !linksList.has(value)) {
      if (rssInput.classList.contains('is-invalid')) {
        rssInput.classList.remove('is-invalid');
      }
      rssInput.classList.add('is-valid');

      rssRequest(value)
        .then((response) => {
          render(parser(response));

          inputCaption.innerHTML = 'Добавте в новостную ленту Ваши любимые RSS каналы';
          if (inputCaption.classList.contains('text-danger')) {
            inputCaption.classList.remove('text-danger');
          }

          if (inputCaption.classList.contains('text-success')) {
            inputCaption.classList.remove('text-success');
          }
          if (rssInput.classList.contains('is-invalid')) {
            rssInput.classList.remove('is-invalid');
          }

          if (rssInput.classList.contains('is-valid')) {
            rssInput.classList.remove('is-valid');
          }

          inputCaption.classList.add('text-muted');
          linksList.add(value);
          rssInput.value = '';
        })
        .catch(() => {
          inputCaption.innerHTML = 'Ошибка сети или RSS адрес не существует';
          inputCaption.classList.remove('text-muted');
          inputCaption.classList.add('text-danger');
          rssInput.classList.add('is-valid');
        });
    } else {
      if (linksList.has(value)) {
        inputCaption.innerHTML = 'RSS канал уже добавлен';
        inputCaption.classList.remove('text-muted');
        inputCaption.classList.add('text-danger');
      } else {
        inputCaption.innerHTML = 'Неправильный формат RSS адреса';
        inputCaption.classList.remove('text-muted');
        inputCaption.classList.add('text-danger');
      }
      rssInput.classList.add('is-invalid');
    }
  });
};
