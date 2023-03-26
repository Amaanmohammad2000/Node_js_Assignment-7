const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    id:{
        type: Number,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    class:{
        type: Number,
        required: true
    },
    section:{
        type: String,
        required: true,
        upperCase: true
    }
});

;
module.exports = mongoose.models.students || mongoose.model("students", schema);