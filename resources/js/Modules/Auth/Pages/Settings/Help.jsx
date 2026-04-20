import React from 'react';
import { Head } from '@inertiajs/react';
import SettingsLayout from "@/Modules/Auth/Layouts/SettingsLayout";
import { 
    HelpCircle, 
    PlayCircle, 
    BookOpen, 
    MessageSquare, 
    LifeBuoy,
    ExternalLink,
    Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Help() {
    const resources = [
        {
            title: "Tour de Onboarding",
            desc: "Reinicie o guia interativo para redescobrir as funcionalidades mestre do Lumerixa OS.",
            icon: PlayCircle,
            action: () => alert("Tour reiniciado! Redirecionando para o Dashboard..."),
            color: "text-[#f53003]",
            bg: "bg-[#f5300311]",
            button: "Iniciar Tour"
        },
        {
            title: "Documentação Técnica",
            desc: "Acesse o repositório de conhecimento completo sobre módulos, APIs e regras de negócio.",
            icon: BookOpen,
            action: () => window.open('https://docs.lumerixa.com', '_blank'),
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            button: "Explorar Docs"
        },
        {
            title: "Suporte Direto",
            desc: "Fale com o time de engenharia para resoluções de alta prioridade ou dúvidas complexas.",
            icon: MessageSquare,
            action: () => window.open('https://support.lumerixa.com', '_blank'),
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            button: "Abrir Chamado"
        }
    ];

    return (
        <SettingsLayout title="Centro de Comando e Ajuda">
            <Head title="Ajuda e Suporte - Lumerixa OS" />

            <div className="space-y-8 pb-20">
                {/* Hero Help Section */}
                <div className="relative bg-[#ffffff] dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-[3rem] p-12 shadow-sm overflow-hidden">
                    <div className="absolute -right-20 -bottom-20 opacity-[0.03] pointer-events-none">
                        <LifeBuoy size={400} className="text-slate-900 dark:text-white" />
                    </div>
                    
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f5300311] text-[#f53003] rounded-full text-[8px] font-black uppercase tracking-[0.2em] mb-6 border border-[#f5300322]">
                            <Zap size={10} /> Central de Inteligência
                        </div>
                        <h3 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight mb-4">
                            Como podemos otimizar sua <span className="text-[#f53003]">Soberania?</span>
                        </h3>
                        <p className="text-slate-500 font-bold italic uppercase tracking-wider text-[10px]">
                            Seu ecossistema está operacional. Explore os recursos abaixo para máxima eficiência.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {resources.map((item, idx) => (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all group"
                        >
                            <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <item.icon size={28} />
                            </div>
                            <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white mb-3 italic">{item.title}</h4>
                            <p className="text-[11px] text-slate-400 font-bold leading-relaxed mb-8">{item.desc}</p>
                            <button 
                                onClick={item.action}
                                className="w-full py-4 bg-slate-50 dark:bg-zinc-900/50 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-[#f53003] hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                {item.button} <ExternalLink size={12} />
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ Quick Links */}
                <div className="bg-slate-900 dark:bg-white p-10 rounded-[3rem] text-white dark:text-black">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h4 className="text-xl font-black tracking-tighter uppercase mb-2 italic">Dúvidas Frequentes</h4>
                            <p className="text-[10px] opacity-60 font-bold uppercase tracking-widest">Respostas instantâneas para os protocolos mais comuns.</p>
                        </div>
                        <Link 
                            href="#" 
                            className="px-8 py-4 bg-[#f53003] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black dark:hover:bg-slate-900 dark:hover:text-white transition-all"
                        >
                            Ver FAQ Completo
                        </Link>
                    </div>
                </div>
            </div>
        </SettingsLayout>
    );
}
