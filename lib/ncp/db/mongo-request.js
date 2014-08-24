

/**
 * @constructor
 * @implements {ncp.db.IRequest}
 * @param {ncp.db.RequestType} type
 * @param {*} data
 * @param {function()} complete
 * @param {function(string, number=)} cancel
 */
ncp.db.MongoRequest = function(type, data, complete, cancel) {
  /**
   * @type {ncp.db.RequestType}
   */
  this.__type = type;

  /**
   * @type {*}
   */
  this.__data = data;

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
ncp.db.MongoRequest.prototype.getData = function() {
  return this.__data;
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
