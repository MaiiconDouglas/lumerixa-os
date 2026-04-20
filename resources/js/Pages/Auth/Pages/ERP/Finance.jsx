import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from "@/Core/Layouts/AppLayout";
import { 
    TrendingUp, 
    TrendingDown, 
    Wallet, 
    Plus, 
    ArrowUpRight, 
    ArrowDownRight, 
    CreditCard, 
    Landmark,
    Filter,
    Calendar,
    Briefcase,
    Zap
} from 'lucide-react';

export default function Finance({ transactions, accounts, stats, cash_flow }) {
    const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

    const kpis = [
        { label: 'Saldo Soberano', value: stats?.balance || 0, icon: Wallet, color: '#f53003', trend: '+2.4%' },
        { label: 'Fluxo de Entrada', value: stats?.income || 0, icon: TrendingUp, color: '#10b981', trend: '+12%' },
        { label: 'Retenção / Saída', value: stats?.expense || 0, icon: TrendingDown, color: '#ef4444', trend: '-5%' },
        { label: 'Ticket Médio', value: stats?.ticket_medio || 0, icon: Zap, color: '#3b82f6', trend: '+1.5%' },
    ];

    return (
        <AppLayout title="Inteligência Financeira">
            <Head title="Lumerixa OS - Finance Intelligence" />

            <div className="max-w-7xl mx-auto space-y-10 pb-20">
                {/* Finance Master Banner */}
                <div className="relative overflow-hidden bg-zinc-950 dark:bg-black border border-white/5 dark:border-zinc-800 rounded-[3rem] p-12 shadow-2xl">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Landmark size={200} className="text-white" />
                    </div>
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#f53003] opacity-[0.05] blur-[100px]"></div>
                    
                    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
                        <div>
                            <h3 className="heading-signature text-4xl mb-4 italic">
                                Soberania <br />
                                <span className="text-[#f53003]">Financeira</span>
                            </h3>
                            <p className="text-zinc-400 max-w-sm text-sm font-medium leading-relaxed">
                                Visualize tendências, gerencie liquidez e tome decisões baseadas em dados em tempo real.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                             <button className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#f53003] hover:text-white transition-all shadow-xl active:scale-95 flex items-center gap-2">
                                <Plus size={16} strokeWidth={3} /> Nova Receita
                            </button>
                            <button className="bg-[#f53003] text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#d62a02] transition-all shadow-xl shadow-[#f5300333] active:scale-95 flex items-center gap-2">
                                <Plus size={16} strokeWidth={3} /> Nova Despesa
                            </button>
                        </div>
                    </div>
                </div>

                {/* KPI Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {kpis.map((kpi, i) => (
                        <div 
                            key={i}
                            className="lume-glass lume-card p-8 rounded-[2.5rem] group"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 transition-transform">
                                    <kpi.icon size={22} color={kpi.color} strokeWidth={3} />
                                </div>
                                <span className={`text-[10px] font-black italic ${kpi.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                                    {kpi.trend}
                                </span>
                            </div>
                            <h4 className="text-3xl font-black tracking-tighter mb-2 italic">
                                {formatCurrency(kpi.value)}
                            </h4>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 italic">{kpi.label}</p>
                        </div>
                    ))}
                </div>

                {/* Main Viewport: Analysis & History */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Cash Flow Chart - STABLE PLACEHOLDER */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="lume-glass p-8 rounded-[2.5rem] min-h-[450px] relative overflow-hidden flex flex-col">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h4 className="heading-signature text-lg italic">Análise de <span className="text-[#f53003]">Tendência</span></h4>
                                    <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest mt-1">Fluxo de Caixa Mensal (Últimos 6 meses)</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"><Filter size={16} /></button>
                                    <button className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800"><Calendar size={16} /></button>
                                </div>
                            </div>

                            <div className="flex-1 w-full bg-zinc-50/50 dark:bg-zinc-900/50 rounded-[2rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                                <div className="text-center">
                                    <TrendingUp size={40} className="text-zinc-300 mx-auto mb-4" />
                                    <p className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.3em]">Visualização em processamento...</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Transactions */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center px-4">
                                <h4 className="heading-signature text-sm italic">Stream <span className="text-[#f53003]">Operacional</span></h4>
                                <button className="text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-[#f53003] transition-colors">Ver Tudo →</button>
                            </div>
                            <div className="space-y-3">
                                {transactions?.map((tx) => (
                                    <div key={tx.id} className="lume-glass p-6 rounded-[2rem] flex items-center justify-between group hover:border-[#f5300344] transition-all">
                                        <div className="flex items-center gap-6">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${tx.type === 'income' 
                                                ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500' 
                                                : 'bg-[#f5300305] border-[#f5300320] text-[#f53003]'
                                            }`}>
                                                {tx.type === 'income' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                                            </div>
                                            <div>
                                                <h5 className="font-black uppercase tracking-tighter text-[11px] group-hover:text-[#f53003] transition-colors">{tx.description || 'Transação'}</h5>
                                                <div className="flex gap-3 mt-0.5">
                                                    <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest">{tx.category}</span>
                                                    <span className="text-[8px] font-black text-zinc-300 uppercase italic">● {new Date(tx.due_date).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`text-sm font-black italic ${tx.type === 'income' ? 'text-emerald-500' : 'text-[#f53003]'}`}>
                                            {tx.type === 'income' ? '+' : '-'} {formatCurrency(tx.amount)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Accounts & Analytics */}
                    <div className="lg:col-span-4 space-y-10">
                        {/* Bank Accounts */}
                        <div className="space-y-6">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 px-4 italic">Conexões Bancárias</h5>
                            <div className="space-y-4">
                                {accounts?.map((acc) => (
                                    <div key={acc.id} className="lume-glass p-6 rounded-[2.2rem] bg-gradient-to-br from-white dark:from-zinc-900 to-zinc-50 dark:to-black relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0">
                                             <CreditCard size={40} className="text-[#f53003]" />
                                        </div>
                                        <div className="relative z-10">
                                            <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">{acc.bank_name || 'Instituição'}</p>
                                            <h6 className="font-black uppercase tracking-tighter text-sm mb-4">{acc.name}</h6>
                                            <p className="text-xl font-black italic">{formatCurrency(acc.balance)}</p>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full p-6 rounded-[2.2rem] border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center gap-2 hover:border-[#f53003] hover:bg-[#f5300305] transition-all group">
                                    <div className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-lg group-hover:bg-[#f53003] group-hover:text-white transition-all">
                                        <Plus size={16} />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-[#f53003]">Vincular Nova Conta</span>
                                </button>
                            </div>
                        </div>

                        {/* Financial Health Index */}
                        <div className="lume-glass p-8 rounded-[2.5rem] bg-zinc-950 text-white border-none shadow-2xl relative overflow-hidden group">
                             <div className="absolute -bottom-4 -right-10 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Briefcase size={180} className="text-[#f53003]" />
                            </div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f53003] mb-8 italic">Health Index</h4>
                            
                            <div className="relative z-10 space-y-6">
                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-[9px] font-black uppercase tracking-widest">Taxa de Retenção</span>
                                        <span className="text-xl font-black italic">{stats?.savings_rate?.toFixed(1) || 0}%</span>
                                    </div>
                                    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#f53003] shadow-lume" style={{ width: `${Math.min(stats?.savings_rate || 0, 100)}%` }}></div>
                                    </div>
                                </div>
                                <p className="text-[10px] text-zinc-500 font-medium italic leading-relaxed">
                                    Sua eficiência operacional subiu **4.2%** em relação ao mês anterior. Recomendamos reduzir gastos na categoria **Marketing**.
                                </p>
                                <button className="text-[9px] font-black uppercase tracking-widest text-white border border-white/20 px-6 py-3 rounded-xl hover:bg-white hover:text-black transition-all">
                                    Gerar DRE Completo
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
