import React from 'react';
import { Link, Head } from '@inertiajs/react';

export default function Error({ status, message }) {
    const title = {
        503: '503: Serviço Indisponível',
        500: '500: Erro de Servidor',
        404: '404: Não Encontrado',
        403: '403: Proibido',
    }[status] || 'Error';

    const description = {
        503: 'Desculpe, estamos fazendo uma manutenção rápida. Voltaremos em breve.',
        500: 'Opa, algo quebrou nos nossos servidores. Nossa equipe já foi notificada.',
        404: 'Parece que o caminho que você tentou acessar não existe no Lumerixa OS.',
        403: 'Acesso Negado. Você não possui as credenciais ou vínculos necessários para este setor.',
    }[status] || 'Ocorreu um erro inesperado.';

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 font-sans overflow-hidden relative">
            <Head title={title} />
            
            {/* Elementos Decorativos de Background (Lumerixa Style) */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#f53003] opacity-[0.03] blur-[120px] rounded-full"></div>
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#f53003] opacity-[0.03] blur-[120px] rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#f5300315] to-transparent"></div>
            </div>

            <div className="max-w-xl w-full relative z-10">
                <div className="text-center">
                    {/* Logotipo Minimalista */}
                    <Link href="/" className="inline-block mb-12 transform hover:scale-105 transition-transform">
                        <span className="text-3xl font-black tracking-tighter text-white">
                            Lumerixa<span className="text-[#f53003]">OS</span>
                        </span>
                    </Link>

                    {/* Card de Erro Innovation */}
                    <div className="bg-[#161615] border border-[#f5300322] p-12 rounded-2xl shadow-2xl backdrop-blur-xl relative group">
                        {/* Indicador de Status */}
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                            <div className="bg-[#f53003] text-white px-6 py-2 rounded-full text-sm font-black tracking-[0.2em] shadow-xl shadow-[#f5300333]">
                                STATUS {status}
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-none mt-4 uppercase">
                            {title.split(':')[1]?.trim() || title}
                        </h1>
                        
                        <p className="text-[#A1A09A] text-sm leading-relaxed mb-10 max-w-sm mx-auto font-medium">
                            {message || description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                href="/" 
                                className="px-8 py-3 bg-[#f53003] hover:bg-[#d62a02] text-white rounded-lg text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
                            >
                                Voltar ao Início
                            </Link>
                            <Link 
                                href="/login" 
                                className="px-8 py-3 border border-[#3E3E3A] hover:border-[#f5300355] text-white rounded-lg text-xs font-black uppercase tracking-widest transition-all active:scale-95 bg-white/5"
                            >
                                Reautenticar
                            </Link>
                        </div>
                    </div>

                    {/* Footer Info */}
                    <p className="mt-8 text-[10px] text-[#3E3E3A] uppercase tracking-[0.3em] font-bold">
                        Protocolo de Rede: Lumerixa-Node-{Math.random().toString(36).substring(7).toUpperCase()}
                    </p>
                </div>
            </div>
        </div>
    );
}
