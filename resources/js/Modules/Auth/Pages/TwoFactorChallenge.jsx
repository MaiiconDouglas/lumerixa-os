import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import GuestLayout from '@/Core/Layouts/GuestLayout';

export default function TwoFactorChallenge() {
    const { data, setData, post, processing, errors } = useForm({
        code: '',
        recovery_code: '',
    });

    const [isRecovery, setIsRecovery] = React.useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('2fa.verify'));
    };

    return (
        <GuestLayout>
            <Head title="Verificação de Duas Etapas" />

            <div className="w-full max-w-md mx-auto space-y-8 p-8 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-3xl relative overflow-hidden">
                {/* Visual Identity / Security Shield */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-amber-500 rounded-3xl flex items-center justify-center mb-6 shadow-2xl shadow-amber-500/20 animate-pulse">
                        <svg className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Segurança Extra</h2>
                    <p className="mt-3 text-gray-400 text-sm leading-relaxed px-4">
                        {isRecovery 
                            ? 'Insira um dos códigos de recuperação gerados anteriormente para acessar sua conta.' 
                            : 'Confirme sua identidade inserindo o código de 6 dígitos gerado pelo seu aplicativo de autenticação.'}
                    </p>
                </div>

                <form onSubmit={submit} className="mt-8 space-y-6">
                    <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 mb-2 block">
                            {isRecovery ? 'Código de Recuperação' : 'Código de Autenticação'}
                        </label>
                        <div className="relative group">
                            <input
                                type="text"
                                name="code"
                                value={isRecovery ? data.recovery_code : data.code}
                                onChange={(e) => setData(isRecovery ? 'recovery_code' : 'code', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-xl tracking-[0.5em] text-center font-mono text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all group-hover:border-white/20"
                                placeholder={isRecovery ? "XXXXX-XXXXX" : "000000"}
                                autoFocus
                                autoComplete="one-time-code"
                            />
                            <div className="absolute inset-0 rounded-2xl bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                        </div>
                        {errors.code && <p className="mt-2 text-sm text-red-500 font-medium font-inter">{errors.code}</p>}
                    </div>

                    <div className="space-y-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full py-4 bg-white text-black font-black text-lg rounded-2xl shadow-xl shadow-white/10 hover:bg-gray-200 transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                            {processing ? 'Validando...' : 'Acessar Workspace'}
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsRecovery(!isRecovery)}
                            className="w-full text-center text-sm font-semibold text-gray-500 hover:text-white transition-colors py-2"
                        >
                            {isRecovery ? 'Usar código do aplicativo' : 'Não tenho meu celular? Usar código de recuperação'}
                        </button>
                    </div>
                </form>

                <div className="pt-4 text-center">
                    <Link href={route('login')} className="text-xs text-gray-600 hover:text-gray-400 transition-colors uppercase tracking-widest font-bold">
                        Voltar para o Login
                    </Link>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
            </div>
        </GuestLayout>
    );
}
