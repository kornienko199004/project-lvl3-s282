import { submitUrl, clickDescriptionButton, clickClose } from './model';

export const addFormSubmitListener = () => {
  const formElement = document.querySelector('form');
  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const rssInput = document.getElementById('rssInput');
    submitUrl(rssInput.value);
  });
};

export const addModalWindowEvents = () => {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-description')) {
      const ulElement = e.target.parentElement.parentElement;
      for (let i = 0; i < ulElement.children.length; i += 1) {
        if (ulElement.children[i] === e.target.parentElement) {
          clickDescriptionButton(i);
        }
      }
    }
    if (e.target.classList.contains('close')) {
      clickClose();
    }
    if (e.target.classList.contains('modal')) {
      clickClose();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
      clickClose();
    }
  });
};
