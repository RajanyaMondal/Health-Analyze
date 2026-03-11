import { useState, useEffect } from 'react';
import { ArrowLeft, Activity, Calendar, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Footer } from '../components/ui/footer';

export default function Dashboard({ onNavigate }) {
    const [userName, setUserName] = useState('Patient');
    const [symptomsHistory, setSymptomsHistory] = useState([
        { id: 1, date: 'Oct 24, 2023', symptom: 'Severe headache and nausea', prediction: 'Neurology', status: 'Consulted' },
        { id: 2, date: 'Nov 12, 2023', symptom: 'Sharp pain in lower back', prediction: 'Orthopedics', status: 'Pending' },
        { id: 3, date: 'Jan 05, 2024', symptom: 'Continuous coughing and mild fever', prediction: 'General Medicine', status: 'Recovering' },
    ]);

    useEffect(() => {
        const storedName = localStorage.getItem('userName');
        if (storedName) {
            setUserName(storedName);
        }
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Consulted': return 'bg-emerald-100 text-emerald-700';
            case 'Pending': return 'bg-amber-100 text-amber-700';
            case 'Recovering': return 'bg-blue-100 text-blue-700';
            default: return 'bg-zinc-100 text-zinc-700';
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 font-['Inter'] flex flex-col w-full relative">

            {/* Header / Navbar */}
            <header className="w-full bg-white/80 backdrop-blur-xl border-b border-zinc-100 sticky top-0 z-50 p-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => onNavigate && onNavigate('home')}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-all font-bold text-sm shadow-sm"
                    >
                        <ArrowLeft size={18} /> <span className="hidden sm:inline">Back to Home</span>
                    </button>
                    <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Patient Dashboard</h1>
                    <div className="w-24"></div> {/* Spacer for centering */}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-12">

                {/* Greeting Section */}
                <div className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-xl shadow-blue-900/10 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
                    <div className="relative z-10 space-y-2 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Welcome back, {userName}!</h2>
                        <p className="text-blue-100 text-lg font-medium">Here is a summary of your health tracking and symptom history.</p>
                    </div>
                    <div className="relative z-10 flex gap-4">
                        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                            <div className="text-3xl font-black mb-1">3</div>
                            <div className="text-sm text-blue-100 font-semibold tracking-wide uppercase">Records</div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20">
                            <div className="text-3xl font-black mb-1">88%</div>
                            <div className="text-sm text-blue-100 font-semibold tracking-wide uppercase">Health Score</div>
                        </div>
                    </div>
                </div>

                {/* Symptom Tracking Section */}
                <div className="bg-white rounded-3xl p-8 border border-zinc-100 shadow-sm mb-12">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl font-bold text-zinc-900">Your Health Log</h3>
                            <p className="text-zinc-500 font-medium mt-1">Tracked symptoms and AI predictions over time.</p>
                        </div>
                        <button onClick={() => onNavigate('home')} className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-sm font-bold transition-all shadow-md flex items-center gap-2">
                            <Activity size={16} /> New Check
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {symptomsHistory.map((item) => (
                            <div key={item.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-zinc-50 rounded-2xl border border-zinc-100 hover:border-blue-200 hover:shadow-md transition-all group">
                                <div className="flex items-start gap-4 mb-4 md:mb-0">
                                    <div className="bg-white p-3 rounded-xl shadow-sm group-hover:bg-blue-50 transition-colors hidden sm:block">
                                        <Activity className="text-blue-600" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-zinc-900 leading-tight mb-1">{item.symptom}</h4>
                                        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-zinc-500">
                                            <span className="flex items-center gap-1.5"><Calendar size={14} /> {item.date}</span>
                                            <span className="flex items-center gap-1.5 text-blue-600"><CheckCircle2 size={14} /> Predicted: {item.prediction}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between w-full md:w-auto gap-4 mt-2 md:mt-0 pt-4 md:pt-0 border-t border-zinc-200 md:border-t-0">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(item.status)}`}>
                                        {item.status}
                                    </span>
                                    <button className="text-sm font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4 hidden sm:block">View Details</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
