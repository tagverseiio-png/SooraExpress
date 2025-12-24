'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, ShieldCheck, Globe, Crown } from 'lucide-react';
import ProductImage from './ProductImage';

type LandingPageProps = {
    onEnter: () => void;
};

export default function LandingPage({ onEnter }: LandingPageProps) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-[#FAFAFA] min-h-screen text-[#1a1a1a] font-sans selection:bg-black selection:text-white overflow-x-hidden animate-in fade-in duration-1000">
            <div className="fixed bottom-10 right-6 md:bottom-12 md:right-12 z-50 animate-in zoom-in duration-1000 delay-700 fill-mode-backwards">
                <button
                    onClick={onEnter}
                    className={`group flex items-center gap-0 bg-[#1a1a1a] text-white rounded-full hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) shadow-2xl border border-white/10 active:scale-95 ${isScrolled ? 'pl-2 pr-2 py-2 md:pl-2.5 md:pr-2.5 md:py-2.5' : 'pl-8 pr-3 py-3 hover:gap-4'}`}
                >
                    <div className={`overflow-hidden transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${isScrolled ? 'w-0 opacity-0' : 'w-auto opacity-100 mr-4 group-hover:mr-0'}`}>
                        <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] whitespace-nowrap">Enter Boutique</span>
                    </div>

                    <div className="w-10 h-10 md:w-11 md:h-11 bg-white text-black rounded-full flex items-center justify-center group-hover:rotate-[-45deg] transition-transform duration-500">
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.5} />
                    </div>
                </button>
            </div>

            <div className="relative h-screen flex flex-col justify-between p-8 md:p-16 border-b border-gray-100 overflow-hidden bg-[#F9F9F9]">
                <div className="absolute inset-0">
                    <img
                        src="/images/leadinghero.png"
                        alt="Hero"
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/30 to-white/20" />
                </div>

                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start animate-in slide-in-from-top-4 duration-1000">
                        <img src="/logo.png" alt="Soora Logo" className="h-12 md:h-32 w-auto object-contain" />
                        <div className="hidden md:flex flex-col items-end text-[10px] font-medium uppercase tracking-[0.25em] text-[#1a1a1a] text-white text-right opacity-60">
                            <span>Singapore</span>
                            <span className="mt-1">Est. 2025</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8 md:gap-10 max-w-4xl">
                        <div className="flex items-center gap-3">
                            <span className="px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] bg-white/80 backdrop-blur rounded-full border border-white/40 shadow-sm text-[#1a1a1a]">Holiday 2025 Drop</span>
                            <span className="text-[11px] text-gray-600 tracking-[0.2em]">Curated in Singapore</span>
                        </div>
                        <h2 className="text-6xl md:text-[7.5rem] font-serif leading-[0.9] text-[#1a1a1a] tracking-tighter drop-shadow-sm">
                            Rare Spirits.<br />
                            <span className="italic font-light text-gray-600 font-serif">Instant Gratification.</span>
                        </h2>
                        <p className="text-lg md:text-2xl text-gray-700 font-light max-w-2xl leading-relaxed">
                            White-glove delivery of coveted whiskies, gins, and champagnes—arriving chilled to your door in under an hour.
                        </p>
                    </div>

                    <div className="hidden md:flex justify-center opacity-20">
                        <div className="w-px h-32 bg-gradient-to-b from-transparent via-black to-transparent"></div>
                    </div>
                </div>
            </div>

            <div className="bg-white border-y border-gray-100 py-10 overflow-hidden relative z-20">
                <div className="flex gap-32 animate-marquee whitespace-nowrap opacity-40">
                    {Array(10).fill("").map((_, i) => (
                        <React.Fragment key={i}>
                            <span className="text-4xl md:text-5xl font-serif italic text-[#1a1a1a] tracking-tight">Same Day Delivery</span>
                            <span className="text-2xl font-light text-gray-300 self-center">✦</span>
                            <span className="text-4xl md:text-5xl font-serif italic text-[#1a1a1a] tracking-tight">Guaranteed Authenticity</span>
                            <span className="text-2xl font-light text-gray-300 self-center">✦</span>
                            <span className="text-4xl md:text-5xl font-serif italic text-[#1a1a1a] tracking-tight">Curated Selection</span>
                            <span className="text-2xl font-light text-gray-300 self-center">✦</span>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="py-40 px-6 md:px-24 bg-[#FAFAFA] relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
                    <div className="order-2 md:order-1 relative">
                        <div className="relative z-10 grid grid-cols-2 gap-6">
                            <div className="w-full h-[500px] rounded-[2px] overflow-hidden bg-white shadow-2xl transform translate-y-16">
                                <ProductImage
                                    category="whisky"
                                    alt="Whisky"
                                    className="w-full h-full hover:scale-105 transition-transform duration-1000 ease-out"
                                />
                            </div>
                            <div className="w-full h-[500px] rounded-[2px] overflow-hidden bg-white shadow-2xl -translate-y-16">
                                <ProductImage
                                    category="gin"
                                    alt="Gin"
                                    className="w-full h-full hover:scale-105 transition-transform duration-1000 ease-out"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="order-1 md:order-2 md:pl-20">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-8 block">The Curation</span>
                        <h3 className="text-5xl md:text-7xl font-serif leading-[1.05] mb-10 text-[#1a1a1a] tracking-tight">
                            From Kyoto to <br /><span className="italic text-gray-400">Kentucky.</span>
                        </h3>
                        <p className="text-gray-500 text-lg md:text-xl font-light leading-loose mb-16 max-w-md">
                            We don&apos;t stock everything. We stock the best. Our sommeliers travel the globe to secure limited allocations of the world&apos;s most coveted spirits.
                        </p>

                        <div className="grid grid-cols-2 gap-16 border-t border-gray-200 pt-10">
                            <div>
                                <h4 className="text-5xl font-serif text-[#1a1a1a] font-light">500+</h4>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-3">Labels</p>
                            </div>
                            <div>
                                <h4 className="text-5xl font-serif text-[#1a1a1a] font-light">60m</h4>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-3">Delivery</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-40 px-6 md:px-24 bg-white">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6">
                    <h3 className="text-5xl md:text-7xl font-serif text-[#1a1a1a] tracking-tight">The Cellar</h3>
                    <button className="text-xs font-bold uppercase tracking-[0.25em] border-b border-[#1a1a1a] pb-1 hover:text-gray-500 hover:border-gray-300 transition-colors">View All Categories</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {[
                        { title: "Fine Whiskies", category: "whisky", count: "124 Labels" },
                        { title: "Artisanal Gins", category: "gin", count: "86 Labels" },
                        { title: "Rare Wines", category: "wine", count: "210 Labels" }
                    ].map((cat, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            <div className="h-[550px] overflow-hidden bg-[#F5F5F7] mb-10 relative">
                                <ProductImage
                                    category={cat.category}
                                    alt={cat.title}
                                    className="w-full h-full group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[10%] group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
                            </div>
                            <h4 className="text-3xl font-serif text-[#1a1a1a] mb-2">{cat.title}</h4>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">{cat.count}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="py-40 px-6 md:px-24 bg-[#0a0a0a] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] -mr-64 -mt-64 pointer-events-none"></div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <Crown className="w-5 h-5 text-[#D4AF37]" strokeWidth={1.5} />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Private Client</span>
                    </div>
                    <h3 className="text-5xl md:text-8xl font-serif leading-tight mb-12 tracking-tight">
                        Unlock the <br /><span className="text-white/30 italic font-light">Unattainable.</span>
                    </h3>
                    <p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed mb-20 max-w-2xl mx-auto">
                        Soora Gold members receive priority access to limited releases, private tastings with master distillers, and a dedicated concierge.
                    </p>
                    <button className="bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#D4AF37] transition-colors">
                        Inquire Membership
                    </button>
                </div>
            </div>

            <div className="py-40 px-6 md:px-24 bg-[#FAFAFA]">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-20 block text-center md:text-left">From the Journal</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                    <div className="group cursor-pointer">
                        <div className="h-[450px] overflow-hidden bg-white mb-10 shadow-sm">
                            <ProductImage
                                category="whisky"
                                alt="Journal"
                                className="w-full h-full group-hover:scale-105 transition-transform duration-1000 ease-out"
                            />
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-5">
                            <span>Stories</span>
                            <span>•</span>
                            <span>Oct 12</span>
                        </div>
                        <h4 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-6 group-hover:text-gray-600 transition-colors leading-[1.1] tracking-tight">The Renaissance of Japanese Whisky</h4>
                        <p className="text-gray-500 leading-relaxed font-light text-lg">Why Yamazaki and Hibiki are commanding record prices, and the new distilleries to watch.</p>
                    </div>
                    <div className="group cursor-pointer">
                        <div className="h-[450px] overflow-hidden bg-white mb-10 shadow-sm">
                            <ProductImage
                                category="tequila"
                                alt="Journal"
                                className="w-full h-full group-hover:scale-105 transition-transform duration-1000 ease-out"
                            />
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-5">
                            <span>Guide</span>
                            <span>•</span>
                            <span>Oct 08</span>
                        </div>
                        <h4 className="text-4xl md:text-5xl font-serif text-[#1a1a1a] mb-6 group-hover:text-gray-600 transition-colors leading-[1.1] tracking-tight">Host the Perfect Tequila Tasting</h4>
                        <p className="text-gray-500 leading-relaxed font-light text-lg">Move beyond the shot glass. A guide to glassware, pairings, and the art of sipping.</p>
                    </div>
                </div>
            </div>

            <div className="py-32 px-6 md:px-24 bg-white border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-20 text-center md:text-left">
                    <div className="group">
                        <div className="w-16 h-16 bg-[#F5F5F7] rounded-full flex items-center justify-center mb-8 group-hover:bg-gray-200 transition-colors mx-auto md:mx-0">
                            <Zap className="w-6 h-6 text-[#1a1a1a]" strokeWidth={1} />
                        </div>
                        <h4 className="text-2xl font-serif mb-4 text-[#1a1a1a]">Flash Delivery</h4>
                        <p className="text-gray-500 text-sm leading-relaxed font-light">Chilled and delivered to your doorstep in under 60 minutes across Singapore.</p>
                    </div>
                    <div className="group">
                        <div className="w-16 h-16 bg-[#F5F5F7] rounded-full flex items-center justify-center mb-8 group-hover:bg-gray-200 transition-colors mx-auto md:mx-0">
                            <ShieldCheck className="w-6 h-6 text-[#1a1a1a]" strokeWidth={1} />
                        </div>
                        <h4 className="text-2xl font-serif mb-4 text-[#1a1a1a]">Authenticity</h4>
                        <p className="text-gray-500 text-sm leading-relaxed font-light">Direct partnerships with distilleries ensure every bottle is 100% authentic.</p>
                    </div>
                    <div className="group">
                        <div className="w-16 h-16 bg-[#F5F5F7] rounded-full flex items-center justify-center mb-8 group-hover:bg-gray-200 transition-colors mx-auto md:mx-0">
                            <Globe className="w-6 h-6 text-[#1a1a1a]" strokeWidth={1} />
                        </div>
                        <h4 className="text-2xl font-serif mb-4 text-[#1a1a1a]">Global Sourcing</h4>
                        <p className="text-gray-500 text-sm leading-relaxed font-light">Access to rare vintages and limited editions not found elsewhere.</p>
                    </div>
                </div>
            </div>

            <footer className="py-24 px-6 md:px-24 border-t border-gray-100 bg-[#FAFAFA] text-gray-400 text-xs flex flex-col md:flex-row justify-between items-center gap-10">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
                    <img src="/logo.png" alt="Soora Logo" className="h-20 w-auto object-contain" />
                    <span className="hidden md:block w-px h-5 bg-gray-200"></span>
                    <span className="font-medium tracking-wide text-gray-500">© 2025 Soora Pte Ltd</span>
                </div>
                <div className="flex gap-12 uppercase tracking-[0.2em] font-bold text-gray-500">
                    <a href="#" className="hover:text-[#1a1a1a] transition-colors">Privacy</a>
                    <a href="#" className="hover:text-[#1a1a1a] transition-colors">Terms</a>
                    <a href="#" className="hover:text-[#1a1a1a] transition-colors">Contact</a>
                </div>
            </footer>
        </div>
    );
}
