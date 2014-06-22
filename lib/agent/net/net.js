

/**
 * @type {string}
 */
agent.net.__MULTICAST_HOST = '127.255.255.255';


/**
 * @type {number}
 */
agent.net.__MULTICAST_PORT = 9000;


/**
 * @type {number}
 */
agent.net.__MULTICAST_TTL = 128;


/**
 * @type {number}
 */
agent.net.__MULTICAST_INTERVAL = 1000;


/**
 * @type {dgram.Socket}
 */
agent.net.__socket = null;


/**
 *
 */
agent.net.run = function() {
  agent.net.createSocket(function() {
    agent.net.listen();
    agent.net.startMulticasting(agent.net.MulticastMessage.NEW_NODE);
  });
};


/**
 * @param {function()} callback
 */
agent.net.createSocket = function(callback) {
  agent.net.__socket = dgram.createSocket('udp4');
  agent.net.__socket.bind();

  agent.net.__socket.on('listening', function() {
    agent.net.__socket.setBroadcast(true);
    agent.net.__socket.setMulticastTTL(agent.net.__MULTICAST_TTL);
    agent.net.__socket.addMembership(agent.net.__MULTICAST_HOST);

    callback();
  });
};


/**
 * @param {agent.net.MulticastMessage} message
 */
agent.net.startMulticasting = function(message) {
  if (agent.net.__socket !== null) {
    var buffer = new Buffer(message);

    setInterval(send, agent.net.__MULTICAST_INTERVAL);

    function send() {
      agent.net.__socket.send(buffer, 0, buffer.length,
          agent.net.__MULTICAST_PORT, agent.net.__MULTICAST_HOST);
    }
  }
};


/**
 *
 */
agent.net.stopMulticasting = function() {
  if (agent.net.__socket !== null) {
    agent.net.__socket.close();
  }
};


/**
 *
 */
agent.net.listen = function() {
  if (agent.net.__socket !== null) {
    agent.net.__socket.on('message', function (message, remote) {
      console.log('message received:', message,
          '[', remote.address + ':' + remote.port, ']');
    });
  }
};
