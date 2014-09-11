

/**
 * @constructor
 * @implements {ncp.net.http.IServer}
 * @param {number=} opt_port
 */
ncp.net.http.Server = function(opt_port) {
  /**
   * @type {number}
   */
  this.__port = opt_port || 80;

  /**
   * @type {!Object.<string, !ncp.tasks.Task>}
   */
  this.__tasks = {};

  this.listen(this.__port);
};


/**
 * @inheritDoc
 */
ncp.net.http.Server.prototype.listen = function(port) {
  var self = this;

  var server = http.createServer(function (request, response) {
    request.on('data', function() {});

    request.on('end', function () {
      console.info(request.method + ' ' + request.url);

      var task = self.__tasks[request.url];

      if (typeof task !== 'undefined') {
        ncp.cron.add(new ncp.tasks.http.Context(task, response));
      }
    });
  });

  server.listen(port);
  console.info('[ncp.net.http.Server] listen on ' + this.__port);
};


/**
 * @inheritDoc
 */
ncp.net.http.Server.prototype.registerTask = function(url, task) {
  this.__tasks[url] = task;
};
