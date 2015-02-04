

/**
 * @constructor
 * @param {ws.Command} command
 */
ws.Packet = function(command) {
  /**
   * @type {ws.Command}
   */
  this.__command = command;
};


/**
 * @return {!Object}
 */
ws.Packet.prototype.getBody = function() {
  return {};
};


/**
 * @return {ws.Command}
 */
ws.Packet.prototype.getCommand = function() {
  return this.__command;
};


/**
 * @param {!Object} data
 */
ws.Packet.prototype.populate = function(data) {};


/**
 * @return {!Buffer}
 */
ws.Packet.prototype.serialize = function() {
  var str = JSON.stringify({
    command: this.__command,
    body: this.getBody()
  });

  return new Buffer(str, 'utf8');
};
