import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from "@/Core/Layouts/AppLayout";
import { 
    Users, 
    Briefcase, 
    TrendingUp, 
    Plus, 
    Search, 
    Filter, 
    MoreHorizontal,
    ChevronRight,
    Star,
    Mail,
    Award,
    Clock
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Team({ employees, stats }) {
    const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <AppLayout title="Capital Humano">
            <Head title="Lumerixa OS - HR Intelligence" />

            <div className="max-w-7xl mx-auto space-y-12 pb-20">
                {/* HR Command Banner */}
                <div className="relative overflow-hidden bg-zinc-950 dark:bg-black border border-white/5 dark:border-zinc-800 rounded-[3rem] p-12 shadow-2xl">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Users size={200} className="text-white" />
                    </div>
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#f53003] opacity-[0.05] blur-[100px]"></div>
                    
                    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
                        <div>
                            <h3 className="heading-signature text-4xl mb-4 italic">
                                Soberania de <br />
                                <span className="text-[#f53003]">Talentos</span>
                            </h3>
                            <p className="text-zinc-400 max-w-sm text-sm font-medium leading-relaxed">
                                Gerencie o motor do seu negócio com métricas de performance e retenção integradas.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="lume-glass bg-white/5 border-white/10 px-8 py-3 rounded-2xl text-center">
                                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1 italic">Investimento Médio</p>
                                <p className="text-2xl font-black italic">{formatCurrency(stats.avg_salary)}</p>
                            </div>
                            <button className="bg-[#f53003] text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#d62a02] transition-all shadow-xl shadow-[#f5300333] active:scale-95 flex items-center gap-2">
                                <Plus size={16} strokeWidth={3} /> Novo Membro
                            </button>
                        </div>
                    </div>
                </div>

                {/* Team KPIs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="lume-glass p-8 rounded-[2.5rem] group">
                         <div className="flex items-center justify-between mb-8">
                            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                                <Award size={22} className="text-[#f53003]" strokeWidth={3} />
                            </div>
                            <span className="text-[10px] font-black text-emerald-500 italic">+12% Retention</span>
                        </div>
                        <h4 className="text-4xl font-black tracking-tighter mb-2 italic">{stats.total_count}</h4>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 italic">Membros Ativos</p>
                    </div>
                    {/* Add more KPIs if needed or just repeat with different icons */}
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {employees.map((emp, i) => (
                        <motion.div 
                            key={emp.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="lume-glass p-8 rounded-[2.5rem] group hover:border-[#f5300388] transition-all relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Award size={100} className="text-[#f53003]" />
                            </div>
                            <div className="flex items-center gap-6 mb-10 relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#f53003] to-orange-400 p-[2px] shadow-lg shadow-[#f5300322]">
                                    <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-[calc(1rem-2px)] flex items-center justify-center font-black text-2xl italic text-[#f53003]">
                                        {emp.name[0]}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-black uppercase tracking-tighter text-zinc-900 dark:text-white group-hover:text-[#f53003] transition-colors italic">{emp.name}</h3>
                                    <p className="text-[9px] text-zinc-400 font-black uppercase tracking-widest leading-none mt-1">{emp.position}</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-10 relative z-10">
                                <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800/50">
                                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Departamento</span>
                                    <span className="text-[10px] font-black uppercase italic">{emp.department}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800/50">
                                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Compensação</span>
                                    <span className="text-[10px] font-black italic">{formatCurrency(emp.salary)}</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Performance</span>
                                    <div className="flex gap-1">
                                        {[1,2,3,4,5].map(s => <Star key={s} size={10} className={s <= 4 ? "text-[#f53003] fill-[#f53003]" : "text-zinc-200"} />)}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 relative z-10">
                                <button className="flex-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#f53003] hover:text-white transition-all active:scale-95">
                                    Perfil 360
                                </button>
                                <button className="p-3 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-400 hover:text-[#f53003] transition-all">
                                    <Mail size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
