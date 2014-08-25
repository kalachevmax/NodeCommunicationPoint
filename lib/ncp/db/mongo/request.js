

/**
 * @constructor
 * @implements {ncp.db.IRequest}
 * @param {ncp.db.RequestType} type
 * @param {function()} complete
 * @param {function(string, number=)} cancel
 */
ncp.db.MongoRequest = function(type, complete, cancel) {
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
ncp.db.MongoRequest.prototype.getType = function() {
  return this.__type;
};


/**
 * @inheritDoc
 */
ncp.db.MongoRequest.prototype.getComplete = function() {
  return this.__complete;
};


/**
 * @inheritDoc
 */
ncp.db.MongoRequest.prototype.getCancel = function() {
  return this.__cancel;
};
