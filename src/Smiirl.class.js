import WooCommerceAPI from "woocommerce-api";
import Config from "../config";

const SIXTY_SECONDS_MS = 60000;

export default class Smiirl {
  constructor() {
    this.data = { [Config.noSalesName]: 0, lastUpdated: null };
    this.nextFetch = null;
    this.wooCommerce = new WooCommerceAPI(Config.wooCommerce);
  }

  _canFetch() {
    return Config.noCache || this.nextFetch === null || this._getCurrentTime() >= this.nextFetch;
  }

  _getCurrentTime() {
    return (new Date()).getTime();
  }

  _getNextFetch() {
    return new Date(this._getCurrentTime() + (Config.fetchEveryXMinutes * SIXTY_SECONDS_MS));
  }

  fetchData() {
    // TODO: Calculate this dynamically
    const minDate = '2018-08-09';
    const maxDate = '2018-08-10';

    return this.wooCommerce
      .getAsync(`reports/sales?date_min=${minDate}&date_max=${maxDate}`)
      .then((result) => {
        // TODO: Actually grab the data
        // console.log('result: ', result);

        this.data[Config.noSalesName] = this.data[Config.noSalesName] + 1;
        this.data.lastUpdated = new Date(this._getCurrentTime()).toTimeString();
      });
  }

  getTotalSales() {
    return new Promise((resolve, reject) => {
      if (this._canFetch()) {
        // Fetch data for the first time or when we're able to next
        this.fetchData().then(
          () => {
            if (!Config.noCache) this.nextFetch = this._getNextFetch();
            resolve();
          },
          reject
        );
      } else {
        // Otherwise return the cached data
        resolve();
      }
    });
  }
};
