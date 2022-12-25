'use strict';
const { default: ParseServer } = require("parse-server");
const CareKitServer = require('../src/CareKitServer');

describe('test carekitServer', function () {
  const server = new ParseServer({
    appId: 'anOtherTestApp',
    masterKey: 'anOtherTestMasterKey',
    serverURL: 'http://localhost:12667/parse',
  });

  it('check if instance is created with default auditing', async () => {
    const careKitServer = new CareKitServer(server);
    expect(careKitServer).toBeInstanceOf(CareKitServer);
    expect(careKitServer.server).toEqual(server);
    expect(careKitServer.shouldAudit).toBeTrue();
    return
  });

  it('check if instance is created with no auditing', async () => {
    const careKitServer = new CareKitServer(server, false);
    expect(careKitServer).toBeInstanceOf(CareKitServer);
    expect(careKitServer.server).toEqual(server);
    expect(careKitServer.shouldAudit).not.toBeTrue();
    return
  });

  it('check if instance is created with auditing', async () => {
    const careKitServer = new CareKitServer(server, true);
    expect(careKitServer).toBeInstanceOf(CareKitServer);
    expect(careKitServer.server).toEqual(server);
    expect(careKitServer.shouldAudit).toBeTrue();
    return
  });
});
