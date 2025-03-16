import { useState, useEffect } from 'react';
import { ArrowRight, BarChart4, Moon, X, Globe, Layers } from 'lucide-react';
import AdminDashboard from '../../components/AdminDashboard';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitch from '../../components/LanguageSwitch';
import { Campaign } from '../../types';
import PrivacyPolicy from '../../components/PrivacyPolicy';
import TermsOfUse from '../../components/TermsOfUse';
import Login from '../../components/auth/login';
import Register from '../../components/auth/register';
import Cookie from '../../components/cookie';

// Initial campaigns data for demo purposes
const initialCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Halal Food Delivery',
    budget: 25000,
    spent: 9800,
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2024-04-30',
    impressions: 1500000,
    clicks: 60000,
    ctr: 4.0,
    cpm: 9.50,
    moderationStatus: 'approved',
    targetCountries: ['US', 'CA', 'GB', 'AU', 'NZ'],
    adContent: {
      title: "Certified Halal Food Delivery",
      description: "Your favorite halal restaurants delivered to your doorstep. Order now!",
      imageUrl: "https://images.unsplash.com/photo-1526016650454-68a6f488910a",
      targetUrl: "https://example.com/halal-delivery",
      mediaType: 'image'
    }
  },
  {
    id: '2',
    name: 'Ramadan Collection 2024',
    budget: 15000,
    spent: 4500,
    status: 'active',
    startDate: '2024-03-01',
    endDate: '2024-04-15',
    impressions: 850000,
    clicks: 25500,
    ctr: 3.0,
    cpm: 8.50,
    moderationStatus: 'approved',
    targetCountries: ['SA', 'AE', 'KW', 'QA', 'BH'],
    adContent: {
      title: "Ramadan Collection 2024",
      description: "Discover our exclusive Ramadan collection. Elegant abayas, modest fashion, and more.",
      imageUrl: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f",
      targetUrl: "https://example.com/ramadan-2024",
      mediaType: 'image'
    }
  },
  {
    id: '3',
    name: 'Islamic Education Platform',
    budget: 12000,
    spent: 3200,
    status: 'active',
    startDate: '2024-03-10',
    endDate: '2024-05-10',
    impressions: 420000,
    clicks: 18900,
    ctr: 4.5,
    cpm: 7.50,
    moderationStatus: 'approved',
    targetCountries: ['GB', 'US', 'CA', 'AU', 'FR'],
    adContent: {
      title: "Learn Islam Online",
      description: "Quality Islamic education from certified scholars. Start your journey today.",
      imageUrl: "https://images.unsplash.com/photo-1577451820952-05f58f41c779",
      targetUrl: "https://example.com/learn-islam",
      mediaType: 'image'
    }
  },
  {
    id: '4',
    name: 'Islamic Finance Course',
    budget: 18000,
    spent: 5400,
    status: 'paused',
    startDate: '2024-03-05',
    endDate: '2024-05-05',
    impressions: 720000,
    clicks: 28800,
    ctr: 4.0,
    cpm: 7.00,
    moderationStatus: 'approved',
    targetCountries: ['MY', 'ID', 'SG', 'BN', 'AE'],
    adContent: {
      title: "Master Islamic Finance",
      description: "Comprehensive course on Islamic banking and finance. AAOIFI certified.",
      imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c",
      targetUrl: "https://example.com/islamic-finance",
      mediaType: 'image'
    }
  },
  {
    id: '5',
    name: 'Halal Investment App',
    budget: 20000,
    spent: 7800,
    status: 'paused',
    startDate: '2024-02-15',
    endDate: '2024-04-15',
    impressions: 1200000,
    clicks: 42000,
    ctr: 3.5,
    cpm: 6.50,
    moderationStatus: 'pending',
    targetCountries: ['ID', 'MY', 'TR', 'SA', 'AE'],
    adContent: {
      title: "Shariah-Compliant Investments",
      description: "Start your halal investment journey today. No riba, no uncertainty.",
      imageUrl: "https://images.unsplash.com/photo-1553729459-efe14ef6055d",
      targetUrl: "https://example.com/halal-invest",
      mediaType: 'image'
    }
  },
  {
    id: '6',
    name: 'Prayer Time App',
    budget: 10000,
    spent: 2800,
    status: 'pending',
    startDate: '2024-03-15',
    endDate: '2024-04-15',
    impressions: 350000,
    clicks: 17500,
    ctr: 5.0,
    cpm: 6.00,
    moderationStatus: 'pending',
    targetCountries: ['SA', 'EG', 'TR', 'PK', 'BD'],
    adContent: {
      title: "Never Miss a Prayer",
      description: "Accurate prayer times, Qibla finder, and Quran with your phone.",
      imageUrl: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53",
      targetUrl: "https://example.com/prayer-app",
      mediaType: 'image'
    }
  },
  {
    id: '7',
    name: 'Modest Fashion Store',
    budget: 8000,
    spent: 1200,
    status: 'pending',
    startDate: '2024-03-20',
    endDate: '2024-04-20',
    impressions: 150000,
    clicks: 4500,
    ctr: 3.0,
    cpm: 5.50,
    moderationStatus: 'pending',
    targetCountries: ['TR', 'FR', 'DE', 'UK', 'NL'],
    adContent: {
      title: "Modest Fashion for Every Occasion",
      description: "Stylish and modest clothing for modern Muslim women. Free worldwide shipping.",
      imageUrl: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",
      targetUrl: "https://example.com/modest-fashion",
      mediaType: 'image'
    }
  }
];

function Home() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false)
  const [showCookie, setShowCookie] = useState(false)

  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
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

  const handleUpdateCampaign = (updatedCampaign: Campaign) => {
    setCampaigns(prevCampaigns =>
      prevCampaigns.map(campaign =>
        campaign.id === updatedCampaign.id ? updatedCampaign : campaign
      )
    );
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
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