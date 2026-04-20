import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import SettingsLayout from "@/Modules/Auth/Layouts/SettingsLayout";
import { 
    Building2, 
    CreditCard, 
    Globe, 
    ShieldCheck, 
    AlertCircle,
    Copy,
    Hash,
    BadgeCheck,
    FileText
} from 'lucide-react';

export default function Organization({ tenant, isOwner }) {
    const form = useForm({
        name: tenant.name,
        razao_social: tenant.razao_social || '',
        nome_fantasia: tenant.nome_fantasia || '',
        cnpj: tenant.cnpj || '',
        domain: tenant.domain || '',
    });

    const submit = (e) => {
        e.preventDefault();
        form.patch(route('organization.update'));
    };

    return (
        <SettingsLayout title="Configurações da Empresa">
            <Head title="Gerenciar Organização - Lumerixa OS" />

            <div className="space-y-8 pb-20">
                {/* Header Banner */}
                <div className="relative bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-[3rem] p-10 shadow-sm overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                        <Building2 size={240} className="text-slate-900 dark:text-white" />
                    </div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                        <div className="w-32 h-32 rounded-[2.5rem] bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-center text-4xl font-black text-[#f53003] shadow-inner">
                            {tenant.name[0]}
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white mb-2 uppercase italic">
                                {tenant.name}
                            </h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Unidade de Gestão Ativa • UUID: {tenant.id.substring(0,8)}...</p>
                            <div className="flex gap-4 justify-center md:justify-start">
                                <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${isOwner ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-100 text-slate-500'}`}>
                                    {isOwner ? 'Proprietário' : 'Membro'}
                                </span>
                                <span className="px-4 py-2 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl text-[9px] font-black uppercase tracking-widest">
                                    Plano Enterprise
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Organization Details Form */}
                    <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-10 rounded-[3rem] shadow-sm">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white mb-10 flex items-center gap-3">
                            <FileText size={16} className="text-[#f53003]" /> Dados Cadastrais
                        </h4>

                        <form onSubmit={submit} className="space-y-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Razão Social (Legal Name)</label>
                                    <input 
                                        type="text" value={form.data.razao_social}
                                        disabled={!isOwner}
                                        onChange={e => form.setData('razao_social', e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f5300322] disabled:opacity-50"
                                        placeholder="EX: LUMERIXA TECNOLOGIA LTDA"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Fantasia (Brand Name)</label>
                                    <input 
                                        type="text" value={form.data.nome_fantasia}
                                        disabled={!isOwner}
                                        onChange={e => form.setData('nome_fantasia', e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f5300322] disabled:opacity-50"
                                        placeholder="EX: LUMERIXA OS"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Documento CNPJ (Identity)</label>
                                    <div className="relative">
                                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                        <input 
                                            type="text" value={form.data.cnpj}
                                            disabled={!isOwner}
                                            onChange={e => form.setData('cnpj', e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f5300322] disabled:opacity-50"
                                            placeholder="00.000.000/0001-00"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Domínio Customizado</label>
                                    <div className="relative">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                                        <input 
                                            type="text" value={form.data.domain}
                                            disabled={!isOwner}
                                            onChange={e => form.setData('domain', e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f5300322] disabled:opacity-50"
                                            placeholder="sua-empresa.lumerixa.com"
                                        />
                                    </div>
                                </div>
                            </div>

                            {isOwner && (
                                <button 
                                    className="w-full bg-[#f53003] text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-black transition-all shadow-xl shadow-[#f5300322]"
                                    disabled={form.processing}
                                >
                                    Atualizar Unidade
                                </button>
                            )}

                            {!isOwner && (
                                <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center gap-4">
                                    <AlertCircle size={20} className="text-amber-500" />
                                    <p className="text-[9px] font-bold text-amber-700 uppercase tracking-widest italic">Apenas administradores podem alterar dados corporativos.</p>
                                </div>
                            )}
                        </form>
                    </div>

                    {/* Branding / Visual Identity card */}
                    <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-10 rounded-[3rem] shadow-sm flex flex-col">
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white mb-10 flex items-center gap-3">
                            <Palette size={16} className="text-[#f53003]" /> Identidade Visual
                        </h4>
                        
                        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-zinc-900 rounded-[2rem] border border-dashed border-slate-200 dark:border-zinc-800 text-center space-y-6">
                            <div className="w-20 h-20 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-lg">
                                <BadgeCheck size={40} className="text-[#f53003]" />
                            </div>
                            <div>
                                <h5 className="font-black uppercase tracking-widest text-[10px] text-slate-900 dark:text-white mb-2">Marca Soberana</h5>
                                <p className="text-[9px] text-slate-400 font-bold italic leading-relaxed">Personalize o dashboard com o seu logotipo e cores mestras.</p>
                            </div>
                            <button className="px-6 py-3 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-500 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#f53003] hover:text-white transition-all">Em Breve</button>
                        </div>
                    </div>
                </div>

                {/* Documents Management Section - NEW */}
                <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-10 rounded-[4rem] shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.02]">
                        <FileText size={180} />
                    </div>
                    
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white mb-10 flex items-center gap-3">
                        <ShieldCheck size={16} className="text-[#f53003]" /> Cofre de Documentos
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: 'Contrato Social', status: 'Verificado', date: '20/04/2026' },
                            { name: 'Cartão CNPJ', status: 'Verificado', date: '20/04/2026' },
                            { name: 'Alvará de Funcionamento', status: 'Pendente', date: '-' },
                        ].map((doc, idx) => (
                            <div key={idx} className="p-6 bg-slate-50 dark:bg-zinc-900/50 rounded-[2rem] border border-slate-100 dark:border-zinc-800 flex items-center justify-between group hover:border-[#f5300322] transition-all">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white">{doc.name}</p>
                                    <p className="text-[8px] font-bold text-slate-400 italic uppercase">{doc.status} {doc.date !== '-' && `• ${doc.date}`}</p>
                                </div>
                                <button className="w-10 h-10 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl flex items-center justify-center text-slate-400 hover:text-[#f53003] hover:border-[#f53003] transition-all">
                                    <Globe size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 p-8 border border-dashed border-slate-200 dark:border-zinc-800 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-4">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Arraste novos documentos para o protocolo de segurança</p>
                        <button className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-[#f53003] hover:text-white transition-all shadow-xl">Upload de Arquivos</button>
                    </div>
                </div>
            </div>
        </SettingsLayout>
    );
}
