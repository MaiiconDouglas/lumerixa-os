import React, { useState, useRef, useEffect } from 'react';
import { Head, useForm, Link, usePage } from '@inertiajs/react';
import SettingsLayout from "@/Modules/Auth/Layouts/SettingsLayout";
import { 
    User, 
    Mail, 
    Phone, 
    MapPin,
    Home,
    Navigation,
    Globe,
    AlertCircle,
    UserCircle2,
    BadgeCheck,
    Camera,
    Building2,
    Fingerprint,
    CheckCircle,
    ShieldCheck,
    Loader2,
    Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Profile({ user, activeTenant }) {
    const { flash, errors: pageErrors } = usePage().props;
    
    const profileForm = useForm({
        name: user.name,
        phone: user.phone || '',
        cpf: user.cpf || '',
        photo: null,
        // Address Fields
        cep: user.cep || '',
        address: user.address || '',
        number: user.number || '',
        complement: user.complement || '',
        neighborhood: user.neighborhood || '',
        city: user.city || '',
        state: user.state || '',
    });

    const [photoPreview, setPhotoPreview] = useState(null);
    const [isFetchingCep, setIsFetchingCep] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const photoInput = useRef(null);

    // Toast Effect
    useEffect(() => {
        if (flash?.success) {
            setShowToast(true);
            const timer = setTimeout(() => setShowToast(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            profileForm.setData('photo', file);
            const reader = new FileReader();
            reader.onload = (e) => setPhotoPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleCepBlur = async () => {
        const cep = profileForm.data.cep.replace(/\D/g, '');
        if (cep.length === 8) {
            setIsFetchingCep(true);
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    profileForm.setData(prev => ({
                        ...prev,
                        address: data.logradouro,
                        neighborhood: data.bairro,
                        city: data.localidade,
                        state: data.uf
                    }));
                }
            } catch (error) {
                console.error("Erro ao buscar CEP", error);
            } finally {
                setIsFetchingCep(false);
            }
        }
    };

    const submitProfile = (e) => {
        e.preventDefault();
        profileForm.post(route('profile.update'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setPhotoPreview(null);
                profileForm.reset('photo');
            },
            onError: (errors) => {
                console.log("Validation Errors:", errors);
            }
        });
    };

    return (
        <SettingsLayout title="Identidade e Localização (Soberania)">
            <Head title="Perfil de Membro - Lumerixa OS" />

            {/* Premium Toast Notification */}
            <AnimatePresence>
                {showToast && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-10 right-10 z-[100] flex items-center gap-4 bg-slate-900 dark:bg-white text-white dark:text-black px-8 py-5 rounded-[2rem] shadow-2xl border border-white/10 dark:border-black/5"
                    >
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                            <Check size={18} strokeWidth={3} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Operação Sucedida</p>
                            <p className="text-[9px] font-bold opacity-60 uppercase italic">{flash.success}</p>
                        </div>
                        <button onClick={() => setShowToast(false)} className="ml-4 opacity-40 hover:opacity-100 transition-opacity">
                            <CheckCircle size={14} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-8 pb-20">
                
                {/* Header Section */}
                <div className="relative bg-[#ffffff] dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 rounded-[3rem] p-10 shadow-sm overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                        <BadgeCheck size={280} className="text-slate-900 dark:text-white" />
                    </div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                        <div className="relative group cursor-pointer" onClick={() => photoInput.current.click()}>
                            <div className="w-40 h-40 rounded-[3rem] border-8 border-slate-50 dark:border-zinc-900 shadow-2xl overflow-hidden bg-slate-100 dark:bg-zinc-900 flex items-center justify-center transition-all group-hover:scale-105 group-hover:rotate-2">
                                {photoPreview || user.profile_photo_url ? (
                                    <img src={photoPreview || user.profile_photo_url} alt={user.name} className="w-full h-full object-cover" />
                                ) : (
                                    <User size={56} className="text-slate-300 dark:text-zinc-700" />
                                )}
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white dark:bg-zinc-800 border-4 border-slate-50 dark:border-zinc-900 rounded-2xl flex items-center justify-center text-[#f53003] shadow-xl group-hover:bg-[#f53003] group-hover:text-white transition-all">
                                <Camera size={20} />
                            </div>
                            <input 
                                type="file" ref={photoInput} className="hidden" accept="image/*"
                                onChange={handlePhotoChange}
                            />
                        </div>

                        <div className="text-center md:text-left space-y-3 flex-1 min-w-0">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f5300311] text-[#f53003] rounded-full text-[8px] font-black uppercase tracking-[0.2em] mb-2 border border-[#f5300322]">
                                <Fingerprint size={10} /> Cadastro de Soberania Ativo
                            </div>
                            <h3 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white leading-none truncate">
                                {user.name.split(' ')[0]} <span className="text-[#f53003]">{user.name.split(' ').slice(1).join(' ')}</span>
                            </h3>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em] flex items-center justify-center md:justify-start gap-2 italic">
                                {activeTenant ? activeTenant.name : 'Membro Independente'} <BadgeCheck size={14} className="text-emerald-500" />
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={submitProfile} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left: Identity Data */}
                        <div className="lg:col-span-12 xl:col-span-7 space-y-8">
                            <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-10 rounded-[3rem] shadow-sm relative overflow-hidden group">
                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white mb-10 flex items-center gap-3">
                                    <User size={16} className="text-[#f53003]" /> Dados de Ativação
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Título do Membro</label>
                                        <input 
                                            type="text" value={profileForm.data.name}
                                            onChange={e => profileForm.setData('name', e.target.value)}
                                            className={`w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f5300322] ${profileForm.errors.name ? 'ring-2 ring-rose-500/20' : ''}`}
                                        />
                                        {profileForm.errors.name && <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest ml-1">{profileForm.errors.name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Identidade CPF</label>
                                        <input 
                                            type="text" value={profileForm.data.cpf}
                                            onChange={e => profileForm.setData('cpf', e.target.value)}
                                            className={`w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f5300322] ${profileForm.errors.cpf ? 'ring-2 ring-rose-500/20' : ''}`}
                                        />
                                        {profileForm.errors.cpf && <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest ml-1">{profileForm.errors.cpf}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Comunicação Direta</label>
                                        <input 
                                            type="text" value={profileForm.data.phone}
                                            onChange={e => profileForm.setData('phone', e.target.value)}
                                            className={`w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f5300322] ${profileForm.errors.phone ? 'ring-2 ring-rose-500/20' : ''}`}
                                        />
                                        {profileForm.errors.phone && <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest ml-1">{profileForm.errors.phone}</p>}
                                    </div>
                                    <div className="space-y-2 opacity-60">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">CNPJ de Vínculo (Active)</label>
                                        <div className="w-full bg-slate-100 dark:bg-zinc-900/50 rounded-2xl py-4 px-6 text-sm font-bold text-slate-500 flex items-center gap-3">
                                            <Building2 size={16} /> {activeTenant?.cnpj || 'Não Vinculado'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Address Section */}
                            <div className="bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 p-10 rounded-[3rem] shadow-sm relative overflow-hidden">
                                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white mb-10 flex items-center gap-3">
                                    <MapPin size={16} className="text-[#f53003]" /> Localização de Residência
                                </h4>

                                <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">CEP</label>
                                        <div className="relative">
                                            <input 
                                                type="text" value={profileForm.data.cep}
                                                onBlur={handleCepBlur}
                                                onChange={e => profileForm.setData('cep', e.target.value)}
                                                className={`w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f5300322] ${profileForm.errors.cep ? 'ring-2 ring-rose-500/20' : ''} ${isFetchingCep ? 'animate-pulse opacity-50' : ''}`}
                                            />
                                            {isFetchingCep && <Loader2 size={14} className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-[#f53003]" />}
                                        </div>
                                        {profileForm.errors.cep && <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest ml-1">{profileForm.errors.cep}</p>}
                                    </div>
                                    <div className="md:col-span-4 space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Logradouro / Endereço</label>
                                        <input 
                                            type="text" value={profileForm.data.address}
                                            onChange={e => profileForm.setData('address', e.target.value)}
                                            className={`w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f5300322] ${profileForm.errors.address ? 'ring-2 ring-rose-500/20' : ''}`}
                                        />
                                        {profileForm.errors.address && <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest ml-1">{profileForm.errors.address}</p>}
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Número</label>
                                        <input 
                                            type="text" value={profileForm.data.number}
                                            onChange={e => profileForm.setData('number', e.target.value)}
                                            className={`w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f5300322] ${profileForm.errors.number ? 'ring-2 ring-rose-500/20' : ''}`}
                                        />
                                        {profileForm.errors.number && <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest ml-1">{profileForm.errors.number}</p>}
                                    </div>
                                    <div className="md:col-span-4 space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Complemento / Apto</label>
                                        <input 
                                            type="text" value={profileForm.data.complement}
                                            onChange={e => profileForm.setData('complement', e.target.value)}
                                            className={`w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f5300322] ${profileForm.errors.complement ? 'ring-2 ring-rose-500/20' : ''}`}
                                        />
                                        {profileForm.errors.complement && <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest ml-1">{profileForm.errors.complement}</p>}
                                    </div>
                                    <div className="md:col-span-3 space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Bairro</label>
                                        <input 
                                            type="text" value={profileForm.data.neighborhood}
                                            onChange={e => profileForm.setData('neighborhood', e.target.value)}
                                            className={`w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f5300322] ${profileForm.errors.neighborhood ? 'ring-2 ring-rose-500/20' : ''}`}
                                        />
                                        {profileForm.errors.neighborhood && <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest ml-1">{profileForm.errors.neighborhood}</p>}
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Cidade</label>
                                        <input 
                                            type="text" value={profileForm.data.city}
                                            onChange={e => profileForm.setData('city', e.target.value)}
                                            className={`w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f5300322] ${profileForm.errors.city ? 'ring-2 ring-rose-500/20' : ''}`}
                                        />
                                        {profileForm.errors.city && <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest ml-1">{profileForm.errors.city}</p>}
                                    </div>
                                    <div className="md:col-span-1 space-y-2">
                                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">UF</label>
                                        <input 
                                            type="text" value={profileForm.data.state}
                                            onChange={e => profileForm.setData('state', e.target.value)}
                                            className={`w-full bg-slate-50 dark:bg-zinc-900 border-none rounded-2xl py-4 px-6 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-[#f5300322] text-center ${profileForm.errors.state ? 'ring-2 ring-rose-500/20' : ''}`}
                                        />
                                        {profileForm.errors.state && <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest ml-1">{profileForm.errors.state}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Actions and Info */}
                        <div className="lg:col-span-12 xl:col-span-5 space-y-8">
                            <div className="bg-slate-900 dark:bg-white p-10 rounded-[3rem] text-white dark:text-black shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[400px]">
                                <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
                                    <UserCircle2 size={300} />
                                </div>
                                <div className="relative z-10">
                                    <h4 className="text-xl font-black uppercase tracking-tighter italic mb-4">Sincronização Mestre</h4>
                                    <p className="text-[10px] font-bold opacity-60 uppercase leading-relaxed tracking-widest mb-10">
                                        Seus dados de localização são usados para emissão de notas fiscais, contratos de serviço e protocolos de entrega do ecossistema.
                                    </p>

                                    <div className="space-y-4">
                                        {[
                                            { icon: CheckCircle, text: 'Identidade Validada' },
                                            { icon: MapPin, text: 'Endereço Protocolado' },
                                            { icon: ShieldCheck, text: 'Privacidade Ativa' },
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <item.icon size={16} className="text-[#f53003]" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="relative z-10 pt-10">
                                    <button 
                                        type="submit"
                                        disabled={profileForm.processing}
                                        className="w-full bg-[#f53003] text-white py-6 rounded-[2rem] font-black uppercase text-xs tracking-[0.4em] hover:scale-[1.02] active:scale-95 disabled:scale-100 disabled:opacity-50 disabled:grayscale transition-all shadow-2xl flex items-center justify-center gap-3"
                                    >
                                        {profileForm.processing ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                <span>Protocolando...</span>
                                            </>
                                        ) : (
                                            <span>Atualizar Unidade</span>
                                        )}
                                    </button>
                                    <p className="text-center mt-6 text-[8px] font-bold opacity-40 uppercase tracking-widest italic">Última atualização: {new Date(user.updated_at || user.created_at).toLocaleDateString('pt-BR')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </SettingsLayout>
    );
}
