import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from "@/Core/Layouts/AppLayout";
import { 
    Scale, 
    Shield, 
    FileText, 
    AlertCircle, 
    Search, 
    Filter, 
    ChevronRight,
    Plus,
    Clock,
    Lock,
    CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Compliance({ contracts, stats }) {
    const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    return (
        <AppLayout title="Operação Legal">
            <Head title="Lumerixa OS - Legal Intelligence" />

            <div className="max-w-7xl mx-auto space-y-12 pb-20">
                {/* Legal Command Banner */}
                <div className="relative overflow-hidden bg-zinc-950 dark:bg-black border border-white/5 dark:border-zinc-800 rounded-[3rem] p-12 shadow-2xl">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Scale size={200} className="text-white" />
                    </div>
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#f53003] opacity-[0.05] blur-[100px]"></div>
                    
                    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
                        <div>
                            <h3 className="heading-signature text-4xl mb-4 italic">
                                Soberania <br />
                                <span className="text-[#f53003]">Jurídica</span>
                            </h3>
                            <p className="text-zinc-400 max-w-sm text-sm font-medium leading-relaxed">
                                Gerencie conformidade contratual e proteja seu ecossistema com inteligência legal.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="lume-glass bg-white/5 border-white/10 px-8 py-3 rounded-2xl flex items-center gap-3">
                                <Shield size={16} className="text-emerald-500" />
                                <span className="text-[9px] font-black text-zinc-300 uppercase tracking-widest italic">LGPD Compliance Active</span>
                            </div>
                            <button className="bg-[#f53003] text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#d62a02] transition-all shadow-xl shadow-[#f5300333] active:scale-95 flex items-center gap-2">
                                <Plus size={16} strokeWidth={3} /> Novo Protocolo
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Viewport */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Insights & Critical Items */}
                    <div className="lg:col-span-4 space-y-8">
                         <div className="lume-glass p-8 rounded-[2.5rem]">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-8 italic text-zinc-900 dark:text-white">KPIs de Conformidade</h5>
                            <div className="space-y-6">
                                <div className="lume-glass p-6 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/50">
                                    <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mb-1 italic">Contratos Ativos</p>
                                    <p className="text-3xl font-black italic">{stats.active_contracts}</p>
                                </div>
                                <div className="lume-glass p-6 rounded-[2rem] bg-[#f5300305] border-[#f5300320]">
                                    <div className="flex items-center gap-2 mb-4">
                                        <AlertCircle size={14} className="text-[#f53003]" />
                                        <h6 className="text-[9px] font-black text-[#f53003] uppercase tracking-widest">Alertas Críticos</h6>
                                    </div>
                                    <p className="text-[10px] text-zinc-500 font-medium leading-relaxed mb-4">
                                        2 Contratos de Prestação de Serviços vencem em <span className="font-bold text-zinc-900 dark:text-white mt-1 block">15 dias</span>.
                                    </p>
                                    <button className="text-[8px] font-black uppercase tracking-widest text-[#f53003] hover:underline transition-all">Priorizar Renovação →</button>
                                </div>
                            </div>
                        </div>

                        <div className="lume-glass p-8 rounded-[2.5rem] bg-zinc-950 text-white border-none shadow-2xl relative overflow-hidden group">
                             <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Lock size={150} className="text-[#f53003]" />
                            </div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f53003] mb-6 italic">Vault de Segurança</h4>
                            <p className="text-[11px] font-medium italic leading-relaxed relative z-10">
                                Todos os documentos são criptografados com padrão **AES-256** e vinculados a assinaturas digitais verificadas.
                            </p>
                        </div>
                    </div>

                    {/* Contracts Stream */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex justify-between items-center px-4">
                            <h4 className="heading-signature text-sm italic">Stream <span className="text-[#f53003]">Documental</span></h4>
                            <div className="flex gap-2">
                                <button className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"><Search size={16} /></button>
                                <button className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"><Filter size={16} /></button>
                            </div>
                        </div>
                        
                        <div className="lume-glass overflow-hidden rounded-[2.5rem]">
                            <table className="w-full text-left">
                                <thead className="bg-zinc-50 dark:bg-zinc-900/50">
                                    <tr className="text-[10px] font-black text-zinc-500 uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-800">
                                        <th className="px-8 py-5">Identificação / Protocolo</th>
                                        <th className="px-8 py-5">Tipo</th>
                                        <th className="px-8 py-5">Status</th>
                                        <th className="px-8 py-5 text-right">Valor</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                    {contracts.map((c) => (
                                        <tr key={c.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-black text-zinc-400 group-hover:text-[#f53003] transition-colors"><FileText size={20} /></div>
                                                    <div>
                                                        <div className="font-black text-sm uppercase tracking-tighter text-zinc-900 dark:text-white group-hover:text-[#f53003] transition-colors italic">{c.title}</div>
                                                        <div className="text-[9px] text-zinc-400 font-mono">HASH: {c.id.substring(0,8)}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700">{c.type}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${c.status === 'active' ? 'bg-emerald-500' : 'bg-zinc-400'}`}></div>
                                                    <span className="text-[9px] font-black text-zinc-500 uppercase italic opacity-70">{c.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-right font-black italic text-zinc-900 dark:text-white">
                                                {formatCurrency(c.value)}
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
