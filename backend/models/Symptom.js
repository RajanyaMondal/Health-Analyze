const mongoose = require('mongoose');

const SymptomSchema = new mongoose.Schema({
    symptomName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    relatedSpecialist: {
        type: String,
        required: true
    },
    urgent: {
        type: Boolean,
        default: false
    },
    commonTreatments: [{
        type: String
    }]
});

module.exports = mongoose.model('Symptom', SymptomSchema);
