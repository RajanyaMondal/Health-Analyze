const mongoose = require('mongoose');

const ClinicSchema = new mongoose.Schema({
    clinicName: {
        type: String,
        required: true
    },
    specialistType: {
        type: String,
        required: true
    },
    location: {
        address: String,
        lat: Number,
        lng: Number
    },
    priceCategory: {
        type: String,
        enum: ['$', '$$', '$$$'],
        default: '$$'
    },
    rating: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Clinic', ClinicSchema);
