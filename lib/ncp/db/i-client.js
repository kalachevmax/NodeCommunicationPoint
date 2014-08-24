

/**
 * @interface
 */
ncp.db.IClient = function() {};


/**
 * @param {string} host
 * @param {number} port
 * @param {string} dbName
 */
ncp.db.IClient.prototype.connect = function(host, port, dbName) {};


/**
 * @param {string} key
 * @param {dm.Value} value
 */
ncp.db.IClient.prototype.set = function(key, value) {};


/**
 * @param {string} key
 */
ncp.db.IClient.prototype.get = function(key) {};


/**
 * @param key
 */
ncp.db.IClient.prototype.del = function(key) {};


/**
 * @param {string} key
 * @param {dm.Value} value
 */
ncp.db.IClient.prototype.add = function(key, value) {};


/**
 * @param {string} key
 * @param {ncp.db.Condition} condition
 */
ncp.db.IClient.prototype.filter = function(key, condition) {};
