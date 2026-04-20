import React, { useState, useEffect } from 'react';
import { useForm, Link } from '@inertiajs/react';
import axios from 'axios';

export default function Register() {
    const [sendingCode, setSendingCode] = useState(false);
    const [verifyingCode, setVerifyingCode] = useState(false);
    const [codeSent, setCodeSent] = useState(false);
    const [step, setStep] = useState(1);
    const [isVerified, setIsVerified] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const showToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
    };

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        cpf: '',
        phone: '',
        password: '',
        tenant_name: '',
        cnpj: '',
        cep: '',
        logradouro: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: '',
        complemento: '',
        code: '',
        account_type: 'PJ', // PJ ou PF
    });

    const handleCepChange = async (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        setData('cep', e.target.value);
        if (cep.length === 8) {
            try {
                const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                if (!res.data.erro) {
                    setData(prev => ({
                        ...prev,
                        logradouro: res.data.logradouro,
                        bairro: res.data.bairro,
                        cidade: res.data.localidade,
                        uf: res.data.uf
                    }));
                }
            } catch (err) { console.error("Falha ao buscar CEP"); }
        }
    };

    const handleCpfChange = (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 11) val = val.substring(0, 11);

        // Aplica máscara visual
        let formatted = val;
        if (val.length > 3) formatted = val.substring(0, 3) + '.' + val.substring(3);
        if (val.length > 6) formatted = formatted.substring(0, 7) + '.' + val.substring(6);
        if (val.length > 9) formatted = formatted.substring(0, 11) + '-' + val.substring(9);

        setData('cpf', formatted);
    };

    const handleCnpjChange = async (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 14) val = val.substring(0, 14);

        // Máscara visual CNPJ
        let formatted = val;
        if (val.length > 2) formatted = val.substring(0, 2) + '.' + val.substring(2);
        if (val.length > 5) formatted = formatted.substring(0, 6) + '.' + val.substring(5);
        if (val.length > 8) formatted = formatted.substring(0, 10) + '/' + val.substring(8);
        if (val.length > 12) formatted = formatted.substring(0, 15) + '-' + val.substring(12);

        setData('cnpj', formatted);

        if (val.length === 14) {
            try {
                // Usamos o Proxy do Backend para evitar erros de CORS (Business Rule)
                const response = await axios.get(`/api/proxy/cnpj/${val}`);
                if (response.data) {
                    setData('tenant_name', response.data.razao_social);
                }
            } catch (err) { console.error("Falha ao buscar CNPJ"); }
        }
    };

    const sendVerificationCode = async () => {
        if (!data.email) return alert("Insira o e-mail primeiro.");
        setSendingCode(true);

        // Usando o post do Inertia para manter o estado ou axios se preferir JSON puro sem reload
        try {
            await axios.post(route('register.send-code'), { email: data.email });
            setCodeSent(true);
            showToast("Código enviado! Verifique sua caixa de entrada.", "success");
        } catch (err) {
            showToast(err.response?.data?.message || "Erro ao enviar código.", "error");
        }
        setSendingCode(false);
    };

    const verifyCode = async () => {
        if (!data.code || data.code.length !== 6) return alert("Insira o código de 6 dígitos.");
        setVerifyingCode(true);
        try {
            const res = await axios.post(route('register.verify-code'), { email: data.email, code: data.code });
            if (res.data.success) {
                setIsVerified(true);
                setStep(3); // Libera o passo 3 direto
                showToast("Identidade confirmada! Passo 03 liberado.", "success");
            }
        } catch (err) {
            showToast(err.response?.data?.message || "Código inválido.", "error");
        }
        setVerifyingCode(false);
    };

    const nextStep = (target) => {
        // Validações básicas por passo
        if (step === 1 && (!data.name || !data.cpf)) return alert("Preencha seus dados de identidade.");
        if (step === 3 && (!data.tenant_name)) return alert("Dê um nome ao seu Workspace.");
        setStep(target);
    };

    const submit = (e) => {
        e.preventDefault();
        post('/register', {
            onSuccess: () => showToast("Conta criada! Redirecionando...", "success"),
            // O erro agora é tratado no useEffect para ser reativo
        });
    };

    // Monitor de Erros Globais (Captura erros do Backend que não são de campos específicos)
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            const firstError = Object.values(errors)[0];
            showToast(firstError, "error");

            // AJUSTE UX: Se o erro for no código, reseta o estado de verificação para o usuário tentar de novo sem travar
            if (errors.code) {
                setIsVerified(false);
                setStep(2);
            }
        }
    }, [errors]);

    return (
        <div className="bg-[#FDFDFC] dark:bg-[#0a0a0a] text-[#1b1b18] flex p-6 lg:p-8 items-center lg:justify-center min-h-screen flex-col font-sans selection:bg-[#f53003] selection:text-white">
            <header className="w-full lg:max-w-5xl max-w-[335px] text-sm mb-6 flex justify-between items-center px-4">
                <Link href="/" className="text-2xl font-bold tracking-tighter text-[#1b1b18] dark:text-white">
                    Lumerixa<span className="text-[#f53003]">OS</span>
                </Link>
                <nav className="flex items-center gap-4">
                    <span className="text-xs text-[#706f6c] dark:text-[#A1A09A] hidden sm:block font-bold uppercase tracking-widest">Já tem conta?</span>
                    <Link href="/login" className="inline-block px-5 py-1.5 dark:text-[#EDEDEC] border-[#19140035] hover:border-[#1915014a] border text-[#1b1b18] dark:border-[#3E3E3A] dark:hover:border-[#62605b] rounded-sm text-sm leading-normal">
                        Entrar
                    </Link>
                </nav>
            </header>

            <main className="flex max-w-[335px] w-full flex-col lg:max-w-5xl lg:flex-row shadow-2xl rounded-lg overflow-hidden border border-[#e3e3e0] dark:border-[#3E3E3A]">
                {/* Lado Esquerdo - Info (Design Welcome) */}
                <div className="bg-[#fff2f2] dark:bg-[#1D0002] lg:w-[320px] shrink-0 p-10 relative flex flex-col justify-between overflow-hidden">
                    <svg className="w-full text-[#F53003] dark:text-[#F61500] opacity-10 absolute -bottom-10 -left-10 transform rotate-12" viewBox="0 0 438 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.2036 -3H0V102.197H49.5189V86.7187H17.2036V-3Z" fill="currentColor" />
                    </svg>

                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold dark:text-white mb-4 tracking-tighter">Inicializando Sistema</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-1.5 h-1.5 bg-[#f53003] rounded-full mt-2 shrink-0"></div>
                                <p className="text-xs text-[#706f6c] dark:text-[#A1A09A] leading-relaxed">Sincronização de Dados via CNPJ e CEP Integrated.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-1.5 h-1.5 bg-[#f53003] rounded-full mt-2 shrink-0"></div>
                                <p className="text-xs text-[#706f6c] dark:text-[#A1A09A] leading-relaxed">Validação Biométrica e OTP via E-mail Protocol.</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 pt-10 border-t border-[#f5300322]">
                        <p className="text-[10px] font-bold text-[#f53003] uppercase tracking-[0.2em] mb-2">Protocolo de Defesa</p>
                        <p className="text-[10px] text-[#706f6c] dark:text-[#A1A09A]">Lumerixa Shield v3.1.2 Ativado.</p>
                    </div>
                </div>

                {/* Formulário Principal */}
                <form onSubmit={submit} className="flex-1 p-8 lg:p-12 bg-white dark:bg-[#161615] dark:text-[#EDEDEC] max-h-[85vh] overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Passo 01: PF */}
                        <div className={`md:col-span-2 transition-all ${step !== 1 ? 'opacity-40 grayscale pointer-events-none h-20 overflow-hidden' : ''}`}>
                            <h3 className="text-xs font-black text-[#f53003] uppercase tracking-[0.3em] mb-6 border-b border-gray-100 pb-2 flex justify-between">
                                01. Identidade Primária
                                {step > 1 && <span className="text-[10px] text-green-600">Concluído ✓</span>}
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="md:col-span-2">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Nome Completo</label>
                                    <input type="text" className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0a0a0a] border ${errors.name ? 'border-red-500' : 'border-[#e3e3e0]'} dark:border-[#3E3E3A] rounded-md focus:ring-1 focus:ring-[#f53003] outline-none`} value={data.name} onChange={e => setData('name', e.target.value)} required />
                                    {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">CPF</label>
                                    <input type="text" placeholder="000.000.000-00" className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0a0a0a] border ${errors.cpf ? 'border-red-500' : 'border-[#e3e3e0]'} dark:border-[#3E3E3A] rounded-md focus:ring-1 focus:ring-[#f53003] outline-none font-mono`} value={data.cpf} onChange={handleCpfChange} required />
                                    {errors.cpf && <p className="text-[10px] text-red-500 mt-1">{errors.cpf}</p>}
                                </div>

                                <div>
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Telefone</label>
                                    <input type="text" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0a0a0a] border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-md focus:ring-1 focus:ring-[#f53003] outline-none" value={data.phone} onChange={e => setData('phone', e.target.value)} />
                                </div>

                                <div className="md:col-span-2 flex justify-end">
                                    <button type="button" onClick={() => nextStep(2)} className="bg-[#1b1b18] text-white px-6 py-2 rounded-md text-[10px] font-bold uppercase hover:bg-black transition-all">Próximo: Segurança</button>
                                </div>
                            </div>
                        </div>

                        {/* Passo 02: Segurança (E-mail/OTP) */}
                        <div className={`md:col-span-2 mt-4 transition-all ${step !== 2 ? (step < 2 ? 'opacity-20 pointer-events-none' : 'opacity-40 grayscale h-20 overflow-hidden') : ''}`}>
                            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-2">
                                <h3 className={`text-xs font-black uppercase tracking-[0.3em] transition-all ${step === 2 ? 'text-[#f53003]' : 'text-zinc-400'}`}>02. Canal de Segurança</h3>
                                {isVerified ? (
                                    <span className="text-[10px] font-bold text-green-500 flex items-center gap-1">
                                        VERIFICADO ✓
                                    </span>
                                ) : (
                                    <span className="text-[10px] font-bold text-zinc-300">AGUARDANDO PROVA</span>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                <div className="flex-1">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">E-mail Corporativo</label>
                                    <div className="flex">
                                        <input type="email" readOnly={codeSent} className={`flex-1 px-4 py-2.5 bg-gray-50 dark:bg-[#0a0a0a] border ${errors.email ? 'border-red-500' : 'border-[#e3e3e0]'} dark:border-[#3E3E3A] rounded-l-md focus:ring-1 focus:ring-[#f53003] outline-none`} value={data.email} onChange={e => setData('email', e.target.value)} required />
                                        <button type="button" disabled={sendingCode || isVerified} onClick={sendVerificationCode} className="bg-[#1b1b18] dark:bg-[#eeeeec] text-white dark:text-[#1c1c1a] px-4 rounded-r-md text-[10px] font-bold uppercase transition-all hover:bg-black disabled:opacity-50">
                                            {sendingCode ? '...' : codeSent ? 'Reenviar' : 'Validar'}
                                        </button>
                                    </div>
                                    {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
                                </div>
                                <div className="sm:w-32">
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Código OTP</label>
                                    <input type="text" maxLength="6" disabled={isVerified} className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0a0a0a] border ${errors.code ? 'border-red-500' : 'border-[#e3e3e0]'} dark:border-[#3E3E3A] rounded-md text-center font-mono font-bold tracking-[0.5em] focus:ring-1 focus:ring-[#f53003] outline-none`} value={data.code} onChange={e => setData('code', e.target.value)} required />
                                    {errors.code && <p className="text-[10px] text-red-500 mt-1">{errors.code}</p>}
                                </div>
                            </div>

                            {!isVerified && codeSent && (
                                <button type="button" onClick={verifyCode} className="w-full bg-[#f53003] text-white py-2.5 rounded-md text-[10px] font-black uppercase tracking-widest hover:bg-[#d62a02] transition-all">
                                    {verifyingCode ? 'Autenticando...' : 'Verificar e Liberar Passo 03'}
                                </button>
                            )}
                        </div>

                        {/* Passo 03: Workspace */}
                        <div className={`md:col-span-2 mt-4 transition-all ${step !== 3 ? (step < 3 ? 'opacity-20 pointer-events-none' : 'opacity-40 grayscale h-20 overflow-hidden') : ''}`}>
                            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-2">
                                <h3 className={`text-xs font-black uppercase tracking-[0.3em] transition-all ${step === 3 ? 'text-[#f53003]' : 'text-zinc-400'}`}>03. Contexto Operacional</h3>
                                {step > 3 && <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Concluído ✓</span>}
                            </div>
                            {step === 3 && (
                                <div className="flex bg-gray-100 dark:bg-zinc-800 p-1 rounded-md text-[9px] font-bold uppercase">
                                    <button type="button" onClick={() => setData('account_type', 'PJ')} className={`px-3 py-1 rounded-sm transition-all ${data.account_type === 'PJ' ? 'bg-white dark:bg-zinc-700 shadow-sm text-[#f53003]' : 'text-zinc-400'}`}>Empresa</button>
                                    <button type="button" onClick={() => setData('account_type', 'PF')} className={`px-3 py-1 rounded-sm transition-all ${data.account_type === 'PF' ? 'bg-white dark:bg-zinc-700 shadow-sm text-[#f53003]' : 'text-zinc-400'}`}>Autônomo</button>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.account_type === 'PJ' && (
                                    <div>
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">CNPJ</label>
                                        <input type="text" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0a0a0a] border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-md focus:ring-1 focus:ring-[#f53003] outline-none" value={data.cnpj} onChange={handleCnpjChange} required />
                                    </div>
                                )}
                                <div className={data.account_type === 'PF' ? 'md:col-span-2' : ''}>
                                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">{data.account_type === 'PJ' ? 'Nome da Organização' : 'Nome do Workspace'}</label>
                                    <input type="text" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0a0a0a] border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-md focus:ring-1 focus:ring-[#f53003] outline-none" value={data.tenant_name} onChange={e => setData('tenant_name', e.target.value)} required />
                                </div>

                                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-6 gap-4 mt-2">
                                    <div className="sm:col-span-1">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">CEP</label>
                                        <input type="text" placeholder="00000-000" className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0a0a0a] border ${errors.cep ? 'border-red-500' : 'border-[#e3e3e0]'} dark:border-[#3E3E3A] rounded-md focus:ring-1 focus:ring-[#f53003] outline-none text-center font-mono`} value={data.cep} onChange={handleCepChange} required />
                                    </div>
                                    <div className="sm:col-span-4">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Logradouro (Rua/Av)</label>
                                        <input type="text" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0a0a0a] border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-md outline-none" value={data.logradouro} readOnly />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Número</label>
                                        <input type="text" placeholder="Ex: 123" className={`w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0a0a0a] border ${errors.numero ? 'border-red-500' : 'border-[#e3e3e0]'} dark:border-[#3E3E3A] rounded-md focus:ring-1 focus:ring-[#f53003] outline-none`} value={data.numero} onChange={e => setData('numero', e.target.value)} required />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Bairro</label>
                                        <input type="text" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0a0a0a] border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-md outline-none" value={data.bairro} readOnly />
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Cidade (Localidade)</label>
                                        <input type="text" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0a0a0a] border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-md outline-none" value={data.cidade} readOnly />
                                    </div>
                                    <div className="sm:col-span-1">
                                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">UF</label>
                                        <input type="text" className="w-full px-4 py-2.5 bg-gray-50 dark:bg-[#0a0a0a] border border-[#e3e3e0] dark:border-[#3E3E3A] rounded-md outline-none text-center font-bold" value={data.uf} readOnly />
                                    </div>
                                </div>

                                <div className="md:col-span-2 flex justify-end mt-4">
                                    <button type="button" onClick={() => nextStep(4)} className="bg-[#1b1b18] text-white px-6 py-2 rounded-md text-[10px] font-bold uppercase hover:bg-black transition-all">Próximo: Finalização</button>
                                </div>
                            </div>
                        </div>

                        {/* Passo 04: Finalização */}
                        <div className={`md:col-span-2 mt-4 transition-all ${step !== 4 ? 'opacity-20 pointer-events-none' : ''}`}>
                            <h3 className="text-xs font-black text-[#f53003] uppercase tracking-[0.3em] mb-6 border-b border-gray-100 pb-2">04. Finalização</h3>
                            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">Sua Senha Mestra</label>
                            <input type="password" placeholder="••••••••" className={`w-full px-4 py-3 bg-gray-50 dark:bg-[#0a0a0a] border ${errors.password ? 'border-red-500' : 'border-[#e3e3e0]'} dark:border-[#3E3E3A] rounded-md focus:ring-2 focus:ring-[#f53003] outline-none transition-all`} value={data.password} onChange={e => setData('password', e.target.value)} required />
                            {errors.password && <p className="text-[10px] text-red-500 mt-1">{errors.password}</p>}

                            <div className="pt-6">
                                <button type="submit" disabled={processing} className="w-full py-4 bg-[#f53003] hover:bg-[#d62a02] text-white rounded-md shadow-xl shadow-[#f530031a] font-black text-xs uppercase tracking-[0.2em] transition-all transform active:scale-[0.98] disabled:opacity-50">
                                    {processing ? 'Sincronizando...' : 'Concluir e Abrir Lumerixa OS'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </main>

            {/* Sistema de Notificação Lumerixa (Toast) */}
            <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}>
                <div className={`px-6 py-4 rounded-xl shadow-2xl backdrop-blur-md border border-white/20 flex items-center gap-4 ${toast.type === 'success' ? 'bg-[#f53003] text-white' : 'bg-zinc-900 text-white'}`}>
                    <div className="w-2 h-2 rounded-full animate-pulse bg-white"></div>
                    <span className="text-xs font-bold uppercase tracking-widest">{toast.message}</span>
                </div>
            </div>
        </div>
    );
}
