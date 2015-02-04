

/**
 * @typedef {string|number|boolean|!Object|!Array}
 */
ncp.db.mongo.Value;


/**
 * @type {mongodb.DataBase}
 */
ncp.ncp.db.mongo.__db = null;


/**
 * @type {!Array.<!db.ncp.ncp.db.mongo.Request>}
 */
ncp.ncp.db.mongo.__requests = [];


/**
 * @param {string} dbName
 * @param {number} port
 * @param {string=} opt_host
 * @return {fm.Action|function(function(string), fm.Cancel, fm.Input)}
 */
ncp.ncp.db.mongo.makeUrl = function(dbName, port, opt_host) {
  /**
   * @param {function(string)} complete
   * @param {fm.Cancel} cancel
   * @param {fm.Input} input
   */
  function makeUrl(complete, cancel, input) {
    complete('ncp.ncp.db.mongodb://' + (opt_host || 'localhost') + ':' + String(port) +
    '/' + dbName);
  }

  return makeUrl;
};


/**
 * @param {function(!ncp.ncp.db.mongodb.DataBase)} complete
 * @param {fm.Cancel} cancel
 * @param {string} url
 */
ncp.ncp.db.mongo.connect = function(complete, cancel, url) {
  ncp.ncp.db.mongodb.MongoClient.connect(url, function(error, db) {
    if (error !== null) {
      cancel('[ncp.ncp.db.mongo.connect] ' + error.toString() + ' (' + url + ')');
    } else {
      console.log('[ncp.ncp.db.mongo.connect] connected to ' + url);
      ncp.ncp.db.mongo.__db = db;
      complete(db);
    }
  });
};


/**
 * @param {string} ns
 * @param {string} key
 * @return {fm.RegularAction}
 */
ncp.ncp.db.mongo.get = function(ns, key) {
  /**
   * @param {fm.Complete} complete
   * @param {fm.Cancel} cancel
   * @param {fm.Input} input
   */
  function get(complete, cancel, input) {
    ncp.ncp.db.mongo.__requests.push(db.ncp.ncp.db.mongo.createGetRequest(ns, key, complete, cancel));
    ncp.ncp.db.mongo.__flush();
  }

  return get;
};


/**
 * @param {string} ns
 * @param {string} key
 * @param {db.ncp.ncp.db.mongo.Value} value
 * @return {fm.RegularAction}
 */
ncp.ncp.db.mongo.set = function(ns, key, value) {
  /**
   * @param {fm.Complete} complete
   * @param {fm.Cancel} cancel
   * @param {fm.Input} input
   */
  function set(complete, cancel, input) {
    ncp.ncp.db.mongo.__requests.push(db.ncp.ncp.db.mongo.createSetRequest(ns, key, value, complete, cancel));
    ncp.ncp.db.mongo.__flush();
  }

  return set;
};


/**
 * @param {string} ns
 * @param {string} key
 * @return {fm.RegularAction}
 */
ncp.ncp.db.mongo.has = function(ns, key) {
  /**
   * @param {fm.Complete} complete
   * @param {fm.Cancel} cancel
   * @param {fm.Input} input
   */
  function has(complete, cancel, input) {
    ncp.ncp.db.mongo.__requests.push(db.ncp.ncp.db.mongo.createHasRequest(ns, key, complete, cancel));
    ncp.ncp.db.mongo.__flush();
  }

  return has;
};


/**
 * @param {string} ns
 * @param {string} key
 * @return {fm.RegularAction}
 */
ncp.ncp.db.mongo.rem = function(ns, key) {
  /**
   * @param {fm.Complete} complete
   * @param {fm.Cancel} cancel
   * @param {fm.Input} input
   */
  function rem(complete, cancel, input) {
    ncp.ncp.db.mongo.__requests.push(db.ncp.ncp.db.mongo.createRemRequest(ns, key, complete, cancel));
    ncp.ncp.db.mongo.__flush();
  }

  return rem;
};


/**
 * @param {string} ns
 * @param {string} key
 * @param {db.ncp.ncp.db.mongo.Value} value
 * @return {fm.RegularAction}
 */
ncp.ncp.db.mongo.sadd = function(ns, key, value) {
  /**
   * @param {fm.Complete} complete
   * @param {fm.Cancel} cancel
   * @param {fm.Input} input
   */
  function sadd(complete, cancel, input) {
    ncp.ncp.db.mongo.__requests.push(db.ncp.ncp.db.mongo.createSaddRequest(ns, key, value, complete, cancel));
    ncp.ncp.db.mongo.__flush();
  }

  return sadd;
};


