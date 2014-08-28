

var ncp = require('../bin/ncp.js');

var client = ncp.db.mongo.Client('test', 21017);

client.set('ns', 'key', 10);