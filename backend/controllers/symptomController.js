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

        // Standard mapping - Comprehensive Health Dataset
        const rules = [
            // General Medicine / Infectious Disease
            { keywords: ['fever', 'cough', 'cold', 'flu', 'chills', 'body ache'], spec: 'General Physician', treatments: ['Rest and hydration', 'Over-the-counter pain relievers (e.g., Acetaminophen)', 'Antiviral medication if prescribed'] },
            { keywords: ['fatigue', 'weakness', 'tiredness', 'lethargy'], spec: 'General Physician', treatments: ['Blood test for deficiencies', 'Iron or Vitamin supplements', 'Sleep schedule adjustment'] },

            // Dermatology
            { keywords: ['skin rash', 'acne', 'itching', 'mole', 'hives', 'eczema', 'dry skin', 'psoriasis'], spec: 'Dermatologist', treatments: ['Topical corticosteroids', 'Oral antihistamines', 'Moisturizers and gentle cleansers', 'Skin biopsy for suspicious moles'] },

            // Ophthalmology
            { keywords: ['eye irritation', 'blurry vision', 'eye pain', 'dry eyes', 'red eye', 'vision loss'], spec: 'Ophthalmologist', treatments: ['Lubricating eye drops', 'Prescription glasses or contact lenses', 'Antibiotic eye drops for infections (Pink Eye)', 'Comprehensive dilated eye exam'] },

            // Dentistry
            { keywords: ['toothache', 'gum pain', 'bleeding gums', 'sensitive teeth', 'cavity', 'jaw pain'], spec: 'Dentist', treatments: ['Dental cleaning and scaling', 'Fluoride treatment', 'Cavity filling or Root canal', 'Warm salt water rinse'] },

            // Gastroenterology
            { keywords: ['stomach ache', 'vomiting', 'digestion', 'diarrhea', 'acid reflux', 'heartburn', 'bloating', 'constipation'], spec: 'Gastroenterologist', treatments: ['Antacids or Proton pump inhibitors (PPIs)', 'Dietary changes (BRAT diet)', 'Increased fluid intake', 'Endoscopy or Colonoscopy if persistent'] },

            // Orthopedics
            { keywords: ['joint pain', 'arthritis', 'knee pain', 'back pain', 'backpain', 'bone pain', 'stiffness', 'muscle spasm'], spec: 'Orthopedist', treatments: ['Physical therapy', 'NSAIDs (e.g., Ibuprofen) for inflammation', 'Hot/Cold pack therapy', 'X-ray or MRI imaging'] },

            // Neurology
            { keywords: ['headache', 'head aches', 'migraine', 'dizziness', 'vertigo', 'numbness', 'tingling', 'memory loss'], spec: 'Neurologist', treatments: ['Migraine specific medication (Triptans)', 'Vestibular rehabilitation for vertigo', 'CT Scan or MRI of the brain', 'Rest in a quiet, dark room'] },

            // Cardiology (Non-Emergency)
            { keywords: ['palpitations', 'high blood pressure', 'hypertension', 'fast heartbeat', 'swollen ankles'], spec: 'Cardiologist', treatments: ['Blood pressure medication (ACE inhibitors, Beta-blockers)', 'Low sodium diet', 'ECG/EKG monitoring', 'Regular cardiovascular exercise'] },

            // Pulmonology
            { keywords: ['asthma', 'wheezing', 'chronic cough', 'shortness of breath on exertion'], spec: 'Pulmonologist', treatments: ['Inhaled bronchodilators (Albuterol)', 'Inhaled corticosteroids', 'Spirometry lung function test', 'Avoidance of known allergens'] },

            // ENT (Otolaryngology)
            { keywords: ['earache', 'sore throat', 'sorethroat', 'tonsillitis', 'sinus', 'runny nose', 'hearing loss', 'tinnitus'], spec: 'ENT Specialist', treatments: ['Antibiotics for bacterial infection', 'Nasal saline irrigation', 'Decongestants', 'Hearing aid evaluation'] },

            // Psychiatry & Psychology
            { keywords: ['anxiety', 'depression', 'stress', 'panic attacks', 'insomnia', 'sadness', 'mood swings'], spec: 'Psychiatrist / Therapist', treatments: ['Cognitive Behavioral Therapy (CBT)', 'Antidepressant or Anti-anxiety medication', 'Mindfulness and meditation practices', 'Regular sleep hygiene routines'] },

            // Urology / Nephrology
            { keywords: ['urinary pain', 'frequent urination', 'kidney pain', 'blood in urine', 'uti'], spec: 'Urologist', treatments: ['Urinalysis and urine culture', 'Course of antibiotics', 'Increased water consumption', 'Ultrasound of kidneys and bladder'] },

            // Endocrinology
            { keywords: ['excessive thirst', 'frequent urination', 'unexplained weight loss', 'diabetes', 'thyroid expected', 'hair loss'], spec: 'Endocrinologist', treatments: ['Blood glucose testing (A1C)', 'Insulin or Metformin therapy', 'Thyroid hormone replacement (Levothyroxine)', 'Dietary modifications'] },

            // Gynecology
            { keywords: ['menstrual pain', 'irregular periods', 'pregnancy', 'pcos', 'menopause', 'pelvic pain'], spec: 'Gynecologist', treatments: ['Hormonal birth control', 'Pelvic ultrasound', 'Pain management (NSAIDs)', 'Prenatal vitamins'] }
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
