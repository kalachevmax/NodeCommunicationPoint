

/**
 * @constructor
 * @extends {ncp.db.mongo.Request}
 */
ncp.db.mongo.SetRequest = function() {

};


/**
 * @inheritDoc
 */
ncp.db.mongo.Request.prototype.getCollectionName = function() {
  return this.__ns;
};
