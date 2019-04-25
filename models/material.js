let mongoose = require('mongoose');

let materialSchema = mongoose.Schema({
    CompoundNumber: {
        type: String,
        required: true
    },
    Cost: {
        type: String,
        required: true
    },
    SpecificGravity: {
        type: String,
        required: false
    },
    Description: {
        type: String,
        required: false
    },
    Color: {
        type: String,
        required: false
    }
});

let Material = module.exports = mongoose.model('Material', materialSchema);