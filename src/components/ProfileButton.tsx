import React from 'react';
import { User, Bell } from 'lucide-react';

interface ProfileButtonProps {
  onClick: () => void;
  notificationCount?: number;
  ariaLabel?: string;
}

export default function ProfileButton({ 
  onClick, 
  notificationCount = 0,
  ariaLabel = 'Open profile menu'
}: ProfileButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 
        hover:bg-gray-50 active:bg-gray-100 
        transition-all duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        shadow-sm hover:shadow-md"
    >
      <User className="w-5 h-5 text-gray-600" />
      
      {notificationCount > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-medium text-white 
          bg-red-500 rounded-full ring-2 ring-white
          animate-in fade-in duration-200"
        >
          {notificationCount > 99 ? '99+' : notificationCount}
        </span>
      )}
      
      <span className="sr-only">Open profile menu</span>
    </button>
  );
}