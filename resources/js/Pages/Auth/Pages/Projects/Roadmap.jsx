import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from "@/Core/Layouts/AppLayout";
import '@/../css/innovation.css';

export default function Roadmap({ projects, stats }) {
    return (
        <AppLayout title="Projetos & Roadmap">
            <Head title="Lumerixa OS - Project Innovation" />

            <div className="min-h-screen bg-[#020617] text-slate-200 -mt-12 -mx-4 sm:-mx-6 lg:-mx-8 p-4 sm:p-8 relative overflow-hidden">
                <div className="absolute top-1/4 right-0 w-[60%] h-[60%] bg-indigo-500/5 blur-[120px] rounded-full"></div>

                <div className="max-w-7xl mx-auto space-y-12 relative z-10">
                    <div>
                        <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Roadmap <span className="text-indigo-400">Estratégico</span></h1>
                        <p className="text-slate-400 font-medium">Orquestração de backlog e entregas de valor.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {projects.map((proj) => (
                            <div key={proj.id} className="glass-panel p-8 space-y-8 group hover:border-indigo-500/30 transition-all">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-black text-white group-hover:text-indigo-400 transition-colors uppercase tracking-tighter">{proj.name}</h3>
                                        <p className="text-sm text-slate-500 font-medium mt-2">{proj.description}</p>
                                    </div>
                                    <span className="text-[10px] font-black px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 uppercase">{proj.status}</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tarefas do Sprint</span>
                                        <span className="text-[10px] font-black text-indigo-400">{proj.tasks.filter(t => t.status === 'done').length} / {proj.tasks.length} CONCLUÍDAS</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(proj.tasks.filter(t => t.status === 'done').length / proj.tasks.length) * 100}%` }}></div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    {proj.tasks.map((task) => (
                                        <div key={task.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:border-indigo-500/20 transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${task.status === 'done' ? 'bg-emerald-500' : 'bg-indigo-500 animate-pulse'}`}></div>
                                                <span className={`text-xs font-bold ${task.status === 'done' ? 'text-slate-500' : 'text-white'}`}>{task.title}</span>
                                            </div>
                                            <span className="text-[9px] font-black uppercase text-slate-600 tracking-tighter px-2 py-1 bg-white/5 rounded">{task.priority}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
