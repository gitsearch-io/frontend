import * as restify from 'restify';

import {searchRepository, updateRepository, cloneRepository} from'./controllers/repository';
import {init as initES} from './connections/elasticsearchConnection'

initES();

var server = restify.createServer();
server.use(restify.queryParser());
server.get('/repository/clone/:url', cloneRepository);
server.get('/repository/update/:url', updateRepository);
server.get('/repository/search', searchRepository);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
