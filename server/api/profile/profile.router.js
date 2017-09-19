const router = require('express').Router();
const prflCtrl = require('./profile.controller');
// const logger = require('./../../../../applogger');


/*
 * Actual URI will be HTTP POST /profiles/
 */

// get profile full data
router.get('/', function (req, res) {
    // console.log('req------------>>>', req)
    let profileData = req.query;
    try {
        if (!profileData) {
            console.log('Invalid inputs passed');
            throw new Error('Invalid inputs passed...!');
        }
        prflCtrl.getProfile(profileData).then((successResult) => {
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
// get profile full data
router.get('/getAll', function (req, res) {
    // console.log('req------------>>>', req)
    try {
        prflCtrl.getAllProfile().then((successResult) => {
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
// api to create new profile
router.post('/', function (req, res) {
    let profileData = req.body;
    // console.log('Get object and store into profileData', profileData);
    try {
        if (!profileData) {
            console.log('profileData not found');
            throw new Error('Invalid inputs passed...!');
        }
        prflCtrl.createProfile(profileData.email, profileData).then((successResult) => {
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

// api to create new profile
router.post('/status', function (req, res) {
    let body = req.body;
    console.log('setting status', body);
    try {
        if (!body) {
            console.log('profileData not found');
            throw new Error('Invalid inputs passed...!');
        }
        prflCtrl.setStatus(body).then((successResult) => {
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
router.patch('/', function (req, res) {
    console.log(req.body);
    let profileData = req.body.profileData;
    let username = req.body.username;
    try {
        if (!profileData) {
            console.log('Invalid inputs passed');
            throw new Error('Invalid inputs passed...!');
        }
        prflCtrl.editProfile(profileData, username).then((successResult) => {
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
router.delete('/', function (req, res) {
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