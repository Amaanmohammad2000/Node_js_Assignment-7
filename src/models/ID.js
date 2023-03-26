const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    _id: String,
    currId: Number
});

const Id = mongoose.model("students", schema);
module.exports = Id;