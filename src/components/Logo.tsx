
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=200&h=60&q=80"
        alt="Ather"
        className={`${sizeClasses[size]} object-contain`}
      />
      <span className="ml-2 text-lg font-semibold text-gray-900">Ather</span>
    </div>
  );
};

export default Logo;
