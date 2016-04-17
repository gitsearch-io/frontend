import elasticsearch = require('elasticsearch');

export class ElasticSearchService {
    
    public search(query:string, url:string) {
        let client = new elasticsearch.Client({
            host: 'localhost:9200',
            log: 'trace'
        });
         return client.search({
            index: 'gitsearch',
            type: 'codefile',
            body: {
                query: {
                    bool: {
                        must: [
                            {term: {url: url}},
                            {match: {content:query}}
                        ]
                    }
                }
            }
        });  
    }
}
