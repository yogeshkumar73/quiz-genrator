import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  icon: Icon, 
  error, 
  className = "", 
  ...props 
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest px-1">
          {label}
        </label>
      ) }
      <div className="relative group">
        {Icon && (
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors">
            <Icon size={18} />
          </div>
        )}
        <input
          className={`
            w-full bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl
            px-6 py-4 text-lg text-white placeholder:text-gray-600
            focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50
            transition-all duration-300
            ${Icon ? 'pl-14' : 'pl-6'}
            ${error ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/50' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 font-medium px-1 px-4">{error}</p>
      )}
    </div>
  );
};
