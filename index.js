const system = require('system');
const process = require('process');

require('dotenv').config();

const getToken = require('./src/auth.js');
const populate = () => Promise.allSettled([
  require('./src/sinks'),
  require('./src/agents'),
  require('./src/agent-groups'),
  require('./src/agent-policy'),
]);
const run = async () => {
  await getToken().then(res => {
    console.log(res);
    if ( res['data']['token'] ) {
      process.env.AUTH_TOKEN = res['data']['token'];
    }else{
      throw new Error(`Authentication Error ${ res }`);
    }
  }).catch(e => {
    throw new Error(`Authentication Error ${ e }`);
  });

  return populate();
};

let responses = { resolved: [], rejected: [], errors: [] };
try {
  run()
  .then(
    (resolved) => responses.resolved.push(resolved),
    (rejected) => responses.rejected.push(rejected))
    .catch(e => responses.push(e))
    .finally(() => console.log({ responses }));
  } catch ( e ) {
    console.log(e);
    system.exitCode = 1;
  }
