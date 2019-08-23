var crypto = require('crypto');
var conn = require('./connection');

var TIMEOUT=8000; //time to wait for response in ms
var self;

exports = module.exports =  KafkaRPC;
//555555 runs the constructor and connects to producer in connection.js
function KafkaRPC(){
    self = this;
    this.connection = conn;
    this.requests = {}; //hash to store request in wait for response
    this.response_queue = false; //placeholder for the future queue
    this.producer = this.connection.getProducer();
}
//88888 runs makerequest
KafkaRPC.prototype.makeRequest = function(topic_name, content, callback){

    self = this;        //because we cant do this.this for any fucntion definded insisde this functuin that wants to access anything in the outer function
    //generate a unique correlation id for this call
    //888.111 generate a unique request id for this request
    var correlationId = crypto.randomBytes(16).toString('hex'); //or uuid

    //888.222 create a timeout for what should happen if we don't get a response
    var tId = setTimeout(function(corr_id){
        //if this ever gets called we didn't get a response in a
        //timely fashion
        console.log('timeout');
        callback(new Error("timeout " + corr_id));
        //delete the entry from hash
        delete self.requests[corr_id];
    }, TIMEOUT, correlationId);

    //create a request entry to store in a hash
    var entry = {
        callback:callback,
        timeout: tId //the id for the timeout so we can clear it
    };

    //put the entry in the hash so we can match the response later
    //888.333 store all your request ids against a callback function to call once response is received
    self.requests[correlationId]=entry;

    //make sure we have a response topic
    //888.444 to call the kakfa backend and to set up consumer <see the rpc actual func below>
    self.setupResponseQueue(self.producer,function(){
        console.log('in response');
        //put the request on a topic
        //888.777 payloads is data sent to kafka backend/consumer
        var payloads = [
            { topic: topic_name, messages: JSON.stringify({
                correlationId:correlationId,
                replyTo:'reply-'+topic_name,
                data:content}),
                partition:0}
        ];
        console.log('in response1');
        console.log(self.producer.ready);
        //888.888 .send actually sends to kafka backend/consumer //emit function jaise
        self.producer.send(payloads, function(err, data){
            console.log('in response2');
            if(err)
                console.log(err);
            console.log(data);
        });
    });
};

//888.444
KafkaRPC.prototype.setupResponseQueue = function(producer, next){
    //don't mess around if we have a queue
    if(this.response_queue) return next();

    console.log('1');

    self = this;

    //subscribe to messages
    //888.555 first time while creating queue check connection.js
    var consumer = self.connection.getConsumer();
    //.on is an event listener listens to kafka backend
    consumer.on('message', function (message) {
        console.log('msg received');
        var data = JSON.parse(message.value);   //kafka res
        //get the correlationId
        var correlationId = data.correlationId;
        //is it a response to a pending request
        if(correlationId in self.requests){
            //retrieve the request entry
            var entry = self.requests[correlationId];
            //make sure we don't timeout by clearing it
            clearTimeout(entry.timeout);
            //delete the entry from hash
            delete self.requests[correlationId];
            //callback, no err
            entry.callback(data.error, data.data);
        }
    });
    self.response_queue = true;
    console.log('returning next');
    return next();
};