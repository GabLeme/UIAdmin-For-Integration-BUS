const Mongoose              = require('mongoose');


const User = new Mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    environments: [
        {
            id: { type: Mongoose.Types.ObjectId },
            policy: { type: String }
        }
    ],
    createdAt: { type: Date, default: Date.now },
    isMaster: { type: Boolean }
})

module.exports = Mongoose.model("_User", User);