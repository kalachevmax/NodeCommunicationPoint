

/**
 * @constructor
 * @param {string} collectionName
 * @param {string} key
 * @param {ncp.db.mongo.Value} value
 */
ncp.db.mongo.Document = function(collectionName, key, value) {
  /**
   * @type {string}
   */
  this.__collectionName = collectionName;

  /**
   * @type {string}
   */
  this.__key = key;

  /**
   * @type {ncp.db.mongo.Value}
   */
  this.__value = value;
};


/**
 * @return {string}
 */
ncp.db.mongo.Document.prototype.getCollectionName = function() {
  return this.__collectionName;
};


/**
 * @return {string}
 */
ncp.db.mongo.Document.prototype.getKey = function() {
  return this.__key;
};


/**
 * @return {ncp.db.mongo.Value}
 */
ncp.db.mongo.Document.prototype.getValue = function() {
  return this.__value;
};
