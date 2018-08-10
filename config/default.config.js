import packageJson from '../package.json';

export default {
  env: process.env.NODE_ENV || 'development',
  fetchEveryXMinutes: 15,
  name: packageJson.name,
  noCache: false,
  noSalesName: 'noSales',
  port: 8080,
  version: packageJson.version
};
