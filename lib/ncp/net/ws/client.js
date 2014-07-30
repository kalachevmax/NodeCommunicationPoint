

/**
 * @constructor
 * @implements {ncp.net.ws.IClient}
 * @param {string} serverHost
 * @param {string} serverPort
 */
ncp.net.ws.Client = function(serverHost, serverPort) {
  this.connect(serverHost, serverPort);
};


/**
 * @inheritDoc
 */
ncp.net.ws.Client.prototype.connect = function(host, port) {
  var client = ws.connect('ws://' + host + ':' + String(port));
  client.on('open', handleSocketOpened);
  client.on('message', handleMessageReceived);

  /**
   *
   */
  function handleSocketOpened() {
    console.log('[ncp.net.ws.Client] socket opened');
  }

  /**
   * @param {string} message
   */
  function handleMessageReceived(message) {
    console.log('[ncp.net.ws.Client] message received: %s', message);
  }
};


/**
 * @inheritDoc
 */
ncp.net.ws.Client.prototype.send = function(request) {

};
