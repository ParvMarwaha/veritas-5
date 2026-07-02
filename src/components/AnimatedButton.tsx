import React from 'react';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'light' | 'dark' | 'accent' | 'text';
  className?: string;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ 
  children, 
  variant = 'light',
  className = '',
  ...props
}) => {
  const variantClass = `custom-btn-${variant}`;
  return (
    <button 
      className={`custom-btn ${variantClass} font-mono uppercase tracking-tight text-[0.9375rem] ${className}`}
      {...props}
    >
      <span className="btn-text-1">{children}</span>
      <span className="btn-text-2" aria-hidden="true">{children}</span>
    </button>
  );
};
