import React from 'react';

export const Card = ({ 
    children, 
    title, 
    description, 
    footer,
    className = '' 
}) => {
    return (
        <div className={`bg-white dark:bg-[#111110] border border-[#e3e3e0] dark:border-[#1F1F1E] rounded-xl overflow-hidden ${className}`}>
            {(title || description) && (
                <div className="px-6 py-5 border-b border-[#e3e3e0] dark:border-[#1F1F1E]">
                    {title && <h3 className="text-sm font-bold text-[#1C1C1A] dark:text-[#EDEDEC]">{title}</h3>}
                    {description && <p className="text-[10px] text-zinc-500 mt-1 uppercase tracking-wider">{description}</p>}
                </div>
            )}
            <div className="p-6">
                {children}
            </div>
            {footer && (
                <div className="px-6 py-4 bg-gray-50 dark:bg-zinc-900/50 border-t border-[#e3e3e0] dark:border-[#1F1F1E]">
                    {footer}
                </div>
            )}
        </div>
    );
};
