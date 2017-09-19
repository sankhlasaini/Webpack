const profileRoutes = require('./profile/index');
const userCredentialRoutes = require('./userCredential/index');
const authentication = require('./authentication/index');


module.exports = {
    profileRoutes: profileRoutes,
    userCredentialRoutes: userCredentialRoutes,
    authentication: authentication
};