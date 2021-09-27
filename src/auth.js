const axios = require("axios");

let axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  }
};

const user = {
  email: process.env.EMAIL,
  password: process.env.PASSWORD,
};

const errors = [];

axios.post(`${process.env.FULL_PATH}/tokens`, JSON.stringify(user), axiosConfig)
    .then(res => {
      if(res.token){
        process.env.AUTH_TOKEN = res.token;
      }
      return res;
    }).catch(e => {
    errors.push(e.error);
  });
