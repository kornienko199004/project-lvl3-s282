import { addFormSubmitListener, addModalWindowEvents, searchingForChanges } from './logic';
import State from './state';
import watch from './watch';

export default () => {
  const data = new State();
  watch(data);
  addFormSubmitListener(data);
  addModalWindowEvents(data);
  searchingForChanges(data);
};
