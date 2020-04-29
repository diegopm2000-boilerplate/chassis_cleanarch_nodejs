// configAdapterController.js

const getConfigUC = require('../../usecase/getConfig');

exports.getConfig = (repository, presenter, logger, filename) => getConfigUC.execute(repository, presenter, logger, filename);
