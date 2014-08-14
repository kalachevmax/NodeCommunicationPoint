

/**
 * @constructor
 * @implements {ncp.net.http.IServer}
 * @param {number} opt_port
 */
ncp.net.http.Server = function(opt_port) {
  /**
   * @type {number}
   */
  this.__port = opt_port || 80;
};
