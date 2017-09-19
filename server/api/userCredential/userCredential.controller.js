// const UserModel = require('./../users/users.entity');
const logger = require('./../../../applogger');
const UserModel = require('./userCredential.entity');
const userDataModel = require('./userCredential.model');
const profileCtrl = require('./../profile/profile.controller');



const getProfile = function(username) {
    return new Promise((resolve, reject) => {
        UserModel.find({ username: username }, function(err, data) {
            if (err) {
                logger.error('Profile data error' + err);
                reject(err);
            } else {
                logger.debug('Got Profile Data');
                // inserts profile details
                resolve(data);
            }
        });
    });
};


// ONLY WORKING
// Add user credential
const createUser = function(username, user) {
    // Add/modify profile model
    let userRegData = user;
    let userData = new UserModel(userDataModel.userDataModel(userRegData));
    return new Promise((resolve, reject) => {
        userData.save(function(err, data) {
            if (err) {
                logger.error('user credential not added sucessfully' + err);
                reject(err);
            } else {
                logger.info('user credential added successfully');

                profileCtrl.createProfile(username, userRegData).then((successResult) => {
                    resolve({ success: true, msg: 'Successfully Registered' });
                    console.log('\n\n\nAdded in BOTH \n\n\n')
                }, (errresult) => {
                    logger.error('profile data not added Successfully' + err);
                    // if profile data not inserted delete the credentials data
                    userData.remove(function(err, data) {
                        if (err) {
                            reject(err);
                            logger.error('failed adding profile data and failed removing userCredential data' + err);
                        } else {
                            logger.debug('failed adding profile data and removed userCredential data');
                            reject({ success: false, msg: 'failed adding profile data and removed userCredential data' });
                        }
                    });
                });
                // inserts profile details
                // resolve({ msg: 'User data Added successfully' });
            }
        });
    });
};


// NOT WORKING
const editProfile = function(profileData, username, sectionName) {
    let obj = {};
    obj[sectionName] = profileData;
    return new Promise((resolve, reject) => {
        ProfileModel.update({ username: username }, { $set: obj }, function(err, data) {
            if (err) {
                logger.error('Profile data error' + err);
                reject(err);
            } else {
                logger.debug('Got Profile Data');
            }
        });
    });
};


const deletePerofile = function(profileObj) {};

module.exports = {
    getProfile: getProfile,
    createUser: createUser,
    editProfile: editProfile,
    deletePerofile: deletePerofile
};