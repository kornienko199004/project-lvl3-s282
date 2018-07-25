import rssRequest from './rssRequest';
import parser from './parser';

export default class Model {
  static request(url) {
    return rssRequest(url)
      .then(response => parser(response));
  }
}
