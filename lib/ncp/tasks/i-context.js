

/**
 * @interface
 * @extends {ncp.cron.ITask}
 */
ncp.tasks.IContext = function() {};


/**
 * @param {function(fm.Input)} complete
 * @param {function(string, number=)} cancel
 * @param {fm.Input} data
 */
ncp.tasks.IContext.prototype.processInput = function(complete, cancel, data) {};


/**
 * @param {function(fm.Input)} complete
 * @param {function(string, number=)} cancel
 * @param {fm.Input} data
 */
ncp.tasks.IContext.prototype.processOutput = function(complete, cancel, data) {};


/**
 *
 */
ncp.tasks.IContext.prototype.exec = function() {};


/**
 * @param {*} data
 */
ncp.tasks.IContext.prototype.complete = function(data) {};


/**
 * @param {string} message
 * @param {number=} opt_code
 */
ncp.tasks.IContext.prototype.cancel = function(message, opt_code) {};
