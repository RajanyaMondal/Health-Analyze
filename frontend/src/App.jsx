import { useState } from 'react'
import { Activity, ArrowRight, Play, Stethoscope, User, MapPin, Loader2 } from 'lucide-react'
import { analyzeSymptom, getNearbyClinics } from './services/api'
import SpecialistCard from './components/SpecialistCard'
import EmergencyAlert from './components/EmergencyAlert'
import { Footer } from './components/ui/footer'

function App() {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState(null);

    const handleAnalyze = async (e) => {
        e?.preventDefault();
        if (!text) return;
        setLoading(true);
        try {
            const data = await analyzeSymptom(text);
            if (!data) throw new Error("No response from AI engine");

            const fetchClinics = async (lat, lng) => {
                try {
                    const clinics = await getNearbyClinics(data.specialist, lat, lng);
                    setResultData({ ...data, clinics });
                } catch (error) {
                    setResultData({ ...data, clinics: [], error: "Could not fetch nearby clinics." });
                }
                setLoading(false);
            };

            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => fetchClinics(position.coords.latitude, position.coords.longitude),
                    (error) => {
                        console.log("Location fallback used:", error.message);
                        fetchClinics(40.7128, -74.0060);
                    },
                    { timeout: 5000, maximumAge: 60000 }
                );
            } else {
                fetchClinics(40.7128, -74.0060);
            }
        } catch (err) {
            console.error(err);
            setResultData({ error: "Our AI engine is currently unreachable. Please ensure the backend server is running." });
            setLoading(false);
        }
    };

    return (
        <div className="container">
            {/* Navbar */}
            <header className="navbar">
                <div className="logo">
                    <Activity className="logo-icon" size={28} />
                    <h1>SymptomMapper</h1>
                </div>
                <nav className="nav-links">
                    <a href="#">About</a>
                    <a href="#">Doctor</a>
                    <a href="#">Blog</a>
                    <a href="#">Contact</a>
                </nav>
                <div className="nav-actions">
                    <a href="#" className="btn btn-outline"><User size={18} /> Login</a>
                    <a href="#" className="btn btn-primary">Create an account</a>
                </div>
            </header>

            {/* Hero */}
            <section className="hero">
                <div className="hero-content">
                    <h2>Empowering<br />Lives Through<br />Health</h2>
                    <p>Navigating Health Together: Your Trusted Medical Resource and AI Symptom Checker.</p>
                    <a href="#analyze" className="btn btn-primary">
                        Get started now <ArrowRight size={18} />
                    </a>
                </div>
                <div className="hero-image-wrapper">
                    {/* Placeholder for illustration since we don't have the exact asset */}
                    <div style={{
                        width: '100%', height: '100%', backgroundColor: '#e2e8f0', borderRadius: 'var(--radius-lg)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b'
                    }}>
                        <Stethoscope size={80} opacity={0.5} />
                    </div>
                </div>
            </section>

            {/* Stats Row */}
            <section className="stats-row">
                <div className="stat-card-text">
                    <h3>
                        <span>Your Bridge to Better Health</span>
                        <span style={{ color: 'var(--color-text-muted)' }}>Start Your Journey Today</span>
                    </h3>
                    <p style={{ marginBottom: '1rem' }}>Medicine Meets Technology. Your Online Health Hub.</p>
                    <a href="#analyze" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                        Our working process <span className="btn-icon" style={{ width: 24, height: 24, marginLeft: 8 }}><Play size={12} /></span>
                    </a>
                </div>

                <div className="stat-card-clients">
                    <div className="clients-head">
                        <h4>Our Clients</h4>
                        <div className="avatar-group">
                            <img src="https://i.pravatar.cc/100?img=1" alt="Avatar" />
                            <img src="https://i.pravatar.cc/100?img=2" alt="Avatar" />
                            <img src="https://i.pravatar.cc/100?img=3" alt="Avatar" />
                        </div>
                    </div>
                    <div className="clients-foot">
                        <div>
                            <h2>12K+</h2>
                            <p>Happy clients</p>
                        </div>
                        <a href="#" style={{ fontSize: '0.875rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}>
                            View testimonials <ArrowRight size={14} />
                        </a>
                    </div>
                </div>

                <div className="stat-card-success">
                    <div className="circular-progress">
                        88%
                    </div>
                    <h4>Healing Success</h4>
                </div>
            </section>

            {/* Logos Strip */}
            <section className="logos-strip">
                <div style={{ fontWeight: 700, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Activity /> omada
                </div>
                <div style={{ fontWeight: 700, fontSize: '1.5rem' }}>Robinhood</div>
                <div style={{ fontWeight: 700, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ background: 'black', width: 20, height: 20, borderRadius: '50%' }}></span> samsara
                </div>
                <div style={{ fontWeight: 700, fontSize: '1.5rem', fontStyle: 'italic' }}>Firstbase</div>
                <div style={{ fontWeight: 700, fontSize: '1.5rem' }}>EXODUS</div>
            </section>

            {/* AI Symptom Checker Feature */}
            <section id="analyze" className="ai-section">
                <h2>Describe Your Symptoms</h2>
                <p>Our AI will guide you to the right specialist in seconds.</p>

                <div className="ai-input-wrapper">
                    <form onSubmit={handleAnalyze}>
                        <input
                            type="text"
                            placeholder="e.g. I have a severe headache and fever..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            disabled={loading}
                        />
                        <button type="submit" className="ai-submit-btn" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" /> : 'Analyze'}
                        </button>
                    </form>
                </div>

                {/* Results Area */}
                {resultData && (
                    <div style={{ marginTop: '3rem', textAlign: 'left' }}>
                        {resultData.error && (
                            <div style={{ backgroundColor: 'var(--color-danger-bg)', color: 'var(--color-danger)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-danger)' }}>
                                <strong>Error:</strong> {resultData.error}
                            </div>
                        )}
                        {resultData.isEmergency && <EmergencyAlert message={resultData.message} />}
                        {!resultData.isEmergency && !resultData.error && <SpecialistCard data={resultData} />}
                    </div>
                )}
            </section>

            {/* 4 Steps */}
            <section className="steps-section">
                <h2>4 Easy Steps And Get Your Solution</h2>
                <p style={{ color: 'var(--color-text-muted)' }}>Navigating Health Together: Your Trusted Medical Resource. Medicine Meets Technology.</p>

                <div className="steps-grid">
                    <div className="step-card">
                        <div className="step-icon"><Activity size={24} /></div>
                        <h3>1. Input Symptoms</h3>
                        <p>Tell us what's wrong in plain English.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-icon"><Stethoscope size={24} /></div>
                        <h3>2. AI Analysis</h3>
                        <p>Our engine finds the correct medical specialist.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-icon"><MapPin size={24} /></div>
                        <h3>3. Locate Clinics</h3>
                        <p>See nearby top-rated clinics matching the specialist.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default App
