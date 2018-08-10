import restify from 'restify';
import packageJson from '../package.json';

const server = restify.createServer({
  name: packageJson.name,
  version: packageJson.version
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.get('/echo/:name', (req, res, next) => {
  res.send(req.params);
  return next();
});

server.listen(8080, () => console.log('%s listening at %s', server.name, server.url));
