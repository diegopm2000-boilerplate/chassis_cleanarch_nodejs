// getConfigAdapterController.js

const container = require('../../infrastructure/container/container');

exports.execute = (repository, presenter, logger, filename) => container.get('getConfigUC').execute(repository, presenter, logger, filename);
