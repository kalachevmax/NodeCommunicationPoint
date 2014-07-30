

/**
 * @constructor
 * @param {string} serverHost
 * @param {string} serverPort
 */
ncp.net.ws.Client = function(serverHost, serverPort) {
  this.__connectToServer(serverHost, serverPort);
};


/**
 * @param {string} host
 * @param {number} port
 * @return {*}
 */
ncp.net.ws.Client.prototype.__connectToServer = function(host, port) {
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
