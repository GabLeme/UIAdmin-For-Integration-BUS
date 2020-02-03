const Mongoose              = require('mongoose');

const Environment = new Mongoose.Schema({
    name: { type: String },
    basePath: { type: String },
    mode: { type: String },
    theme: { type: String }
})

module.exports = Mongoose.model("_Environment", Environment);