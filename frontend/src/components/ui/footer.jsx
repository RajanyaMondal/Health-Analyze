import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Input } from './input';
import { Button } from './button';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = ({
    logoSrc = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=256&h=256&fit=crop",
    companyName = 'SymptomMapper Inc.',
    description = 'Empowering your healthcare journey with intelligent symptom mapping and clinical connections.',
    usefulLinks = [
        { label: 'Find a Doctor', href: '#' },
        { label: 'AI Symptom Checker', href: '#analyze' },
        { label: 'Our Partner Clinics', href: '#' },
        { label: 'Privacy Policy', href: '#' },
    ],
    socialLinks = [
        { label: 'Facebook', href: '#', icon: <Facebook className="w-5 h-5" /> },
        { label: 'Instagram', href: '#', icon: <Instagram className="w-5 h-5" /> },
        { label: 'Twitter (X)', href: '#', icon: <Twitter className="w-5 h-5" /> },
    ],
    newsletterTitle = 'Subscribe to Health Tips',
    onSubscribe,
    className,
    ...props
}) => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [subscriptionStatus, setSubscriptionStatus] = useState('idle');

    const handleSubscribe = async (event) => {
        event.preventDefault();
        if (!email || isSubmitting) return;

        setIsSubmitting(true);

        // Simulate API call if none provided
        let success = true;
        if (onSubscribe) {
            success = await onSubscribe(email);
        } else {
            await new Promise((resolve) => setTimeout(resolve, 1500));
        }

        setSubscriptionStatus(success ? 'success' : 'error');
        setIsSubmitting(false);

        if (success) {
            setEmail('');
        }

        setTimeout(() => {
            setSubscriptionStatus('idle');
        }, 3000);
    };

    return (
        <footer className={cn('bg-[#111111] text-zinc-300 mt-20 border-t border-zinc-800', className)} {...props}>
            <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
                <div className="flex flex-col items-start gap-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                            <img src={logoSrc} alt={`${companyName} Logo`} className="h-6 w-6 object-contain" />
                        </div>
                        <span className="text-xl font-bold text-white">{companyName}</span>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
                </div>

                <div className="md:justify-self-center">
                    <h3 className="mb-4 text-base font-semibold text-white">Useful Links</h3>
                    <ul className="space-y-3">
                        {usefulLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className="text-sm text-zinc-400 transition-colors hover:text-white"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="md:justify-self-center">
                    <h3 className="mb-4 text-base font-semibold text-white">Follow Us</h3>
                    <ul className="space-y-3">
                        {socialLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    aria-label={link.label}
                                    className="flex items-center gap-3 text-sm text-zinc-400 transition-colors hover:text-white"
                                >
                                    {link.icon}
                                    <span>{link.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="mb-4 text-base font-semibold text-white">{newsletterTitle}</h3>
                    <form onSubmit={handleSubscribe} className="relative w-full max-w-sm">
                        <div className="relative flex items-center">
                            <input
                                type="email"
                                placeholder="Your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isSubmitting || subscriptionStatus !== 'idle'}
                                required
                                aria-label="Email for newsletter"
                                className="w-full bg-transparent border border-zinc-700 rounded-lg py-3 px-4 pr-32 text-sm text-white focus:outline-none focus:border-zinc-500"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting || subscriptionStatus !== 'idle'}
                                className="absolute right-1 top-1 bottom-1 bg-white text-black font-medium rounded-md px-4 text-sm hover:bg-zinc-200 transition-colors"
                            >
                                {isSubmitting ? '...' : 'Subscribe'}
                            </button>
                        </div>
                        {(subscriptionStatus === 'success' || subscriptionStatus === 'error') && (
                            <div
                                key={subscriptionStatus}
                                className="animate-in fade-in absolute inset-0 flex items-center justify-center rounded-lg bg-background/80 text-center backdrop-blur-sm"
                            >
                                {subscriptionStatus === 'success' ? (
                                    <span className="font-semibold text-green-500">Subscribed! 🎉</span>
                                ) : (
                                    <span className="font-semibold text-destructive">Failed. Try again.</span>
                                )}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </footer>
    );
};
