

/**
 * @param complete
 * @param cancel
 * @param data
 */
ncp.act.ws.send = function(complete, cancel, data) {
  var client = data.get('client');
  var request = data.get('request');

  if (client !== null && request !== null) {
    client.send(request);
  } else {
    cancel('[ncp.act.ws.send] client or request is not defined');
  }
};
