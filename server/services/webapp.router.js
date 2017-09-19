const path = require('path');

// const apiBasePath = require(path.resolve(__dirname, '../', 'api', 'index.js'));
const apiBasePath = require('./../api/index');

const useRoutes = function (app) {
    app.use('/profile', apiBasePath.profileRoutes);
    app.use('/userCredential', apiBasePath.userCredentialRoutes);
    app.use('/authentication', apiBasePath.authentication);
};

module.exports = {
    useRoutes: useRoutes
};