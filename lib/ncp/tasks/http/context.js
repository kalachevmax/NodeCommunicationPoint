

/**
 * @constructor
 * @extends {ncp.tasks.Context}
 * @param {!ncp.tasks.ITask} task
 * @param {!http.ServerResponse} response
 */
ncp.tasks.http.Context = function(task, response) {
  ncp.tasks.Context.call(this, task);

  /**
   * @type {!http.ServerResponse}
   */
  this.__response = response;
};

util.inherits(ncp.tasks.http.Context, ncp.tasks.Context);


/**
 * @inheritDoc
 */
ncp.tasks.http.Context.prototype.complete = function(packet) {
  if (typeof packet === 'string') {
    this.__response.setHeader('Content-Type', 'application/json');
    this.__response.statusCode = 200;
    this.__response.end(packet);
  }
};


/**
 * @inheritDoc
 */
ncp.tasks.http.Context.prototype.cancel = function(message, opt_code) {
  ncp.tasks.Context.prototype.cancel(message, opt_code);
  this.__response.setHeader('Content-Type', 'application/json');
  this.__response.statusCode = opt_code || 500;
  this.__response.end('');
};


/**
 * @inheritDoc
 */
ncp.tasks.http.Context.prototype.processOutput =
    function(complete, cancel, data) {
  complete(ncp.tasks.http.createPacket(data));
};
