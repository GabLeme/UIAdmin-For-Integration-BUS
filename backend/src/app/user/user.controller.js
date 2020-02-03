const UserSchema                = require('./user.schema');
const db                        = require('../../database/connection');
const Log                       = require('bunyan')
                                    .createLogger({ name: "UserController" })
module.exports.authenticate = (user) => {
    return new Promise((resolve, reject) => {
        db.then((conn) => {
            UserSchema.find(
            {
                email: user.email,
                password: user.password
            },
            (err, user) => {
                if(!err) resolve(user);
                else {
                    Log.info(err);
                    reject(err);
                }
            })
        })

    })
}

module.exports.create = (user) => {
    return new Promise((resolve, reject) => {
        db.then((conn) => {
            UserSchema.create(user, (err, user) => {
                if(!err) resolve(user);
                else {
                    Log.info(err);
                    reject(err);
                }
            })
        })
    })
}

module.exports.listAll = () => {
    return new Promise((resolve, reject) => {
        db.then((conn) => {
            UserSchema.find((err, users) => {
                if(!err) resolve(users);
                else {
                    Log.info(err);
                    reject(err);
                }
            })
        })
    })
}