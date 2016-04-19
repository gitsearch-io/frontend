import * as restify from 'restify';

import * as messageService from '../services/messageService';
import {search} from '../services/elasticSearchService';

export function cloneRepository (req:restify.Request, res:restify.Response, next:restify.Next) {
    messageService.cloneRepository(req.params.url)
        .then(() => {
            res.send('hello' + req.params.url);
            next();
        });
}
    
export function updateRepository (req:restify.Request, res:restify.Response, next:restify.Next) {
    messageService.updateRepository(req.params.url)
        .then(() => {
            res.send('hello' + req.params.url);
            next();
        });
}   
    
export function searchRepository (req:restify.Request, res:restify.Response, next:restify.Next) {
    console.log(req.params);
    search(req.params.query, req.params.repo)
        .then(result => {
            res.send(result);
            next();
    })
}
