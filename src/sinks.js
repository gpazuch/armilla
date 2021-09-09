// Creates Agents

const faker = require('faker');
const axios = require("axios");

const NUMBER_OF_SINKS = faker.datatype.number({
  'min': 50,
  'max': 100
});

const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzEyMzE1MzQsImlhdCI6MTYzMTE5NTUzNCwiaXNzIjoibWFpbmZsdXguYXV0aCIsInN1YiI6ImFkbWluQGV4YW1wbGUuY29tIiwiaXNzdWVyX2lkIjoiMzRmM2RhOWItNjQ3Yy00ZjQ5LTkxZDgtMzViZmQ0OGFhODU4IiwidHlwZSI6MH0.gNUgjDHCQpZDcXoGbwCGI3-yfHTT_HZ6LlHICjpoJG8';

const BACKENDS = {
  prometheus: 'prometheus',
};

const TAGS = {
  region: ['br', 'eu', 'us'],
  node_type: ['dns'],
};

const shape = {
  name: "sink_name_10",
  description: "sink_name_10",
  backend: "prometheus",
  status: 'online',
  tags: {},
  config:{
    remote_host: 'com.prom.intl',
    username: 'test@example.com',
    password: 'testtest123'
  }
};

let axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
    'Authorization': AUTH_TOKEN,
  }
};

const tagKeys = Object.keys(TAGS);
const backendKeys = Object.keys(BACKENDS);

const errors = [];

for (let i = 0; i < NUMBER_OF_SINKS; i++) {
  const tags = faker.datatype.number({min: 1, max: tagKeys.length});
  const tagsMap = {};
  for (let j = 0; j < tags; j++) {
    const key = tagKeys[j];
    tagsMap[key] = TAGS[key][faker.datatype.number({min: 0, max: TAGS[key].length - 1})];
  }

  const sink = Object.assign({}, shape, {
    name: `sink_${faker.name.firstName()}_${i}`.toLowerCase(),
    description: `prom sink #${i}`,
    config: {
      username: faker.internet.userName(),
      remote_host: faker.internet.domainName(),
      password: faker.internet.password()
    },
    tags: tagsMap
  });
  console.log(sink);
  axios.post("http://localhost:80/api/v1/sinks", JSON.stringify(sink), axiosConfig)
    .then(res => {
      return console.log(res);
    }).catch(err => {
    errors.push(e.error);
  })
}

if (errors.length > 0) {
  for (let i = 0; i < errors.length; i++) {
    console.log("##################v");
    console.log(errors[i]);
  }
  console.log("##################v");
  console.log(`There were ${errors.length} failed attempts to create a sink`);

} else {
  console.log(`Succesffully created ${NUMBER_OF_SINKS} sinks`);
}
