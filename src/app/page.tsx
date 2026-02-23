"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Ticket, Twitter, Linkedin, Github, Instagram, Check, X } from 'lucide-react';

const speakers = [
    { name: "Виталик Бутерин", role: "Founder, Ethereum", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&h=300&fit=crop" },
    { name: "Джастин Сан", role: "Founder, TRON", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=300&fit=crop" },
    { name: "Сандра До", role: "AI Research Lead", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&h=300&fit=crop" },
    { name: "Алекс Форсайт", role: "Web3 Investor", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&h=300&fit=crop" },
];

export default function CryptoPulseProduction() {
    const [isMounted, setIsMounted] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [timeLeft, setTimeLeft] = useState({ days: 12, hours: 5, mins: 43, secs: 41 });

    useEffect(() => {
        setIsMounted(true);
        const timer = setInterval(() => {
            setTimeLeft(p => ({ ...p, secs: p.secs > 0 ? p.secs - 1 : 59 }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const scrollToTickets = () => {
        document.getElementById('tickets-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Для теста можно оставить так, для реальности — замени на свой ID Formspree
        try {
            const response = await fetch('https://formspree.io/f/xpqjorjo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ticket: selectedTicket, email: email }),
            });

            if (response.ok) {
                setStatus('success');
                setTimeout(() => {
                    setSelectedTicket(null);
                    setStatus('idle');
                    setEmail("");
                }, 3000);
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-[#020205] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">

            {/* Плавный фон с частицами */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
                        animate={{ y: [0, -1000], opacity: [0, 1, 0] }}
                        transition={{ duration: Math.random() * 20 + 10, repeat: Infinity }}
                        style={{ left: Math.random() * 100 + "%", top: "110%" }}
                    />
                ))}
            </div>

            <main className="relative z-10">
                {/* HERO */}
                <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
                    <div className="mb-8 px-5 py-1.5 border border-blue-500/30 bg-blue-500/10 rounded-full text-blue-400 text-[10px] font-bold tracking-[0.2em] uppercase">
                        24-26 мая 2026 • Дубай
                    </div>

                    <h1 className="text-6xl md:text-9xl font-black italic mb-10 leading-[0.85] tracking-tighter uppercase">
                        CRYPTO <br />
                        <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 pb-4 inline-block pr-12">
                            PULSE 2026<span className="opacity-0">.</span>
                        </span>
                    </h1>

                    <div className="flex gap-4 md:gap-6 mb-16">
                        {Object.entries(timeLeft).map(([label, value]) => (
                            <div key={label} className="flex flex-col items-center">
                                <div className="text-3xl md:text-5xl font-mono font-bold bg-white/5 border border-white/10 w-20 h-24 md:w-28 md:h-32 flex items-center justify-center rounded-2xl backdrop-blur-xl">
                                    {String(value).padStart(2, '0')}
                                </div>
                                <span className="text-[8px] text-gray-500 mt-3 uppercase tracking-widest font-bold">{label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <button
                            onClick={scrollToTickets}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-full font-bold flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] active:scale-95"
                        >
                            Билеты <Ticket size={20} />
                        </button>
                        <div className="text-left border-l border-white/10 pl-6 text-gray-400 text-[12px]">
                            <p className="flex items-center gap-2 font-medium text-gray-300 italic"><MapPin size={14} className="text-blue-500" /> Museum of the Future</p>
                            <p className="flex items-center gap-2 mt-1 font-medium text-gray-300 italic"><Calendar size={14} className="text-blue-500" /> 24 May, 2026</p>
                        </div>
                    </div>
                </section>

                {/* SPEAKERS */}
                <section className="py-24 px-6 max-w-7xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-black italic mb-20 tracking-tighter uppercase italic">
                        Top <span className="text-blue-500 underline decoration-blue-500/20">Speakers</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {speakers.map((s, i) => (
                            <motion.div key={i} whileHover={{ y: -10 }} className="group bg-white/5 border border-white/10 p-8 rounded-[40px] backdrop-blur-md">
                                <div className="w-full aspect-square mb-6 overflow-hidden rounded-[30px] border-2 border-white/5 shadow-2xl">
                                    <img src={s.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" alt={s.name} />
                                </div>
                                <h3 className="text-2xl font-bold tracking-tight">{s.name}</h3>
                                <p className="text-blue-400 text-[10px] font-bold tracking-widest mt-1 mb-6 uppercase opacity-80">{s.role}</p>
                                <div className="flex gap-3 opacity-30 group-hover:opacity-100 transition-opacity">
                                    <Twitter size={16} className="cursor-pointer hover:text-blue-400" />
                                    <Linkedin size={16} className="cursor-pointer hover:text-blue-400" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ACCESS */}
                <section id="tickets-section" className="py-24 px-6 max-w-7xl mx-auto relative">
                    <h2 className="text-5xl md:text-7xl font-black italic mb-20 tracking-tighter text-center uppercase">
                        Choose your <span className="text-purple-500">access</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                        {/* Standard */}
                        <div className="bg-white/5 border border-white/10 p-10 rounded-[40px] backdrop-blur-md">
                            <div className="text-gray-500 font-bold text-[10px] uppercase tracking-widest mb-4">Standard Pass</div>
                            <div className="text-5xl font-black mb-8">$499</div>
                            <ul className="space-y-4 mb-10 text-[12px] text-gray-400">
                                <li className="flex items-center gap-2 italic">✓ Доступ ко всем выступлениям</li>
                                <li className="flex items-center gap-2 italic">✓ Пакет участника</li>
                                <li className="flex items-center gap-2 italic">✓ Кофе-брейки</li>
                            </ul>
                            <button onClick={() => setSelectedTicket('Standard')} className="w-full py-4 rounded-2xl bg-white/10 hover:bg-white/20 font-bold transition-all uppercase text-sm italic">Купить</button>
                        </div>

                        {/* VIP */}
                        <div className="relative bg-blue-600/10 border-2 border-blue-500 p-10 rounded-[40px] backdrop-blur-md scale-105 shadow-[0_20px_50px_rgba(37,99,235,0.2)]">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-[9px] font-black px-4 py-1 rounded-full uppercase tracking-widest">Most Popular</div>
                            <div className="text-blue-400 font-bold text-[10px] uppercase tracking-widest mb-4">VIP Business</div>
                            <div className="text-5xl font-black mb-8">$1,299</div>
                            <ul className="space-y-4 mb-10 text-[12px]">
                                <li className="flex items-center gap-2 italic">✓ Всё из Standard</li>
                                <li className="flex items-center gap-2 italic">✓ Доступ в VIP-лаунж</li>
                                <li className="flex items-center gap-2 italic">✓ Networking Afterparty</li>
                            </ul>
                            <button onClick={() => setSelectedTicket('VIP Business')} className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 font-bold transition-all shadow-lg uppercase shadow-blue-500/40 text-sm italic">Купить VIP</button>
                        </div>

                        {/* Whale */}
                        <div className="bg-white/5 border border-purple-500/30 p-10 rounded-[40px] backdrop-blur-md">
                            <div className="text-purple-400 font-bold text-[10px] uppercase tracking-widest mb-4">The Whale</div>
                            <div className="text-5xl font-black mb-8">$5,000</div>
                            <ul className="space-y-4 mb-10 text-[12px] text-gray-400">
                                <li className="flex items-center gap-2 italic">✓ Всё из VIP</li>
                                <li className="flex items-center gap-2 italic">✓ Личный трансфер</li>
                                <li className="flex items-center gap-2 italic">✓ 1-on-1 встреча с Виталиком</li>
                            </ul>
                            <button onClick={() => setSelectedTicket('The Whale')} className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-500 font-bold transition-all uppercase shadow-lg shadow-purple-500/40 text-sm italic">Купить Whale</button>
                        </div>
                    </div>
                </section>
            </main>

            {/* FOOTER */}
            <footer className="border-t border-white/10 py-12 px-6 mt-12">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-xl font-black italic tracking-tighter uppercase">Crypto<span className="text-blue-500">Pulse</span></div>
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest font-bold">© 2026 Crypto Pulse Dubai. All rights reserved.</p>
                    <div className="flex gap-6 opacity-40">
                        <Twitter size={18} className="cursor-pointer hover:text-blue-400" />
                        <Instagram size={18} className="cursor-pointer hover:text-pink-500" />
                        <Github size={18} className="cursor-pointer hover:text-white" />
                    </div>
                </div>
            </footer>

            {/* MODAL */}
            <AnimatePresence>
                {selectedTicket && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#0a0a0f] border border-white/10 p-10 rounded-[40px] max-w-md w-full relative shadow-2xl">
                            {status === 'success' ? (
                                <div className="text-center py-10">
                                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><Check className="text-green-500" size={40} /></div>
                                    <h3 className="text-2xl font-bold mb-2 uppercase italic tracking-tight">Заявка принята!</h3>
                                    <p className="text-gray-400 text-sm">Проверьте почту для подтверждения.</p>
                                </div>
                            ) : (
                                <>
                                    <button onClick={() => setSelectedTicket(null)} className="absolute top-6 right-6 text-gray-500 hover:text-white"><X size={20} /></button>
                                    <h3 className="text-2xl font-bold mb-2 uppercase italic tracking-tight">Бронирование</h3>
                                    <p className="text-blue-500 text-[10px] font-bold uppercase tracking-widest mb-8">{selectedTicket} Pass</p>
                                    <form onSubmit={handleBooking} className="space-y-4">
                                        <input required type="email" placeholder="Ваш Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-blue-500 transition-all text-sm font-medium" />
                                        <button disabled={status === 'loading'} className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 font-bold transition-all disabled:opacity-50 uppercase text-sm italic">
                                            {status === 'loading' ? 'Отправка...' : 'Подтвердить заказ'}
                                        </button>
                                        {status === 'error' && <p className="text-red-500 text-[10px] text-center uppercase font-bold tracking-widest">Ошибка. Попробуйте снова.</p>}
                                    </form>
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}