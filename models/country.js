const mongoose = require('mongoose')

const countrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Country Name"],
        trim: true     
    },
    enable:{
        type: Boolean,
        default: true
    },
    currency: {
        type: String,
        required: [true, "Please enter Currency"],
        trim: true,
    }
});

module.exports = mongoose.model('Country',countrySchema);