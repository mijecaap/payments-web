import { forwardRef } from 'react';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';

interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  label: string;
  error?: string;
  icon?: 'mail' | 'lock' | 'user';
  placeholder: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, icon, placeholder, ...props }, ref) => {
    const Icon = icon === 'mail' 
      ? MdEmail 
      : icon === 'lock' 
      ? MdLock 
      : icon === 'user' 
      ? MdPerson 
      : null;

    return (
      <div className="w-full">
        <label className="sr-only">{label}</label>
        <div className="relative">
          {Icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          )}
          <input
            ref={ref}
            placeholder={placeholder}
            className={`w-full h-12 px-4 ${
              Icon ? 'pl-10' : ''
            } rounded-lg border focus:ring-2 focus:ring-[#1E88E5] focus:border-transparent shadow-[0_2px_4px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.2)] ${
              error ? 'border-[#E53935]' : 'border-[#B0BEC5] dark:border-gray-600'
            } text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 text-base bg-white dark:bg-gray-700`}
            aria-invalid={error ? 'true' : 'false'}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-[14px] text-[#E53935]">{error}</p>}
      </div>
    );
  }
);