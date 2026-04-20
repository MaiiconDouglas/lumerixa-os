import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import DashboardLayout from '@/Core/Layouts/DashboardLayout';
import { Button } from '@/Core/Components/Atoms/Button';
import { Input } from '@/Core/Components/Atoms/Input';
import { Card } from '@/Core/Components/Molecules/Card';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        cnpj: '',
        company_name: '',
        trade_name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/workspaces');
    };

    const fetchCnpj = async (cnpj) => {
        if (cnpj.length === 14) {
            try {
                const response = await fetch(`/api/proxy/cnpj/${cnpj}`);
                const json = await response.json();
                if (json.razao_social) {
                    setData(d => ({
                        ...d,
                        company_name: json.razao_social,
                        trade_name: json.nome_fantasia || ''
                    }));
                }
            } catch (error) {
                console.error("Erro ao buscar CNPJ", error);
            }
        }
    };

    return (
        <DashboardLayout title="Ativar Empresa">
            <Head title="Nova Empresa - Lumerixa OS" />

            <div className="max-w-2xl mx-auto">
                <Card 
                    title="Dados da Empresa" 
                    description="Informe o CNPJ da sua organização para ativar os módulos empresariais."
                >
                    <form onSubmit={submit} className="space-y-6">
                        <Input 
                            label="CNPJ (Somente números)" 
                            value={data.cnpj}
                            onChange={e => {
                                setData('cnpj', e.target.value);
                                fetchCnpj(e.target.value);
                            }}
                            maxLength={14}
                            error={errors.cnpj}
                            placeholder="00000000000000"
                        />

                        {data.company_name && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/20">
                                <p className="text-[10px] font-black uppercase text-green-600 mb-1">Empresa Encontrada</p>
                                <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{data.company_name}</p>
                                <p className="text-[10px] text-zinc-500 uppercase">{data.trade_name}</p>
                            </div>
                        )}

                        <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-zinc-800">
                            <Input 
                                label="Razão Social" 
                                value={data.company_name}
                                onChange={e => setData('company_name', e.target.value)}
                                error={errors.company_name}
                            />
                            <Input 
                                label="Nome Fantasia" 
                                value={data.trade_name}
                                onChange={e => setData('trade_name', e.target.value)}
                                error={errors.trade_name}
                            />
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button 
                                type="submit" 
                                disabled={processing || !data.company_name}
                            >
                                {processing ? 'Ativando...' : 'Confirmar e Ativar'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </DashboardLayout>
    );
}
