const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    reporterUserId: String,
    reportedUserId: String,
    reportedUsername: String,
    reason: String, // push all the reasons
    status: String,
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;