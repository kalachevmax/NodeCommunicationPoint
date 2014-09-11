

/**
 * @constructor
 * @implements {ncp.tasks.IContext}
 * @implements {ncp.cron.ITask}
 * @param {!ncp.tasks.ITask} task
 */
ncp.tasks.Context = function(task) {
  /**
   * @type {!ncp.tasks.ITask}
   */
  this.__task = task;
};


/**
 * @inheritDoc
 */
ncp.tasks.Context.prototype.processInput = function(complete, cancel, data) {
  complete(data);
};


/**
 * @inheritDoc
 */
ncp.tasks.Context.prototype.processOutput = function(complete, cancel, data) {
  complete(data);
};


/**
 * @inheritDoc
 */
ncp.tasks.Context.prototype.complete = function(data) {};


/**
 * @inheritDoc
 */
ncp.tasks.Context.prototype.cancel = function(message, opt_code) {
  console.error(message);
};


/**
 * @inheritDoc
 */
ncp.tasks.Context.prototype.exec = function() {
  var self = this;

  fm.script([
    this.processInput,
    this.__task.getScript(),
    this.processOutput
  ])(function(data) {
    self.complete.call(self, data);
  }, this.cancel, null);
};
