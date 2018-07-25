import rssRequest from './rssRequest';
import parser from './parser';

const proxyURL = 'https://cors-anywhere.herokuapp.com/';

export default class Model {
  request(url) {
    return rssRequest(url)
    .then(response => parser(response));
  }
}
