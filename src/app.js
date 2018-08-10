import restify from 'restify';
import Config from '../config';
import Smiirl from './Smiirl.class.js';

const smiirlInstance = new Smiirl();

const server = restify.createServer({
  name: Config.name,
  version: Config.version
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/', (req, res) => {
  smiirlInstance.getTotalSales().then(() => res.json(smiirlInstance.data));
});

server.listen(Config.port, () => console.log(`[${Config.env}] ${server.name} listening at ${server.url}`));
