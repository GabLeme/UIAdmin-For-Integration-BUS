const controller                = require('./user.controller');
const consts                    = require('../../utils/consts');

/** @Todo remover user como response */
module.exports = app => {
    app.post(`${consts.basePath}/user`, (req, res) => {
        controller.create(req.body.user)
        .then((user) => {
            res.send(user);        
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    })

    app.post(`${consts.basePath}/user/auth`, (req, res) => {
        controller.authenticate(req.body.user)
        .then((user) => {
            res.send(user);        
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    })

    app.get(`${consts.basePath}/user`, (req, res) => {
        controller.listAll()
        .then((users) => {
            res.send(users);        
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    })

}