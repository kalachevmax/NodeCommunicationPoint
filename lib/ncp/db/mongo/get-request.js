

/**
 * @constructor
 * @extends {ncp.db.mongo.Request}
 * @param {string} ns
 * @param {string} key
 * @param {!Function} complete
 * @param {function(string, number=)} cancel
 */
ncp.db.mongo.GetRequest = function(ns, key, complete, cancel) {
  ncp.db.mongo.Request.call(this, ncp.db.RequestType.GET, complete, cancel);

  /**
   * @type {string}
   */
  this.__collectionName = ns;

  /**
   * @type {!Object}
   */
  this.__document = {key: key};
};

util.inherit(ncp.db.mongo.GetRequest, ncp.db.mongo.Request);


/**
 * @inheritDoc
 */
ncp.db.mongo.GetRequest.prototype.getCollectionName = function() {
  return this.__collectionName;
};


/**
 * @inheritDoc
 */
ncp.db.mongo.GetRequest.prototype.getDocument = function() {
  return this.__document;
};
