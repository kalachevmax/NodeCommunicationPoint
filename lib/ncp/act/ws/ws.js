

/**
 * @param {function(!dm.DataProvider)} complete
 * @param {function(string, number=)} cancel
 * @param {!dm.DataProvider} data
 */
ncp.act.ws.send = function(complete, cancel, data) {
  var client = data.get('client');
  var request = data.get('request');

  if (client !== null) {
    if (request !== null) {
      client.send(request);
      complete(data);
    } else {
      cancel('[ncp.act.ws.send] request is not defined');
    }
  } else {
    cancel('[ncp.act.ws.send] client is not defined');
  }
};
