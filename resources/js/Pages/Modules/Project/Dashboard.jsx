import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/Core/Layouts/AppLayout';
import {
    CheckCircle2,
    Clock,
    AlertCircle,
    TrendingUp,
    Plus,
    Briefcase,
    ChevronRight,
    Search,
    BarChart3,
    MoreHorizontal
} from 'lucide-react';

export default function ProjectDashboard({ auth, metrics, recentProjects }) {
    const stats = [
        { label: 'Ecossistemas Ativos', value: metrics?.activeCount || 0, icon: Briefcase, color: '#f53003' },
        { label: 'Entregas Hoje', value: metrics?.dueToday || 0, icon: CheckCircle2, color: '#10b981' },
        { label: 'Riscos / Atrasos', value: metrics?.overdue || 0, icon: AlertCircle, color: '#ef4444' },
        { label: 'Lead Time Médio', value: metrics?.avgTime || '4.2d', icon: Clock, color: '#3b82f6' },
    ];

    return (
        <AppLayout
            user={auth.user}
            title="Gestão de Projetos"
        >
            <Head title="Lumerixa OS - Project Intelligence" />

            <div className="max-w-7xl mx-auto space-y-12 pb-20">
                {/* Master Command Banner */}
                <div className="relative overflow-hidden bg-zinc-950 dark:bg-black border border-white/5 dark:border-zinc-800 rounded-[3rem] p-12 shadow-2xl">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <BarChart3 size={200} className="text-white" />
                    </div>
                    {/* Subtle Gradient Glow */}
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#f53003] opacity-[0.05] blur-[100px]"></div>

                    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
                        <div className="text-center lg:text-left">
                            <h3 className="heading-signature text-4xl mb-4 italic">
                                Orquestração de <br />
                                <span className="text-[#f53003]">Resultados</span>
                            </h3>
                            <p className="text-zinc-400 max-w-md text-sm font-medium leading-relaxed">
                                Gerencie fluxos persistentes, monitore KPIs de produtividade e impulsione a soberania do seu time.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href={route('projects')}
                                className="bg-white text-black px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#f53003] hover:text-white transition-all shadow-xl active:scale-95"
                            >
                                Ecossistema Completo
                            </Link>
                            <button className="bg-[#f53003] text-white px-10 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#d62a02] transition-all shadow-xl shadow-[#f5300333] active:scale-95 flex items-center gap-3">
                                <Plus size={18} strokeWidth={3} /> Nova Sprint
                            </button>
                        </div>
                    </div>
                </div>

                {/* Grid de Métricas de Alta Performance */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="lume-glass lume-card p-8 rounded-[2.5rem] group">
                            <div className="flex items-center justify-between mb-8">
                                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 group-hover:scale-110 transition-transform">
                                    <stat.icon size={22} color={stat.color} strokeWidth={3} />
                                </div>
                                <TrendingUp size={16} className="text-zinc-300 dark:text-zinc-700" />
                            </div>
                            <h4 className="text-4xl font-black tracking-tighter mb-2 italic">{stat.value}</h4>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 italic">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Main Viewport */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Lista de Ecossistemas / Projetos */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex justify-between items-center px-4">
                            <h4 className="heading-signature text-lg italic">Projetos em <span className="text-[#f53003]">Ação</span></h4>
                            <div className="flex gap-2">
                                <button className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors"><Search size={20} alt="Buscar" /></button>
                                <button className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors"><MoreHorizontal size={20} alt="Opções" /></button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {(recentProjects || []).length > 0 ? (
                                recentProjects.map((project) => (
                                    <Link
                                        key={project.id}
                                        href={route('projects.show', project.slug)}
                                        className="lume-glass p-6 rounded-[2rem] flex items-center justify-between group hover:border-[#f5300388] transition-all"
                                    >
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 flex items-center justify-center font-black text-xl italic text-[#f53003]">
                                                {project.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h5 className="font-black uppercase tracking-tighter text-sm group-hover:text-[#f53003] transition-colors">{project.name}</h5>
                                                <div className="flex gap-3 mt-1">
                                                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">{project.status}</span>
                                                    <span className="text-[9px] font-black text-emerald-500 uppercase">● Healthy</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-10">
                                            <div className="hidden md:flex flex-col items-end">
                                                <span className="text-[10px] font-black uppercase tracking-widest">{project.tasks_count || 0} Entregas</span>
                                                <div className="w-32 h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full mt-2 overflow-hidden">
                                                    <div className="h-full bg-[#f53003] shadow-[0_0_8px_rgba(245,48,3,0.5)]" style={{ width: '65%' }}></div>
                                                </div>
                                            </div>
                                            <ChevronRight className="text-zinc-300 group-hover:text-[#f53003] transition-all translate-x-0 group-hover:translate-x-1" />
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="lume-glass p-12 rounded-[2rem] text-center italic text-zinc-500 text-sm">
                                    Nenhum ecossistema em ação no momento. <br /> Inicie um novo ciclo operacional.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Insights & Next Steps */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="lume-glass p-8 rounded-[2.5rem] bg-zinc-950 text-white border-none shadow-2xl relative overflow-hidden group">
                            <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Zap size={150} className="text-[#f53003]" />
                            </div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#f53003] mb-6 italic">LumiAI Intelligence</h4>
                            <p className="text-sm font-medium italic leading-relaxed relative z-10">
                                "Baseado nos últimos 7 dias, a eficiência do time subiu **18%**. O projeto **Alpha** está se aproximando do marco crítico."
                            </p>
                            <button className="mt-8 text-[10px] font-black uppercase tracking-widest text-[#f53003] hover:text-white transition-colors relative z-10 flex items-center gap-2">
                                Gerar Deep Analysis <Plus size={12} />
                            </button>
                        </div>

                        {/* Timeline Redesign */}
                        <div className="lume-glass p-8 rounded-[2.5rem]">
                            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-8 italic">Timeline Crítica</h5>
                            <div className="space-y-6">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex gap-4 group">
                                        <div className="flex flex-col items-center">
                                            <div className="w-2 h-2 rounded-full bg-[#f53003] shadow-[0_0_8px_rgba(245,48,3,0.5)]"></div>
                                            <div className="w-[1px] h-full bg-zinc-200 dark:bg-zinc-800 mt-2"></div>
                                        </div>
                                        <div className="pb-4">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white group-hover:text-[#f53003] transition-colors">Entrega de Sprint Review</p>
                                            <p className="text-[9px] text-zinc-500 uppercase font-medium mt-1">Amanhã, às 16:30h</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
