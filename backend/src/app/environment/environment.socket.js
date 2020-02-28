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

            //windows cpu @for /f "skip=1" %p in ('wmic cpu get loadpercentage') do @echo %p%
            //windows memory | wmic OS get FreePhysicalMemory | wmic ComputerSystem get TotalPhysicalMemory

            ssh.exec(command, {
                out: (stdout) => {
                    let commandResult = '';
                    let type = '';
                    if(stdout.includes('Cpu')){
                        type = 'cpu';
                        commandResult = stdout.split(',')[0].split(':')[1].split('us')[0];
                    }
                    else if(stdout.includes('Mem')) {
                        type = 'mem';
                        // console.log(stdout)
                        const memTotal = stdout.split(',')[0].split(':')[1].split('total')[0];
                        const memUsed = stdout.split(',')[2].split('used')[0];
                        // console.log("/*Memoria Total*/")
                        // console.log(memTotal)
                        // console.log("/*Memoria Usada*/")
                        // console.log(memUsed)
                        commandResult = (Number(memUsed) / Number(memTotal)) * 100;
                    }
                    socket.emit('HealthCheck', {data: Number(commandResult), error: false, type})
                },
                err: (err) => {
                    socket.emit('HealthCheck', {data: err, error: true})
                }
            })
            .start();
        }
    ], (err) => {
        socket.emit('HealthCheck', err)
    })
}
