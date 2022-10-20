/**
 * index.js - Loads the exfiltration API handler.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

const ExfiltrationAPIHandler = require('./exfiltration-api-handler');

module.exports = (addonManager) => {
  new ExfiltrationAPIHandler(addonManager);
};
