import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import AppLayout from "@/Core/Layouts/AppLayout";
import { 
    User, 
    Building2, 
    ShieldCheck, 
    Bell, 
    Palette, 
    ChevronRight,
    BadgeCheck,
    HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

// Refatoração Signature - Estabilidade de Iconografia

export default function SettingsLayout({ children, title }) {
    const { url, props } = usePage();
    const { activeTenant } = props;

    const navigation = [
        { 
            name: 'Pessoa (Soberania)', 
            href: route('profile.edit'), 
            icon: User, 
            active: url.startsWith('/settings/profile') 
        },
        { 
            name: 'Privacidade (Blindagem)', 
            href: route('settings.privacy'), 
            icon: ShieldCheck, 
            active: url.startsWith('/settings/privacy') 
        },
        { 
            name: 'Empresa (Organização)', 
            href: route('organization.edit'), 
            icon: Building2, 
            active: url.startsWith('/settings/organization'),
            show: !!activeTenant // Apenas mostra se houver tenant ativo
        },
        { 
            name: 'Ajuda', 
            href: route('settings.help'), 
            icon: HelpCircle, 
            active: url.startsWith('/settings/help') 
        },
    ];

    return (
        <AppLayout title={title}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col lg:flex-row gap-10">
                    
                    {/* Navigation Sidebar */}
                    <div className="lg:w-72 shrink-0">
                        <div className="sticky top-10 space-y-2">
                            <div className="px-4 mb-6">
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-zinc-600 italic">Ecosistema de Gestão</h2>
                            </div>
                            
                            <nav className="space-y-1">
                                {navigation.map((item) => (
                                    (item.show !== false) && (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`group flex items-center justify-between px-4 py-4 rounded-2xl transition-all duration-300 ${
                                                item.active 
                                                ? 'bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm' 
                                                : 'hover:bg-slate-100 dark:hover:bg-zinc-900/50 text-slate-500'
                                            }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`p-2 rounded-xl transition-colors ${
                                                    item.active ? 'bg-[#f53003] text-white' : 'bg-slate-100 dark:bg-zinc-800 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                                                }`}>
                                                    <item.icon size={18} />
                                                </div>
                                                <span className={`text-[11px] font-black uppercase tracking-widest ${item.active ? 'text-slate-900 dark:text-white' : ''}`}>
                                                    {item.name}
                                                </span>
                                            </div>
                                            {item.active && <ChevronRight size={14} className="text-[#f53003]" />}
                                        </Link>
                                    )
                                ))}
                            </nav>

                            {/* Status Card */}
                            <div className="mt-10 p-6 bg-[#f5300311] border border-[#f5300322] rounded-[2rem] relative overflow-hidden">
                                <div className="absolute -right-4 -bottom-4 opacity-5">
                                    <BadgeCheck size={80} />
                                </div>
                                <h4 className="text-[9px] font-black uppercase tracking-widest text-[#f53003] mb-2">Status da Blindagem</h4>
                                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-800 dark:text-white">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    Protocolo Seguro Ativo
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 min-w-0">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {children}
                        </motion.div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
