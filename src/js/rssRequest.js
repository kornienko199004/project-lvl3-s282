import axios from 'axios';

const proxyURL = 'https://cors-anywhere.herokuapp.com/';
export default url => axios.get(`${proxyURL}${url}`)
  .then(response => response);
