import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from "@/Core/Layouts/AppLayout";
import { TrendingUp, Users, Shield, Zap, ExternalLink, Activity } from 'lucide-react';

export default function AdminDashboard({ metrics, latestSubscriptions, auditLogs }) {
    const greeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Bom dia";
        if (hour < 18) return "Boa tarde";
        return "Boa noite";
    };

    return (
        <AppLayout title="Governança Global">
            <Head title="Lumerixa OS - Hub Administrativo" />

            <div className="max-w-7xl mx-auto space-y-10">
                {/* Header with Stats Grid */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
                    <div>
                        <h2 className="heading-signature text-3xl mb-1">
                            {greeting()}, <span className="text-[#f53003]">Master</span>
                        </h2>
                        <p className="text-zinc-500 font-medium text-sm">Governança global em <span className="text-emerald-500 font-bold">99.9% health score</span>.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-3">
                            {latestSubscriptions.slice(0, 4).map((s, i) => (
                                <div key={i} className="w-10 h-10 rounded-2xl border-4 border-[#FDFDFC] dark:border-zinc-950 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-black shadow-lg">
                                    {s.tenant?.name?.[0] || 'T'}
                                </div>
                            ))}
                        </div>
                        <span className="text-xs font-black text-zinc-400 ml-2">+{metrics.active_tenants} TENANTS</span>
                    </div>
                </div>

                {/* Metrics Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AdminMetric title="Receita Global" value={`$${metrics.total_mrr.toLocaleString()}`} icon={Zap} trend="+12.5%" />
                    <AdminMetric title="Empresas Ativas" value={metrics.active_tenants} icon={Layers} trend="+2 new" />
                    <AdminMetric title="Ecossistema Usuários" value={metrics.total_users} icon={Users} trend="+45" />
                    <AdminMetric title="Segurança Monitorada" value="100%" icon={Shield} trend="ACTIVE" color="emerald" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Audit Stream */}
                    <div className="lg:col-span-4 lume-glass p-8 rounded-[2.5rem] flex flex-col h-[600px]">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="heading-signature text-lg italic">Stream de Auditoria</h3>
                            <Activity size={18} className="text-zinc-400 animate-pulse" />
                        </div>
                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4">
                            {auditLogs.map((log) => (
                                <div key={log.id} className="p-5 bg-white/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-[1.5rem] group hover:border-[#f5300344] transition-all">
                                    <div className="flex justify-between mb-3">
                                        <span className="text-[10px] font-black text-[#f53003] uppercase tracking-tighter">{log.action}</span>
                                        <span className="text-[9px] text-zinc-400 font-mono italic">{new Date(log.created_at).toLocaleTimeString()}</span>
                                    </div>
                                    <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Model: {log.auditable_type.split('\\').pop()}</p>
                                    <div className="mt-4 flex justify-between items-center pt-3 border-t border-zinc-100 dark:border-zinc-800">
                                        <span className="text-[9px] text-zinc-400 font-bold tracking-widest">{log.ip_address}</span>
                                        <span className="text-[9px] text-zinc-500 font-black">TID: {log.tenant_id?.substring(0, 8) || 'GLOBAL'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Subscription Management */}
                    <div className="lg:col-span-8 lume-glass p-10 rounded-[2.5rem]">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="heading-signature text-lg italic uppercase">Últimas Ativações SaaS</h3>
                            <button className="text-[10px] font-black text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 px-6 py-3 rounded-2xl hover:bg-[#f53003] hover:text-white transition-all shadow-xl">ANALISAR TUDO</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-zinc-100 dark:border-zinc-800">
                                        <th className="pb-6">Tenant / Org</th>
                                        <th className="pb-6">Nível Plano</th>
                                        <th className="pb-6">Status Digital</th>
                                        <th className="pb-6 text-right">Ação</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                    {latestSubscriptions.map((sub) => (
                                        <tr key={sub.id} className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                                            <td className="py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-black text-zinc-400 group-hover:text-[#f53003] transition-colors border border-zinc-200 dark:border-white/5">
                                                        {sub.tenant?.name?.[0]}
                                                    </div>
                                                    <div>
                                                        <div className="font-extrabold text-sm text-zinc-900 dark:text-white">{sub.tenant?.name}</div>
                                                        <div className="text-[10px] text-zinc-500 font-medium tracking-tight">DOMAIN: {sub.tenant?.domain}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-6">
                                                <span className="text-[10px] font-black text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 uppercase tracking-widest">{sub.plan?.name}</span>
                                            </td>
                                            <td className="py-6">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${sub.status === 'active' ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]' : 'bg-zinc-400'}`}></div>
                                                    <span className="text-[10px] font-black text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">{sub.status}</span>
                                                </div>
                                            </td>
                                            <td className="py-6 text-right">
                                                <button className="p-2 text-zinc-400 hover:text-[#f53003] transition-colors">
                                                    <ExternalLink size={16} />
                                                </button>
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

function AdminMetric({ title, value, icon: Icon, trend, color }) {
    return (
        <div className="lume-glass lume-card p-8 rounded-[2.5rem] border-zinc-100 dark:border-zinc-800/50">
            <div className="flex items-center justify-between mb-8">
                <div className={`p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-400 group-hover:text-[#f53003] transition-colors`}>
                    <Icon size={24} />
                </div>
                <span className={`text-[10px] font-black ${color === 'emerald' ? 'text-emerald-500' : 'text-zinc-400'} bg-zinc-50 dark:bg-zinc-900 px-2 py-1 rounded-lg border border-zinc-100 dark:border-zinc-800 uppercase`}>{trend}</span>
            </div>
            <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2">{title}</h4>
            <p className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-white">{value}</p>
        </div>
    );
}

function Layers(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
        </svg>
    )
}
