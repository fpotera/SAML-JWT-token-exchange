'use strict';

const https       = require('https'),
      fs          = require('fs'),
      path        = require('path'),
      main        = require('./main');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

var options = {
    hostname: 'pingfederate',
    port: 9999,
    headers: {'accept': 'application/json', 'X-XSRF-Header': 'PingFederate', 'Content-Type': 'application/json'},
    auth: 'Administrator:2FederateM0re'
};

function call(urlPath, file, method, updateObj) {
    const normalPath = path.normalize( __dirname + file);
    var json = fs.readFileSync(normalPath, {encoding:'utf8', flag:'r'});
    if(updateObj != null) {
        for (var key in updateObj) {
            if (updateObj.hasOwnProperty(key)) {
                json = json.replace(key, updateObj[key]);
            }
        }
    }

    options.path = urlPath;
    options.method = method;
    console.log(options);
    return new Promise((resolve) => {
        var req = https.request(options, function(res) {
            res.setEncoding('utf8');
            var body = '';
            res.on('data', function (chunk) {
                body = body + chunk;
            });
            res.on('end',function() {
                resolve(body);
            });
        });
        req.on('error', function (e) {
            resolve("Error : " + e.message);
        });
        req.write(json);
        req.end();
    });
}

exports.configure = async function () {
    const testPCV = await call('/pf-admin-api/v1/passwordCredentialValidators', '/jsons/TestPCV.json', 'POST', null);

    const testKeyPair = await call('/pf-admin-api/v1/keyPairs/signing/generate', '/jsons/KeyPairsSigning.json', 'POST', null);
    const id = JSON.parse(testKeyPair).id;

    const testServerSettings = await call('/pf-admin-api/v1/serverSettings', '/jsons/ServerSettings.json', 'PUT', null);

    const testIdPAdapter = await call('/pf-admin-api/v1/idp/adapters', '/jsons/TestIdPAdapter.json', 'POST', null);

    const testSPConnection = await call('/pf-admin-api/v1/idp/spConnections', '/jsons/TestSPConnection.json', 'POST', {'%id%': id});

    const testTokenProcessor = await call('/pf-admin-api/v1/idp/tokenProcessors', '/jsons/TestTokenProcessor.json', 'POST', null);

    const testTokenManager = await call('/pf-admin-api/v1/oauth/accessTokenManagers', '/jsons/TestTokenManager.json', 'POST', null);

    const testProcessorPolicy = await call('/pf-admin-api/v1/oauth/tokenExchange/processor/policies', '/jsons/TestProcessorPolicy.json', 'POST', null);

    const testClient = await call('/pf-admin-api/v1/oauth/clients', '/jsons/TestClient.json', 'POST', null);

    main.main();
}
