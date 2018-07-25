const axios = require('axios');

const proxyURL = 'https://cors-anywhere.herokuapp.com/';
export default url => axios.get(`${proxyURL}${url}`)
  .then((response, error) => new Promise((resolve, reject) => {
    if (error) {
      reject(error);
    } else {
      resolve(response);
    }
  }));

