

/**
 * @constructor
 * @implements {ncp.db.IClient}
 * @param {string} dbName
 * @param {number} port
 * @param {string=} opt_host
 */
ncp.db.MongoClient = function(dbName, port, opt_host) {
  this.connect(opt_host || '127.0.0.1', port, dbName);

  /**
   * @type {mongodb.DataBase}
   */
  this.__core = null;

  /**
   * @type {!Array.<!ncp.db.MongoRequest>}
   */
  this.__requests = [];
};


/**
 * @inheritDoc
 */
ncp.db.MongoClient.prototype.connect = function(host, port, dbName) {
  var self = this;

  mongodb.MongoClient.connect('mongodb://' + host + ':' + String(port) +
      '/' + dbName, function(error, db) {

    if (error !== null) {
      console.error('[ncp.db.MongoClient] connect: ' + error.toString());
    } else {
      self.__core = db;
      self.__flush();
    }
  });
};


/**
 *
 */
ncp.db.MongoClient.prototype.__flush = function() {
  var i = 0,
      l = this.__requests;

  while (i < l) {
    this.__send(this.__requests[i]);
    i += 1;
  }
};


/**
 * @param {!ncp.db.MongoRequest} request
 */
ncp.db.MongoClient.prototype.__send = function(request) {
  switch (request.getType()) {
    case ncp.db.RequestType.SET:
      this.__sendSetRequest(request);


  }
};


/**
 * @param {!ncp.db.MongoRequest} request
 */
ncp.db.MongoClient.prototype.__sendSetRequest = function(request) {
  
};


/**
 * @inheritDoc
 */
ncp.db.MongoClient.prototype.set = function(ns, key, value, complete, cancel) {
  this.__requests.push(new ncp.db.MongoRequest(ncp.db.RequestType.SET,
      {key: key, value: value}, complete, cancel));

  this.__flush();
};


/**
 * @inheritDoc
 */
ncp.db.MongoClient.prototype.get = function(ns, key) {

};


/**
 * @inheritDoc
 */
ncp.db.MongoClient.prototype.del = function(ns, key) {

};


/**
 * @inheritDoc
 */
ncp.db.MongoClient.prototype.add = function(ns, key, value) {

};


/**
 * @inheritDoc
 */
ncp.db.MongoClient.prototype.filter = function(ns, key, condition) {

};
