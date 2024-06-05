import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
}

const getButtonClasses = (variant: 'primary' | 'secondary' | 'danger') => {
  const baseClasses = 'text-sm font-medium py-2 px-3 text-center rounded-lg border focus:outline-none focus:ring-2';

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 focus:ring-primary-300',
    secondary:
      'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white border-gray-200 focus:ring-primary-300 dark:border-gray-500 dark:focus:ring-gray-600',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900',
  };

  return `${baseClasses} ${variantClasses[variant]}`;
};

export default function Button({ children, variant, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} type='submit' className={getButtonClasses(variant)}>
      {children}
    </button>
  );
}
