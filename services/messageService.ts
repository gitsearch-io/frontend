import amqplib = require('amqplib');

export class MessageService {

    public cloneRepository(url:string) {
        const queue = 'CLONE';
        return this.getChannel(queue)
            .then(channel => {
                channel.sendToQueue(queue, new Buffer(url));
            });
    }
    
    public updateRepository(url:string) {
        const queue = 'UPDATE';
        return this.getChannel(queue)
            .then(channel => {                
                channel.sendToQueue(queue, new Buffer(url));
            });
    }
    
    public updateRepositoryy(url:string) {
        const queue = 'UPDATE';
        const id = '123456';
        return amqplib.connect('amqp://localhost')
            .then(conn => {
                return conn.createChannel();
            })
            .then(channel => {
                channel.assertQueue('', {exclusive: true})
                .then(q => {
                    channel.consume(q.queue, message => {
                        console.log(message.content.toString());
                    });
                    channel.sendToQueue(queue, new Buffer(url), {correlationId: id, replyTo: q.queue});
                }); 
            });
    }
    
    private getChannel(queue: string) {        
         return amqplib.connect('amqp://localhost')
            .then(conn => {
                return conn.createChannel();
            })
            .then(channel => {
                channel.assertQueue(queue, {durable: false});
                return channel;
            });
    }
}