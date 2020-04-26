// configController.js

const getConfigUC = require('../../usecase/getConfig');

exports.getConfig = (repository, presenter, filename) => getConfigUC.execute(repository, presenter, filename);
