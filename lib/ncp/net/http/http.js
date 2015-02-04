

/**
 * @type {!Object.<string, !ncp.tasks.Task>}
 */
ncp.net.http.__getTasks = {};


/**
 * @type {!Object.<string, !ncp.tasks.Task>}
 */
ncp.net.http.__postTasks = {};


/**
 * @type {!Object.<string, !ncp.tasks.Task>}
 */
ncp.net.http.__putTasks = {};


/**
 * @type {!Object.<string, !ncp.tasks.Task>}
 */
ncp.net.http.__deleteTasks = {};


/**
 * @type {!Object.<ncp.net.http.Connection, string>}
 */
ncp.net.http.__connectionHosts = {};


/**
 * @type {!Object.<ncp.net.http.Connection, number>}
 */
ncp.net.http.__connectionPorts = {};


/**
 * @param {ncp.net.http.Connection} connection
 * @param {number} port
 * @param {string=} opt_host
 */
ncp.net.http.registerConnection = function(connection, port, opt_host) {
  return fm.action(function() {
    ncp.net.http.__connectionHosts[connection] = opt_host || 'localhost';
    ncp.net.http.__connectionPorts[connection] = port;
  });
};


/**
 * @param {ncp.net.http.Connection} connection
 * @return {string}
 */
ncp.net.http.getHost = function(connection) {
  return ncp.net.http.__connectionHosts[connection] || '';
};


/**
 * @param {ncp.net.http.Connection} connection
 * @return {number}
 */
ncp.net.http.getPort = function(connection) {
  return ncp.net.http.__connectionPorts[connection] || -1;
};


/**
 * @param {!Object.<string, !ncp.tasks.Task>} tasks
 */
ncp.net.http.registerGetTasks = function(tasks) {
  ncp.net.http.__getTasks = ncp.net.http.__replaceParameters(tasks);
};


/**
 * @param {!Object.<string, !ncp.tasks.Task>} tasks
 */
ncp.net.http.registerPostTasks = function(tasks) {
  ncp.net.http.__postTasks = ncp.net.http.__replaceParameters(tasks);
};


/**
 * @param {!Object.<string, !ncp.tasks.Task>} tasks
 */
ncp.net.http.registerPutTasks = function(tasks) {
  ncp.net.http.__putTasks = ncp.net.http.__replaceParameters(tasks);
};


/**
 * @param {ncp.net.http.Connection} connection
 * @return {fm.RegularAction}
 */
ncp.net.http.listen = function(connection) {
  /**
   * @param {fm.Complete} complete
   * @param {fm.Cancel} cancel
   * @param {fm.Input} input
   */
  function listen(complete, cancel, input) {
    var host = ncp.net.http.getHost(connection);
    var port = ncp.net.http.getPort(connection);

    if (host !== '' && port !== -1) {
      var server = http.createServer(ncp.net.http.__handleRequest);
      server.listen(port, host);
      console.info('[ncp.net.http.listen] ' + host + ' on ' + port);
      complete(input);
    } else {
      cancel('[ncp.net.http.listen] host or port are undefined');
    }
  }

  return listen;
};


/**
 * @param {!http.IncomingMessage} request
 * @param {!http.ServerResponse} response
 */
ncp.net.http.__handleRequest = function(request, response) {
  var body = '';

  request.on('data', function(chunk) {
    body += chunk;
  });

  request.on('end', function () {
    console.info(request.method + ' ' + request.url);
    console.info(body);

    var task = ncp.net.http.__getTask(request.method, request.url);

    if (task !== null) {
      ku.cron.add(new ncp.tasks.http.Context(task, response, body));
    } else {
      ku.cron.add(new ncp.tasks.http.BadRequestContext(response));
    }
  });
};


/**
 * @param {!Object.<string, !ncp.tasks.Task>} tasks
 * @return {!Object.<string, !ncp.tasks.Task>}
 */
ncp.net.http.__replaceParameters = function(tasks) {
  var result = {};

  for (var route in tasks) {
    var newRoute = route.replace(':id', '[0-9a-zA-Z]*');
    result[newRoute] = tasks[route];
  }

  return result;
};


/**
 * @param {string} method
 * @param {string} url
 * @return {ncp.tasks.Task}
 */
ncp.net.http.__getTask = function(method, url) {
  var tasks = null;

  switch (method) {
    case 'GET':
      tasks = ncp.net.http.__getTasks;
      break;

    case 'PUT':
      tasks = ncp.net.http.__putTasks;
      break;

    case 'POST':
      tasks = ncp.net.http.__postTasks;
      break;

    case 'DELETE':
      tasks = ncp.net.http.__deleteTasks;
      break;
  }

  if (tasks !== null) {
    for (var route in tasks) {
      var re = new RegExp(route);
      if (re.test(url)) {
        return tasks[route];
      }
    }

    return null;
  }

  return null;
};
