import DefaultConfig from './default.config.js';

const EnvConfig = require(`./${DefaultConfig.env}.config.js`);

export default {
  ...DefaultConfig,
  ...EnvConfig
};
