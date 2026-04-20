import React from 'react';

export const Button = ({ 
    children, 
    type = 'button', 
    variant = 'primary', 
    size = 'md', 
    className = '', 
    disabled = false,
    ...props 
}) => {
    const baseStyles = "inline-flex items-center justify-center font-black uppercase tracking-wider transition-all rounded-lg disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
        primary: "bg-[#f53003] text-white hover:bg-[#d62a02] shadow-sm hover:shadow-md",
        secondary: "bg-white dark:bg-zinc-800 text-[#1C1C1A] dark:text-[#EDEDEC] border border-[#e3e3e0] dark:border-[#1F1F1E] hover:bg-gray-50 dark:hover:bg-zinc-700",
        outline: "bg-transparent border-2 border-[#f53003] text-[#f53003] hover:bg-[#f53003] hover:text-white",
        ghost: "bg-transparent text-zinc-500 hover:text-[#f53003] hover:bg-gray-50 dark:hover:bg-zinc-900"
    };

    const sizes = {
        xs: "px-2 py-1 text-[8px]",
        sm: "px-3 py-1.5 text-[9px]",
        md: "px-4 py-2 text-[10px]",
        lg: "px-6 py-3 text-[12px]"
    };

    return (
        <button 
            type={type}
            disabled={disabled}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
