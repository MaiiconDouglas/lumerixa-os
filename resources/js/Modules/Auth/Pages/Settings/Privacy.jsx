import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import SettingsLayout from "@/Modules/Auth/Layouts/SettingsLayout";
import { 
    ShieldCheck, 
    Mail, 
    Lock, 
    Bell, 
    Smartphone, 
    History, 
    LogOut, 
    CheckCircle, 
    AlertCircle,
    Eye,
    EyeOff,
    Fingerprint,
    BadgeCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Privacy({ user, sessions = [], activityLogs = [], twoFactor = {} }) {
    const { auth } = usePage().props;
    
    // Forms
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const tfaForm = useForm({
        code: '',
    });

    const emailChangeForm = useForm({
        email: user.email,
        code: '',
    });

    // UI States
    const [show2FAConfirm, setShow2FAConfirm] = useState(false);
    const [showEmailVerify, setShowEmailVerify] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [preferences, setPreferences] = useState(user.preferences || {
        welcome_emails: true,
        security_alerts: true,
        product_updates: true,
        marketing_emails: false,
        project_notifications: true,
        task_reminders: true
    });

    // Handlers
    const submitPassword = (e) => {
        e.preventDefault();
        passwordForm.put(route('profile.password'), {
            onSuccess: () => passwordForm.reset(),
        });
    };

    const confirm2FA = (e) => {
        e.preventDefault();
        tfaForm.post(route('2fa.confirm'), {
            onSuccess: () => {
                setShow2FAConfirm(false);
                tfaForm.reset();
            }
        });
    };

    const disable2FA = () => {
        if (confirm('Desativar a proteção de dois fatores reduzirá a segurança da sua conta. Confirmar?')) {
            tfaForm.delete(route('2fa.disable'));
        }
    };

    const requestEmailChange = (e) => {
        e.preventDefault();
        emailChangeForm.post(route('profile.email.request'), {
            onSuccess: () => setShowEmailVerify(true),
        });
    };

    const confirmEmailChange = (e) => {
        e.preventDefault();
        emailChangeForm.post(route('profile.email.confirm'), {
            onSuccess: () => {
                setShowEmailVerify(false);
                emailChangeForm.reset('code');
            },
        });
    };

    const logoutOthers = (e) => {
        e.preventDefault();
        const password = prompt('Para sua segurança, confirme sua senha maestra:');
        if (password) {
            useForm({ password }).post(route('profile.logout-others'), {
                onSuccess: () => alert('Sessões encerradas com sucesso.')
            });
        }
    };

    return (
        <SettingsLayout title="Blindagem de Soberania (Privacidade)">
            <Head title="Privacidade e Segurança - Lumerixa OS" />

            <div className="space-y-8 pb-20">
                {/* Hero Security Banner */}
                <div className="relative bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-[3rem] p-12 shadow-sm overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                        <ShieldCheck size={280} className="text-slate-900" />
                    </div>
                    
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f5300311] text-[#f53003] rounded-full text-[8px] font-black uppercase tracking-[0.2em] mb-6 border border-[#f5300322]">
                            <Fingerprint size={10} /> Segurança de Nível Bancário
                        </div>
                        <h3 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight mb-4 uppercase italic">
                            Seu Ecossistema está <span className="text-[#f53003]">Blindado.</span>
                        </h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                            Controle de acesso, chaves de criptografia e auditoria de pulsos ativos em tempo real.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Security Controls */}
                    <div className="lg:col-span-12 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* 2FA Card */}
                            <div className={`p-10 rounded-[3rem] border shadow-sm transition-all duration-700 relative overflow-hidden ${twoFactor.enabled ? 'bg-white dark:bg-zinc-950 border-slate-200 dark:border-zinc-800' : 'bg-[#f53003] border-none text-white'}`}>
                                <h4 className={`text-xs font-black uppercase tracking-[0.3em] mb-10 flex items-center gap-3 ${twoFactor.enabled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
                                    <ShieldCheck size={16} /> Blindagem 2FA
                                </h4>

                                <AnimatePresence mode="wait">
                                    {!twoFactor.enabled ? (
                                        !show2FAConfirm ? (
                                            <motion.div key="off" className="space-y-6">
                                                <p className="text-xs font-bold leading-relaxed italic opacity-80">Sua conta está desprotegida contra ataques de força bruta. Ative a blindagem agora.</p>
                                                <button 
                                                    onClick={() => setShow2FAConfirm(true)}
                                                    className="w-full bg-white text-black py-5 rounded-[2rem] font-black uppercase text-xs tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-2xl"
                                                >
                                                    Blindar Imediatamente
                                                </button>
                                            </motion.div>
                                        ) : (
                                            <motion.div key="setup" className="space-y-8">
                                                <div className="bg-white p-4 rounded-3xl shadow-2xl w-fit mx-auto">
                                                    <div dangerouslySetInnerHTML={{ __html: twoFactor.qrCodeUrl }} className="w-40 h-40"></div>
                                                </div>
                                                <form onSubmit={confirm2FA} className="space-y-4">
                                                    <input 
                                                        type="text" maxLength="6" placeholder="CÓDIGO DE 6 DÍGITOS"
                                                        value={tfaForm.code}
                                                        onChange={e => tfaForm.setData('code', e.target.value)}
                                                        className="w-full bg-black/30 border border-white/20 rounded-2xl py-4 text-center text-xl font-black text-white placeholder:text-white/30 focus:ring-white/40"
                                                    />
                                                    <button className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl">Protocolar App</button>
                                                    <button type="button" onClick={() => setShow2FAConfirm(false)} className="w-full text-white/50 text-[9px] font-black uppercase tracking-widest hover:text-white transition-colors">Voltar</button>
                                                </form>
                                            </motion.div>
                                        )
                                    ) : (
                                        <motion.div key="on" className="space-y-8">
                                            <div className="flex items-center gap-6 p-6 bg-emerald-50 dark:bg-emerald-500/5 rounded-[2rem] border border-emerald-100 dark:border-emerald-500/10">
                                                <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/33 animate-pulse">
                                                    <ShieldCheck size={24} />
                                                </div>
                                                <div>
                                                    <h5 className="font-black text-emerald-600 uppercase text-[10px] tracking-widest">Soberania Blindada</h5>
                                                    <p className="text-[9px] text-slate-400 font-bold italic mt-1 uppercase">Acesso mestre ativo.</p>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={disable2FA}
                                                className="w-full border border-slate-100 dark:border-zinc-800 text-slate-400 py-4 rounded-2xl font-black uppercase text-[9px] tracking-widest hover:text-rose-500 hover:border-rose-100 transition-all"
                                            >
                                                Inativar Blindagem
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Privacy and Notifications (Pulse) */}
                            <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-10 rounded-[3rem] shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-[0.02]">
                                    <Bell size={120} className="text-slate-900" />
                                </div>
                                
                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white mb-10 flex items-center gap-3">
                                    <Bell size={16} className="text-[#f53003]" /> Privacidade e Pulsação
                                </h4>

                                <div className="space-y-6">
                                    {[
                                        { id: 'welcome_emails', label: 'E-mails de Boas-vindas', desc: 'Protocolo inicial de integração.' },
                                        { id: 'security_alerts', label: 'Alertas de Segurança', desc: 'Notificações críticas de acesso.' },
                                        { id: 'product_updates', label: 'Atualizações de Produto', desc: 'Novos módulos e melhorias.' },
                                        { id: 'project_notifications', label: 'Notificações de Projetos', desc: 'Pulsação dos seus fluxos ativos.' },
                                    ].map((pref) => (
                                        <div key={pref.id} className="flex items-center justify-between group">
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white group-hover:text-[#f53003] transition-colors">{pref.label}</p>
                                                <p className="text-[8px] font-bold text-slate-400 italic uppercase">{pref.desc}</p>
                                            </div>
                                            <button 
                                                onClick={() => setPreferences(prev => ({ ...prev, [pref.id]: !prev[pref.id] }))}
                                                className={`w-12 h-6 rounded-full transition-all relative ${preferences[pref.id] ? 'bg-[#f53003]' : 'bg-slate-100 dark:bg-zinc-800'}`}
                                            >
                                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${preferences[pref.id] ? 'left-7 shadow-lg' : 'left-1'}`} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Secure Email Change */}
                            <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-10 rounded-[3rem] shadow-sm relative overflow-hidden">
                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white mb-10 flex items-center gap-3">
                                    <Mail size={16} className="text-[#f53003]" /> Identidade de Comunicação
                                </h4>

                                <AnimatePresence mode="wait">
                                    {!showEmailVerify ? (
                                        <motion.form 
                                            key="request"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            onSubmit={requestEmailChange} className="space-y-6"
                                        >
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Novo Endereço de E-mail</label>
                                                <input 
                                                    type="email" value={emailChangeForm.data.email}
                                                    onChange={e => emailChangeForm.setData('email', e.target.value)}
                                                    className="w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f5300322] transition-all"
                                                />
                                            </div>
                                            <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#f53003] hover:text-white transition-all shadow-lg">Solicitar Alteração Blindada</button>
                                        </motion.form>
                                    ) : (
                                        <motion.form 
                                            key="verify"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            onSubmit={confirmEmailChange} className="space-y-6"
                                        >
                                            <div className="bg-emerald-50 dark:bg-emerald-500/5 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-500/10 mb-4">
                                                <p className="text-[10px] font-bold text-emerald-600 uppercase text-center italic">Códigos enviados para o e-mail antigo e para {emailChangeForm.data.email}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Código de Verificação (6 dígitos)</label>
                                                <input 
                                                    type="text" maxLength="6"
                                                    value={emailChangeForm.data.code}
                                                    onChange={e => emailChangeForm.setData('code', e.target.value)}
                                                    className="w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl py-4 px-6 text-center text-xl font-black text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f5300322] transition-all"
                                                />
                                            </div>
                                            <div className="flex gap-4">
                                                <button className="flex-1 bg-emerald-500 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-emerald-600 transition-all shadow-lg">Confirmar</button>
                                                <button type="button" onClick={() => setShowEmailVerify(false)} className="px-6 border border-slate-200 dark:border-zinc-800 rounded-2xl text-[9px] font-black uppercase tracking-widest text-slate-400">Cancelar</button>
                                            </div>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Password Reset */}
                            <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-10 rounded-[3rem] shadow-sm">
                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white mb-10 flex items-center gap-3">
                                    <Lock size={16} className="text-[#f53003]" /> Chaves de Acesso
                                </h4>
                                <form onSubmit={submitPassword} className="space-y-8">
                                    <div className="space-y-4">
                                        <div className="relative">
                                            <input 
                                                type={showPassword ? 'text' : 'password'} 
                                                value={passwordForm.data.current_password}
                                                onChange={e => passwordForm.setData('current_password', e.target.value)}
                                                placeholder="Senha Maestra Atual"
                                                className="w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-[#f5300322]"
                                            />
                                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400">
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        <input 
                                            type="password" 
                                            value={passwordForm.data.password}
                                            onChange={e => passwordForm.setData('password', e.target.value)}
                                            placeholder="Nova Senha Provisória"
                                            className="w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl py-4 px-6 text-sm font-bold focus:ring-2 focus:ring-[#f5300322]"
                                        />
                                    </div>
                                    <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-[#f53003] hover:text-white transition-all shadow-lg">Redefinir Criptografia</button>
                                </form>
                            </div>
                        </div>

                        {/* Recent Activity & Sessions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-10 rounded-[3rem] shadow-sm">
                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                                    <History size={16} /> Auditoria Lumerixa
                                </h4>
                                <div className="space-y-6">
                                    {activityLogs.slice(0, 5).map(log => (
                                        <div key={log.id} className="flex gap-4 group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-zinc-800 mt-1.5 group-hover:bg-[#f53003] transition-colors"></div>
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h6 className="font-black uppercase tracking-widest text-[8px] text-slate-900 dark:text-white">{log.event}</h6>
                                                    <span className="text-[7px] font-black text-slate-300 uppercase italic">/ {new Date(log.created_at).toLocaleDateString('pt-BR')}</span>
                                                </div>
                                                <p className="text-[9px] text-slate-400 font-bold italic leading-none">Alteração confirmada no ecossistema.</p>
                                            </div>
                                        </div>
                                    ))}
                                    {activityLogs.length === 0 && <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest text-center py-6">Sem registros pendentes</p>}
                                </div>
                            </div>
                            
                            <div className="bg-slate-900 dark:bg-white p-10 rounded-[3rem] text-white dark:text-black shadow-2xl relative overflow-hidden">
                                <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
                                    <Smartphone size={200} />
                                </div>
                                <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 italic">Sessões Ativas</h4>
                                <div className="space-y-6 relative z-10">
                                    {sessions.map(session => (
                                        <div key={session.id} className="flex items-center justify-between border-b border-white/10 dark:border-black/5 pb-4 last:border-0">
                                            <div>
                                                <p className="text-[10px] font-black uppercase tracking-widest">{session.ip_address} {session.is_current_device && <span className="text-[#f53003] ml-2">(ATUAL)</span>}</p>
                                                <p className="text-[8px] font-bold opacity-60 uppercase">{session.last_active}</p>
                                            </div>
                                            {session.is_current_device ? (
                                                <CheckCircle size={16} className="text-emerald-500" />
                                            ) : (
                                                <button onClick={logoutOthers} className="text-[9px] font-black uppercase tracking-widest text-rose-500 hover:scale-110 transition-transform">Logout</button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <button onClick={logoutOthers} className="mt-8 w-full py-4 bg-white/10 dark:bg-black/5 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all">Encerrar Outras Sessões</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SettingsLayout>
    );
}
