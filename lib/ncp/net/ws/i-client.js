

/**
 * @interface
 */
ncp.net.ws.IClient = function() {};


/**
 * @param {string} host
 * @param {number} port
 */
ncp.net.ws.IClient.prototype.connect = function(host, port) {};


/**
 * @param {!ncp.net.ws.Request} request
 */
ncp.net.ws.IClient.prototype.send = function(request) {};
