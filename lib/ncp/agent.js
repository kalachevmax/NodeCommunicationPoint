

/**
 * @constructor
 * @param {!ncp.net.udp.MulticastAgent} udpAgent
 * @param {!ncp.net.ws.Server} wsServer
 * @param {!ncp.net.ws.Client} wsClient
 */
ncp.Agent = function(udpAgent, wsServer, wsClient) {
  /**
   * @type {!ncp.net.udp.MulticastAgent}
   */
  this.__udpAgent = udpAgent;

  /**
   * @type {!ncp.net.ws.Server}
   */
  this.__wsServer = wsServer;

  /**
   * @type {!ncp.net.ws.Client}
   */
  this.__wsClient = wsClient;
};
