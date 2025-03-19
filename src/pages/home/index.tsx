import { useState, useEffect } from 'react';
import { ArrowRight, BarChart4, Moon, X, Globe, Layers } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitch from '../../components/LanguageSwitch';
import PrivacyPolicy from '../../components/PrivacyPolicy';
import TermsOfUse from '../../components/TermsOfUse';
import Login from '../../components/auth/login';
import Register from '../../components/auth/register';
import Cookie from '../../components/cookie';


function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false)
  const [showCookie, setShowCookie] = useState(false)

  const { t } = useLanguage();
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const handleAuthClick = (mode: boolean) => {
    setIsLoginMode(mode);
    setShowAuthModal(true);
  };


  const formatTime = (date: Date) => {
    return {
      hours: date.getHours().toString().padStart(2, '0'),
      minutes: date.getMinutes().toString().padStart(2, '0')
    };
  };

  const time = formatTime(currentTime);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-sky-50">
      {/* Navigation */}
      <nav className="w-full px-4 py-3 bg-white/80 backdrop-blur-md border-b border-sky-100 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Layers className="w-7 h-7 text-sky-500" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600">
              1Muslim Ads
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitch />
            <button
              onClick={() => handleAuthClick(true)}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t('auth.login')}
            </button>
            <button
              onClick={() => handleAuthClick(false)}
              className="px-4 py-2 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600 
          transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              {t('auth.register')}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-16">
        <div className="w-full max-w-7xl">
          {/* Clock Section */}
          <div className="text-center mb-16 pt-4">
            <div className="inline-flex flex-col items-center">
              <div className="text-[8rem] lg:text-[12rem] font-bold leading-[0.8] tracking-tighter text-sky-500">
                {time.hours}
              </div>
              <div className="text-[8rem] lg:text-[12rem] font-bold leading-[0.8] tracking-tighter text-sky-500">
                {time.minutes}
              </div>
            </div>
            <p className="text-xl font-bold text-gray-800 mt-8">
              {t('hero.timeForAds')}
            </p>
          </div>

          {/* Features Section */}
          <div className="w-full mb-16">
            <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
              {t('hero.description')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 border border-sky-100 shadow-sm hover:shadow-md transition-all">
                <Moon className="w-12 h-12 text-sky-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('features.halal.title')}</h3>
                <p className="text-gray-600">{t('features.halal.description')}</p>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 border border-sky-100 shadow-sm hover:shadow-md transition-all">
                <Globe className="w-12 h-12 text-sky-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('features.global.title')}</h3>
                <p className="text-gray-600">{t('features.global.description')}</p>
              </div>

              <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 border border-sky-100 shadow-sm hover:shadow-md transition-all">
                <BarChart4 className="w-12 h-12 text-sky-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{t('features.analytics.title')}</h3>
                <p className="text-gray-600">{t('features.analytics.description')}</p>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => handleAuthClick(false)}
                className="inline-flex items-center px-8 py-4 text-lg font-medium text-white 
            bg-sky-500 rounded-xl hover:bg-sky-600 transition-colors
            focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2
            shadow-lg hover:shadow-xl"
              >
                {t('hero.startAdvertising')}
                <ArrowRight className="ml-2 w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-4 py-8 bg-white/80 backdrop-blur-md border-t border-sky-100 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Layers className="w-6 h-6 text-sky-500" />
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600">
                  1Muslim Ads
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                {t('footer.description')}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">{t('footer.legal.title')}</h3>
              <ul className="space-y-2">
                <li>
                  <a href='#' onClick={() => setShowPrivacyPolicy(true)} className="text-gray-600 hover:text-gray-900 text-sm">
                    {t('footer.legal.privacy')}
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => setShowTerms(true)} className="text-gray-600 hover:text-gray-900 text-sm">
                    {t('footer.legal.terms')}
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => setShowCookie(true)} className="text-gray-600 hover:text-gray-900 text-sm">
                    {t('footer.legal.cookies')}
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">{t('footer.resources.title')}</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    {t('footer.resources.api')}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    {t('footer.resources.support')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-sky-100">
            <p className="text-center text-gray-600 text-sm">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>
      </footer>

      {showPrivacyPolicy && (
        <PrivacyPolicy onClose={() => setShowPrivacyPolicy(false)} />
      )}
      {showTerms && (
        <TermsOfUse onClose={() => setShowTerms(false)} />
      )}
      {showCookie &&
        <Cookie onClose={() => setShowCookie(false)} />
      }

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative max-w-md w-full mx-4 max-h-[95%] overflow-auto">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-3 right-3 text-black hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            {isLoginMode ?
              <Login onToggleMode={() => setIsLoginMode(!isLoginMode)} /> :
              <Register onToggleMode={() => setIsLoginMode(!isLoginMode)} />
            }
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;