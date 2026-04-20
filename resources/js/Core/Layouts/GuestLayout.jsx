import React from 'react';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] flex p-6 lg:p-8 items-center lg:justify-center flex-col font-sans selection:bg-[#f53003] selection:text-white">
            <header className="w-full lg:max-w-4xl max-w-[335px] text-sm mb-6 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold tracking-tighter text-[#1b1b18] dark:text-white">
                    Lumerixa<span className="text-[#f53003]">OS</span>
                </Link>
                <nav className="flex items-center gap-4">
                    <Link href="/login" className="text-xs font-bold text-zinc-500 hover:text-[#f53003] transition-colors uppercase tracking-widest">
                        Entrar
                    </Link>
                </nav>
            </header>

            <main className="w-full max-w-[335px] lg:max-w-4xl flex flex-col items-center">
                {children}
            </main>

            <footer className="mt-8 text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                &copy; {new Date().getFullYear()} Lumerixa OS • Protocolo de Segurança Ativo
            </footer>
        </div>
    );
}
