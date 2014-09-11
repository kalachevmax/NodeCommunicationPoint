

/**
 * @constructor
 * @implements {ncp.tasks.ITask}
 * @param {fm.Action} script
 */
ncp.tasks.Task = function(script) {
  /**
   * @type {fm.Action}
   */
  this.__script = script;
};


/**
 * @return {fm.Action}
 */
ncp.tasks.Task.prototype.getScript = function() {
  return this.__script;
};
