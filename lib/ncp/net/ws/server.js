

/**
 * @constructor
 * @param {number} listenPort
 */
ncp.net.ws.Server = function(listenPort) {
  this.__startListening(listenPort);
};


/**
 * @param {number} port
 */
ncp.net.ws.Server.prototype.__startListening = function(port) {
  var server = new ws.Server({port: port});
  server.on('connection', handleConnection);

  /**
   * @param {*} ws
   */
  function handleConnection(ws) {
    console.log('[ncp.net.ws.Server] connection created');
    ws.on('message', handleMessage);
  }

  /**
   * @param {string} message
   */
  function handleMessage(message) {
    console.log('[ncp.net.ws.Server] message received: %s', message);
  }
};
