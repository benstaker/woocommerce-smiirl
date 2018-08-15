import packageJson from '../package.json';

export default {
  env: process.env.NODE_ENV || 'development',
  fetchEveryXMinutes: 15,
  name: packageJson.name,
  noCache: false,
  lastUpdatedName: 'lastUpdated',
  numItemsName: 'numberOfItems',
  numOrdersName: 'numberOfOrders',
  salesName: 'sales',
  salesRoundUp: true,
  port: 8080,
  version: packageJson.version
};
