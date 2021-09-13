// Creates Agents

const faker = require('faker');
const axios = require("axios");

const NUMBER_OF_AGENTS = faker.datatype.number({
  'min': 10,
  'max': 50
});

const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzEyMzE1MzQsImlhdCI6MTYzMTE5NTUzNCwiaXNzIjoibWFpbmZsdXguYXV0aCIsInN1YiI6ImFkbWluQGV4YW1wbGUuY29tIiwiaXNzdWVyX2lkIjoiMzRmM2RhOWItNjQ3Yy00ZjQ5LTkxZDgtMzViZmQ0OGFhODU4IiwidHlwZSI6MH0.gNUgjDHCQpZDcXoGbwCGI3-yfHTT_HZ6LlHICjpoJG8';

const TAGS = {
  region: ['us:east', 'us:west', 'vt', 'br'],
  node_type: ['dns'],
};

const LOCATIONS = ['40.7053415,-74.013236', '37.7920932,-122.4022361', '21.0269054,105.8478266', '-27.5707056,-48.7504617'];

const shape = {
  name: "my-agent-10",
  orb_tags: {}
};

let axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
    'Authorization': AUTH_TOKEN,
  }
};

const tagKeys = Object.keys(TAGS);

const errors = [];

for (let i = 0; i < NUMBER_OF_AGENTS; i++) {
  const tags = faker.datatype.number({min: 1, max: tagKeys.length});
  const tagsMap = {};
  for (let j = 0; j < tags; j++) {
    const key = tagKeys[j];
    tagsMap[key] = TAGS[key][faker.datatype.number({min: 0, max: TAGS[key].length - 1})];
  }
  tags['location'] = LOCATIONS[faker.datatype.number({min: 0, max: LOCATIONS.length - 1})];

  const agent = Object.assign({}, shape, {
    name: `agent-${faker.name.firstName()}-${i}`.toLowerCase(),
    orb_tags: tagsMap
  });

  axios.post("http://localhost:80/api/v1/agents", JSON.stringify(agent), axiosConfig)
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
  console.log(`There were ${errors.length} failed attempts to create an agent`);

} else {
  console.log(`Succesffully created ${NUMBER_OF_AGENTS} agents`);
}

