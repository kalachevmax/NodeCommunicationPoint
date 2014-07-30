

/**
 * @type {fm.Action}
 */
ncp.act.ws.send = fm.script([
  dm.arg.entity('ws'),
  dm.field('ws.request'),
  dm.action('ws.client.send')
]);
