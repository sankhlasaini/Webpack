const mongoose = require('mongoose');

/*
 * This is a profile schema, for persisting profile details of each user registered in the system
 */

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        virtual: true
    },
    // role: {
    //     type: String,
    //     enum: appConfig.USER_ROLES
    // },
    status: {
        type: String,
    },
    lastLoginOn: {
        type: Date,
        default: Date.now
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        default: Date.now
    },
}, {
        collection: 'users'
    });

module.exports = mongoose.model('authentication', usersSchema);