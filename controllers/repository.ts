"use strict";

import restify = require('restify');

import messageService = require('../services/messageService');
import elasticSearchService = require('../services/elasticSearchService');

export class Repository {
    private messageService: messageService.MessageService;
    private elasticSearch: elasticSearchService.ElasticSearchService;
    
    constructor() {
        this.messageService = new messageService.MessageService();
        this.elasticSearch = new elasticSearchService.ElasticSearchService();
    }
        
    cloneRepository = (req:restify.Request, res:restify.Response, next:restify.Next) => {
        this.messageService.cloneRepository(req.params.url)
            .then(() => {
                res.send('hello' + req.params.url);
                next();
            });
    }
    
    updateRepository = (req:restify.Request, res:restify.Response, next:restify.Next) => {
        this.messageService.updateRepositoryy(req.params.url)
            .then(() => {
                res.send('hello' + req.params.url);
                next();
            });
    }   
    
    searchRepository = (req:restify.Request, res:restify.Response, next:restify.Next) => {
        console.log(req.params);
        this.elasticSearch.search(req.params.query, req.params.repo)
            .then(result => {
                res.send(result);
                next();
        })
    }
}



