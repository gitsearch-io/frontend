import {getConnection} from '../connections/elasticsearchConnection';

export function search(query:string, url:string) {
    let client = getConnection();
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
