var kafka = require('kafka-node');

function ConnectionProvider() {
    this.getConsumer = function() {
        
            this.client = new kafka.KafkaClient("localhost:2181");
            this.kafkaConsumerConnection = new kafka.Consumer(this.client,[ { topic: "users", partition: 0 }, { topic: "courses", partition: 0 }, { topic: "inbox", partition: 0 }]);
            this.client.on('ready', function () { console.log('client ready!') })
        
        return this.kafkaConsumerConnection;
    };

    //Code will be executed when we start Producer
    this.getProducer = function() {

        if (!this.kafkaProducerConnection) {
            this.client = new kafka.KafkaClient("localhost:2181");
            var HighLevelProducer = kafka.HighLevelProducer;
            this.kafkaProducerConnection = new HighLevelProducer(this.client);
            //this.kafkaConnection = new kafka.Producer(this.client);
            console.log('producer ready');
        }
        return this.kafkaProducerConnection;
    };
}
exports = module.exports = new ConnectionProvider;