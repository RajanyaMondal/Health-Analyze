import { useState } from 'react';
import { analyzeSymptom, getNearbyClinics } from '../services/api';

const SymptomInput = ({ onResults }) => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!text) return;
        setLoading(true);
        try {
            const data = await analyzeSymptom(text);
            if (!data) throw new Error("No response from AI engine");

            const fetchClinics = async (lat, lng) => {
                try {
                    const clinics = await getNearbyClinics(data.specialist, lat, lng);
                    onResults({ ...data, clinics });
                } catch (error) {
                    onResults({ ...data, clinics: [], error: "Could not fetch nearby clinics." });
                }
                setLoading(false);
            };

            // Try to get user's location, default to NY coordinates if blocked or timed out
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => fetchClinics(position.coords.latitude, position.coords.longitude),
                    (error) => {
                        console.log("Location fallback used:", error.message);
                        fetchClinics(40.7128, -74.0060);
                    },
                    { timeout: 5000, maximumAge: 60000 } // 5 second timeout so UI doesn't hang
                );
            } else {
                fetchClinics(40.7128, -74.0060);
            }
        } catch (err) {
            console.error(err);
            onResults({ error: "Our AI engine is currently unreachable. Please ensure the backend server is running." });
            setLoading(false);
        }
    };

    return (
        <div className="ai-input-container shadow-glossy" style={{ marginTop: '2rem' }}>
            <input
                type="text"
                placeholder="E.g., I have a fever, cough, and my chest hurts..."
                className="ai-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAnalyze()}
            />
            <button className="btn-primary btn-analyze" onClick={handleAnalyze} disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Analyzing...' : 'Analyze'}
            </button>
        </div>
    );
};

export default SymptomInput;
