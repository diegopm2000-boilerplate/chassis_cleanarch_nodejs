// security.js

const helmet = require('helmet');
const hsts = require('hsts'); // Only to force https
const frameguard = require('frameguard'); // Only to force same origin for frames

const container = require('../container/container');

// //////////////////////////////////////////////////////////////////////////////
// CONSTANTS
// //////////////////////////////////////////////////////////////////////////////

const MODULE_NAME = '[Security]';

// //////////////////////////////////////////////////////////////////////////////
// PUBLIC METHODS
// //////////////////////////////////////////////////////////////////////////////

exports.init = (app, httpsAlways) => {
  container.getLogger().debug(`${MODULE_NAME} init (IN) --> app: <<app>>, httpsAlways: ${httpsAlways}`);

  // 1. Use helmet framework security. View in npm helmet the issues activated by default
  app.use(helmet());

  // 2. Force same origin for frames
  app.use(frameguard({
    action: 'sameorigin',
  }));

  // 3. Force https always
  if (httpsAlways) {
    app.use(hsts({
      maxAge: 31536000, // 365 days in seconds
    }));
  }

  container.getLogger().debug(`${MODULE_NAME} init (OUT) --> Security initialized OK!`);
};
