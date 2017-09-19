const router = require('express').Router();
const userCtrl = require('./userCredential.controller');
// const logger = require('./../../../../applogger');

/*
 * Actual URI will be HTTP POST /userData/
 */

// get profile full data
router.get('/', function(req, res) {
    let username = req.query.email;
    console.log('-------------------->>>>>>>>>', req.query.email)
    try {
        if (!username) {
            console.log('Invalid Username');
            throw new Error('Invalid inputs passed...!');
        }
        userCtrl.getProfile(username).then((successResult) => {
            return res.status(201).send({ data: successResult, "authToken": req.authToken });
        }, (errResult) => {
            // Log the error for internal use
            console.log('Internal error occurred');
            return res.status(500).send({ error: 'Internal error occurred, please try later..!', "authToken": req.authToken });
        });
    } catch (err) {
        // Log the Error for internal use
        console.log('Exception occurred' + err);
        res.send({ error: 'Failed to complete successfully, please check the request and try again..!', "authToken": req.authToken });
        return;
    }
});

// api to create new userData
router.post('/', function(req, res) {
    let userData = req.body;
    console.log('Get object and store into userData', userData);
    try {
        if (!userData) {
            console.log('userData not found');
            throw new Error('Invalid inputs passed...!');
        }
        userCtrl.createUser(userData.email, userData).then((successResult) => {
            return res.status(201).send({ msg: successResult, 'authToken': req.authToken });
        }, (errResult) => {
            // Log the error for internal use
            console.log('Internal error occurred');
            return res.status(500).send({ error: 'Internal error occurred, please try later..!', "authToken": req.authToken });
        });
    } catch (err) {
        // Log the Error for internal use
        console.log('Exception occurred' + err);
        res.send({ error: 'Failed to complete successfully, please check the request and try again..!', "authToken": req.authToken });
        return;
    }
});



// api to edit profile data
router.patch('/', function(req, res) {
    let profileData = req.body.data;
    let username = req.body.username;
    let sectionName = req.body.sectionName;
    try {
        if (!profileData) {
            console.log('Invalid inputs passed');
            throw new Error('Invalid inputs passed...!');
        }
        userCtrl.editProfile(profileData, username, sectionName).then((successResult) => {
            return res.status(201).send({ data: successResult, success: true, "authToken": req.authToken });
        }, (errResult) => {
            // Log the error for internal use
            console.log('Internal error occurred');
            return res.status(500).send({ success: false, msg: "Internal error occurred, please try later", error: 'Internal error occurred, please try later..!', "authToken": req.authToken });
        });

    } catch (err) {
        // Log the Error for internal use
        console.log('Exception occurred' + err);
        res.send({ success: false, error: 'Failed to complete successfully, please check the request and try again..!', "authToken": req.authToken });
        return;
    }
});

// api to delete  profile
router.delete('/', function(req, res) {
    let profileData = req.body;
    try {
        if (!profileData) {
            console.log('Invalid inputs passed');
            throw new Error('Invalid inputs passed...!');
        }
        prflCtrl.deleteProfile(profileData).then((successResult) => {
            return res.status(201).send({ result: successResult, "authToken": req.authToken });
        }, (errResult) => {
            // Log the error for internal use
            console.log('Internal error occurred');
            return res.status(500).send({ error: 'Internal error occurred, please try later..!', "authToken": req.authToken });
        });
    } catch (err) {
        // Log the Error for internal use
        console.log('Exception occurred' + err);
        res.send({ error: 'Failed to complete successfully, please check the request and try again..!', "authToken": req.authToken });
        return;
    }
});

module.exports = router;