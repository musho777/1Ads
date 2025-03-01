import React from 'react';

interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const calculateStrength = (password: string): number => {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/)) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    return strength;
  };

  const getStrengthText = (strength: number): string => {
    if (strength === 0) return 'Очень слабый';
    if (strength === 1) return 'Слабый';
    if (strength === 2) return 'Средний';
    if (strength === 3) return 'Хороший';
    if (strength === 4) return 'Сильный';
    return 'Очень сильный';
  };

  const getStrengthColor = (strength: number): string => {
    if (strength === 0) return 'bg-red-500';
    if (strength === 1) return 'bg-red-400';
    if (strength === 2) return 'bg-yellow-400';
    if (strength === 3) return 'bg-green-400';
    if (strength === 4) return 'bg-green-500';
    return 'bg-green-600';
  };

  const strength = calculateStrength(password);
  const strengthText = getStrengthText(strength);
  const strengthColor = getStrengthColor(strength);

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-600">Надежность пароля:</span>
        <span className="text-xs font-medium text-gray-700">{strengthText}</span>
      </div>
      <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${strengthColor} transition-all duration-300`}
          style={{ width: `${(strength / 5) * 100}%` }}
        />
      </div>
      <ul className="mt-2 text-xs text-gray-500 space-y-1">
        <li className={password.length >= 8 ? 'text-sky-600' : ''}>
          • Минимум 8 символов
        </li>
        <li className={password.match(/[a-z]/) ? 'text-sky-600' : ''}>
          • Одна строчная буква
        </li>
        <li className={password.match(/[A-Z]/) ? 'text-sky-600' : ''}>
          • Одна заглавная буква
        </li>
        <li className={password.match(/[0-9]/) ? 'text-sky-600' : ''}>
          • Одна цифра
        </li>
        <li className={password.match(/[^a-zA-Z0-9]/) ? 'text-sky-600' : ''}>
          • Один специальный символ
        </li>
      </ul>
    </div>
  );
}