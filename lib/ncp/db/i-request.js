

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
ncp.db.IRequest.prototype.getComplete = function() {};


/**
 * @return {function(string, number=)}
 */
ncp.db.IRequest.prototype.getCancel = function() {};
