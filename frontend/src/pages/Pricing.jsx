import { useState } from 'react';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import { PricingCard } from '../components/ui/dark-gradient-pricing';
import { Footer } from '../components/ui/footer';

export default function Pricing({ onNavigate }) {
    const [openFaq, setOpenFaq] = useState(null);

    const faqs = [
        { q: "How accurate is the AI Diagnosis Assistant?", a: "Our AI is trained on vast medical databases and provides highly accurate mappings to medical specialties based on your described symptoms. However, it does not replace a professional medical diagnosis." },
        { q: "Is my medical data secure?", a: "Yes. We use end-to-end encryption and comply with all major healthcare data protection regulations including HIPAA. Your symptom queries are strictly confidential." },
        { q: "Can I book an appointment directly through MediNova?", a: "Yes, our platform connects directly with localized clinics, allowing premium members to book priority appointments instantly from the dashboard." },
        { q: "What happens if I report a medical emergency?", a: "Our AI is programmed to detect critical keywords (like severe chest pain). If an emergency is suspected, it immediately triggers high-visibility alerts instructing you to call emergency services or visit the nearest ER." }
    ];

    return (
        <div className="min-h-screen bg-zinc-50 font-['Inter'] flex flex-col w-full relative overflow-hidden">

            {/* Background Violet Curve */}
            <div className="absolute top-0 right-[-10%] w-[90%] md:w-[70%] h-[550px] bg-[#8123d6] pointer-events-none z-0 shadow-2xl" style={{ borderBottomLeftRadius: '100% 90%' }}></div>
            <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[400px] bg-white pointer-events-none z-0 rounded-full blur-[80px]"></div>

            <header className="w-full bg-transparent sticky top-0 z-50 p-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <button
                        onClick={() => onNavigate && onNavigate('home')}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 hover:bg-white text-zinc-800 transition-all font-bold text-sm backdrop-blur-md shadow-lg"
                    >
                        <ArrowLeft size={18} /> <span className="hidden sm:inline">Back to Home</span>
                    </button>
                    <div className="w-24"></div> {/* Spacer for centering */}
                </div>
            </header>

            {/* Pricing Section */}
            <section className="w-full relative pt-12 pb-32 px-6 font-['Inter'] z-10 flex-grow">
                <div className="mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 mt-8">
                        <PricingCard
                            tier="Basic"
                            price="10.90"
                            benefits={[
                                { text: "50GB Storage" },
                                { text: "Bandwidth 10 GB" },
                                { text: "Up to 3 Databases" },
                                { text: "E-mail accounts YES" },
                                { text: "Up to 10 free SMS" },
                            ]}
                        />
                        <PricingCard
                            tier="Startup"
                            price="79.90"
                            isPopular={true}
                            benefits={[
                                { text: "500GB Storage" },
                                { text: "Bandwidth 45 GB" },
                                { text: "Up to 15 Databases" },
                                { text: "E-mail accounts YES" },
                                { text: "Up to 150 free SMS" },
                            ]}
                        />
                        <PricingCard
                            tier="Enterprise"
                            price="400.90"
                            benefits={[
                                { text: "Unlimited Storage" },
                                { text: "Unlimited Bandwidth" },
                                { text: "Up to 90 Databases" },
                                { text: "E-mail accounts YES" },
                                { text: "Up to 500 free SMS" },
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* Minimal Dropdown FAQ Section */}
            <section className="w-full py-24 px-6 bg-white shrink-0 relative z-10 border-t border-zinc-100">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
                        <p className="text-lg text-zinc-500">Everything you need to know about our services.</p>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="border border-zinc-200 rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:border-[#8123d6]/30 shadow-sm hover:shadow-md"
                            >
                                <button
                                    className="w-full px-6 py-5 flex items-center justify-between focus:outline-none"
                                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                >
                                    <h3 className="text-lg font-bold text-zinc-900 text-left pr-4">{faq.q}</h3>
                                    <ChevronDown
                                        className={`text-zinc-400 shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-[#8123d6]' : ''}`}
                                        size={20}
                                    />
                                </button>
                                <div
                                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                                >
                                    <p className="text-zinc-600 font-medium leading-relaxed">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
