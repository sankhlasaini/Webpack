var router = require('express').Router();
var jwt = require('jsonwebtoken');
var userCtrl = require('./../userCredential/userCredential.controller');
// const logger = require('./../../../../applogger');

// authentication of user
router.post('/', function (req, res) {
    // let username = req.query.email;
    // let password = req.query.password;
    let user = req.body;
    console.log('-------------------->>>>>>>>>', req.body)
    try {
        if (!user) {
            console.log('Invalid user');
            throw new Error('Invalid inputs passed...!');
        }
        userCtrl.getProfile(user.email).then((successResult) => {
            console.log('GOT THE DATA -->>>>>', successResult);

            if (successResult.length > 0) {
                console.log('yes user found');
                if (successResult[0].password === user.password) {
                    console.log('password match');
                    let userDetails = {
                        username: successResult[0].username,
                    };
                    let userToken = jwt.sign(userDetails, "this is secret", {
                        expiresIn: 60 * 30
                    });
                    return res.status(201).send({ authToken: userToken, msg: 'user authenticated', success: true });
                } else {
                    console.log('password Wrong');
                    return res.status(201).send({ msg: 'password wrong', success: false });
                }
            } else {
                return res.status(201).send({ msg: 'user not found', success: false });
            }

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