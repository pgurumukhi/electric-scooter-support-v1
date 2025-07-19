
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
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=200&h=60&q=80"
        alt="Electric Scooter"
        className={`${sizeClasses[size]} object-contain`}
      />
      <span className="ml-2 text-lg font-semibold text-gray-900">Ather</span>
    </div>
  );
};

export default Logo;
