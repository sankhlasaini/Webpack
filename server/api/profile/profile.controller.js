// const UserModel = require('./../users/users.entity');
const logger = require('./../../../applogger');
const ProfileModel = require('./profile.entity');
const profileDataModel = require('./profile.model');


const getProfile = function (profileObj) {
    return new Promise((resolve, reject) => {
        ProfileModel.find({ username: profileObj.username }, function (err, data) {
            if (err) {
                logger.error('Profile data error' + err);
                reject(err);
            } else {
                logger.debug('Got Profile Data', data);
                // inserts profile details
                resolve(data);
            }
        });
    });
};

const getAllProfile = function () {
    return new Promise((resolve, reject) => {
        ProfileModel.find(function (err, data) {
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
// Add profile details
const createProfile = function (username, profileObj) {
    // Add/modify profile model
    let userRegData = profileObj;
    let profileData = new ProfileModel(profileDataModel.profileDataModel(profileObj));
    return new Promise((resolve, reject) => {
        profileData.save(function (err, data) {
            if (err) {
                logger.error('profile data not added sucessfullyyyy' + err);
                reject(err);
            } else {
                logger.info('profile data added successfully');
                // inserts profile details
                resolve({ msg: 'Profile data Added successfully' });
            }
        });
    });
};

const editProfile = function (personalInfo, username) {

    let profileData = profileDataModel.updatePersonalInfoModel(username, personalInfo);
    // console.log('\n\n\n\n', profileData);

    return new Promise((resolve, reject) => {
        ProfileModel.update({ username: username }, { $set: profileData }, function (err, data) {
            if (err) {
                logger.error('Profile data error' + err);
                reject(err);
            } else {
                logger.debug('Updated Profile Data', data);
                resolve({ msg: 'Profile data Updated successfully' });
            }
        });
    });
};


const setStatus = function (user) {

    // console.log('\n\n\n\n', user);

    return new Promise((resolve, reject) => {
        ProfileModel.update({ username: user.username }, { status: user.status }, function (err, data) {
            if (err) {
                logger.error('Status data error' + err);
                reject(err);
            } else {
                logger.debug('Updated Status', data);
                resolve({ msg: 'User Status Updated successfully' });
            }
        });
    });
};

const deletePerofile = function (profileObj) { };

module.exports = {
    getProfile: getProfile,
    getAllProfile: getAllProfile,
    createProfile: createProfile,
    editProfile: editProfile,
    setStatus: setStatus,
    deletePerofile: deletePerofile
};