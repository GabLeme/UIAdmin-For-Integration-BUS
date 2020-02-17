const SSH = require('simple-ssh');
const EnvironmentSchema         = require('./environment.schema');
const Log                       = require('bunyan').createLogger({ name: "EnvironmentSocket" })
const async                     = require('async');
const request                   = require('request');

module.exports.machineHealthCheck = (environmentId, socket) => {
    async.waterfall([
        (cb) => {
            EnvironmentSchema.findById(environmentId, (err, environment) => {
                if(!err) cb(null, environment);
                else cb(err);
            })
        },
        (environment) => {
            const host = environment.basePath
                            .split('//')[1]
                            .split('/')[0];
            const sshClient = new SSH({
                host,
                user: environment.user,
                pass: environment.pass
            })

            sshClient
                .exec("top -b -n1 | grep Cpu | sed -r 's@.+:\s([0-9\.]+).+@\1@' && top -b -n1 | grep Mem | sed -r 's@.+:\s([0-9\.]+).+@\1@'", {
                    out: (sucess) => {
                        socket.emit(sucess);
                    },
                    err: (err) => {
                        socket.emit({
                            data: 'error'
                        })
                    }
                });

        }
    ], (err) => {

        })
}

this.machineHealthCheck('5e4afedb4f65a024044a6894')