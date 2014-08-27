

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
 * @param {string} ns
 * @param {string} key
 * @param {dm.Value} value
 * @param {!Function} complete
 * @param {function(string, number=)} cancel
 */
ncp.db.IClient.prototype.set = function(ns, key, value, complete, cancel) {};


/**
 * @param {string} ns
 * @param {string} key
 * @param {!Function} complete
 * @param {function(string, number=)} cancel
 */
ncp.db.IClient.prototype.get = function(ns, key, complete, cancel) {};


/**
 * @param {string} ns
 * @param key
 * @param {!Function} complete
 * @param {function(string, number=)} cancel
 */
ncp.db.IClient.prototype.del = function(ns, key, complete, cancel) {};


/**
 * @param {string} ns
 * @param {string} key
 * @param {dm.Value} value
 * @param {!Function} complete
 * @param {function(string, number=)} cancel
 */
ncp.db.IClient.prototype.add = function(ns, key, value, complete, cancel) {};


/**
 * @param {string} ns
 * @param {string} key
 * @param {!Function} complete
 * @param {function(string, number=)} cancel
 */
ncp.db.IClient.prototype.remove = function(ns, key, complete, cancel) {};


/**
 * @param {string} ns
 * @param {string} key
 * @param {ncp.db.Condition} condition
 * @param {!Function} complete
 * @param {function(string, number=)} cancel
 */
ncp.db.IClient.prototype.filter =
    function(ns, key, condition, complete, cancel) {};
