

/**
 * @type {number}
 */
ncp.cron.__TICK_INTERVAL = 100;


/**
 * @type {!ds.IQueue}
 */
ncp.cron.__tasks = new ds.Queue(ncp.cron.ITask);


/**
 * @type {number}
 */
ncp.cron.__timer = -1;


/**
 * @param {!ncp.cron.ITask} task
 */
ncp.cron.add = function(task) {
  ncp.cron.__tasks.enqueue(task);

  if (ncp.cron.__timer === -1) {
    ncp.cron.__process();
  }
};


/**
 *
 */
ncp.cron.__process = function() {
  while (!ncp.cron.__tasks.isEmpty()) {
    var task = ncp.cron.__tasks.dequeue();
    task.exec();
  }

  if (!ncp.cron.__tasks.isEmpty()) {
    ncp.cron.__timer = setTimeout(ncp.cron.__process, ncp.cron.__TICK_INTERVAL);
  } else {
    ncp.cron.__timer = -1;
  }
};