/**
 * @param {string} ns
 * @return {fm.RegularAction}
 */
ncp.ncp.db.mongo.getFirstKey = function(ns) {
  /**
   * @param {fm.Complete} complete
   * @param {fm.Cancel} cancel
   * @param {fm.Input} input
   */
  function get(complete, cancel, input) {
    ncp.ncp.db.mongo.__requests.push(db.ncp.ncp.db.mongo.createGetFirstKeyRequest(ns, complete, cancel));
    ncp.ncp.db.mongo.__flush();
  }

  return get;
};


/**
 * @param {string} ns
 * @return {fm.RegularAction}
 */
ncp.ncp.db.mongo.getNs = function(ns) {
  /**
   * @param {fm.Complete} complete
   * @param {fm.Cancel} cancel
   * @param {fm.Input} input
   */
  function get(complete, cancel, input) {
    ncp.ncp.db.mongo.__requests.push(db.ncp.ncp.db.mongo.createGetNsRequest(ns, complete, cancel));
    ncp.ncp.db.mongo.__flush();
  }

  return get;
};


/**
 * @param {function(!Array)} complete
 * @param {fm.Cancel} cancel
 * @param {!db.ncp.ncp.db.mongo.Request} request
 */
ncp.ncp.db.mongo.__sendGetRequest = function(complete, cancel, request) {
  ncp.ncp.db.mongo.__find(handleComplete, handleCancel, request.getDocument());

  function handleComplete(docs) {
    request.complete(docs);
    complete(docs);
  }

  function handleCancel(message) {
    request.cancel(message);
  }
};


/**
 * @param {function(!db.ncp.ncp.db.mongo.Document)} complete
 * @param {fm.Cancel} cancel
 * @param {!db.ncp.ncp.db.mongo.Request} request
 */
ncp.ncp.db.mongo.__sendSetRequest = function(complete, cancel, request) {
  ncp.ncp.db.mongo.__upsertUpdate(handleComplete, handleCancel, request.getDocument());

  function handleComplete(doc) {
    request.complete(doc);
    complete(doc);
  }

  function handleCancel(message) {
    request.cancel(message);
  }
};


/**
 * @param {function(boolean)} complete
 * @param {fm.Cancel} cancel
 * @param {!db.ncp.ncp.db.mongo.Request} request
 */
ncp.ncp.db.mongo.__sendHasRequest = function(complete, cancel, request) {
  ncp.ncp.db.mongo.__find(handleComplete, handleCancel, request.getDocument());

  function handleComplete(docs) {
    request.complete(docs.length > 0);
    complete(docs.length > 0);
  }

  function handleCancel(message) {
    request.cancel(message);
  }
};


/**
 * @param {function(!db.ncp.ncp.db.mongo.Document)} complete
 * @param {fm.Cancel} cancel
 * @param {!db.ncp.ncp.db.mongo.Request} request
 */
ncp.ncp.db.mongo.__sendSaddRequest = function(complete, cancel, request) {
  ncp.ncp.db.mongo.__addToSet(handleComplete, handleCancel, request.getDocument());

  function handleComplete(doc) {
    request.complete(doc);
    complete(doc);
  }

  function handleCancel(message) {
    request.cancel(message);
  }
};


/**
 * @param {function(!db.ncp.ncp.db.mongo.Document)} complete
 * @param {fm.Cancel} cancel
 * @param {!db.ncp.ncp.db.mongo.Request} request
 */
ncp.ncp.db.mongo.__sendRemRequest = function(complete, cancel, request) {
  ncp.ncp.db.mongo.__remove(handleComplete, handleCancel, request.getDocument());

  function handleComplete(doc) {
    request.complete(doc);
    complete(doc);
  }

  function handleCancel(message) {
    request.cancel(message);
  }
};


/**
 * @param {function(string)} complete
 * @param {fm.Cancel} cancel
 * @param {!db.ncp.ncp.db.mongo.Request} request
 */
ncp.ncp.db.mongo.__sendGetFirstKeyRequest = function(complete, cancel, request) {
  ncp.ncp.db.mongo.__findLimit(1)(handleComplete, handleCancel, request.getDocument());

  function handleComplete(docs) {
    var result = docs.length > 0 ? docs[0]['key'] : '';
    request.complete(result);
    complete(result);
  }

  function handleCancel(message) {
    request.cancel(message);
  }
};


