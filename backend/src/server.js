const app               = require('./app');

const port              = (process.env.PORT || '3000');
const http              = require('http').createServer(app);

const cron = require("node-cron");
const Socket                = require('socket.io')(http);
const environmentJobs       = require('./app/environment/environment.socket'); 


Socket.on('connection', (socket) => {
    console.log('Client Connected')
    cron.schedule('*/5 * * * * *', () => {
      console.log("HealthCheck Init")
      environmentJobs.machineHealthCheck('5e4afedb4f65a024044a6894', socket);
    });
})
  

http.listen(port, () => {
    console.log(`Running server on port: ${port}`)
});
