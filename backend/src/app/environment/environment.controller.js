const EnvironmentSchema         = require('./environment.schema');
const Log                       = require('bunyan').createLogger({ name: "UserController" })
const async                     = require('async');
const request                   = require('request');

module.exports.listAll = () => {
    return new Promise((resolve, reject) => {
        EnvironmentSchema.find((err, environments) => {
            if(!err) resolve(environments);
            else {
                Log.info(err);
                reject(err);
            }
        })
    })
}

module.exports.create = (environment) => {
    return new Promise((resolve, reject) => {
        EnvironmentSchema.create(environment, (err, environment) => {
            if(!err) resolve(environment);
            else {
                Log.info(err);
                reject(err);
            }
        })
    })  
}

module.exports.listConfig = (id) => {
    return new Promise((resolve, reject) => {
        async.waterfall([
            (cb) => {
                EnvironmentSchema.findById(id, (err, environment) => {
                    if(!err) cb(null, environment);
                    else cb(err)
                })        
            },
            (environment, cb) => {
                const basePath = environment.basePath;
                request.get(`${basePath}system`, (err, res, systemInfo) => {
                    //console.log(`${basePath}/system`)
                    //console.log(systemInfo)
                    if(!err) cb(null, basePath, systemInfo);
                    else cb(err);
                })
            },
            (basePath, systemInfo, cb) => {
                request.get(`${basePath}servers`, (err, res, servers) => {
                    // console.log(`${basePath}servers`)
                    // console.log(servers)
                    if(!err) {
                        const data = {
                            systemInfo,
                            servers
                        }
                        resolve(data);
                    }
                    else cb(err);
                })
            }
        ], (err) => {
            reject(err);
        })
    })
}

module.exports.startServer = (id, serverName) => {
    return new Promise((resolve, reject) => {
        async.waterfall([
            (cb) => {
                EnvironmentSchema.findById(id, (err, environment) => {
                    if(!err) cb(null, environment)
                    else cb(err);
                })
            },
            (environment, cb) => {
                const basePath = environment.basePath;
                request.post(`${basePath}servers/${serverName}/start`, (err, res, start) => {
                    if(!err) resolve({data: 'ok'});
                    else cb(err);
                })
            }
        ], (err) => {
            reject(err);
        })
    })
}

module.exports.stopServer = (id, serverName) => {
    return new Promise((resolve, reject) => {
        async.waterfall([
            (cb) => {
                EnvironmentSchema.findById(id, (err, environment) => {
                    if(!err) cb(null, environment)
                    else cb(err);
                })
            },
            (environment, cb) => {
                const basePath = environment.basePath;
                request.post(`${basePath}servers/${serverName}/stop`, (err, res, stop) => {
                    if(!err) resolve({data: 'ok'});
                    else cb(err);
                })
            }
        ], (err) => {
            reject(err);
        })
    })
}

module.exports.restartServer = (id, serverName) => {
    return new Promise((resolve, reject) => {
        async.waterfall([
            (cb) => {
                EnvironmentSchema.findById(id, (err, environment) => {
                    if(!err) cb(null, environment)
                    else cb(err);
                })
            },
            (environment, cb) => {
                const basePath = environment.basePath;
                request.post(`${basePath}servers/${serverName}/restart`, (err, res, restart) => {
                    if(!err) resolve({data: 'ok'});
                    else cb(err);
                })
            }
        ], (err) => {
            reject(err);
        })
    })
}

module.exports.listServerContent = (id, serverName) => {
    return new Promise((resolve, reject) => {
        async.waterfall([
            (cb) => {
                EnvironmentSchema.findById(id, (err, environment) => {
                    if(!err) cb(null, environment)
                    else cb(err);
                })
            },
            (environment, cb) => {
                const basePath = environment.basePath;
                request.get(`${basePath}servers/${serverName}`, (err, res, content) => {
                    if(!err) cb(null, basePath, content);
                    else cb(err);
                })
            },
            (basePath, content, cb) => {
                request.get(`${basePath}servers/${serverName}/shared-libraries`, (err, res, libs) => {
                    if(!err) cb(null, basePath, content, libs);
                    else cb(err);
                })
            },
            (basePath, content, libs, cb) => {
                request.get(`${basePath}servers/${serverName}/applications`, (err, res, apps) => {
                    if(!err) cb(null, basePath, content, libs, apps);
                    else cb(err);
                })
            },
            (basePath, content, libs, apps, cb) => {
                request.get(`${basePath}servers/${serverName}/rest-apis`, (err, res, apis) => {
                    const data = {
                        content,
                        libs,
                        apps,
                        apis
                    }
                    if(!err) resolve(data);
                    else cb(err);
                })
            }
        ], (err) => {
            reject(err);
        })
    })
}

