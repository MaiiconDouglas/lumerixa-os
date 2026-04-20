import React from 'react';
import { Head, router } from '@inertiajs/react';
import DashboardLayout from '@/Core/Layouts/DashboardLayout';
import { Button } from '@/Core/Components/Atoms/Button';

export default function Members({ members, availableRoles }) {
    
    const handleRoleChange = (userId, roleSlug) => {
        router.post(`/members/${userId}/role`, { role_slug: roleSlug });
    };

    return (
        <DashboardLayout title="Gestão de Equipe">
            <Head title="Membros da Equipe - Lumerixa OS" />

            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-[#1C1C1A] dark:text-[#EDEDEC]">Colaboradores</h2>
                        <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Gerencie níveis de acesso e membros do workspace</p>
                    </div>
                    <Button size="sm">Convidar Membro</Button>
                </div>
                
                <div className="bg-white dark:bg-[#111110] border border-[#e3e3e0] dark:border-[#1F1F1E] rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-zinc-900/50 border-b border-[#e3e3e0] dark:border-[#1F1F1E]">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Membro</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Papel / Nível</th>
                                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50 dark:divide-zinc-800">
                                {members.map((member) => (
                                    <tr key={member.id} className="hover:bg-gray-50/50 dark:hover:bg-zinc-900/30 transition-all">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-600 dark:text-zinc-400">
                                                    {member.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-[#1C1C1A] dark:text-[#EDEDEC]">{member.name}</p>
                                                    <p className="text-[10px] text-zinc-500">{member.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-50 dark:bg-green-900/20 text-[9px] font-black uppercase tracking-wider text-green-600">
                                                <div className="w-1 h-1 rounded-full bg-green-600"></div>
                                                Ativo
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <select 
                                                onChange={(e) => handleRoleChange(member.id, e.target.value)}
                                                value={member.roles?.[0]?.slug || ''}
                                                className="bg-transparent border-0 text-[10px] font-bold text-[#1C1C1A] dark:text-[#EDEDEC] focus:ring-0 cursor-pointer p-0"
                                            >
                                                <option value="" disabled>Sem papel</option>
                                                {availableRoles.map(role => (
                                                    <option key={role.id} value={role.slug}>{role.name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Button variant="ghost" size="xs">Gerenciar</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
