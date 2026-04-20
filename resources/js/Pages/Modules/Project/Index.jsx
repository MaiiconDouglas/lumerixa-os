import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/Core/Layouts/AppLayout';
import { Plus, Briefcase, ChevronRight, Layout } from 'lucide-react';

export default function Index({ auth, projects }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('projects.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout
            user={auth.user}
            title="Projetos"
        >
            <Head title="Projetos" />

            <div className="py-12 bg-[#0a0a0a] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Header de Ação */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#161615] p-8 rounded-2xl border border-[#3E3E3A]">
                        <div>
                            <h3 className="text-2xl font-black text-white tracking-tighter uppercase">Meus Ecossistemas</h3>
                            <p className="text-[#A1A09A] text-sm mt-1">Visualize e gerencie seus fluxos de trabalho ativos.</p>
                        </div>
                        
                        <form onSubmit={submit} className="flex gap-2 w-full md:w-auto">
                            <input 
                                type="text" 
                                placeholder="Nome do Novo Projeto..." 
                                className="bg-[#0a0a0a] border-[#3E3E3A] text-white rounded-lg focus:ring-[#f53003] focus:border-[#f53003] text-sm w-full md:w-64"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                required
                            />
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="bg-[#f53003] hover:bg-[#d62a02] text-white p-3 rounded-lg flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                            >
                                <Plus size={20} strokeWidth={3} />
                                <span className="font-black text-xs uppercase tracking-widest hidden sm:inline">Criar</span>
                            </button>
                        </form>
                    </div>

                    {/* Grid de Projetos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <Link 
                                key={project.id} 
                                href={route('projects.show', project.slug)}
                                className="group bg-[#161615] border border-[#3E3E3A] hover:border-[#f5300355] p-6 rounded-2xl transition-all hover:translate-y-[-4px] relative overflow-hidden"
                            >
                                {/* Efeito de Fundo */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#f53003] opacity-0 group-hover:opacity-[0.05] blur-[50px] transition-opacity"></div>
                                
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-[#0a0a0a] rounded-xl text-[#f53003] border border-[#3E3E3A]">
                                        <Briefcase size={24} />
                                    </div>
                                    <span className="text-[10px] font-black text-[#A1A09A] uppercase tracking-[0.2em] bg-[#0a0a0a] px-3 py-1 rounded-full border border-[#3E3E3A]">
                                        {project.status}
                                    </span>
                                </div>

                                <h4 className="text-xl font-black text-white tracking-tighter mb-2 group-hover:text-[#f53003] transition-colors uppercase">
                                    {project.name}
                                </h4>
                                
                                <p className="text-[#A1A09A] text-xs line-clamp-2 mb-6 h-8">
                                    {project.description || 'Nenhuma descrição fornecida.'}
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-[#3E3E3A]">
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-white font-black text-sm">{project.tasks_count || 0}</span>
                                            <span className="text-[9px] text-[#A1A09A] uppercase font-bold tracking-widest">Tarefas</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-white font-black text-sm">{project.columns_count || 0}</span>
                                            <span className="text-[9px] text-[#A1A09A] uppercase font-bold tracking-widest">Etapas</span>
                                        </div>
                                    </div>
                                    <ChevronRight className="text-[#3E3E3A] group-hover:text-[#f53003] transition-colors" />
                                </div>
                            </Link>
                        ))}

                        {projects.length === 0 && (
                            <div className="col-span-full py-20 text-center bg-[#161615] rounded-3xl border border-dashed border-[#3E3E3A]">
                                <Layout size={48} className="mx-auto text-[#3E3E3A] mb-4 opacity-50" />
                                <p className="text-[#A1A09A] font-bold uppercase tracking-widest text-sm text-white">Nenhum projeto encontrado</p>
                                <p className="text-[#3E3E3A] text-xs mt-2 uppercase tracking-widest ">Crie seu primeiro ecossistema acima 🚀</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
