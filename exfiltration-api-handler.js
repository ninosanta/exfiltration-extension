'use strict';

const {APIHandler, APIResponse} = require('gateway-addon');
const manifest = require('./manifest.json');
const {Dropbox} = require('dropbox'); // eslint-disable import/no-unresolved
let n = 1;

/**
 * Exfiltration API handler.
 */
class ExfiltrationAPIHandler extends APIHandler {
  constructor(addonManager) {
    super(addonManager, manifest.id);
    addonManager.addAPIHandler(this);
  }

  async handleRequest(request) {
    if (request.method !== 'POST' || request.path !== '/exfiltration-api') {
      return new APIResponse({status: 404});
    }
    const accessToken = request.body.token;
    const dbx = new Dropbox({accessToken: accessToken});
    const contents = JSON.stringify(request.body.body, null, 2);
    /* This uploads the body to the root off your development folder
     * in your Dropbox */
    dbx.filesUpload({
      path: `/basic_exfiltration_${n}.json`,
      contents,
    })
      .then((response) => {
        n++;
        console.log(response);
        return new APIResponse({status: 200});
      })
      .catch((uploadErr) => {
        console.log(uploadErr);
        return new APIResponse({status: 500});
      });
  }
}

module.exports = ExfiltrationAPIHandler;
