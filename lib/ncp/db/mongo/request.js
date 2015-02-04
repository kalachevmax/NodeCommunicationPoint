

/**
 * @constructor
 * @param {ncp.db.RequestType} type
 * @param {string} ns
 * @param {string} key
 * @param {ncp.db.mongo.Value} value
 * @param {fm.Complete} complete
 * @param {fm.Cancel} cancel
 */
ncp.db.mongo.Request = function(type, ns, key, value, complete, cancel) {
  /**
   * @type {ncp.db.RequestType}
   */
  this.__type = type;

  /**
   * @type {!ncp.db.mongo.Document}
   */
  this.__document = new ncp.db.mongo.Document(ns, key, value);

  /**
   * @type {fm.Complete}
   */
  this.__complete = complete;

  /**
   * @type {function(string, number=)}
   */
  this.__cancel = cancel;
};


/**
 * @return {ncp.db.RequestType}
 */
ncp.db.mongo.Request.prototype.getType = function() {
  return this.__type;
};


/**
 * @return {!ncp.db.mongo.Document}
 */
ncp.db.mongo.Request.prototype.getDocument = function() {
  return this.__document;
};


/**
 * @param {*} arg
 */
ncp.db.mongo.Request.prototype.complete = function(arg) {
  this.__complete(arg);
};


/**
 * @param {string} message
 * @param {number=} opt_code
 */
ncp.db.mongo.Request.prototype.cancel = function(message, opt_code) {
  this.__cancel(message, opt_code);
};
