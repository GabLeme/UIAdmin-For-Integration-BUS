const controller                = require('./environment.controller');
const consts                    = require('../../utils/consts');

module.exports = app => {
    app.post(`${consts.basePath}/environment`, (req, res) => {
        controller.create(req.body.environment)
        .then((environment) => {
            res.send(environment);        
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    })

    app.get(`${consts.basePath}/environment`, (req, res) => {
        controller.listAll()
        .then((environments) => {
            res.send(environments);        
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    })

    app.get(`${consts.basePath}/environment/config/:id`, (req, res) => {
        controller.listConfig(req.params.id)
        .then((config) => {
            res.send(config);        
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    })

    app.post(`${consts.basePath}/environment/server/start/:id/:serverName`, (req, res) => {
        controller.startServer(req.params.id, req.params.serverName)
        .then((start) => {
            res.send(start);        
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    })

    app.post(`${consts.basePath}/environment/server/stop/:id/:serverName`, (req, res) => {
        controller.stopServer(req.params.id, req.params.serverName)
        .then((stop) => {
            res.send(stop);        
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    })

    app.post(`${consts.basePath}/environment/server/restart/:id/:serverName`, (req, res) => {
        controller.restartServer(req.params.id, req.params.serverName)
        .then((stop) => {
            res.send(stop);        
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    })

    app.get(`${consts.basePath}/environment/server/content/:id/:serverName`, (req, res) => {
        controller.listServerContent(req.params.id, req.params.serverName)
        .then((content) => {
            res.send(content);        
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    })

    app.post(`${consts.basePath}/environment/server/api/start/:id/:serverName/:apiName/:itemType`, (req, res) => {
        controller.startApi(req.params.id, req.params.serverName, req.params.apiName, req.params.itemType)
        .then((start) => {
            res.send(start);        
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    })

    app.post(`${consts.basePath}/environment/server/api/stop/:id/:serverName/:apiName/:itemType`, (req, res) => {
        controller.stopApi(req.params.id, req.params.serverName, req.params.apiName, req.params.itemType)
        .then((stop) => {
            res.send(stop);        
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    })

    app.delete(`${consts.basePath}/environment/server/api/delete/:id/:serverName/:apiName/:itemType`, (req, res) => {
        controller.deleteApi(req.params.id, req.params.serverName, req.params.apiName, req.params.itemType)
        .then((del) => {
            res.send(del);        
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    })


    app.post(`${consts.basePath}/environment/server/`, (req, res) => {
        // console.log('REQ')
        // console.log(req.body)
        controller.createServer(req.body.id, req.body.serverName, req.body.debugPort, req.body.mqName)
        .then((created) => {
            res.send(created);        
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    })

    app.delete(`${consts.basePath}/environment/server/delete/:id/:serverName`, (req, res) => {
        controller.deleteServer(req.params.id, req.params.serverName)
        .then((del) => {
            res.send(del);        
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    })
    

    app.patch(`${consts.basePath}/environment`, (req, res) => {
        controller.update(req.body.id, req.body.envName, req.body.basePath)
        .then((env) => {
            res.send(env);        
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    })

    app.get(`${consts.basePath}/environment/:id`, (req, res) => {
        controller.getById(req.params.id)
        .then((env) => {
            res.send(env);        
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    })

    app.delete(`${consts.basePath}/environment/:id`, (req, res) => {
        controller.delete(req.params.id)
        .then((remove) => {
            res.send(remove);        
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    })
}