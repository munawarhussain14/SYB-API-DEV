const mongoose = require('mongoose')

const stateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter State Name"],
        trim: true     
    },
    enable:{
        type: Boolean,
        default: true
    },
    slug:{
        type: String,
        trim:true
    },
    country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country',
        required:true
    }
});

module.exports = mongoose.model('State',stateSchema);