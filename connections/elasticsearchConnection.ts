import * as elasticsearch from 'elasticsearch';

let client;

export function init() {
    client = new elasticsearch.Client({
            host: 'localhost:9200',
            log: 'trace'
        });
}

export function getConnection(){
    return client;
}
