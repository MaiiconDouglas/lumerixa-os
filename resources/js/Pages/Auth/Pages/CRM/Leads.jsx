import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from "@/Core/Layouts/AppLayout";
import { 
    Users, 
    Target, 
    TrendingUp, 
    Plus, 
    Search, 
    Filter, 
    MoreHorizontal,
    ChevronRight,
    Briefcase,
    Mail,
    Phone,
    Star
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Leads({ leads, stats }) {
    const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    const pipelineSteps = [
        { label: 'Novos Prospectos', count: leads.filter(l => l.status === 'new').length, color: '#3b82f6' },
        { label: 'Qualificação', count: leads.filter(l => l.status === 'contact').length, color: '#6366f1' },
        { label: 'Proposta Enviada', count: leads.filter(l => l.status === 'proposal').length, color: '#f53003' },
        { label: 'Fechamento (Won)', count: leads.filter(l => l.status === 'won').length, color: '#10b981' },
    ];

    return (
        <AppLayout title="Gestão de Relacionamento">
            <Head title="Lumerixa OS - CRM Intelligence" />

            <div className="max-w-7xl mx-auto space-y-12 pb-20">
                {/* CRM Command Banner */}
                <div className="relative overflow-hidden bg-zinc-950 dark:bg-black border border-white/5 dark:border-zinc-800 rounded-[3rem] p-12 shadow-2xl">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Users size={200} className="text-white" />
                    </div>
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#f53003] opacity-[0.05] blur-[100px]"></div>
                    
                    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
                        <div>
                            <h3 className="heading-signature text-4xl mb-4 italic">
                                Inteligência <br />
                                <span className="text-[#f53003]">Comercial</span>
                            </h3>
                            <p className="text-zinc-400 max-w-sm text-sm font-medium leading-relaxed">
                                Gerencie leads com precisão e impulsione seu pipeline com insights soberanos.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="lume-glass bg-white/5 border-white/10 px-8 py-3 rounded-2xl text-center">
                                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1 italic">Total em Negociação</p>
                                <p className="text-2xl font-black italic">{formatCurrency(stats.total_value)}</p>
                            </div>
                            <button className="bg-[#f53003] text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#d62a02] transition-all shadow-xl shadow-[#f5300333] active:scale-95 flex items-center gap-2">
                                <Plus size={16} strokeWidth={3} /> Gerar Lead
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pipeline Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pipelineSteps.map((step, i) => (
                        <div key={i} className="lume-glass p-6 rounded-[2rem] border-l-4 group transition-all hover:scale-105" style={{ borderLeftColor: step.color }}>
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 italic">{step.label}</span>
                                <Star size={14} className="text-zinc-300 group-hover:text-[#f53003] transition-colors" />
                            </div>
                            <p className="text-3xl font-black italic">{step.count}</p>
                        </div>
                    ))}
                </div>

                {/* Main Viewport */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-12 space-y-6">
                        <div className="flex justify-between items-center px-4">
                            <h4 className="heading-signature text-sm italic">Pipeline <span className="text-[#f53003]">Operacional</span></h4>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
                                    <Search size={14} className="text-zinc-400" />
                                    <input type="text" placeholder="Buscar lead..." className="bg-transparent border-none focus:ring-0 text-[10px] font-black uppercase" />
                                </div>
                                <button className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"><Filter size={16} /></button>
                            </div>
                        </div>

                        <div className="lume-glass overflow-hidden rounded-[2.5rem]">
                            <table className="w-full text-left">
                                <thead className="bg-zinc-50 dark:bg-zinc-900/50">
                                    <tr className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-800">
                                        <th className="px-8 py-5">Prospecto</th>
                                        <th className="px-8 py-5">Status / Canal</th>
                                        <th className="px-8 py-5">Oportunidade</th>
                                        <th className="px-8 py-5 text-right">Contatos</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                    {leads.map((lead) => (
                                        <tr key={lead.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-black text-zinc-400 group-hover:text-[#f53003] transition-colors">{lead.name.charAt(0)}</div>
                                                    <div>
                                                        <div className="font-black text-sm uppercase tracking-tighter text-zinc-900 dark:text-white group-hover:text-[#f53003] transition-colors">{lead.name}</div>
                                                        <div className="text-[10px] text-zinc-400 font-medium">{lead.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`text-[9px] font-black px-3 py-1 rounded-full border ${getStatusStyle(lead.status)}`}>
                                                    {lead.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 font-black italic text-zinc-900 dark:text-white">
                                                {formatCurrency(lead.opportunity_value)}
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex justify-end gap-2">
                                                    <button className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-emerald-500 transition-colors"><Mail size={14} /></button>
                                                    <button className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-emerald-500 transition-colors"><Phone size={14} /></button>
                                                    <button className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-[#f53003] transition-colors"><ChevronRight size={14} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function getStatusStyle(status) {
    switch(status) {
        case 'new': return 'border-blue-500/20 bg-blue-500/10 text-blue-500';
        case 'proposal': return 'border-[#f5300340] bg-[#f5300305] text-[#f53003]';
        case 'won': return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500';
        default: return 'border-zinc-500/20 bg-zinc-500/10 text-zinc-400';
    }
}
