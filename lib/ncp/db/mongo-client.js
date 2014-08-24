

/**
 * @constructor
 * @implements {ncp.db.IClient}
 * @param {string} dbName
 * @param {number} port
 * @param {string=} opt_host
 */
ncp.db.MongoClient = function(dbName, port, opt_host) {
  this.connect(opt_host || '127.0.0.1', port, dbName);
};


/**
 * @inheritDoc
 */
ncp.db.MongoClient.prototype.connect = function(host, port, dbName) {
  mongodb.MongoClient.connect('mongodb://' + host + ':' + port + '/' + dbName);
};


/**
 * @inheritDoc
 */
ncp.db.MongoClient.prototype.set = function(key, value) {

};


/**
 * @inheritDoc
 */
ncp.db.MongoClient.prototype.get = function(key) {

};


/**
 * @inheritDoc
 */
ncp.db.MongoClient.prototype.del = function(key) {

};


/**
 * @inheritDoc
 */
ncp.db.MongoClient.prototype.add = function(key, value) {

};


/**
 * @inheritDoc
 */
ncp.db.MongoClient.prototype.filter = function(key, condition) {

};
