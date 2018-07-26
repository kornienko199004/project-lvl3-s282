import { submitUrl } from './model';

export const addFormSubmitListener = () => {
  const formElement = document.querySelector('form');
  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const rssInput = document.getElementById('rssInput');
    submitUrl(rssInput.value);
  });
};
