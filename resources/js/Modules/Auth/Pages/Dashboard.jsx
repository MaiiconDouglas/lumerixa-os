import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import DashboardLayout from '@/Core/Layouts/DashboardLayout';
import { Card } from '@/Core/Components/Molecules/Card';
import { Layout, Shield, Target, Users as UsersIcon } from 'lucide-react';

export default function Dashboard({ stats }) {
    const { auth, activeTenant } = usePage().props;
    const isPF = (activeTenant?.profile_type || stats?.profile_type) === 'PF';

    return (
        <DashboardLayout title="Portal de Controle">
            <Head title="Dashboard - Lumerixa OS" />

            <div className="max-w-6xl mx-auto space-y-10">
                {/* Greeting Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="heading-signature text-3xl mb-1 italic">
                            Saudações, <span className="text-[#f53003] uppercase">{auth.user.name.split(' ')[0]}</span>
                        </h2>
                        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">
                            Domínio atual: <span className="text-zinc-900 dark:text-white">{activeTenant?.name || stats?.tenant_name}</span>
                        </p>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                        <Shield size={20} className="text-[#f53003] shadow-lume" />
                    </div>
                </div>

                {isPF && (
                    <div className="p-8 lume-glass bg-gradient-to-r from-[#f5300310] via-transparent to-transparent rounded-[2.5rem] border-[#f5300330] flex flex-col md:flex-row justify-between items-center gap-6">
                        <div>
                            <h4 className="font-black uppercase tracking-tighter text-lg italic italic">Evolua seu <span className="text-[#f53003]">Workspace</span></h4>
                            <p className="text-xs text-zinc-500 font-medium mt-1">Desbloqueie módulos PJ e inteligência avançada migrando seu perfil hoje.</p>
                        </div>
                        <button
                            onClick={() => window.location.href = '/workspaces/create'}
                            className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#f53003] hover:text-white transition-all active:scale-95"
                        >
                            Ativar Ecossistema PJ
                        </button>
                    </div>
                )}

                {/* Grid of Interactive Modules */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ModuleCard
                        title="Equipe & Talentos"
                        description={`Existem ${stats?.members_count || 0} membros sincronizados.`}
                        icon={UsersIcon}
                        link="/members"
                    />

                    <ModuleCard
                        title="Finanças SaaS"
                        description="Módulo restrito a contas Enterprise."
                        icon={Target}
                        disabled={true}
                        disabledMessage="Disponível apenas para PJ"
                    />

                    <ModuleCard
                        title="Protocolos & Docs"
                        description="Central de documentação técnica."
                        icon={Layout}
                        link="#"
                    />
                </div>
            </div>
        </DashboardLayout>
    );
}

function ModuleCard({ title, description, icon: Icon, link, disabled, disabledMessage }) {
    return (
        <div className={`lume-glass p-8 rounded-[2rem] lume-card ${disabled ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
            <div className="flex items-center justify-between mb-8">
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800">
                    <Icon size={20} className="text-zinc-400" />
                </div>
                {disabled && (
                    <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded shadow-sm">{disabledMessage}</span>
                )}
            </div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-white mb-2">{title}</h4>
            <p className="text-xs text-zinc-500 font-medium leading-relaxed">{description}</p>
            {!disabled && (
                <Link href={link} className="mt-8 text-[9px] font-black text-[#f53003] uppercase tracking-widest hover:text-zinc-900 dark:hover:text-white transition-colors block">
                    Acessar Módulo →
                </Link>
            )}
        </div>
    );
}
