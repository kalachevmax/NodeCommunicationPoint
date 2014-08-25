

/**
 * @constructor
 * @extends {ncp.db.mongo.Request}
 * @param {string} ns
 * @param {string} key
 * @param {*} value
 * @param {!Function} complete
 * @param {function(string, number=)} cancel
 */
ncp.db.mongo.SetRequest = function(ns, key, value, complete, cancel) {
  ncp.db.mongo.Request.call(this, ncp.db.RequestType.SET, complete, cancel);

  /**
   * @type {string}
   */
  this.__collectionName = ns;

  /**
   * @type {!Object}
   */
  this.__document = {
    key: key,
    value: value
  };
};

util.inherit(ncp.db.mongo.SetRequest, ncp.db.mongo.Request);


/**
 * @inheritDoc
 */
ncp.db.mongo.SetRequest.prototype.getCollectionName = function() {
  return this.__collectionName;
};


/**
 * @inheritDoc
 */
ncp.db.mongo.SetRequest.prototype.getDocument = function() {
  return this.__document;
};
