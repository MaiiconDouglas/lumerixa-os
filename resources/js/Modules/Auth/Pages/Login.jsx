import React from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] flex p-6 lg:p-8 items-center lg:justify-center min-h-screen flex-col font-sans selection:bg-[#f53003] selection:text-white">
            <header className="w-full lg:max-w-4xl max-w-[335px] text-sm mb-6 flex justify-between items-center">
                 <Link href="/" className="text-2xl font-bold tracking-tighter text-[#1b1b18] dark:text-white">
                    Lumerixa<span className="text-[#f53003]">OS</span>
                 </Link>
                 <nav className="flex items-center gap-4">
                    <Link href="/register" className="inline-block px-5 py-1.5 dark:text-[#EDEDEC] border-[#19140035] hover:border-[#1915014a] border text-[#1b1b18] dark:border-[#3E3E3A] dark:hover:border-[#62605b] rounded-sm text-sm leading-normal">
                        Registrar
                    </Link>
                 </nav>
            </header>

            <main className="flex max-w-[335px] w-full flex-col lg:max-w-4xl lg:flex-row shadow-2xl rounded-lg overflow-hidden border border-[#e3e3e0] dark:border-[#3E3E3A]">
                <div className="bg-[#fff2f2] dark:bg-[#1D0002] lg:w-1/2 p-10 relative flex flex-col justify-center overflow-hidden">
                    <svg className="w-full text-[#F53003] dark:text-[#F61500] opacity-10 absolute -bottom-10 -left-10 transform rotate-12" viewBox="0 0 438 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.2036 -3H0V102.197H49.5189V86.7187H17.2036V-3Z" fill="currentColor" />
                    </svg>
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold dark:text-white mb-4 tracking-tighter">Bem-vindo de volta ao <br/><span className="text-[#f53003]">Controle Central</span></h2>
                        <p className="text-sm text-[#706f6c] dark:text-[#A1A09A] max-w-xs leading-relaxed">
                            Acesse seu workspace corporativo com a segurança do protocolo Lumerixa.
                        </p>
                    </div>
                </div>

                <div className="flex-1 p-10 bg-white dark:bg-[#161615] dark:text-[#EDEDEC]">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">E-mail Corporativo</label>
                            <input 
                                type="email" 
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0a0a0a] border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-md focus:ring-2 focus:ring-[#f53003] outline-none transition-all"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && <p className="text-[#f53003] text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Senha</label>
                                <Link href="#" className="text-[10px] text-[#f53003] underline">Esqueceu a senha?</Link>
                            </div>
                            <input 
                                type="password" 
                                className="w-full px-4 py-3 bg-gray-50 dark:bg-[#0a0a0a] border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-md focus:ring-2 focus:ring-[#f53003] outline-none transition-all"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                required
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input 
                                type="checkbox" 
                                id="remember"
                                className="w-4 h-4 rounded border-[#e3e3e0] text-[#f53003] focus:ring-[#f53003]"
                                checked={data.remember}
                                onChange={e => setData('remember', e.target.checked)}
                            />
                            <label htmlFor="remember" className="text-xs text-[#706f6c] dark:text-[#A1A09A]">Manter sessão ativa</label>
                        </div>

                        <button 
                            type="submit" 
                            disabled={processing}
                            className="w-full py-4 bg-[#f53003] hover:bg-[#d62a02] text-white rounded-md shadow-xl shadow-[#f530031a] font-black text-xs uppercase tracking-[0.2em] transition-all transform active:scale-[0.98] disabled:opacity-50"
                        >
                            {processing ? 'Autenticando...' : 'Entrar no Sistema'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
