# Armilla
## Tooling scripts for [ORB-Observability Platform](https://github.com/ns1labs/orb) development, demonstration and observation.

This repository contains an angular app that retrieves an auth token and inserts random data to your local ORB instance at large numbers.

It relies on [Faker](https://github.com/faker-js/faker) for data generation.

>Currently supported entities: 
> * Login / Auth Token Retrieval
> * Agent

>Future:
> * Batch Agent Provisioning Command download
> * Agent Groups
> * Agent Policies
> * Sinks
> * Datasets


## Setup

```sh
git clone git@github.com:gpazuch/orb-scripts.git;
cd orb-scripts;
npm install;
```

## Usage
```sh
npm run start;
## open your browser on http://localhost:4300
```

![Agent Generation Screen](github/agent_generator.webp?raw=true "Agent")


## Contributions

Please feel free to create pull-requests and start discussions on how we can improve and extend this little utility app.


## Acknowledgements

* [rovaris](https://github.com/rovaris)   
* [iatdaitan](https://github.com/iatdaitan)  
