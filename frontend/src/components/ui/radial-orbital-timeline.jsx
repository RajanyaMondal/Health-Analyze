import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { cn } from "../../lib/utils";

export default function RadialOrbitalTimeline({
    timelineData,
    onNodeClick
}) {
    const [expandedItems, setExpandedItems] = useState({});
    const [viewMode, setViewMode] = useState("orbital");
    const [rotationAngle, setRotationAngle] = useState(0);
    const [autoRotate, setAutoRotate] = useState(true);
    const [pulseEffect, setPulseEffect] = useState({});
    const [centerOffset, setCenterOffset] = useState({ x: 0, y: 0 });
    const [activeNodeId, setActiveNodeId] = useState(null);
    const containerRef = useRef(null);
    const orbitRef = useRef(null);
    const nodeRefs = useRef({});

    const handleContainerClick = (e) => {
        if (e.target === containerRef.current || e.target === orbitRef.current) {
            setExpandedItems({});
            setActiveNodeId(null);
            setPulseEffect({});
            setAutoRotate(true);
        }
    };

    const toggleItem = (id, event) => {
        if (event) event.stopPropagation();

        // Call the original app's modal triggering
        const clickedItem = timelineData.find((t) => t.id === id);
        if (onNodeClick && clickedItem) {
            onNodeClick(clickedItem.originalData);
        }

        setExpandedItems((prev) => {
            const newState = { ...prev };
            Object.keys(newState).forEach((key) => {
                if (parseInt(key) !== id) {
                    newState[parseInt(key)] = false;
                }
            });

            newState[id] = !prev[id];

            if (!prev[id]) {
                setActiveNodeId(id);
                setAutoRotate(false);

                const relatedItems = getRelatedItems(id);
                const newPulseEffect = {};
                relatedItems.forEach((relId) => {
                    newPulseEffect[relId] = true;
                });
                setPulseEffect(newPulseEffect);

                centerViewOnNode(id);
            } else {
                setActiveNodeId(null);
                setAutoRotate(true);
                setPulseEffect({});
            }

            return newState;
        });
    };

    useEffect(() => {
        let rotationTimer;

        if (autoRotate && viewMode === "orbital") {
            rotationTimer = setInterval(() => {
                setRotationAngle((prev) => {
                    const newAngle = (prev + 0.3) % 360;
                    return Number(newAngle.toFixed(3));
                });
            }, 50);
        }

        return () => {
            if (rotationTimer) {
                clearInterval(rotationTimer);
            }
        };
    }, [autoRotate, viewMode]);

    const centerViewOnNode = (nodeId) => {
        if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

        const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
        const totalNodes = timelineData.length;
        const targetAngle = (nodeIndex / totalNodes) * 360;

        setRotationAngle(270 - targetAngle);
    };

    const calculateNodePosition = (index, total) => {
        const angle = ((index / total) * 360 + rotationAngle) % 360;
        const radius = window.innerWidth < 768 ? 140 : 250;
        const radian = (angle * Math.PI) / 180;

        const x = radius * Math.cos(radian) + centerOffset.x;
        const y = radius * Math.sin(radian) + centerOffset.y;

        const zIndex = Math.round(100 + 50 * Math.cos(radian));
        const opacity = Math.max(
            0.4,
            Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
        );

        return { x, y, angle, zIndex, opacity };
    };

    const getRelatedItems = (itemId) => {
        const currentItem = timelineData.find((item) => item.id === itemId);
        return currentItem ? currentItem.relatedIds : [];
    };

    const isRelatedToActive = (itemId) => {
        if (!activeNodeId) return false;
        const relatedItems = getRelatedItems(activeNodeId);
        return relatedItems.includes(itemId);
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case "completed":
                return "text-white bg-blue-600 border-blue-400";
            case "in-progress":
                return "text-blue-900 bg-blue-100 border-blue-300";
            case "pending":
                return "text-white bg-blue-900/40 border-blue-200/50";
            default:
                return "text-white bg-blue-900/40 border-blue-200/50";
        }
    };

    return (
        <div
            className="w-full h-[600px] flex flex-col items-center justify-center bg-transparent overflow-hidden rounded-[2rem] relative"
            ref={containerRef}
            onClick={handleContainerClick}
        >
            <div className="absolute inset-0 bg-blue-900/10 rounded-[3rem]"></div>

            <div className="relative w-full max-w-4xl h-full flex items-center justify-center pointer-events-none">
                <div
                    className="absolute w-full h-full flex items-center justify-center pointer-events-auto"
                    ref={orbitRef}
                    style={{
                        perspective: "1000px",
                        transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
                    }}
                >
                    {/* Central AI Skeleton */}
                    <div className="absolute w-48 h-96 flex items-center justify-center z-10 pointer-events-none">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse mix-blend-screen"></div>
                        <img src="/skeleton_dark.png" className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(59,130,246,0.6)] z-20 pointer-events-none mix-blend-screen" alt="AI Skeleton" />
                    </div>

                    <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.1)_inset]"></div>
                    <div className="absolute w-[450px] h-[450px] md:w-[700px] md:h-[700px] rounded-full border border-blue-400/10 border-dashed animate-[spin_60s_linear_infinite]"></div>

                    {timelineData.map((item, index) => {
                        const position = calculateNodePosition(index, timelineData.length);
                        const isExpanded = expandedItems[item.id];
                        const isRelated = isRelatedToActive(item.id);
                        const isPulsing = pulseEffect[item.id];

                        // Custom: the target data uses item.icon as an image URL since we passed it that way
                        const isImgIcon = typeof item.icon === 'string';

                        const nodeStyle = {
                            transform: `translate(${position.x}px, ${position.y}px)`,
                            zIndex: isExpanded ? 200 : position.zIndex,
                            opacity: isExpanded ? 1 : position.opacity,
                        };

                        return (
                            <div
                                key={item.id}
                                ref={(el) => (nodeRefs.current[item.id] = el)}
                                className="absolute transition-all duration-700 cursor-pointer"
                                style={nodeStyle}
                                onClick={(e) => toggleItem(item.id, e)}
                            >
                                <div
                                    className={`absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse duration-1000" : ""
                                        }`}
                                    style={{
                                        background: `radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(59,130,246,0) 70%)`,
                                        width: `${item.energy * 0.5 + 40}px`,
                                        height: `${item.energy * 0.5 + 40}px`,
                                        left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                                        top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                                    }}
                                ></div>

                                <div
                                    className={`
                  w-14 h-14 rounded-full flex items-center justify-center
                  ${isExpanded
                                            ? "bg-blue-600 text-white shadow-[0_0_30px_rgba(59,130,246,0.8)] scale-125"
                                            : isRelated
                                                ? "bg-blue-900/80 text-blue-200"
                                                : "bg-zinc-900 border-zinc-800 text-blue-400 shadow-[0_0_15px_rgba(30,58,138,0.4)]"
                                        }
                  border-2 
                  ${isExpanded
                                            ? "border-blue-400"
                                            : isRelated
                                                ? "border-blue-500 animate-pulse bg-blue-900"
                                                : "border-blue-900/50"
                                        }
                  transition-all duration-300 transform
                  hover:scale-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:border-blue-400
                  ${isExpanded ? "scale-[1.3] z-50 bg-blue-600" : ""}
                `}
                                >
                                    {isImgIcon ? (
                                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden">
                                            <img src={item.icon} className="w-8 h-8 object-contain mix-blend-multiply" alt={item.title} />
                                        </div>
                                    ) : (
                                        <item.icon size={24} />
                                    )}
                                </div>

                                <div
                                    className={`
                  absolute top-[70px] whitespace-nowrap left-1/2 -translate-x-1/2
                  text-sm font-bold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "text-blue-200 scale-110 bg-zinc-900/80 px-3 py-1 rounded-full border border-blue-500/30" : "text-blue-100/70 drop-shadow-md"}
                `}
                                >
                                    {item.title}
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
