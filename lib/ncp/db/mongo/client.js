

/**
 * @constructor
 * @implements {ncp.db.IClient}
 * @param {string} dbName
 * @param {number} port
 * @param {string=} opt_host
 */
ncp.db.mongo.Client = function(dbName, port, opt_host) {
  this.connect(opt_host || '127.0.0.1', port, dbName);

  /**
   * @type {mongodb.DataBase}
   */
  this.__core = null;

  /**
   * @type {!Array.<!ncp.db.mongo.Request>}
   */
  this.__requests = [];
};


/**
 * @inheritDoc
 */
ncp.db.mongo.Client.prototype.connect = function(host, port, dbName) {
  var self = this;

  mongodb.mongo.Client.connect('mongodb://' + host + ':' + String(port) +
      '/' + dbName, function(error, db) {

    if (error !== null) {
      console.error('[ncp.db.mongo.Client] connect: ' + error.toString());
    } else {
      self.__core = db;
      self.__flush();
    }
  });
};


/**
 *
 */
ncp.db.mongo.Client.prototype.__flush = function() {
  var i = 0,
      l = this.__requests;

  while (i < l) {
    this.__send(this.__requests[i]);
    i += 1;
  }
};


/**
 * @param {!ncp.db.mongo.Request} request
 */
ncp.db.mongo.Client.prototype.__send = function(request) {
  switch (request.getType()) {
    case ncp.db.RequestType.SET:
      this.__sendSetRequest(request);


  }
};


/**
 * @param {!ncp.db.mongo.SetRequest} request
 */
ncp.db.mongo.Client.prototype.__sendSetRequest = function(request) {
  var colName = request.getCollectionName();
  var doc = request.getDocument();

  this.__core.collection(colName).insert(doc, {w: 1}, function(error, objects) {

  });
};


/**
 * @inheritDoc
 */
ncp.db.mongo.Client.prototype.set = function(ns, key, value, complete, cancel) {
  this.__requests.push(ncp.db.mongo.createSetRequest(
      ns, key, value, complete, cancel));

  this.__flush();
};


/**
 * @inheritDoc
 */
ncp.db.mongo.Client.prototype.get = function(ns, key) {

};


/**
 * @inheritDoc
 */
ncp.db.mongo.Client.prototype.del = function(ns, key) {

};


/**
 * @inheritDoc
 */
ncp.db.mongo.Client.prototype.add = function(ns, key, value) {

};


/**
 * @inheritDoc
 */
ncp.db.mongo.Client.prototype.filter = function(ns, key, condition) {

};
