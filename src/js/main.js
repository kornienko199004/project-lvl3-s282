import Model from './model';
import View from './view';
import Controller from './controller';

export default () => {
  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view);
  controller.initialize();
};

