import { addFormSubmitListener, addModalWindowEvents, searchingForChanges } from './logic';
import State from './state';

export default () => {
  const data = new State();
  addFormSubmitListener(data);
  addModalWindowEvents(data);
  searchingForChanges(data);
};