/**
 * @param {function(!Array)} complete
 * @param {fm.Cancel} cancel
 * @param {!db.ncp.ncp.db.mongo.Request} request
 */
ncp.ncp.db.mongo.__sendGetNsRequest = function(complete, cancel, request) {
  ncp.ncp.db.mongo.__find(handleComplete, handleCancel, request.getDocument());

  function handleComplete(docs) {
    request.complete(docs);
    complete(docs);
  }

  function handleCancel(message) {
    request.cancel(message);
  }
};


/**
 * @param {!Function} complete
 * @param {fm.Cancel} cancel
 * @param {!db.ncp.ncp.db.mongo.Request} request
 */
ncp.ncp.db.mongo.__send = function(complete, cancel, request) {
  switch (request.getType()) {
    case db.RequestType.GET:
      ncp.ncp.db.mongo.__sendGetRequest(complete, cancel, request);
      break;

    case db.RequestType.SET:
      ncp.ncp.db.mongo.__sendSetRequest(complete, cancel, request);
      break;

    case db.RequestType.HAS:
      ncp.ncp.db.mongo.__sendHasRequest(complete, cancel, request);
      break;

    case db.RequestType.SADD:
      ncp.ncp.db.mongo.__sendSaddRequest(complete, cancel, request);
      break;

    case db.RequestType.REM:
      ncp.ncp.db.mongo.__sendRemRequest(complete, cancel, request);
      break;

    case db.RequestType.GET_FIRST_KEY:
      ncp.ncp.db.mongo.__sendGetFirstKeyRequest(complete, cancel, request);
      break;

    case db.RequestType.GET_NS:
      ncp.ncp.db.mongo.__sendGetNsRequest(complete, cancel, request);
      break;
  }
};


/**
 * @param {function(boolean)} complete
 * @param {fm.Cancel} cancel
 * @param {fm.Input} input
 */
ncp.ncp.db.mongo.__hasRequest = function(complete, cancel, input) {
  complete(ncp.ncp.db.mongo.__requests.length !== 0);
};


/**
 * @param {function(!db.ncp.ncp.db.mongo.Request)} complete
 * @param {fm.Cancel} cancel
 * @param {fm.Input} input
 */
ncp.ncp.db.mongo.__nextRequest = function(complete, cancel, input) {
  complete(ncp.ncp.db.mongo.__requests.shift());
};


/**
 *
 */
ncp.ncp.db.mongo.__flush = function() {
  fm.while(ncp.ncp.db.mongo.__hasRequest, fm.script([
    ncp.ncp.db.mongo.__nextRequest,
    ncp.ncp.db.mongo.__send
  ]))(fm.nop, console.error, null);
};


/**
 * @param {function(!db.ncp.ncp.db.mongo.Document)} complete
 * @param {fm.Cancel} cancel
 * @param {!db.ncp.ncp.db.mongo.Document} doc
 */
ncp.ncp.db.mongo.__upsertUpdate = function(complete, cancel, doc) {
  ncp.ncp.db.mongo.__db.collection(doc.getCollectionName()).update({key: doc.getKey()},
      {$set: {key: doc.getKey(), value: doc.getValue()}}, {upsert: true}, function(error, result) {
        if (error === null) {
          complete(doc);
        } else {
          cancel(error.toString());
        }
      });
};


/**
 * @param {function(!Array)} complete
 * @param {fm.Cancel} cancel
 * @param {!db.ncp.ncp.db.mongo.Document} doc
 */
ncp.ncp.db.mongo.__find = function(complete, cancel, doc) {
  var filter = doc.getKey() !== '' ? {key: doc.getKey()} : {};
  var cursor = ncp.ncp.db.mongo.__db.collection(doc.getCollectionName()).find(filter);

  cursor.toArray(function(error, docs) {
    if (error === null) {
      complete(docs);
    } else {
      cancel(error.toString());
    }
  });
};


/**
 * @param {number} count
 * @return {fm.Action|function(function(!Array), fm.Cancel, !db.ncp.ncp.db.mongo.Document)}
 */
ncp.ncp.db.mongo.__findLimit = function(count) {
  /**
   * @param {function(!Array)} complete
   * @param {fm.Cancel} cancel
   * @param {!db.ncp.ncp.db.mongo.Document} doc
   */
  function findLimit(complete, cancel, doc) {
    var filter = doc.getKey() !== '' ? {key: doc.getKey()} : {};
    var cursor = ncp.ncp.db.mongo.__db.collection(doc.getCollectionName()).find(filter, {limit: count});

    cursor.toArray(function(error, docs) {
      if (error === null) {
        complete(docs);
      } else {
        cancel(error.toString());
      }
    });
  }

  return findLimit;
};


