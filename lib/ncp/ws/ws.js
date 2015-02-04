

/**
 * @namespace
 */
var ws = {};


/**
 * @typedef {function(function(wss.Message), fm.Cancel, wss.Message)}
 */
ws.Action;


/**
 * @typedef {function(function(?), fm.Cancel, !ws.Packet)}
 */
ws.PacketAction;


/**
 * @type {function(ws.Command, !Array=):ws.Packet}
 */
ws.__packetsFactory = function(command, opt_params) {
  return null;
};


/**
 * @type {!Object.<ws.Connection, !wss.Client>}
 */
ws.__connections = {};


/**
 * @type {!Object.<ws.Connection, string>}
 */
ws.__connectionHosts = {};


/**
 * @type {!Object.<ws.Connection, number>}
 */
ws.__connectionPorts = {};


/**
 * @type {!Object.<ws.Command, fm.Action>}
 */
ws.__packetHandlers = {};


/**
 * @param {ws.Connection} connection
 * @return {number}
 */
ws.getPort = function(connection) {
  return ws.__connectionPorts[connection] || -1;
};


/**
 * @param {ws.Connection} connection
 * @return {string}
 */
ws.getHost = function(connection) {
  return ws.__connectionHosts[connection] || '';
};


/**
 * @param {ws.Connection} connection
 * @param {number} port
 * @param {string=} opt_host
 */
ws.registerConnection = function(connection, port, opt_host) {
  return fm.action(function() {
    ws.__connectionHosts[connection] = opt_host || 'localhost';
    ws.__connectionPorts[connection] = port;
  });
};


/**
 * @param {function(ws.Command, !Array=):ws.Packet} func
 */
ws.registerPacketsFactory = function(func) {
  ws.__packetsFactory = func;
};


/**
 * @param {ws.Connection} connection
 * @return {fm.RegularAction}
 */
ws.connect = function(connection) {
  /**
   * @param {fm.Complete} complete
   * @param {fm.Cancel} cancel
   * @param {fm.Input} input
   */
  function connect(complete, cancel, input) {
    if (typeof ws.__connections[connection] === 'undefined') {
      var host = ws.getHost(connection);
      var port = ws.getPort(connection);

      if (host !== '' && port !== -1) {
        var url = host + ':' + String(port);
        console.log('[ws.connect] ' + url);

        var client = wss.connect('ws://' + url);
        client.on('open', handleSocketOpened);
        client.on('message', handleMessage);

        ws.__connections[connection] = client;
      } else {
        cancel('[ws.connect] host or port are undefined');
      }
    }

    function handleSocketOpened() {
      console.log('[ws.connect] socket opened');
      complete(input);
    }

    /**
     * @param {wss.Message} message
     */
    function handleMessage(message) {
      ws.__responseHandler(fm.nop, console.error, message);
    }
  }

  return connect;
};


/**
 * @param {ws.Connection} connection
 * @return {fm.RegularAction}
 */
ws.listen = function(connection) {
  /**
   * @param {fm.Complete} complete
   * @param {fm.Cancel} cancel
   * @param {fm.Input} input
   */
  function listen(complete, cancel, input) {
    var port = ws.getPort(connection);

    if (port !== -1) {
      var server = new wss.Server({port: port});
      console.log('[ws.listen] port ' + String(port));
      server.on('connection', handleConnection);
      complete(input);
    } else {
      cancel('[ws.listen] port is undefined');
    }

    /**
     * @param {!wss.Client} client
     */
    function handleConnection(client) {
      console.log('[ws.listen] connection created');
      ws.__connections[connection] = client;
      ws.__connections[connection].on('message', handleMessage);
    }

    /**
     * @param {wss.Message} message
     */
    function handleMessage(message) {
      ws.__requestHandler(function(responsePacket) {
        if (responsePacket !== null) {
          ws.__connections[connection].send(responsePacket.serialize());
        }
      }, console.error, message);
    }
  }

  return listen;
};


/**
 * @param {function(ws.Packet)} complete
 * @param {fm.Cancel} cancel
 * @param {wss.Message} message
 */
ws.__requestHandler = function(complete, cancel, message) {
  var packet = ws.createRequestPacket(message);

  if (packet !== null) {
    if (typeof ws.__packetHandlers[packet.getCommand()] !== 'undefined') {
      ws.__packetHandlers[packet.getCommand()](processResponse, cancel, packet);
    } else {
      complete(ws.createUnknownCommandResponse(packet.getCommand()));
    }
  } else {
    complete(ws.createIncorrectPacketResponse());
  }

  function processResponse(data) {
    complete(data !== null ? new ws.ResponsePacket(packet.getCommand(), packet.getBody(), data) : null);
  }
};


