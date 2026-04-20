import React from 'react';
import { Head, usePage, Link } from '@inertiajs/react';
import { LayoutDashboard, Target, BarChart3, Users, Scale, Rocket, LogOut, Bell, Search, Briefcase, Settings } from 'lucide-react';

const NavItem = ({ href, icon: Icon, label, method = 'get', color = 'text-zinc-500' }) => {
    const isActive = window.location.pathname === href;
    return (
        <Link
            href={href}
            method={method}
            as={method === 'post' ? 'button' : 'a'}
            className={`flex items-center gap-4 w-full p-3 rounded-2xl transition-all group/item ${isActive
                    ? 'bg-[#f53003] text-white shadow-lg shadow-[#f5300333]'
                    : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
        >
            <span className={`flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-110`}>
                <Icon size={20} strokeWidth={isActive ? 3 : 2} />
            </span>
            <span className={`font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap overflow-hidden ${isActive ? 'w-auto opacity-100' : 'w-0 opacity-0 group-hover:w-auto group-hover:opacity-100 group-hover:pl-2'}`}>
                {label}
            </span>
        </Link>
    );
};

export default function AppLayout({ children, title }) {
    const { auth, activeTenant } = usePage().props;

    return (
        <div className="min-h-screen bg-[#FDFDFC] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans selection:bg-[#f53003] selection:text-white">
            <Head title={title ? `${title} - Lumerixa OS` : 'Lumerixa OS'} />

            {/* Background Texture */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] z-50"></div>

            {/* Signature Floating Sidebar */}
            <aside className="fixed left-4 top-4 bottom-4 w-20 hover:w-64 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 z-[60] transition-all duration-500 rounded-[2.5rem] flex flex-col shadow-2xl shadow-black/5 group overflow-hidden">
                <div className="h-full flex flex-col p-4">
                    <div className="flex items-center gap-4 mb-12 px-2 mt-2">
                        <div className="w-10 h-10 rounded-2xl bg-[#f53003] flex items-center justify-center shrink-0 shadow-lg shadow-[#f5300344]">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                        <span className="font-extrabold text-lg italic tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Lumerixa<span className="text-[#f53003]">OS</span>
                        </span>
                    </div>

                    <nav className="flex-1 space-y-4">
                        <NavItem href={route('dashboard')} icon={LayoutDashboard} label="Visão Geral" />
                        <div className="h-[1px] bg-zinc-200/50 dark:bg-zinc-800/50 mx-2 my-2"></div>
                        <NavItem href={route('crm')} icon={Target} label="Vendas & CRM" />
                        <NavItem href={route('erp')} icon={BarChart3} label="Financeiro" />
                        <NavItem href={route('hr')} icon={Users} label="RH & Equipe" />
                        <NavItem href={route('legal')} icon={Scale} label="Conformidade" />
                        <NavItem href={route('projects')} icon={Rocket} label="Ecossistemas" />
                        <div className="h-[1px] bg-zinc-200/50 dark:bg-zinc-800/50 mx-2 my-2"></div>
                        <NavItem href={route('profile.edit')} icon={Settings} label="Meu Perfil" />
                    </nav>

                    <div className="pt-6 border-t border-zinc-200/50 dark:border-zinc-800/50 mt-auto">
                        <NavItem href={route('logout')} method="post" icon={LogOut} label="Sair do OS" color="text-rose-500" />
                    </div>
                </div>
            </aside>

            {/* Main Wrapper */}
            <div className="lg:pl-28 transition-all duration-500">
                {/* Header */}
                <header className="h-20 flex items-center justify-between px-8 bg-[#FDFDFC]/80 dark:bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="flex items-center gap-6">
                        <h1 className="heading-signature text-xl italic">{title}</h1>
                        {activeTenant && (
                            <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
                                <Briefcase size={14} className="text-[#f53003]" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{activeTenant.name}</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800 rounded-2xl">
                            <Search size={14} className="text-zinc-400" />
                            <input type="text" placeholder="Prompt Lumerixa..." className="bg-transparent border-none focus:ring-0 text-xs w-48 text-zinc-500 placeholder:text-zinc-500" />
                        </div>

                        <div className="relative">
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#f53003] rounded-full ring-4 ring-white dark:ring-zinc-950 shadow-lume"></div>
                            <Bell size={20} className="text-zinc-400 hover:text-[#f53003] transition-colors cursor-pointer" />
                        </div>

                        <Link href={route('profile.edit')} className="flex items-center gap-3 pl-6 border-l border-zinc-100 dark:border-zinc-800 hover:opacity-70 transition-opacity">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-black leading-none">{auth?.user?.name || 'Membro'}</p>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase mt-1 tracking-tighter">Soberania Ativa</p>
                            </div>
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#f53003] to-orange-400 p-[2px] shadow-lg shadow-[#f5300333]">
                                <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-[calc(1rem-2px)] flex items-center justify-center text-xs font-black">
                                    {auth?.user?.name?.[0] || 'L'}
                                </div>
                            </div>
                        </Link>
                    </div>
                </header>

                <main className="p-8 pb-24">
                    {children}
                </main>
            </div>
        </div>
    );
}
