import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, Users, CreditCard, Settings, LogOut, Search, Bell } from 'lucide-react';

export default function DashboardLayout({ children, title }) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-[#FDFDFC] dark:bg-[#09090b] font-sans selection:bg-[#f53003] selection:text-white text-zinc-900 dark:text-zinc-100">
            {/* Background Grain/Noise Effect */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] z-50"></div>

            {/* Sidebar */}
            <aside className="fixed left-4 top-4 bottom-4 w-64 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-[2rem] p-6 z-20 hidden lg:flex flex-col shadow-2xl shadow-black/5">
                <div className="flex items-center gap-3 mb-12 px-2">
                    <div className="w-8 h-8 bg-[#f53003] rounded-xl flex items-center justify-center shadow-lg shadow-[#f5300344]">
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    </div>
                    <span className="font-extrabold tracking-tighter text-lg italic text-zinc-900 dark:text-white">
                        Lumerixa<span className="text-[#f53003]">OS</span>
                    </span>
                </div>

                <nav className="flex-1 space-y-1.5">
                    <SidebarLink href="/dashboard" label="Visão Geral" icon={LayoutDashboard} />
                    <SidebarLink href="/members" label="Equipe & Talentos" icon={Users} />
                    <SidebarLink href="/financeiro" label="Fluxo Financeiro" icon={CreditCard} />
                    
                    <div className="pt-6 mt-6 border-t border-zinc-200/50 dark:border-zinc-800/50">
                        <span className="px-4 text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-4 block">Configurações</span>
                        <SidebarLink href="/settings/profile" label="Perfil & Conta" icon={Settings} />
                    </div>
                </nav>

                <div className="mt-auto pt-6 border-t border-zinc-200/50 dark:border-zinc-800/50">
                    <Link href="/logout" method="post" as="button" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-zinc-500 hover:text-rose-500 hover:bg-rose-500/5 transition-all w-full text-left">
                        <LogOut size={16} />
                        Sair do Sistema
                    </Link>
                </div>
            </aside>

            {/* Content Area */}
            <div className="lg:pl-72 transition-all">
                {/* Topbar */}
                <header className="sticky top-0 h-20 flex items-center justify-between px-8 z-10 bg-[#FDFDFC]/80 dark:bg-[#09090b]/80 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <h1 className="heading-signature text-xl italic">{title}</h1>
                        <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800"></div>
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">v4.0.0</span>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl">
                            <Search size={14} className="text-zinc-400" />
                            <input type="text" placeholder="Buscar no ecossistema..." className="bg-transparent border-none focus:ring-0 text-xs w-48 text-zinc-500 placeholder:text-zinc-500" />
                            <span className="text-[10px] font-bold text-zinc-400 border border-zinc-200 dark:border-zinc-800 px-1.5 py-0.5 rounded-md">⌘K</span>
                        </div>
                        
                        <div className="relative">
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#f53003] rounded-full ring-4 ring-white dark:ring-zinc-950"></div>
                            <Bell size={20} className="text-zinc-500 hover:text-[#f53003] transition-colors cursor-pointer" />
                        </div>

                        <Link href={route('profile.edit')} className="flex items-center gap-3 pl-4 border-l border-zinc-200 dark:border-zinc-800 hover:opacity-70 transition-opacity">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-bold leading-none">{auth.user.name}</p>
                                <p className="text-[10px] text-zinc-500 font-medium">Workspace Admin</p>
                            </div>
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#f53003] to-orange-400 p-[2px] shadow-lg shadow-[#f5300333]">
                                <div className="w-full h-full bg-white dark:bg-zinc-900 rounded-[calc(1rem-2px)] flex items-center justify-center text-xs font-black">
                                    {auth.user.name.charAt(0)}
                                </div>
                            </div>
                        </Link>
                    </div>
                </header>

                {/* Main Content */}
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

function SidebarLink({ href, label, icon: Icon }) {
    const isActive = window.location.pathname === href;
    
    return (
        <Link 
            href={href} 
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all group ${
                isActive 
                ? 'bg-[#f53003] text-white shadow-lg shadow-[#f5300344] -translate-y-[1px]' 
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
        >
            <Icon size={18} className={`${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white'}`} strokeWidth={isActive ? 3 : 2} />
            {label}
        </Link>
    );
}
