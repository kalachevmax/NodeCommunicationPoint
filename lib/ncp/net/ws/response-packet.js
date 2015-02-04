

/**
 * @constructor
 * @extends {ws.Packet}
 * @param {ws.Command} command
 * @param {!Object} requestBody
 * @param {*=} opt_response
 */
ws.ResponsePacket = function(command, requestBody, opt_response) {
  ws.Packet.call(this, command);

  /**
   * @type {*}
   */
  this.__response = typeof opt_response !== 'undefined' ? opt_response : null;

  /**
   * @type {!Object}
   */
  this.__requestBody = requestBody;
};

util.inherits(ws.ResponsePacket, ws.Packet);


/**
 * @inheritDoc
 */
ws.ResponsePacket.prototype.getBody = function() {
  return {
    response: this.__response,
    request_body: this.__requestBody
  };
};


/**
 * @return {*}
 */
ws.ResponsePacket.prototype.getResponse = function() {
  return this.__response;
};


/**
 * @return {!Object}
 */
ws.ResponsePacket.prototype.getRequestBody = function() {
  return this.__requestBody;
};


/**
 * @param {!Object} data
 */
ws.ResponsePacket.prototype.populate = function(data) {
  this.__response = data['response'];
};
