

/**
 * @param {string} ns
 * @param {string} key
 * @param {*} value
 * @param {!Function} complete
 * @param {function(string, number=)} cancel
 * @return {!ncp.db.mongo.SetRequest}
 */
ncp.db.mongo.createSetRequest = function(ns, key, value, complete, cancel) {
  return new ncp.db.mongo.SetRequest(ns, key, value, complete, cancel);
};


/**
 * @param {string} ns
 * @param {string} key
 * @param {!Function} complete
 * @param {function(string, number=)} cancel
 * @return {!ncp.db.mongo.GetRequest}
 */
ncp.db.mongo.createGetRequest = function(ns, key, complete, cancel) {
  return new ncp.db.mongo.GetRequest(ns, key, complete, cancel);
};