/**
 * @param {function()} complete
 * @param {fm.Cancel} cancel
 * @param {wss.Message} message
 */
ws.__responseHandler = function(complete, cancel, message) {
  var packet = ws.createResponsePacket(message);
  if (packet !== null) {
    if (typeof ws.__packetHandlers[packet.getCommand()] !== 'undefined') {
      ws.__packetHandlers[packet.getCommand()](complete, cancel, packet);
    } else {
      cancel('Unknown response command: ' + packet.getCommand());
    }
  } else {
    cancel('Incorrect response');
  }
};


/**
 * @param {ws.Command} command
 * @param {fm.Action} action
 * @return {fm.RegularAction}
 */
ws.addPacketHandler = function(command, action) {
  /**
   * @param {fm.Complete} complete
   * @param {fm.Cancel} cancel
   * @param {fm.Input} input
   */
  function addPacketHandler(complete, cancel, input) {
    ws.__packetHandlers[command] = action;
    complete(input);
  }

  return addPacketHandler;
};


/**
 * @param {wss.Message} message
 * @return {ws.Packet}
 */
ws.createRequestPacket = function(message) {
  var str = message instanceof Buffer ? message.toString() : message;
  var obj = utils.obj.populate(str);

  if (typeof obj['command'] === 'string' && obj['body'] instanceof Object) {
    return ws.__packetsFactory(obj['command'], utils.obj.toArray(obj['body']));
  }

  return null;
};


/**
 * @param {wss.Message} message
 * @return {ws.Packet}
 */
ws.createResponsePacket = function(message) {
  var str = message instanceof Buffer ? message.toString() : message;
  var obj = utils.obj.populate(str);

  if (typeof obj['command'] === 'string' && obj['body'] instanceof Object) {
    var packet = new ws.ResponsePacket(obj['command'], obj['body']);
    packet.populate(obj['body']);
    return packet;
  }

  return null;
};


/**
 * @param {ws.Command} command
 * @return {!ws.Packet}
 */
ws.createUnknownCommandResponse = function(command) {
  return new ws.ErrorPacket(command, 'Unknown command');
};


/**
 * @return {!ws.Packet}
 */
ws.createIncorrectPacketResponse = function() {
  return new ws.ErrorPacket(ws.Command.ERROR, 'Incorrect packet');
};


/**
 * @param {ws.Connection} connection
 * @return {ws.Action}
 */
ws.sendTo = function(connection) {
  /**
   * @param {function(wss.Message)} complete
   * @param {fm.Cancel} cancel
   * @param {wss.Message} data
   */
  function sendTo(complete, cancel, data) {
    ws.__connections[connection].send(data);
    complete(data);
  }

  return sendTo;
};


/**
 * @param {ws.Connection} connection
 * @return {ws.PacketAction}
 */
ws.sendPacketTo = function(connection) {
  /**
   * @param {function(!ws.Packet)} complete
   * @param {fm.Cancel} cancel
   * @param {!ws.Packet} packet
   */
  function sendPacketTo(complete, cancel, packet) {
    ws.sendTo(connection)(function() {
      complete(packet);
    }, cancel, packet.serialize());
  }

  return sendPacketTo;
};


/**
 * @param {ws.Command} command
 * @param {!Array=} opt_params
 * @return {fm.Action|function(function(!ws.Packet), fm.Cancel, fm.Input)}
 */
ws.createPacket = function(command, opt_params) {
  return function(complete, cancel, input) {
    complete(ws.__packetsFactory(command, opt_params));
  };
};


/**
 * @param {ws.Command} command
 * @param {ws.Connection} connection
 * @param {ws.PacketAction} responseAction
 * @param {!Array.<!fm.Box>=} opt_params
 * @return {fm.RegularAction}
 */
ws.send = function(command, connection, responseAction, opt_params) {
  return function(complete, cancel, input) {
    var params = opt_params ? fm.unboxArray(opt_params) : undefined;
    console.log('ws.send: ', command, connection, params);

    fm.script([
      ws.createPacket(command, params),
      fm.if(fm.notNull, fm.script([
        ws.sendPacketTo(connection),
        ws.addPacketHandler(command, responseAction)
      ]))
    ])(complete, cancel, input)
  };
};


/**
 * @param {function(*)} complete
 * @param {fm.Cancel} cancel
 * @param {!ws.ResponsePacket} responsePacket
 */
ws.response = function(complete, cancel, responsePacket) {
  complete(responsePacket.getResponse());
};
