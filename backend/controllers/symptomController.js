const Symptom = require('../models/Symptom');

// Mock simple NLP matching using keywords
exports.analyzeSymptom = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) return res.status(400).json({ msg: 'Please provide symptom text' });

        const lowerText = text.toLowerCase();

        // Check for emergency keywords
        const emergencyKeywords = ['chest pain', 'breathing difficulty', 'heart attack', 'severe bleeding', 'stroke'];
        const isEmergency = emergencyKeywords.some(kw => lowerText.includes(kw));

        if (isEmergency) {
            return res.json({
                specialist: 'Emergency Room (ER)',
                isEmergency: true,
                message: 'URGENT: Your symptoms indicate a possible medical emergency. Please seek immediate medical attention or call emergency services.',
                treatments: ['Immediate life-saving care', 'Triage', 'Stabilization']
            });
        }

        // Standard mapping
        const rules = [
            { keywords: ['fever', 'cough', 'cold', 'flu'], spec: 'General Physician', treatments: ['Medication', 'Rest checkup'] },
            { keywords: ['skin rash', 'acne', 'itching', 'mole'], spec: 'Dermatologist', treatments: ['Topical creams', 'Biopsy'] },
            { keywords: ['eye irritation', 'blurry vision', 'eye pain'], spec: 'Ophthalmologist', treatments: ['Eye drops', 'Vision test'] },
            { keywords: ['toothache', 'gum pain'], spec: 'Dentist', treatments: ['Dental X-ray', 'Filling'] },
            { keywords: ['stomach ache', 'vomiting', 'digestion', 'diarrhea'], spec: 'Gastroenterologist', treatments: ['Endoscopy', 'Dietary changes'] },
            { keywords: ['joint pain', 'arthritis', 'knee pain'], spec: 'Orthopedist', treatments: ['Physical therapy', 'X-ray'] },
        ];

        let matchedSpecialist = 'General Physician';
        let matchedTreatments = ['General checkup'];

        for (const rule of rules) {
            if (rule.keywords.some(kw => lowerText.includes(kw))) {
                matchedSpecialist = rule.spec;
                matchedTreatments = rule.treatments;
                break;
            }
        }

        res.json({
            specialist: matchedSpecialist,
            isEmergency: false,
            message: `Based on your symptoms, we highly recommend consulting a ${matchedSpecialist}.`,
            treatments: matchedTreatments
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
