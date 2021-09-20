// Creates Agent Policies
const process = require('process');
const faker = require('faker');
const axios = require('axios');

const NUMBER_OF_POLICIES = faker.datatype.number({
  'min': 3,
  'max': 10
});

const BACKENDS = {
  pktvisor: 'pktvisor',
};

const TAGS = {
  region: ['br', 'eu', 'us'],
  node_type: ['dns'],
};

const VERSIONS = [1, 2, 3];

const shape = {
  name: 'policy_name_10',
  description: 'policy_name_10',
  backend: 'pktvisor',
  tags: {},
  version: 1,
  policy: {
    remote_host: 'com.prom.intl',
    username: 'test@example.com',
    password: 'testtest123'
  }
};

let axiosConfig = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzIwMTk0OTEsImlhdCI6MTYzMTk4MzQ5MSwiaXNzIjoibWFpbmZsdXguYXV0aCIsInN1YiI6ImFkbWluQGV4YW1wbGUuY29tIiwiaXNzdWVyX2lkIjoiNjhlZTU4NzMtNGM0MC00OTFhLTllOGItZTk3NDUyNGNhNzJmIiwidHlwZSI6MH0.xSwa-spmDJUOAkeD--83P_HaYcRcD2LVDnVfWBjspbE',
  }
};

const tagKeys = Object.keys(TAGS);
const backendKeys = Object.keys(BACKENDS);
const versions = VERSIONS;

const errors = [];
const p = [];
for ( let i = 0; i < NUMBER_OF_POLICIES; i++ ) {
  const tags = faker.datatype.number({ min: 1, max: tagKeys.length });
  const tagsMap = {};
  for ( let j = 0; j < tags; j++ ) {
    const key = tagKeys[j];
    tagsMap[key] = TAGS[key][faker.datatype.number({ min: 0, max: TAGS[key].length - 1 })];
  }

  const policy = Object.assign({}, shape, {
    name: `agent_policy_${ faker.name.firstName() }_${ i }`.toLowerCase(),
    description: `policy #${ i }`,
    version: versions[faker.datatype.number({ min: 0, max: versions.length })],
    policy: {
      kind: 'collection',
      input: { tap: 'mydefault', input_type: 'pcap' },
      handlers: { modules: 'default_net' }
    },
    tags: tagsMap
  });

  p.push(axios.post(`http://localhost:80/api/v1/policies/agent`, JSON.stringify(policy), axiosConfig)
    .then().catch(e => errors.push(e.error)));
}

!!errors && console.log(errors);

module.exports = p;
