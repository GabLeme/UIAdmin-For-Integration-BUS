const SSH                       = require('simple-ssh');
const EnvironmentSchema         = require('./environment.schema');
const Log                       = require('bunyan').createLogger({ name: "EnvironmentSocket" })
const async                     = require('async');
const request                   = require('request');

module.exports.machineHealthCheck = (environmentId, socket) => {
    console.log('Init Socket Controller')
    async.waterfall([
        (cb) => {
            EnvironmentSchema.findById(environmentId, (err, environment) => {
                if(!err) cb(null, environment);
                else cb(err);
            })
        },
        (environment) => {
            environment = JSON.parse(JSON.stringify(environment));
            const host = environment.basePath
                            .split('//')[1]
                            .split('/')[0]
                            .split(':')[0];
            const ssh = new SSH({
                host,
                user: environment.user,
                pass: environment.pass
            })

            const command = "top -b -n1 | grep Cpu | sed -r 's@.+:\s([0-9\.]+).+@\1@' && top -b -n1 | grep Mem | sed -r 's@.+:\s([0-9\.]+).+@\1@'";

            ssh.exec(command, {
                out: (stdout) => {
                    console.log("Sucess CMD", stdout)
                    socket.emit('HealthCheck', {data: stdout, error: false})
                },
                err: (err) => {
                    socket.emit('HealthCheck', {data: stdout, error: true})
                }
            })
            .start();
        }
    ], (err) => {
        socket.emit('HealthCheck', err)
    })
}
