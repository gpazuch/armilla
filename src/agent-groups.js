// Creates Agent Groups

const faker = require('faker');
const axios = require("axios");

const NUMBER_OF_AGENT_GROUPS = faker.datatype.number({
  'min': 10,
  'max': 50
});

const TAGS = {
  region: ['br', 'eu', 'us'],
  node_type: ['dns'],
};

const shape = {
  name: "my_agent_group_10",
  description: "10_agent_group",
  tags: {}
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

for (let i = 0; i < NUMBER_OF_AGENT_GROUPS; i++) {
  const tags = faker.datatype.number({min: 1, max: tagKeys.length});
  const tagsMap = {};
  for (let j = 0; j < tags; j++) {
    const key = tagKeys[j];
    tagsMap[key] = TAGS[key][faker.datatype.number({min: 0, max: TAGS[key].length - 1})];
  }

  const agentGroup = Object.assign({}, shape, {
    name: `agent_group_${faker.name.firstName()}_${i}`.toLowerCase(),
    description: `#${i}_grouping`,
    tags: tagsMap
  });

  axios.post(`${process.env.FULL_PATH}/agent_groups`, JSON.stringify(agentGroup), axiosConfig)
    .then(res => {
      return console.log(res);
    }).catch(e => {
    errors.push(e.error);
  });
}
