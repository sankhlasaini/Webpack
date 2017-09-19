/*
 * Add/modify profile schema values
 */
var profileDataModel = function (profileObj) {
    var profileDetails = {
        username: profileObj.email,
        createdOn: Date.now(),
        updatedOn: Date.now(),
        status: false,
        profilePic: profileObj.profilePic,
        personalInfo: {
            gender: profileObj.gender,
            name: profileObj.name,
            email: profileObj.email,
            dob: profileObj.dob,
            mob: profileObj.mob,
        }
    };
    return profileDetails;
};

var updatePersonalInfoModel = function (username, personalInfo) {
    var profileDetails = {
        username: username,
        updatedOn: new Date(),
        personalInfo: {
            gender: personalInfo.gender,
            name: personalInfo.name,
            email: username,
            dob: personalInfo.dob,
            mob: personalInfo.mob,
        }
    };
    return profileDetails;
};


module.exports = {
    profileDataModel: profileDataModel,
    updatePersonalInfoModel: updatePersonalInfoModel
};