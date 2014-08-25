

/**
 * @interface
 */
ncp.db.mongo.IRequest = function() {};


/**
 * @return {string}
 */
ncp.db.mongo.IRequest.prototype.getCollectionName = function() {};


/**
 * @return {!Object}
 */
ncp.db.mongo.IRequest.prototype.getDocument = function() {};
