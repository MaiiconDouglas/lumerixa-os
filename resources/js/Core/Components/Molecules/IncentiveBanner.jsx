import React from 'react';
import { Button } from '../Atoms/Button';

export const IncentiveBanner = ({ onActivate }) => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-zinc-900 to-[#111110] border border-[#f53003]/20 rounded-2xl p-6 lg:p-8 mb-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f53003]/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                <div>
                    <span className="inline-block px-2 py-0.5 rounded bg-[#f53003]/10 text-[#f53003] text-[9px] font-black uppercase tracking-widest mb-3">
                        Oportunidade de Crescimento
                    </span>
                    <h2 className="text-xl lg:text-2xl font-black text-white tracking-tighter mb-2">
                        Sua produtividade merece um <span className="text-[#f53003]">CNPJ</span>.
                    </h2>
                    <p className="text-zinc-400 text-xs max-w-xl leading-relaxed">
                        Transforme seu workspace individual em uma potência empresarial. Ative seu CNPJ agora para liberar o Módulo ERP, emissão de notas e gestão financeira avançada.
                    </p>
                </div>
                <Button 
                    onClick={onActivate}
                    className="w-full lg:w-auto px-8"
                >
                    Ativar Empresa PJ
                </Button>
            </div>
        </div>
    );
};
