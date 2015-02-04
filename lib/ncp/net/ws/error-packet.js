

/**
 * @constructor
 * @extends {ws.Packet}
 * @param {ws.Command} command
 * @param {string} message
 */
ws.ErrorPacket = function(command, message) {
  ws.Packet.call(this, command);

  /**
   * @type {string}
   */
  this.__message = message;
};

util.inherits(ws.ErrorPacket, ws.Packet);


/**
 * @inheritDoc
 */
ws.ErrorPacket.prototype.getBody = function() {
  return {
    message: this.__message
  };
};


/**
 * @return {string}
 */
ws.ErrorPacket.prototype.getMessage = function() {
  return this.__message;
};


/**
 * @param {!Object} data
 */
ws.ErrorPacket.prototype.populate = function(data) {
  if (typeof data['command'] === 'string') {
    this.__command = data['command'];
  }

  if (typeof data['message'] === 'string') {
    this.__message = data['message'];
  }
};
