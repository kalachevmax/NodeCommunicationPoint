

/**
 * @interface
 */
ncp.db.IRequest = function() {};


/**
 * @return {ncp.db.RequestType}
 */
ncp.db.IRequest.prototype.getType = function() {};


/**
 * @return {!Function}
 */
ncp.db.IRequest.prototype.complete = function() {};


/**
 * @return {function(string, number=)}
 */
ncp.db.IRequest.prototype.cancel = function() {};
