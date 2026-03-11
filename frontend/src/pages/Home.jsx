import { useState, useEffect } from 'react'
import { Activity, ArrowRight, Play, Stethoscope, User, MapPin, Loader2 } from 'lucide-react'
import { analyzeSymptom, getNearbyClinics } from '../services/api'
import SpecialistCard from '../components/SpecialistCard'
import EmergencyAlert from '../components/EmergencyAlert'
import { Footer } from '../components/ui/footer'
import { ContainerScroll } from '../components/ui/container-scroll-animation'
import SmartOrganDiagnosis from '../components/SmartOrganDiagnosis'
import { PricingCard } from '../components/ui/dark-gradient-pricing'
import { FeaturesSectionWithHoverEffects } from '../components/ui/feature-section-with-hover-effects'
export default function Home({ onNavigate }) {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedName = localStorage.getItem('userName');
        if (token) {
            setIsLoggedIn(true);
            if (storedName) setUserName(storedName);
        }
    }, []);

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
            <header className="navbar border-b border-zinc-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="logo flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
                    <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-600/20">
                        <Activity className="logo-icon text-white" size={24} />
                    </div>
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 tracking-tight">MediNova</h1>
                </div>
                <nav className="nav-links">
                    <a href="#" className="hover:text-blue-600 font-medium text-zinc-600 transition-colors">About</a>
                    <button onClick={() => onNavigate('doctors')} className="hover:text-blue-600 font-medium text-zinc-600 transition-colors">Doctor</button>
                    <button onClick={() => onNavigate('pricing')} className="hover:text-blue-600 font-medium text-zinc-600 transition-colors">Pricing & FAQ</button>
                    <button onClick={() => onNavigate('contact')} className="hover:text-blue-600 font-medium text-zinc-600 transition-colors">Contact</button>
                </nav>
                <div className="nav-actions flex items-center gap-4">
                    {isLoggedIn ? (
                        <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-100 rounded-full pl-4 pr-1 py-1 shadow-sm">
                            {userName && <span className="text-sm font-bold text-zinc-700 tracking-tight hidden sm:block truncate max-w-[120px]">Hi, {userName.split(' ')[0]}</span>}
                            <button
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('userName');
                                    setIsLoggedIn(false);
                                    setUserName('');
                                }}
                                className="p-2 rounded-full bg-white hover:bg-zinc-100 text-zinc-700 transition-colors border border-zinc-200 shadow-sm"
                                title="Sign out"
                            >
                                <User size={18} />
                            </button>
                        </div>
                    ) : (
                        <>
                            <button onClick={() => onNavigate('login')} className="btn btn-outline flex items-center gap-2 hover:-translate-y-0.5 transition-transform"><User size={18} /> Login</button>
                            <button onClick={() => onNavigate('login')} className="btn btn-primary hover:-translate-y-0.5 transition-transform shadow-blue-600/30">Create an account</button>
                        </>
                    )}
                </div>
            </header>

            {/* Hero Scroll Animation */}
            <div className="flex flex-col bg-zinc-50 overflow-hidden relative">
                {/* Background ambient light */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none"></div>

                <ContainerScroll
                    titleComponent={
                        <>
                            <h1 className="text-4xl md:text-6xl font-semibold text-black mb-4">
                                Navigating Health Together <br />
                                <span className="text-5xl md:text-[6rem] font-bold mt-1 leading-none bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                                    Medicine Meets Tech
                                </span>
                            </h1>
                            <p className="text-xl text-zinc-500 max-w-2xl mx-auto mb-8">
                                Your Trusted Medical Resource and AI Symptom Checker. Empowering Lives Through Health.
                            </p>
                            <a href="#analyze" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 shadow-xl shadow-blue-600/30 transition-all hover:-translate-y-1">
                                Get started now <ArrowRight size={20} />
                            </a>
                        </>
                    }
                >
                    <img
                        src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80"
                        alt="Medical Dashboard Hero"
                        className="mx-auto rounded-2xl object-cover h-full object-center w-full"
                        draggable={false}
                    />
                </ContainerScroll>
            </div>

            {/* Stats / Dashboard Link Row */}
            <section className="w-full max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer group" onClick={() => onNavigate('dashboard')}>
                    {/* Left Intro Card */}
                    <div className="flex flex-col justify-center p-8 bg-white rounded-3xl border border-zinc-100 shadow-sm group-hover:shadow-md transition-all">
                        <h3 className="text-2xl font-bold text-zinc-900 mb-2 mt-4 flex flex-col">
                            <span>Your Bridge to Better Health</span>
                            <span className="text-zinc-400 text-lg font-medium mt-1">Start Your Journey Today</span>
                        </h3>
                        <p className="text-zinc-500 mb-8 font-medium">Medicine Meets Technology. Your Online Health Hub.</p>
                        <div className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors self-start shadow-md shadow-blue-600/20">
                            Track Your Health <Play size={14} className="ml-1" />
                        </div>
                    </div>

                    {/* Middle Clients Card */}
                    <div className="flex flex-col justify-between p-8 bg-zinc-50/80 rounded-[2rem] border border-zinc-100 group-hover:bg-zinc-100/80 transition-colors">
                        <div className="flex items-start justify-between">
                            <h4 className="font-bold text-zinc-900 text-lg">Our Clients</h4>
                            <div className="flex -space-x-3">
                                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                                <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                            </div>
                        </div>
                        <div className="flex items-end justify-between mt-12 w-full">
                            <div>
                                <h2 className="text-[2.75rem] font-extrabold text-blue-500 tracking-tighter leading-none mb-1">12K+</h2>
                                <p className="text-zinc-500 font-medium text-sm">Happy clients</p>
                            </div>
                            <div className="flex items-center gap-1 text-sm font-bold text-zinc-800 hover:text-blue-600 transition-colors">
                                View testimonials <ArrowRight size={14} />
                            </div>
                        </div>
                    </div>

                    {/* Right Success Card */}
                    <div className="flex flex-col items-center justify-center p-8 bg-zinc-50/80 rounded-[2rem] border border-zinc-100 group-hover:bg-zinc-100/80 transition-colors">
                        <div className="relative w-36 h-36 mb-6">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="12" fill="none" className="drop-shadow-sm" />
                                <circle cx="50" cy="50" r="40" stroke="#3b82f6" strokeWidth="12" fill="none" strokeDasharray="251.2" strokeDashoffset="30.14" strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-3xl font-extrabold text-zinc-900">88%</span>
                            </div>
                        </div>
                        <h4 className="text-lg font-medium text-zinc-800">Healing Success</h4>
                    </div>
                </div>
                {isLoggedIn && (
                    <div className="text-center mt-4">
                        <p className="text-sm font-medium text-blue-600 bg-blue-50 inline-block px-4 py-1.5 rounded-full">Click these cards to view your Patient Dashboard & Track Symptoms!</p>
                    </div>
                )}
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

            <SmartOrganDiagnosis />

            {/* AI Symptom Checker Feature */}
            <section id="analyze" className="ai-section">
                <h2>{userName ? `Hi, ${userName.split(' ')[0]}! Describe Your Symptoms` : 'Describe Your Symptoms'}</h2>
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
                    <div className="w-full flex flex-col items-center mt-12">
                        {resultData.error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 w-full max-w-[800px] text-left">
                                <strong>Error:</strong> {resultData.error}
                            </div>
                        )}
                        {resultData.isEmergency && (
                            <div className="w-full max-w-[800px]">
                                <EmergencyAlert message={resultData.message} />
                            </div>
                        )}
                        {!resultData.isEmergency && !resultData.error && (
                            <div className="w-full max-w-[800px] text-left">
                                <SpecialistCard data={resultData} />
                            </div>
                        )}
                    </div>
                )}
            </section>

            {/* Features Section */}
            <section className="w-full bg-white pt-24 pb-16 border-t border-zinc-100">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">Everything you need</h2>
                    <p className="text-lg text-zinc-500 mt-4 max-w-2xl mx-auto">Navigating Health Together: Your Trusted Medical Resource. Medicine Meets Technology.</p>
                </div>
                <FeaturesSectionWithHoverEffects />
            </section>

            <Footer />
        </div>
    )
}
