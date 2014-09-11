

/**
 * @interface
 */
ncp.net.http.IServer = function() {};


/**
 * @param {number} port
 */
ncp.net.http.IServer.prototype.listen = function(port) {};


/**
 * @param {string} url
 * @param {!ncp.tasks.Task} task
 */
ncp.net.http.IServer.prototype.registerTask = function(url, task) {};