/**
 * @param {function(!Object)} complete
 * @param {fm.Cancel} cancel
 * @param {!db.ncp.ncp.db.mongo.Document} doc
 */
ncp.ncp.db.mongo.__remove = function(complete, cancel, doc) {
  ncp.ncp.db.mongo.__db.collection(doc.getCollectionName()).remove({key: doc.getKey()},
      function(error, result) {
        if (error === null) {
          complete(doc);
        } else {
          cancel(error.toString());
        }
      });
};


/**
 * @param {function(!db.ncp.ncp.db.mongo.Document)} complete
 * @param {fm.Cancel} cancel
 * @param {!db.ncp.ncp.db.mongo.Document} doc
 */
ncp.ncp.db.mongo.__addToSet = function(complete, cancel, doc) {
  ncp.ncp.db.mongo.__db.collection(doc.getCollectionName()).update({key: doc.getKey()},
      {$addToSet: {value: doc.getValue()}}, {upsert: true}, function(error, result) {
        if (error === null) {
          complete(doc);
        } else {
          cancel(error.toString());
        }
      });
};


/**
 * @param {string} ns
 * @param {string} key
 * @param {ncp.db.mongo.Value} value
 * @param {fm.Complete} complete
 * @param {fm.Cancel} cancel
 * @return {!ncp.db.mongo.Request}
 */
ncp.db.mongo.createSetRequest = function(ns, key, value, complete, cancel) {
  return new ncp.db.mongo.Request(db.RequestType.SET, ns, key, value, complete, cancel);
};


/**
 * @param {string} ns
 * @param {string} key
 * @param {fm.Complete} complete
 * @param {fm.Cancel} cancel
 * @return {!ncp.db.mongo.Request}
 */
ncp.db.mongo.createGetRequest = function(ns, key, complete, cancel) {
  return new ncp.db.mongo.Request(db.RequestType.GET, ns, key, '', complete, cancel);
};


/**
 * @param {string} ns
 * @param {string} key
 * @param {fm.Complete} complete
 * @param {fm.Cancel} cancel
 * @return {!ncp.db.mongo.Request}
 */
ncp.db.mongo.createHasRequest = function(ns, key, complete, cancel) {
  return new ncp.db.mongo.Request(db.RequestType.HAS, ns, key, '', complete, cancel);
};


/**
 * @param {string} ns
 * @param {string} key
 * @param {ncp.db.mongo.Value} value
 * @param {fm.Complete} complete
 * @param {fm.Cancel} cancel
 * @return {!ncp.db.mongo.Request}
 */
ncp.db.mongo.createSaddRequest = function(ns, key, value, complete, cancel) {
  return new ncp.db.mongo.Request(db.RequestType.SADD, ns, key, value, complete, cancel);
};


/**
 * @param {string} ns
 * @param {string} key
 * @param {fm.Complete} complete
 * @param {fm.Cancel} cancel
 * @return {!ncp.db.mongo.Request}
 */
ncp.db.mongo.createRemRequest = function(ns, key, complete, cancel) {
  return new ncp.db.mongo.Request(db.RequestType.REM, ns, key, '', complete, cancel);
};


/**
 * @param {string} ns
 * @param {fm.Complete} complete
 * @param {fm.Cancel} cancel
 * @return {!ncp.db.mongo.Request}
 */
ncp.db.mongo.createGetFirstKeyRequest = function(ns, complete, cancel) {
  return new ncp.db.mongo.Request(db.RequestType.GET_FIRST_KEY, ns, '', '', complete, cancel);
};


/**
 * @param {string} ns
 * @param {fm.Complete} complete
 * @param {fm.Cancel} cancel
 * @return {!ncp.db.mongo.Request}
 */
ncp.db.mongo.createGetNsRequest = function(ns, complete, cancel) {
  return new ncp.db.mongo.Request(db.RequestType.GET_NS, ns, '', '', complete, cancel);
};


/**
 * @param {function(string)} complete
 * @param {fm.Cancel} cancel
 * @param {!ncp.db.mongo.Document} document
 */
ncp.db.mongo.getDocumentKey = function(complete, cancel, document) {
  complete(document.getKey());
};
