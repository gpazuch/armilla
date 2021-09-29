const axios = require('axios');

let axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Host': 'localhost:4200',
    'User-Agent': "Mozilla/5.0 (X11; Linux x86_64; rv:93.0) Gecko/20100101 Firefox/93.0",
    'Accept': ['application/json', 'text/plain', '*/*',],
    'Content-Type': 'application/json',
    'Content-Length': 51,
    'Origin': 'http://localhost:4200',
    'Connection': 'keep-alive',
    'Referer': 'http://localhost:4200/auth/login',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
  }
};

const user = {
  'email': process.env.EMAIL,
  'password': process.env.PASSWORD,
};

const errors = [];

const func = () => axios.post('http://localhost:80/api/v1/tokens', JSON.stringify(user), axiosConfig);
module.exports = func;
