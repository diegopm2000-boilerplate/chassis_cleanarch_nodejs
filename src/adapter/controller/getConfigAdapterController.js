// getConfigAdapterController.js

const getConfigUC = require('../../usecase/getConfigUC');

exports.execute = (repository, presenter, logger, filename) => getConfigUC.execute(repository, presenter, logger, filename);
