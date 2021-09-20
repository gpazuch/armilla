const sinks = require('./src/sinks');

const agents = require('./src/agents');

const agentGroups = require('./src/agent-groups');

const agentPolicy = require('./src/agent-policy');

Promise.all([sinks, agents, agentGroups, agentPolicy])
  .then(
    () => console.log('success'),
    (e) => {
      console.log(e);
      process.exitCode = 1;
    })
  .finally(() => {
    console.log('finished');
    process.exitCode = 0;
  });
