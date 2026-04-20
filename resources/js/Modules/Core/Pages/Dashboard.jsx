import { Head, Link } from '@inertiajs/react';
import AppLayout from "@/Core/Layouts/AppLayout";
import { ArrowUpRight, ArrowDownRight, Zap, Target, Layers, ShieldCheck } from 'lucide-react';

export default function Dashboard({ auth, stats }) {
    return (
        <AppLayout title="Centro de Comando">
            <Head title="Lumerixa OS - Command Center" />

            <div className="max-w-7xl mx-auto space-y-10">
                {/* Hero / Welcome Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                    <div>
                        <h2 className="heading-signature text-3xl mb-2">
                            Bem-vindo, <span className="text-[#f53003]">{auth.user.name.split(' ')[0]}</span>
                        </h2>
                        <p className="text-zinc-500 font-medium text-sm">
                            Seu ecossistema operacional está sincronizado com <span className="text-zinc-900 dark:text-zinc-100 font-bold">Lumerixa Shield v4.0</span>.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Sistemas Operacionais</span>
                        </div>
                    </div>
                </div>

                {/* Main KPIs Bar */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <MetricCard
                        title="Vendas & Leads"
                        value={stats.crm?.leads_count || 0}
                        trend="+14%"
                        trendUp={true}
                        subtitle="Impacto no Pipeline"
                        icon={Target}
                        color="orange"
                    />
                    <MetricCard
                        title="Liquidez Atual"
                        value={`R$ ${(stats.erp?.balance || 0).toLocaleString()}`}
                        trend={`R$ ${(stats.erp?.income || 0).toLocaleString()}`}
                        trendUp={true}
                        subtitle="Saldo Consolidado"
                        icon={Layers}
                        color="lume"
                    />
                    <div className="lume-glass p-8 rounded-[2rem] border-zinc-200 dark:border-zinc-800/50 flex flex-col justify-between bg-zinc-950 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <ShieldCheck size={120} />
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-6">Lumerixa AI Insight</h3>
                            <p className="text-sm font-medium leading-relaxed italic">
                                "Nexus Forge operando com eficiência. O módulo de RH sugere expansão da equipe técnica para suprir a demanda do canal de vendas."
                            </p>
                        </div>
                        <Link href="#" className="relative z-10 text-[10px] font-black text-[#f53003] uppercase tracking-widest mt-8 hover:text-white transition-colors">
                            Ver Relatório Analítico →
                        </Link>
                    </div>
                </div>

                {/* Secondary Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Activities / Projects */}
                    <div className="lume-glass p-8 rounded-[2.5rem]">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="heading-signature text-lg italic">Acesso Rápido ao Ecossistema</h3>
                            <Link href="#" className="text-[10px] font-black text-zinc-400 hover:text-[#f53003] transition-colors uppercase tracking-widest">Ver Todos</Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <SystemLink href={route('projects')} title="Projetos" subtitle="Roadmap & Sprints" icon="🚀" />
                            <SystemLink href={route('crm')} title="CRM" subtitle="Vendas & Clientes" icon="🎯" />
                            <SystemLink href={route('erp')} title="ERP Financeiro" subtitle="Controle de Caixa" icon="📊" />
                            <SystemLink href={route('hr')} title="Recursos Humanos" subtitle="Gestão de Talentos" icon="👥" />
                        </div>
                    </div>

                    {/* Security Access Log */}
                    <div className="lume-glass p-8 rounded-[2.5rem]">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="heading-signature text-lg italic">Segurança & Auditoria</h3>
                            <ShieldCheck size={20} className="text-zinc-300 dark:text-zinc-700" />
                        </div>
                        <div className="space-y-4">
                            <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex items-center justify-between group hover:border-[#f5300344] transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 text-xs font-black">SEC</div>
                                    <div>
                                        <p className="text-xs font-bold">Sessão Iniciada com Sucesso</p>
                                        <p className="text-[10px] text-zinc-500 uppercase font-medium">IP: 189.62.12.4</p>
                                    </div>
                                </div>
                                <span className="text-[10px] text-zinc-400 font-mono">11:15 AM</span>
                            </div>
                            <div className="p-4 border border-zinc-100 dark:border-zinc-800 rounded-2xl flex items-center justify-between opacity-50">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 text-xs font-black">LOG</div>
                                    <div>
                                        <p className="text-xs font-bold">Alteração de Permissões</p>
                                        <p className="text-[10px] text-zinc-500 uppercase font-medium">Core Module</p>
                                    </div>
                                </div>
                                <span className="text-[10px] text-zinc-400 font-mono">09:42 AM</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function MetricCard({ title, value, trend, trendUp, subtitle, icon: Icon, color }) {
    const colorMap = {
        orange: 'text-orange-500 bg-orange-500/10 border-orange-500/20',
        lume: 'text-[#f53003] bg-[#f5300310] border-[#f5300320]',
    };

    return (
        <div className="lume-glass lume-card p-8 rounded-[2.5rem]">
            <div className="flex items-center justify-between mb-8">
                <div className={`p-4 rounded-2xl border ${colorMap[color] || 'text-zinc-500 bg-zinc-100'}`}>
                    <Icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-black ${trendUp ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {trendUp ? <ArrowUpRight size={14} strokeWidth={3} /> : <ArrowDownRight size={14} strokeWidth={3} />}
                    {trend}
                </div>
            </div>
            <div>
                <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-2">{title}</h4>
                <p className="text-4xl font-extrabold tracking-tighter text-zinc-900 dark:text-white mb-2">{value}</p>
                <p className="text-[10px] font-bold text-zinc-500 uppercase italic tracking-wider">{subtitle}</p>
            </div>
        </div>
    );
}

function SystemLink({ href, title, subtitle, icon }) {
    return (
        <Link href={href} className="p-6 bg-white dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800 rounded-3xl flex items-center gap-4 hover:border-[#f5300344] hover:-translate-y-1 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-sm">
                {icon}
            </div>
            <div>
                <h4 className="text-xs font-black uppercase tracking-tight text-zinc-900 dark:text-white">{title}</h4>
                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">{subtitle}</p>
            </div>
        </Link>
    );
}
