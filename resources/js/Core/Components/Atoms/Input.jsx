import React from 'react';

export const Input = ({ 
    label, 
    error, 
    className = '', 
    ...props 
}) => {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">
                    {label}
                </label>
            )}
            <input 
                className={`
                    bg-white dark:bg-[#111110] 
                    border border-[#e3e3e0] dark:border-[#1F1F1E] 
                    rounded-lg px-4 py-2 text-xs 
                    text-[#1C1C1A] dark:text-[#EDEDEC]
                    placeholder:text-zinc-400
                    focus:outline-none focus:ring-2 focus:ring-[#f53003]/20 focus:border-[#f53003]
                    transition-all
                    ${error ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : ''}
                `}
                {...props}
            />
            {error && (
                <span className="text-[9px] font-bold text-red-500 ml-1 italic">
                    {error}
                </span>
            )}
        </div>
    );
};
