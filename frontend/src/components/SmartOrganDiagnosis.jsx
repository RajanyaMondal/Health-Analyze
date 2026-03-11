import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { analyzeSymptom, getNearbyClinics } from '../services/api';
import SpecialistCard from './SpecialistCard';
import EmergencyAlert from './EmergencyAlert';
import RadialOrbitalTimeline from './ui/radial-orbital-timeline';

export default function SmartOrganDiagnosis() {
    const [selectedOrgan, setSelectedOrgan] = useState(null);
    const [symptomText, setSymptomText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const timelineData = [
        { id: 1, title: 'Brain', date: '', content: 'Neurology Department', category: 'Neurology', icon: '/brain.png', relatedIds: [4, 5], status: 'completed', energy: 80, originalData: { id: 'brain', name: 'Brain', spec: 'Neurologist', btn: 'Find Neurologists', image: '/brain.png', chips: ['Headache', 'Dizziness', 'Memory Loss'] } },
        { id: 2, title: 'Lungs', date: '', content: 'Pulmonology Department', category: 'Pulmonology', icon: '/lungs.png', relatedIds: [4], status: 'pending', energy: 60, originalData: { id: 'lungs', name: 'Lungs', spec: 'Pulmonologist', btn: 'Find Lung Doctors', image: '/lungs.png', chips: ['Shortness of breath', 'Chronic Cough', 'Wheezing'] } },
        { id: 3, title: 'Eyes', date: '', content: 'Ophthalmology Department', category: 'Ophthalmology', icon: '/eyes.png', relatedIds: [1], status: 'in-progress', energy: 90, originalData: { id: 'eyes', name: 'Eyes', spec: 'Ophthalmologist', btn: 'Find Eye Doctors', image: '/eyes.png', chips: ['Blurry vision', 'Eye pain', 'Redness'] } },
        { id: 4, title: 'Heart', date: '', content: 'Cardiology Department', category: 'Cardiology', icon: '/heart.png', relatedIds: [2], status: 'completed', energy: 100, originalData: { id: 'heart', name: 'Heart', spec: 'Cardiologist', btn: 'Find Cardiologists', image: '/heart.png', chips: ['Chest pain', 'Palpitations', 'High blood pressure'] } },
        { id: 5, title: 'Stomach', date: '', content: 'Gastroenterology Department', category: 'Gastroenterology', icon: '/stomach.png', relatedIds: [], status: 'in-progress', energy: 70, originalData: { id: 'stomach', name: 'Stomach', spec: 'Gastroenterologist', btn: 'Find GI Specialists', image: '/stomach.png', chips: ['Abdominal pain', 'Acid reflux', 'Nausea'] } },
        { id: 6, title: 'Bones', date: '', content: 'Orthopedics Department', category: 'Orthopedics', icon: '/bones.png', relatedIds: [1, 4], status: 'pending', energy: 50, originalData: { id: 'bones', name: 'Bones & Joints', spec: 'Orthopedic Doctor', btn: 'Find Orthopedic Doctors', image: '/bones.png', chips: ['Joint pain', 'Back pain', 'Fracture'] } },
    ];

    const handleNodeClick = (organData) => {
        if (!organData) return;
        setSelectedOrgan(organData);
        setSymptomText('');
        setResult(null);
    };

    const closeModal = () => {
        setSelectedOrgan(null);
        setSymptomText('');
        setResult(null);
    };

    const handleAnalyze = async (e) => {
        e?.preventDefault();
        if (!symptomText) return;
        setLoading(true);
        try {
            const combinedQuery = `[Organ: ${selectedOrgan.name}] ${symptomText}`;
            const data = await analyzeSymptom(combinedQuery);

            let resolvedData = data;
            if (!data || data.error) {
                resolvedData = {
                    specialist: selectedOrgan.spec,
                    isEmergency: false,
                    message: "Based on your input, you should consult an expert.",
                    explanation: `You have reported issues related to your ${selectedOrgan.name}. A ${selectedOrgan.spec} is the correct specialist to diagnose and treat these conditions.`,
                    commonTreatments: ["Comprehensive Evaluation", "Imaging scans", "Targeted medication"]
                }
            }

            const fetchClinics = async (lat, lng) => {
                try {
                    const mappedSpecialist = resolvedData.specialist || selectedOrgan.spec;
                    const clinics = await getNearbyClinics(mappedSpecialist, lat, lng);
                    setResult({ ...resolvedData, specialist: mappedSpecialist, clinics });
                } catch (error) {
                    setResult({ ...resolvedData, specialist: resolvedData.specialist || selectedOrgan.spec, clinics: [], error: "Could not fetch nearby clinics." });
                }
                setLoading(false);
            };

            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => fetchClinics(position.coords.latitude, position.coords.longitude),
                    (error) => fetchClinics(40.7128, -74.0060),
                    { timeout: 5000, maximumAge: 60000 }
                );
            } else {
                fetchClinics(40.7128, -74.0060);
            }
        } catch (err) {
            console.error(err);
            setResult({ error: "Analysis engine unreachable." });
            setLoading(false);
        }
    };

    return (
        <section className="py-20 bg-zinc-950 border-t border-zinc-900 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-zinc-950 to-zinc-950"></div>
            <div className="container mx-auto px-4 relative z-10 w-full">
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Interactive Organ Map</h2>
                    <p className="text-lg text-blue-200/60">Click on an organ node in the orbital timeline to begin an AI-guided diagnosis for specific symptoms.</p>
                </div>

                <div className="w-full flex items-center justify-center">
                    <RadialOrbitalTimeline timelineData={timelineData} onNodeClick={handleNodeClick} />
                </div>
            </div>

            {/* Modal Overlay */}
            {selectedOrgan && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm transition-opacity">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="flex items-center gap-4 border-b border-zinc-100 p-6 sticky top-0 bg-white/95 backdrop-blur z-10">
                            <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl border border-blue-100">
                                <img src={selectedOrgan.image} alt={selectedOrgan.name} className="w-10 h-10 object-contain mix-blend-multiply drop-shadow-sm" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-zinc-900">Diagnosing {selectedOrgan.name}</h3>
                                <p className="text-sm text-zinc-500">Our AI assistant will guide you</p>
                            </div>
                            <button onClick={closeModal} className="p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6">
                            {!result ? (
                                <div>
                                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 text-sm text-blue-800 font-medium leading-relaxed">
                                        Hi! I'm your AI health assistant. Please describe the symptoms you are experiencing related to your <strong>{selectedOrgan.name.toLowerCase()}</strong>.
                                    </div>

                                    <form onSubmit={handleAnalyze}>
                                        <textarea
                                            className="w-full border border-zinc-200 rounded-xl p-4 mb-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none shadow-sm text-zinc-800 placeholder:text-zinc-400"
                                            placeholder={`e.g. ${selectedOrgan.chips[0]}...`}
                                            value={symptomText}
                                            onChange={(e) => setSymptomText(e.target.value)}
                                            disabled={loading}
                                        />

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {selectedOrgan.chips.map(chip => (
                                                <button
                                                    key={chip}
                                                    type="button"
                                                    onClick={() => setSymptomText(chip)}
                                                    className="bg-zinc-100 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 border border-transparent text-zinc-600 font-medium text-xs px-4 py-2 rounded-full transition-all duration-200"
                                                >
                                                    {chip}
                                                </button>
                                            ))}
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading || !symptomText}
                                            className="w-full bg-blue-600 text-white font-semibold py-3.5 rounded-xl hover:bg-blue-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex justify-center items-center shadow-md border border-blue-500 gap-2"
                                        >
                                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Analyze Symptoms'}
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div>
                                    {result.error && (
                                        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 mb-6 font-medium">
                                            {result.error}
                                        </div>
                                    )}
                                    {result.isEmergency && <div className="mb-6"><EmergencyAlert message={result.message} /></div>}

                                    {!result.error && (
                                        <>
                                            <div className="mb-6">
                                                <SpecialistCard data={result} />
                                            </div>
                                            <button
                                                onClick={() => {
                                                    setResult(null);
                                                    setSymptomText('');
                                                }}
                                                className="w-full border-2 border-zinc-200 text-zinc-600 font-bold py-3.5 rounded-xl hover:bg-zinc-50 hover:border-zinc-300 transition-all"
                                            >
                                                Start Over
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
