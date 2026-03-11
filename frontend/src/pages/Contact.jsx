import { ArrowLeft, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Footer } from '../components/ui/footer';
import { useState } from 'react';

export default function Contact({ onNavigate }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate a network request
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
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
                    <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Contact Us</h1>
                    <div className="w-24"></div> {/* Spacer for centering */}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight mb-4">Get in touch</h2>
                    <p className="text-xl text-zinc-500 max-w-2xl mx-auto">We'd love to hear from you. Please fill out this form or shoot us an email.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

                    {/* Contact Information */}
                    <div className="space-y-10">
                        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-zinc-200/50 border border-zinc-100">
                            <h3 className="text-2xl font-bold text-zinc-900 mb-8">Contact Information</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                        <Mail className="text-blue-600" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-zinc-900">Email</h4>
                                        <p className="text-zinc-500 font-medium">Our friendly team is here to help.</p>
                                        <a href="mailto:support@medinova.com" className="font-bold text-blue-600 hover:text-blue-700 transition-colors mt-1 inline-block">support@medinova.com</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                        <MapPin className="text-blue-600" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-zinc-900">Office</h4>
                                        <p className="text-zinc-500 font-medium">Come say hello at our headquarters.</p>
                                        <p className="font-bold text-zinc-700 mt-1">100 Tech Lane, Suite 400<br />San Francisco, CA 94105</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                        <Phone className="text-blue-600" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-zinc-900">Phone</h4>
                                        <p className="text-zinc-500 font-medium">Mon-Fri from 8am to 5pm.</p>
                                        <a href="tel:+18005550199" className="font-bold text-blue-600 hover:text-blue-700 transition-colors mt-1 inline-block">+1 (800) 555-0199</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-zinc-200/50 border border-zinc-100 relative overflow-hidden">
                        {isSuccess && (
                            <div className="absolute top-0 left-0 w-full bg-emerald-500 text-white p-4 text-center font-bold flex items-center justify-center gap-2 animate-in slide-in-from-top-full duration-300 z-10">
                                <span>Message sent successfully! We'll get back to you soon.</span>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6 flex flex-col pt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2 text-left w-full">
                                    <label htmlFor="name" className="text-sm font-bold text-zinc-900">First name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="flex h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 shadow-sm transition-colors placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div className="space-y-2 text-left w-full">
                                    <label htmlFor="email" className="text-sm font-bold text-zinc-900">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="flex h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 shadow-sm transition-colors placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="jane@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 text-left w-full">
                                <label htmlFor="subject" className="text-sm font-bold text-zinc-900">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    className="flex h-12 w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 shadow-sm transition-colors placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div className="space-y-2 text-left w-full">
                                <label htmlFor="message" className="text-sm font-bold text-zinc-900">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="flex min-h-[150px] w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm transition-colors placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                    placeholder="Leave us a message..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70 mt-4"
                            >
                                {isSubmitting ? 'Sending...' : (
                                    <>Send message <Send size={18} /></>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
