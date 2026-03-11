import { cn } from "../../lib/utils"

export const PricingCard = ({
    tier,
    price,
    period = "per month",
    benefits,
    isPopular = false,
}) => {
    return (
        <div
            className={cn(
                "relative flex w-full max-w-[340px] flex-col items-center bg-white transition-all duration-300 mx-auto",
                isPopular
                    ? "z-10 shadow-[0_20px_60px_rgba(109,40,217,0.3)] rounded-2xl py-14 md:scale-110"
                    : "z-0 shadow-xl rounded-2xl py-10 md:scale-100 border border-zinc-100"
            )}
        >
            {/* The curved header background */}
            <div className="absolute top-0 w-full h-[180px] z-0 overflow-hidden rounded-t-2xl">
                <div className={cn(
                    "absolute w-[200%] h-[260px] left-[-50%] top-[-100px] rounded-[50%]",
                    isPopular ? "bg-gradient-to-br from-[#771ec8] to-[#5910a3]" : "bg-zinc-100/70"
                )}></div>
            </div>

            {/* Content Header */}
            <div className="relative z-10 flex flex-col items-center pt-2 w-full mb-8">
                <h3 className={cn("text-xs font-bold tracking-widest uppercase mb-4", isPopular ? "text-white" : "text-[#771ec8]")}>{tier}</h3>
                <div className="flex items-start justify-center">
                    <span className={cn("text-2xl font-bold mt-1 mr-1", isPopular ? "text-white" : "text-[#771ec8]")}>$</span>
                    <span className={cn("text-6xl font-extrabold tracking-tighter", isPopular ? "text-white" : "text-[#771ec8]")}>{price}</span>
                </div>
                <p className={cn("text-xs font-semibold mt-1", isPopular ? "text-purple-200" : "text-purple-400")}>{period}</p>
            </div>

            {/* Features list */}
            <div className="relative z-10 flex flex-col items-center space-y-4 w-full px-6 mb-12 flex-grow mt-6">
                {benefits.map((b, index) => (
                    <span key={index} className="text-[13px] font-medium text-slate-500 text-center tracking-wide">
                        {b.text}
                    </span>
                ))}
            </div>

            {/* Action Button */}
            <div className="relative z-10 mt-auto pb-2">
                <button
                    className={cn(
                        "px-10 py-[14px] rounded-full text-xs font-bold uppercase tracking-widest transition-transform hover:-translate-y-1 shadow-sm",
                        isPopular
                            ? "bg-[#6c14b8] text-white shadow-xl shadow-[#771ec8]/30 hover:bg-[#5910a3]"
                            : "bg-white text-[#771ec8] border-2 border-[#d9b8fc] hover:border-[#771ec8] hover:bg-purple-50"
                    )}
                >
                    Select Plan
                </button>
            </div>
        </div>
    )
}
