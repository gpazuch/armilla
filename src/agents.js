// Creates Agents

const faker = require('faker');
const axios = require("axios");

const NUMBER_OF_AGENTS = faker.datatype.number({
  'min': 10,
  'max': 50
});

const TAGS = {
  region: ['br', 'eu', 'us'],
  node_type: ['dns'],
};

const shape = {
  name: "my-agent-10",
  orb_tags: {}
};

let axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
    'Authorization': process.env.AUTH_TOKEN,
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

  const agent = Object.assign({}, shape, {
    name: `agent-${faker.name.firstName()}-${i}`.toLowerCase(),
    orb_tags: tagsMap
  });

  axios.post(`${process.env.FULL_PATH}/agents`, JSON.stringify(agent), axiosConfig)
    .then(res => {
      return console.log(res);
    }).catch(e => {
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
