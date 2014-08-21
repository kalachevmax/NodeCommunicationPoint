

/**
 * @return {*}
 */
ncp.net.udp.createSocket = function() {
  return dgram.createSocket('udp4');
};
