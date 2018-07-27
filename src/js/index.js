import { addFormSubmitListener, addModalWindowEvents, changeLooking } from './logic';

export default () => {
  addFormSubmitListener();
  addModalWindowEvents();
  changeLooking();
};
