import React, { useEffect, useState } from 'react';
import { Check, Eye, EyeOff, Lock, Mail, User, XCircle } from 'lucide-react';
import PasswordStrength from '../PasswordStrength';
import { useAuth } from '../../contexts/AuthContext';
import { ClipLoader } from 'react-spinners';
import { useLanguage } from '../../contexts/LanguageContext';

interface AuthFormProps {
  onToggleMode: () => void;
  setIsEditMode: (value: boolean) => void;
}

export default function EditAccaunt({ setIsEditMode }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user, editAccaunt, loadingEdit } = useAuth();
  const [success, setSucess] = useState(false)
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    rememberMe: false
  });


  useEffect(() => {
    if (user) {
      setFormData({
        email: user.data?.email,
        password: "",
        confirmPassword: '',
        username: user.data?.username,
        rememberMe: false
      })
    }
  }, [user])


  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState<any>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = t("enter.email")
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (!formData.password) {
      newErrors.password = t("no.password");
    } else if (formData.password.length < 8) {
      newErrors.password = t("password.error");
    }

    if (!formData.username) {
      newErrors.username = 'Введите имя или название компании';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Подтвердите пароль';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const sendDAta = {
        username: formData.username,
        password: formData.password,
        password_confirmation: formData.confirmPassword
      }

      const response = await editAccaunt(sendDAta)
      if (response.status) {
        setSucess(true)
      }
      else {
        setSucess(false)
      }
      if (!response.message) {
        setSucess(false)
        return
      }
      setApiError(response.message)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-sky-100">
        <div className="px-8 py-6 relative"  >
          <div onClick={() => setIsEditMode(false)} className='absolute right-2 top-2'>
            <XCircle />
          </div>
          {success ?
            <div className="w-full mt-5 mb-5 flex items-center justify-center px-4 py-8 border-2 border-dashed 
          border-green-300 rounded-lg bg-green-50">
              <div className="text-center">
                <Check className="mx-auto h-12 w-12 text-green-500" />
                <p className="mt-2 text-sm text-green-600">
                  {t("settings.success")}
                </p>
              </div>
            </div> :
            <form onSubmit={handleSubmit} className="relative space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  {t("auth.name")}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 bg-sky-50 border ${errors.username ? 'border-red-500' : 'border-sky-200'
                      } rounded-lg shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 
                    focus:border-transparent sm:text-sm transition-colors pl-10`}
                    placeholder="Иван Иванов или ООО Компания"
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t("auth.email")}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    disabled={true}
                    value={formData.email}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 bg-sky-50 border ${errors.email ? 'border-red-500' : 'border-sky-200'
                      } rounded-lg shadow-sm placeholder-gray-400 text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 
                  focus:border-transparent sm:text-sm transition-colors pl-10`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
                {apiError?.email && (
                  <p className="mt-1 text-sm text-red-500"> {t('mail.error')}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {t("auth.password")}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 bg-sky-50 border ${errors.password ? 'border-red-500' : 'border-sky-200'
                      } rounded-lg shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 
                  focus:border-transparent sm:text-sm transition-colors pl-10 pr-10`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
                <PasswordStrength password={formData.password} />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  {t("auth.confirm")}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 bg-sky-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-sky-200'
                      } rounded-lg shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 
                    focus:border-transparent sm:text-sm transition-colors pl-10 pr-10`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg 
                  shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 
                  transition-colors"
                >
                  {loadingEdit ?
                    <ClipLoader
                      color={"white"}
                      loading={true}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    /> :
                    t('profile.edit')
                  }
                </button>
              </div>
            </form>
          }
        </div>
      </div>
    </>
  );
}