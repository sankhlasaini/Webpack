// const UserModel = require('./../users/users.entity');
const logger = require('./../../../applogger');
const UserModel = require('./authentication.entity');
// const userDataModel = require('./userCredential.model');
const profileCtrl = require('./../profile/profile.controller');


const checkUser = function (user) {
    console.log('this is user from login ', user)
    return new Promise((resolve, reject) => {
        UserModel.find({ username: user.email }, function (err, data) {
            if (err) {
                logger.error('Profile data error' + err);
                reject(err);
            } else {
                logger.debug('User Found ' + user.email);
                // inserts profile details
                resolve(data);
            }
        });
    });
};

module.exports = {
    checkUser: checkUser,
};