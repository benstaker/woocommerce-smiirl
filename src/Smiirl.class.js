import WooCommerceAPI from "woocommerce-api";
import moment from "moment";
import Config from "../config";

const parseResponse = (dateSelected, lastUpdated, url, body) => {
  const data = {};

  if (Config.dateSelectedName) data[Config.dateSelectedName] = dateSelected;
  if (Config.lastUpdatedName) data[Config.lastUpdatedName] = lastUpdated;

  if (Config.wooCommerceDataName) data[Config.wooCommerceDataName] = body;
  if (Config.wooCommerceUrlName) data[Config.wooCommerceUrlName] = url;


  if (Config.numItemsName) data[Config.numItemsName] = body.items;
  if (Config.numOrdersName) data[Config.numOrdersName] = body.orders;
  if (Config.salesName) data[Config.salesName] = Config.salesRoundUp ? Math.ceil(body.sales) : body.sales;

  return data;
};

const DATE_FORMAT = 'YYYY-MM-DD';
const DEFAULT_DATA = parseResponse(null, null, '', { items: 0, orders: 0, sales: 0 });
const SIXTY_SECONDS_MS = 60000;

export default class Smiirl {
  constructor() {
    this.data = { ...DEFAULT_DATA };
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
    const currentTime = moment();
    const currentDate = currentTime.format(DATE_FORMAT);
    const url = `reports/sales?date_min=${currentDate}&date_max=${currentDate}`;

    return this.wooCommerce
      .getAsync(url)
      .then((result) => {
        try {
          const body = JSON.parse(result.toJSON().body)[0];

          this.data = parseResponse(
            currentDate,
            currentTime.toISOString(),
            url,
            body.totals[currentDate]
          );
        } catch (e) {
          // Fall back to sending default data back
          this.data = { ...DEFAULT_DATA };
        }
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
