import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import TermsOfUse from '../TermsOfUse';
import PrivacyPolicy from '../PrivacyPolicy';
import { useAuth } from '../../contexts/AuthContext';
import { ClipLoader } from 'react-spinners';
import { useLanguage } from '../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  onToggleMode: () => void;
}

interface Data {
  email: string,
  password: string,
}


export default function Login({ onToggleMode }: AuthFormProps) {
  const { login, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfUse, setShowTermsOfUse] = useState(false);
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      LoginApi(formData)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const LoginApi = async (data: Data) => {
    setError(false)
    const response = await login(data.email, data.password);
    if (response.message == "Unauthorized") {
      setError(true)
    }
    else if (!response.message) {
      navigate("/dashboard")
    }
  }

  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-sky-100">
        <div className="px-8 py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
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
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 bg-sky-50 border ${errors.email ? 'border-red-500' : 'border-sky-200'
                    } rounded-lg shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-sky-500 
                  focus:border-transparent sm:text-sm transition-colors pl-10`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
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
            </div>



            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-sky-500 focus:ring-sky-500 border-sky-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  {t("auth.remember")}
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-sky-600 hover:text-sky-500">
                  {t("auth.forgot.password")}
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg 
                  shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 
                  transition-colors"
              >
                {loading ?
                  <ClipLoader
                    color={"white"}
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  /> :
                  'Войти'
                }
              </button>
            </div>
          </form>
          {error &&
            <p className="mt-3 text-sm text-red-500 text-center">
              {t('login.error')}
            </p>
          }
          <p className="mt-4 text-center text-sm text-gray-600">
            {t("auth.no.account")}{' '}
            <button
              onClick={onToggleMode}
              className="font-medium text-sky-600 hover:text-sky-500"
            >
              {t('auth.Register')}
            </button>
          </p>
        </div>
      </div>

      {showPrivacyPolicy && (
        <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />
      )}

      {showTermsOfUse && (
        <TermsOfUse onClose={() => setShowTermsOfUse(false)} />
      )}
    </>
  );
}