module.exports.startApi = (id, serverName, apiName, itemType) => {
    return new Promise((resolve, reject) => {
      async.waterfall([
          (cb) => {
            EnvironmentSchema.findById(id, (err, environment) => {
                if(!err) cb(null, environment);
                else cb(err);
            })
          },
          (environment, cb) => {
            const basePath = environment.basePath;
            let type = '';
            switch (itemType) {
                case 'api':
                    type = 'rest-apis'
                    break;
                case 'app':
                    type = 'applications'
                    break;
                case 'lib':
                    type = 'shared-libraries'
                    break;            
            }
            request.post(`${basePath}servers/${serverName}/${type}/${apiName}/messageflows/start`, (err, res, restart) => {
                if(!err) resolve({data: 'ok'});
                else cb(err);
            })
        }
      ], (err) => {
          reject(err);
      })  
    })
}

module.exports.stopApi = (id, serverName, apiName, itemType) => {
    return new Promise((resolve, reject) => {
        async.waterfall([
            (cb) => {
                EnvironmentSchema.findById(id, (err, environment) => {
                    if(!err) cb(null, environment);
                    else cb(err);
                })
            },
        (environment, cb) => {
          const basePath = environment.basePath;
          let type = '';
            switch (itemType) {
                case 'api':
                    type = 'rest-apis'
                    break;
                case 'app':
                    type = 'applications'
                    break;
                case 'lib':
                    type = 'shared-libraries'
                    break;            
            }
          request.post(`${basePath}servers/${serverName}/${type}/${apiName}/messageflows/stop`, (err, res, restart) => {
              if(!err) resolve({data: 'ok'});
              else cb(err);
          })
        }
        ], (err) => {
            reject(err);
        })  
    })
}

module.exports.deleteApi = (id, serverName, apiName, itemType) => {
    return new Promise((resolve, reject) => {
        async.waterfall([
            (cb) => {
                EnvironmentSchema.findById(id, (err, environment) => {
                    if(!err) cb(null, environment);
                    else cb(err);
                })
            },
        (environment, cb) => {
          const basePath = environment.basePath;
          let type = '';
          console.log(itemType)
            switch (itemType) {
                case 'api':
                    type = 'rest-apis'
                    break;
                case 'app':
                    type = 'applications'
                    break;
                case 'lib':
                    type = 'shared-libraries'
                    break;            
            }
            // console.log('url')
            // console.log()
          request.delete(`${basePath}servers/${serverName}/${type}/${apiName}`, (err, res, restart) => {
            if(!err) resolve({data: 'ok'});
              else cb(err);
          })
        }
        ], (err) => {
            reject(err);
        })
    })
}

