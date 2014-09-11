

/**
 * @param {*} data
 */
ncp.tasks.http.createPacket = function(data) {
  return JSON.stringify({
    data: data
  });
};
