const mongoose = require('mongoose')

const roleRequestSchema = new mongoose.Schema({
    user:{
        type:Object,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:'Pending'
    }
})

const rolesRequest = mongoose.model('rolesRequest', roleRequestSchema);

module.exports = rolesRequest;