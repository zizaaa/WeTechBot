const mongoose = require('mongoose');

const enrollmentForm = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    course:{
        type:String,
        required:true,
    },
    acountUserName: {
        type:String,
        required:false,
    },
    password: {
        type:String,
        required:false,
    },
    firstName: {
        type:String,
        required:true,
    },
    lastName: {
        type:String,
        required:true,
    },
    gender: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
    },
    birthDate:{
        type:String,
        required:true,
    },
    status: {
        type:String,
        required:true,
        default:'Unverified'
    },
    otp:{
        type:String,
        require:false
    }
});
const enrollment = mongoose.model('enrollment', enrollmentForm);

module.exports = enrollment;