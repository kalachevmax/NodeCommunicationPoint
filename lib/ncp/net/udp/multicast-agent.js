

/**
 * @constructor
 * @param {string} host
 * @param {number} port
 * @param {string} message
 * @param {number} ttl
 */
ncp.net.udp.MulticastAgent = function(host, port, message, ttl) {
  /**
   * @type {string}
   */
  this.__host = host;

  /**
   * @type {number}
   */
  this.__port = port;

  /**
   * @type {string}
   */
  this.__message = message;

  /**
   * @type {number}
   */
  this.__ttl = ttl;

  this.__startListening();
};


/**
 *
 */
ncp.net.udp.MulticastAgent.prototype.__startListening = function() {
  var socket = ncp.net.udp.createSocket();
  var self = this;

  socket.on('listening', function() {
    socket.setBroadcast(true);
    socket.setMulticastTTL(self.__ttl);
    socket.addMembership(self.__host);

    self.__listen(socket);

    self.__startMulticasting(socket, self.__port, self.__host,
        self.__message, self.__ttl);
  });
};


/**
 * @param {*} socket
 */
ncp.net.udp.MulticastAgent.prototype.__listen = function(socket) {
  socket.on('message', function (message, remote) {
    console.log('[MulticastAgent] message received: %s (%s:%d)', message,
        remote.address, remote.port);
  });
};


/**
 * @param {*} socket
 * @param {number} port
 * @param {string} host
 * @param {string} message
 * @param {number} ttl
 */
ncp.net.udp.MulticastAgent.prototype.__startMulticasting =
    function(socket, port, host, message, ttl) {

  var buffer = new Buffer(message);

  setInterval(send, ttl);

  function send() {
    socket.send(buffer, 0, buffer.length, port, host);
  }
};


/**
 *
 */
ncp.net.udp.MulticastAgent.prototype.stopMulticasting = function(socket) {
  socket.close();
};
