const Mongoose              = require('mongoose');
const config                = require('./config');
const Log                   = require('bunyan')
                                .createLogger({name: 'ConnectionMongo'})

module.exports = new Promise((resolve, reject) => {
    Mongoose.connect(config('DEV'), {
        useNewUrlParser: true,
        useUnifiedTopology: true    
    })
    .then((conn) => {
        resolve(conn);
    })
    .catch((err) => {
        Log.info(err);
        reject(err);
    })
})