module.exports.createServer = (id, serverName, debugPort, mqName) => {
    console.log(id)
    return new Promise((resolve, reject) => {
        async.waterfall([
            (cb) => {
                EnvironmentSchema.findById(id, (err, environment) => {
                    console.log(environment)
                    if(!err) cb(null, environment);
                    else cb(err);
                })
            },
            (environment, cb) => {
                const basePath = environment.basePath;

                const body = {
                    "hasChildren": true,
                    "name": serverName,
                    "type": "integrationServer",
                    "uri": "/apiv2",
                    "properties": {
                      "brokerDefaultCCSID": "0",
                      "dataSourceName": "",
                      "dataSourcePassword": "********",
                      "dataSourceUserId": "",
                      "defaultQueueManager": mqName,
                      "forceServerHTTPS": false,
                      "jvmDebugPort": '7804',
                      "jvmMaxHeapSize": 268435456,
                      "jvmMinHeapSize": 33554432,
                      "lilPath": "",
                      "mqTrustedQueueManager": "no",
                      "name": serverName,
                      "trace": "none",
                      "traceNodeLevel": true,
                      "traceSize": "1G",
                      "type": "IntegrationServer",
                      "windowsDomainGroup": "",
                      "windowsMQDomainGroup": ""
                    },
                    "descriptiveProperties": {
                      "buildLevel": "ib000-L181210.16540 (S000-L181209.15459)",
                      "platformArchitecture": "AMD64",
                    },
                    "active": {
                      "isRunning": true,
                      "lastMessageTime": 0,
                      "monitoring": "inactive",
                      "monitoringProfile": "",
                      "processId": new Date().getTime(),
                      "startupEpoch": 1553085352,
                      "startupTime": "2019-03-20T12:35:52.000Z",
                      "state": "started"
                    },
                    "actions": {
                      "available": {
                        "delete": "/apiv2/delete",
                        "delete-all": "/apiv2/delete-all",
                        "deploy": "/apiv2/deploy",
                        "reset-service-trace": "/apiv2/reset-service-trace",
                        "reset-user-trace": "/apiv2/reset-user-trace",
                        "shutdown": "/apiv2/shutdown",
                        "start-service-trace": "/apiv2/start-service-trace",
                        "start-user-trace": "/apiv2/start-user-trace"
                      },
                      "unavailable": {
                        "stop-service-trace": "/apiv2/stop-service-trace",
                        "stop-user-trace": "/apiv2/stop-user-trace"
                      }
                    },
                    "children": {
                      "resourceManagers": {
                        "hasChildren": true,
                        "name": "resource-managers",
                        "type": "resourceManagers",
                        "uri": "/apiv2/resource-managers"
                      },
                      "applications": {
                        "name": "applications",
                        "hasChildren": true,
                        "children": [
                          {
                          }
                        ]
                      },
                      "restApis": {
                        "hasChildren": false,
                        "name": "rest-apis",
                        "type": "restApis",
                        "uri": "/apiv2/rest-apis"
                      },
                      "services": {
                        "hasChildren": false,
                        "name": "services",
                        "type": "services",
                        "uri": "/apiv2/services"
                      },
                      "sharedLibraries": {
                        "hasChildren": false,
                        "name": "shared-libraries",
                        "type": "sharedLibraries",
                        "uri": "/apiv2/shared-libraries"
                      },
                      "policies": {
                        "hasChildren": false,
                        "name": "policies",
                        "type": "policies",
                        "uri": "/apiv2/policies"
                      },
                      "dotNetAppDomains": {
                        "hasChildren": false,
                        "name": "dot-net-app-domains",
                        "type": "dotNetAppDomains",
                        "uri": "/apiv2/dot-net-app-domains"
                      },
                      "monitoring": {
                        "hasChildren": true,
                        "name": "monitoring",
                        "type": "monitoring",
                        "uri": "/apiv2/monitoring"
                      }
                    }
                  }
                  request.post({
                    url: `${basePath}servers`,
                    method: 'POST',
                    json: JSON.parse(JSON.stringify(body))
                    }, (err, res, created) => {
                        console.log(created)
                    if(!err) resolve({data: 'ok'});
                    else cb(err);
                  })
            }
        ], (err) => {
            reject(err);
        })
    })
}

module.exports.deleteServer = (id, serverName) => {
    console.log(id)
    return new Promise((resolve, reject) => {
        async.waterfall([
            (cb) => {
                EnvironmentSchema.findById(id, (err, environment) => {
                    if(!err) cb(null, environment);
                    else cb(err);
                })
            },
            (environment, cb) => {
                const basePath = environment.basePath;
                request.delete(`${basePath}servers/${serverName}`, (err, res, del) => {
                    if(!err) resolve({data: 'ok'});
                      else cb(err);
                  })        
            }
        ], (err) => {
            reject(err);
        })
    })
}

module.exports.update = (id, name, basePath) => {
    // console.log(id)
    // console.log(name)
    // console.log(basePath)
    return new Promise((resolve, reject) => {
        EnvironmentSchema.updateOne({
            _id: id
        }, 
        {
            name: name,
            basePath: basePath
        }, (err, env) => {
            if(!err) resolve(env);
            else reject(err);
        })
    })
}

module.exports.getById = (id) => {
    return new Promise((resolve, reject) => {
        EnvironmentSchema.findById(id, (err, env) => {
            if(!err) resolve(env);
            else reject(err);
        })
    })
}

module.exports.delete = (id) => {
    return new Promise((resolve, reject) => {
        EnvironmentSchema.remove({
            _id: id
        }, (err, remove) => {
            if(!err) resolve(remove);
            else reject(err);
        })
    })
}

module.exports.deploy = (servers, file) => {
    deploymentsCalls = []
    servers.forEach(
        (intServer) => {
            console.log('ADICIONADO: ',intServer)
            deploymentsCalls.push(
                (response,cb) => {
                    var requestSettings = {
                        method: 'POST',
                        url: `http://localhost:4415/apiv2/servers/${intServer}/deploy`,
                        body: file,
                        encoding: null,
                        headers: {'Content-Type': 'application/json'}
                    }
                    request(requestSettings, (err, res, start) => {
                        console.log('Status code:',res.statusCode)
                        err = res.statusCode < 400 ? null : res;
                        if(!err) cb(null,res);
                        else cb(err,res);
                    })
                }
            )
        }
    )
    return new Promise((resolve, reject) => {
        async.waterfall(
            [(cb)=>{cb(null,null)},
            deploymentsCalls,
            (response,cb) => {resolve({data: 'ok',lastResponse: response})}
            ].flat()
            , 
            (err) => {
            reject(err);
        })
    })
}