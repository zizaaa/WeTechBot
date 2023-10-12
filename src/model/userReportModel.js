const mongoose = require('mongoose');

const userReportSchema = new mongoose.Schema({
    reporterUserId:{
        type:Array
    },
    reportedUserId:{
        type:String
    },
    reason: {
        type:Array
    }, // push all the reasons
    status: {
        type:Array
    },
    timesReported: {
        type:Number
    } // how many times this user been reported
});

const UserReport = mongoose.model('UserReport', userReportSchema);

module.exports = UserReport;