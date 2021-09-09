// Creates Agents

const faker = require('faker');
const axios = require("axios");

const NUMBER_OF_AGENT_GROUPS = faker.datatype.number({
  'min': 10,
  'max': 50
});

const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzEyMzE1MzQsImlhdCI6MTYzMTE5NTUzNCwiaXNzIjoibWFpbmZsdXguYXV0aCIsInN1YiI6ImFkbWluQGV4YW1wbGUuY29tIiwiaXNzdWVyX2lkIjoiMzRmM2RhOWItNjQ3Yy00ZjQ5LTkxZDgtMzViZmQ0OGFhODU4IiwidHlwZSI6MH0.gNUgjDHCQpZDcXoGbwCGI3-yfHTT_HZ6LlHICjpoJG8';

const TAGS = {
  region: ['br', 'eu', 'us'],
  node_type: ['dns'],
};

const shape = {
  name: "my_agent_group_10",
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

for (let i = 0; i < NUMBER_OF_AGENT_GROUPS; i++) {
  const tags = faker.datatype.number({min: 1, max: tagKeys.length});
  const tagsMap = {};
  for (let j = 0; j < tags; j++) {
    const key = tagKeys[j];
    tagsMap[key] = TAGS[key][faker.datatype.number({min: 0, max: TAGS[key].length - 1})];
  }

  const agentGroup = Object.assign({}, shape, {
    name: `agent_group_${faker.name.firstName()}_${i}`.toLowerCase(),
    orb_tags: tagsMap
  });

  axios.post("http://localhost:80/api/v1/agent_groups", JSON.stringify(agentGroup), axiosConfig)
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
  console.log(`There were ${errors.length} failed attempts to create an agent group`);

} else {
  console.log(`Succesffully created ${NUMBER_OF_AGENT_GROUPS} agent groups`);
}
