/*
 * Add/modify profile schema values
 */
var userDataModel = function(userRegData) {
    var userDetails = {
        username: userRegData.email,
        password: userRegData.password,
        // role: userObj.userCredentialsData.role,
        // status: appConstant.userDetails.USER_STATUS[0], //Ststus=Active
        lastLoginOn: Date.now(),
        createdOn: Date.now(),
        updatedOn: Date.now()
    };
    return userDetails;
};


module.exports = {
    userDataModel: userDataModel,
};