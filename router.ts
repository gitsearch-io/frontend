import restify = require('restify');
import messageService = require('./controllers/repository');

var repositoryService = new messageService.Repository();

var server = restify.createServer();
server.use(restify.queryParser());
server.get('/repository/clone/:url', repositoryService.cloneRepository);
server.get('/repository/update/:url', repositoryService.updateRepository);
server.get('/repository/search', repositoryService.searchRepository);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
