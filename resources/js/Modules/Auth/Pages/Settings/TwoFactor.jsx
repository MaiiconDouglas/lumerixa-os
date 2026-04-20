import React, { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import DashboardLayout from '@/Core/Layouts/DashboardLayout';

export default function TwoFactor({ qrCodeUrl, secret, enabled }) {
    const { post, delete: destroy, processing, errors } = useForm({
        code: '',
    });

    const [showConfirm, setShowConfirm] = useState(false);

    const handleEnable = () => {
        setShowConfirm(true);
    };

    const handleConfirm = (e) => {
        e.preventDefault();
        post(route('2fa.confirm'));
    };

    const handleDisable = () => {
        if (confirm('Tem certeza que deseja desativar a proteção 2FA? Isso reduzirá a segurança da sua conta.')) {
            destroy(route('2fa.disable'));
        }
    };

    return (
        <DashboardLayout title="Segurança 2FA">
            <Head title="Segurança 2FA" />
            
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden relative">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
                    
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white mb-2">Autenticação de Dois Fatores (2FA)</h2>
                        <p className="text-gray-300 mb-8 max-w-2xl">
                            Adicione uma camada extra de segurança à sua conta usando um aplicativo de autenticação (como Google Authenticator ou Microsoft Authenticator).
                        </p>

                        {!enabled ? (
                            <div className="space-y-8">
                                {!showConfirm ? (
                                    <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl">
                                        <div className="flex items-start">
                                            <div className="bg-blue-500 p-3 rounded-xl mr-4 shadow-lg shadow-blue-500/30">
                                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-white mb-1">2FA Desativado</h3>
                                                <p className="text-gray-400 text-sm mb-4">Sua conta está menos protegida. Recomenda-se ativar o 2FA agora.</p>
                                                <button 
                                                    onClick={handleEnable}
                                                    className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-amber-500/20 active:scale-95"
                                                >
                                                    Ativar Proteção 2FA
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-5 duration-500">
                                        <div className="space-y-6">
                                            <div className="p-4 bg-white rounded-2xl shadow-xl shadow-black/50 overflow-hidden w-fit">
                                                <div dangerouslySetInnerHTML={{ __html: qrCodeUrl }} className="w-48 h-48" />
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-sm font-medium text-gray-400">Chave de Configuração Manual:</p>
                                                <div className="bg-black/40 border border-white/10 p-3 rounded-xl font-mono text-amber-500 text-sm break-all flex justify-between items-center group">
                                                    {secret}
                                                    <button className="text-gray-500 hover:text-white transition-colors" onClick={() => navigator.clipboard.writeText(secret)}>
                                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <h4 className="text-xl font-semibold text-white mb-2">Configure seu App</h4>
                                                <ol className="list-decimal list-inside text-gray-400 space-y-3 text-sm">
                                                    <li>Abra seu aplicativo de autenticação.</li>
                                                    <li>Digitalize o código QR ao lado ou insira a chave manual.</li>
                                                    <li>Digite o código de 6 dígitos gerado pelo app abaixo.</li>
                                                </ol>
                                            </div>

                                            <form onSubmit={handleConfirm} className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-1">Código de Confirmação</label>
                                                    <input 
                                                        type="text" 
                                                        maxLength="6"
                                                        value={data.code}
                                                        onChange={e => setData('code', e.target.value)}
                                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all placeholder:text-gray-600"
                                                        placeholder="000000"
                                                    />
                                                    {errors.code && <p className="mt-2 text-sm text-red-400 font-medium font-inter">{errors.code}</p>}
                                                </div>
                                                <button 
                                                    disabled={processing}
                                                    className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-[0.98] disabled:opacity-50"
                                                >
                                                    {processing ? 'Confirmando...' : 'Confirmar e Ativar'}
                                                </button>
                                                <button 
                                                    type="button"
                                                    onClick={() => setShowConfirm(false)}
                                                    className="w-full text-gray-500 hover:text-gray-300 text-sm py-2 transition-colors"
                                                >
                                                    Cancelar
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl">
                                <div className="flex items-start">
                                    <div className="bg-emerald-500 p-3 rounded-xl mr-4 shadow-lg shadow-emerald-500/30">
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-1">Proteção Total Ativa</h3>
                                        <p className="text-gray-400 text-sm mb-4">Sua conta está protegida por 2FA. Seus dados estão em conformidade com o padrão militar de segurança.</p>
                                        <button 
                                            onClick={handleDisable}
                                            className="px-6 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl text-sm font-semibold transition-all border border-red-500/20"
                                        >
                                            Desativar Autenticação
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
