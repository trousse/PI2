var app = require('express')();
var bodyParser = require('body-parser');
var elasticsearch = require('elasticsearch');
const port = 8080;
var redis = require("redis"),
    redisClient = redis.createClient();

app.use(bodyParser.urlencoded({ extended: true }));


var elasticsearchClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

require('./ChatFuelAPI')(app, redisClient);
require('./UserData')(app, elasticsearch);

app.listen(port, () => {
  console.log('We are live on ' + port);
});
