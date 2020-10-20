const mongoose = require('mongoose')

var model_schema = new mongoose.Schema({
    name: String,
    role: String,
    shortID: String,
    class: String
})

var TeamMember = mongoose.model('team-members',model_schema)
module.exports = TeamMember