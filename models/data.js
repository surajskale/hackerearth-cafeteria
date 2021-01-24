const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DataSchema = new Schema({
    name: { 
        type: String, 
        required: "Required"
    },
    organisationName: { 
        type: String, 
        required: "Required"
    }, 
    employeeId: {
        type: String, 
        required: "Required"
    },
    mobileNo: {
        type: String, 
        required: "Required"
    },
    email: {
        type: String, 
        required: "Required"
    },
    date: {
        type: Date, 
        default: Date.now 
    },
    item1: {
        type: String,
    },
    item2: {
        type: String,
    }
});

const Data = mongoose.model('Data', DataSchema);

module.exports = Data;