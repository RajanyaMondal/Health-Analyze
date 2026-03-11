const Clinic = require('../models/Clinic');

// Get generic nearby clinics (Mock data for simplicity)
exports.getNearbyClinics = async (req, res) => {
    try {
        const { specialistType, lat, lng } = req.query;

        // Hardcode some mock clinics for demonstration purposes
        const mockClinics = [
            {
                _id: '1',
                clinicName: `City Center ${specialistType} Clinic`,
                specialistType: specialistType,
                location: { lat: parseFloat(lat) + 0.01, lng: parseFloat(lng) + 0.01, address: '123 Main St' },
                priceCategory: '$$',
                rating: 4.5,
                distance: '1.2 km'
            },
            {
                _id: '2',
                clinicName: `Premium Health - ${specialistType}`,
                specialistType: specialistType,
                location: { lat: parseFloat(lat) - 0.02, lng: parseFloat(lng) + 0.01, address: '456 Oak Ave' },
                priceCategory: '$$$',
                rating: 4.8,
                distance: '2.5 km'
            },
            {
                _id: '3',
                clinicName: `Community Care ${specialistType}`,
                specialistType: specialistType,
                location: { lat: parseFloat(lat) + 0.005, lng: parseFloat(lng) - 0.015, address: '789 Pine Rd' },
                priceCategory: '$',
                rating: 4.1,
                distance: '0.8 km'
            }
        ];

        res.json(mockClinics);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
