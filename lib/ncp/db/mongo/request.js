

/**
 * @constructor
 * @implements {ncp.db.IRequest}
 * @implements {ncp.db.mongo.IRequest}
 * @param {ncp.db.RequestType} type
 * @param {function()} complete
 * @param {function(string, number=)} cancel
 */
ncp.db.mongo.Request = function(type, complete, cancel) {
  /**
   * @type {ncp.db.RequestType}
   */
  this.__type = type;

  /**
   * @type {function()}
   */
  this.__complete = complete;

  /**
   * @type {function(string, number=)}
   */
  this.__cancel = cancel;
};


/**
 * @inheritDoc
 */
ncp.db.mongo.Request.prototype.getType = function() {
  return this.__type;
};


/**
 * @inheritDoc
 */
ncp.db.mongo.Request.prototype.complete = function() {
  return this.__complete;
};


/**
 * @inheritDoc
 */
ncp.db.mongo.Request.prototype.cancel = function() {
  return this.__cancel;
};


/**
 * @inheritDoc
 */
ncp.db.mongo.Request.prototype.getCollectionName = function() {
  return '';
};


/**
 * @inheritDoc
 */
ncp.db.mongo.Request.prototype.getDocument = function() {
  return {};
};
