

/**
 * @interface
 */
ncp.db.IRequest = function() {};


/**
 * @return {ncp.db.RequestType}
 */
ncp.db.IRequest.prototype.getType = function() {};


/**
 * @return {function(*)}
 */
ncp.db.IRequest.prototype.complete = function(data) {};


/**
 * @return {function(string, number=)}
 */
ncp.db.IRequest.prototype.cancel = function(message, opt_code) {};
