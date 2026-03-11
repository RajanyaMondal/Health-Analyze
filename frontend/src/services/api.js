const API_URL = 'http://localhost:5000/api';

export const analyzeSymptom = async (text) => {
    const response = await fetch(`${API_URL}/symptoms/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });
    return response.json();
};

export const getNearbyClinics = async (specialistType, lat, lng) => {
    const response = await fetch(`${API_URL}/clinics/nearby?specialistType=${specialistType}&lat=${lat}&lng=${lng}`);
    return response.json();
};
