import { cn } from "../../lib/utils";
import {
    IconStethoscope,
    IconMapPin,
    IconHeartbeat,
    IconClock24,
    IconShieldLock,
    IconCalendarEvent,
    IconAlertTriangle,
    IconUsersGroup,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
    const features = [
        {
            title: "AI Symptom Analysis",
            description: "Our advanced intelligence maps your symptoms to exact medical specialties instantly.",
            icon: <IconStethoscope />,
        },
        {
            title: "Instant Clinic Locator",
            description: "Find the top-rated specialist clinics nearest to you in real-time.",
            icon: <IconMapPin />,
        },
        {
            title: "Telehealth Ready",
            description: "Connect with certified professionals from the comfort of your home.",
            icon: <IconHeartbeat />,
        },
        {
            title: "24/7 Availability",
            description: "Healthcare guidance doesn't sleep. Our assistant is available around the clock.",
            icon: <IconClock24 />,
        },
        {
            title: "Secure & Private",
            description: "Your health data is locked down with end-to-end HIPAA-compliant encryption.",
            icon: <IconShieldLock />,
        },
        {
            title: "Priority Booking",
            description: "Skip the waiting room. Book appointments directly from your dashboard.",
            icon: <IconCalendarEvent />,
        },
        {
            title: "Emergency Alerts",
            description: "Immediate guidance and high-visibility alerts if critical symptoms are detected.",
            icon: <IconAlertTriangle />,
        },
        {
            title: "Family Coverage",
            description: "Manage health records and appointments for up to 5 family members easily.",
            icon: <IconUsersGroup />,
        },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto font-['Inter'] bg-white">
            {features.map((feature, index) => (
                <Feature key={feature.title} {...feature} index={index} />
            ))}
        </div>
    );
}

const Feature = ({
    title,
    description,
    icon,
    index,
}) => {
    return (
        <div
            className={cn(
                "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
                (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
                index < 4 && "lg:border-b dark:border-neutral-800"
            )}
        >
            {index < 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-blue-50/50 to-transparent pointer-events-none" />
            )}
            {index >= 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-blue-50/50 to-transparent pointer-events-none" />
            )}
            <div className="mb-4 relative z-10 px-10 text-blue-600">
                {icon}
            </div>
            <div className="text-lg font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-zinc-200 group-hover/feature:bg-blue-600 transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-zinc-900">
                    {title}
                </span>
            </div>
            <p className="text-sm text-zinc-500 max-w-xs relative z-10 px-10 font-medium">
                {description}
            </p>
        </div>
    );
};
