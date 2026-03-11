import { useState } from 'react';
import { ArrowLeft, MapPin, Star, Phone, Calendar, Map as MapIcon } from 'lucide-react';
import { Footer } from '../components/ui/footer';

const doctors = [
    {
        id: 1,
        name: "Dr. Sarah Jenkins",
        specialty: "Cardiologist",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        clinic: "HeartCare Center",
        address: "123 Medical Blvd, Suite 200, New York, NY",
        rating: 4.9,
        reviews: 124,
        availability: "Available Today"
    },
    {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "Neurologist",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        clinic: "Neuro Spine Associates",
        address: "450 Health Way, Building B, Los Angeles, CA",
        rating: 4.8,
        reviews: 89,
        availability: "Next Available: Tomorrow"
    },
    {
        id: 3,
        name: "Dr. Emily Rodriguez",
        specialty: "Pediatrician",
        image: "https://images.unsplash.com/photo-1594824436998-dabc8d04bc12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        clinic: "Little Sparks Pediatrics",
        address: "789 Family Drive, Chicago, IL",
        rating: 5.0,
        reviews: 215,
        availability: "Available Today"
    },
    {
        id: 4,
        name: "Dr. James Wilson",
        specialty: "Dermatologist",
        image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        clinic: "Clear Skin Institute",
        address: "321 Derma Lane, Miami, FL",
        rating: 4.7,
        reviews: 156,
        availability: "Next Available: Thursday"
    },
    {
        id: 5,
        name: "Dr. Anita Patel",
        specialty: "Orthopedic Surgeon",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        clinic: "Joint & Bone Center",
        address: "555 Mobility Ave, Houston, TX",
        rating: 4.9,
        reviews: 302,
        availability: "Available Today"
    },
    {
        id: 6,
        name: "Dr. Robert Taylor",
        specialty: "General Practitioner",
        image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        clinic: "City Health Clinic",
        address: "888 Wellness Blvd, Seattle, WA",
        rating: 4.6,
        reviews: 420,
        availability: "Next Available: Next Week"
    }
];

export default function Doctors({ onNavigate }) {
    const [activeMap, setActiveMap] = useState(null);

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
                    <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Our Specialists</h1>
                    <div className="w-24"></div> {/* Spacer for centering */}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow w-full max-w-7xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight mb-4">Find your doctor</h2>
                    <p className="text-xl text-zinc-500 max-w-2xl">Connect with top-rated medical professionals in your area. Book appointments instantly with premium MediNova access.</p>
                </div>

                {/* Doctors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctors.map((doc) => (
                        <div key={doc.id} className="bg-white rounded-[2rem] p-6 shadow-xl shadow-zinc-200/50 border border-zinc-100 transition-transform hover:-translate-y-2 duration-300">
                            <div className="flex items-start gap-4 mb-6">
                                <img
                                    src={doc.image}
                                    alt={doc.name}
                                    className="w-24 h-24 rounded-2xl object-cover shadow-inner"
                                />
                                <div>
                                    <h3 className="text-xl font-bold text-zinc-900 leading-tight">{doc.name}</h3>
                                    <p className="text-blue-600 font-semibold text-sm mb-2">{doc.specialty}</p>
                                    <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                                        <Star size={14} className="fill-amber-500" />
                                        <span>{doc.rating}</span>
                                        <span className="text-zinc-400 font-medium ml-1">({doc.reviews} reviews)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 mb-8">
                                <div className="flex flex-col gap-1">
                                    <h4 className="font-bold text-zinc-900 text-sm flex items-center gap-2">
                                        {doc.clinic}
                                    </h4>
                                    <div className="flex items-start gap-2 text-zinc-500 text-sm w-full">
                                        <MapPin size={16} className="shrink-0 mt-0.5 text-blue-500" />
                                        <span className="leading-snug">{doc.address}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-zinc-100 pt-6">
                                <div className="flex items-center gap-2 text-sm font-semibold">
                                    <div className={`w-2 h-2 rounded-full ${doc.availability.includes('Today') ? 'bg-emerald-500' : 'bg-amber-400'}`}></div>
                                    <span className={doc.availability.includes('Today') ? 'text-emerald-600' : 'text-amber-600'}>
                                        {doc.availability}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setActiveMap(activeMap === doc.id ? null : doc.id)}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border flex items-center gap-1.5 ${activeMap === doc.id ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-white hover:bg-zinc-50 text-zinc-700 border-zinc-200'}`}
                                        title="View Clinic on Map"
                                    >
                                        <MapIcon size={16} />
                                        {activeMap === doc.id ? 'Hide' : 'Map'}
                                    </button>
                                    <button className="px-5 py-2 hover:bg-zinc-800 bg-zinc-900 text-white rounded-xl text-sm font-bold transition-all shadow-md">
                                        Book
                                    </button>
                                </div>
                            </div>

                            {/* Google Maps embed drop-down */}
                            {activeMap === doc.id && (
                                <div className="mt-6 rounded-xl overflow-hidden h-48 border border-zinc-200 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        style={{ border: 0 }}
                                        src={`https://maps.google.com/maps?width=100%&height=600&hl=en&q=${encodeURIComponent(doc.clinic + ' ' + doc.address)}&ie=UTF8&t=&z=14&iwloc=B&output=embed`}
                                        allowFullScreen>
                                    </iframe>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
