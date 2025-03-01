import React, { useState } from 'react';
import { BarChart3, DollarSign, MousePointerClick, Eye, Pencil, Trash2, ExternalLink, AlertTriangle, TrendingUp, TrendingDown, MoreVertical } from 'lucide-react';
import { Campaign } from '../types';
import CampaignForm from './CampaignForm';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitch from './LanguageSwitch';
import ProfileMenu from './ProfileMenu';
import BudgetCard from './BudgetCard';

const initialCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Sale 2024',
    budget: 5000,
    spent: 2340,
    status: 'active',
    startDate: '2024-03-01',
    endDate: '2024-04-01',
    impressions: 45000,
    clicks: 1200,
    ctr: 2.67,
    cpm: 4.50,
    languages: ['en', 'es', 'fr'],
    adContent: {
      title: "Summer Collection 2024",
      description: "Discover our latest summer collection. Fresh styles for hot days!",
      imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
      targetUrl: "https://example.com/summer-collection"
    }
  },
  {
    id: '2',
    name: 'Product Launch',
    budget: 10000,
    spent: 4500,
    status: 'active',
    startDate: '2024-03-15',
    endDate: '2024-04-15',
    impressions: 85000,
    clicks: 2400,
    ctr: 2.82,
    cpm: 5.00,
    languages: ['en', 'de', 'fr', 'it'],
    adContent: {
      title: "Revolutionary New Product",
      description: "Experience the future of technology. Pre-order now!",
      imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      targetUrl: "https://example.com/new-product"
    }
  }
];

const StatCard = ({ title, value, icon: Icon, color }: { 
  title: string; 
  value: string; 
  icon: React.ElementType;
  color: string;
}) => (
  <div className="bg-white rounded-lg p-6 shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const CompetitiveStatus = ({ campaign, highestCpm }: { 
  campaign: Campaign; 
  highestCpm: number;
}) => {
  const { t, language } = useLanguage();
  const isCompetitive = campaign.cpm >= highestCpm;
  const recommendedCpm = Math.ceil(highestCpm * 1.1 * 100) / 100;
  const currencySymbol = language === 'ru' ? '₽' : '$';

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 mb-6 ${
      isCompetitive ? 'border-l-4 border-green-500' : 'border-l-4 border-yellow-500'
    }`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">{t('competitive.title')}</h3>
          {isCompetitive ? (
            <div className="flex items-center text-green-600 mb-2">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span className="font-medium">
                {t('competitive.isCompetitive', { name: campaign.name })}
              </span>
            </div>
          ) : (
            <div className="flex items-center text-yellow-600 mb-2">
              <TrendingDown className="w-5 h-5 mr-2" />
              <span className="font-medium">
                {t('competitive.needsBoost', { name: campaign.name })}
              </span>
            </div>
          )}
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              {t('competitive.yourCpm')}: <span className="font-semibold">{currencySymbol}{campaign.cpm.toFixed(2)}</span>
            </p>
            <p className="text-sm text-gray-600">
              {t('competitive.highestCpm')}: <span className="font-semibold">{currencySymbol}{highestCpm.toFixed(2)}</span>
            </p>
            <p className="text-sm text-gray-600">
              {t('competitive.status')}: <span className={`font-semibold ${isCompetitive ? 'text-green-600' : 'text-yellow-600'}`}>
                {isCompetitive ? t('competitive.active') : t('competitive.paused')}
              </span>
            </p>
            {!isCompetitive && (
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <AlertTriangle className="w-4 h-4 inline mr-2" />
                  {t('competitive.recommendation', { amount: recommendedCpm.toFixed(2) })}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdPreview = ({ campaign }: { campaign: Campaign }) => {
  const { t } = useLanguage();
  return (
    <div className="bg-white rounded-lg shadow p-4 max-w-sm">
      <div className="relative w-full pb-[50%] mb-4">
        <img
          src={campaign.adContent.imageUrl}
          alt={campaign.adContent.title}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
      </div>
      <h3 className="font-medium text-lg mb-2">{campaign.adContent.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{campaign.adContent.description}</p>
      <a
        href={campaign.adContent.targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
      >
        {t('preview.viewLanding')} <ExternalLink className="w-4 h-4 ml-1" />
      </a>
    </div>
  );
};

function Dashboard() {
  const { t, language } = useLanguage();
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | undefined>();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);

  const totalBudget = 10000; // This would typically come from your backend
  const totalSpent = campaigns.reduce((sum, campaign) => sum + campaign.spent, 0);
  const remainingBudget = totalBudget - totalSpent;
  const totalImpressions = campaigns.reduce((sum, campaign) => sum + campaign.impressions, 0);
  const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);
  const averageCpm = campaigns.reduce((sum, c) => sum + c.cpm, 0) / campaigns.length;
  const currencySymbol = language === 'ru' ? '₽' : '$';

  const handleEditProfile = () => {
    // Implement profile editing logic
    console.log('Edit profile clicked');
  };

  const handleCreateCampaign = (campaignData: Omit<Campaign, 'id' | 'impressions' | 'clicks' | 'ctr' | 'spent'>) => {
    const newCampaign: Campaign = {
      ...campaignData,
      id: Math.random().toString(36).substr(2, 9),
      impressions: 0,
      clicks: 0,
      ctr: 0,
      spent: 0
    };
    setCampaigns([...campaigns, newCampaign]);
  };

  const handleEditCampaign = (campaignData: Omit<Campaign, 'id' | 'impressions' | 'clicks' | 'ctr' | 'spent'>) => {
    if (!editingCampaign) return;
    
    const updatedCampaigns = campaigns.map(campaign => 
      campaign.id === editingCampaign.id 
        ? { ...campaign, ...campaignData }
        : campaign
    );
    setCampaigns(updatedCampaigns);
    setEditingCampaign(undefined);
  };

  const handleDeleteCampaign = (id: string) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(campaign => campaign.id !== id));
      if (selectedCampaign?.id === id) {
        setSelectedCampaign(null);
      }
    }
  };

  const openEditForm = (campaign: Campaign) => {
    setEditingCampaign(campaign);
    setIsFormOpen(true);
  };

  const toggleActionMenu = (id: string) => {
    setActionMenuOpen(actionMenuOpen === id ? null : id);
  };

  const highestCpm = Math.max(...campaigns.map(c => c.cpm));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.title')}</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                setEditingCampaign(undefined);
                setIsFormOpen(true);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md 
                text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              {t('dashboard.createCampaign')}
            </button>
            <LanguageSwitch />
            <ProfileMenu onEditProfile={handleEditProfile} />
          </div>
        </div>

        <div className="mb-8">
          <BudgetCard totalBudget={totalBudget} remainingBudget={remainingBudget} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            title={t('dashboard.stats.totalSpent')}
            value={`${currencySymbol}${totalSpent.toLocaleString()}`}
            icon={DollarSign}
            color="bg-green-500"
          />
          <StatCard 
            title={t('dashboard.stats.impressions')}
            value={totalImpressions.toLocaleString()}
            icon={Eye}
            color="bg-blue-500"
          />
          <StatCard 
            title={t('dashboard.stats.clicks')}
            value={totalClicks.toLocaleString()}
            icon={MousePointerClick}
            color="bg-purple-500"
          />
          <StatCard 
            title={t('dashboard.stats.averageCpm')}
            value={`${currencySymbol}${averageCpm.toFixed(2)}`}
            icon={BarChart3}
            color="bg-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {campaigns.map(campaign => (
              <CompetitiveStatus 
                key={campaign.id} 
                campaign={campaign} 
                highestCpm={highestCpm}
              />
            ))}
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">{t('campaigns.title')}</h2>
              </div>
              
              {/* Redesigned Campaigns Table */}
              <div className="divide-y divide-gray-200">
                {campaigns.map((campaign) => (
                  <div 
                    key={campaign.id} 
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedCampaign(campaign)}
                  >
                    <div className="p-4 sm:px-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div className="mb-2 sm:mb-0">
                          <h3 className="text-base font-medium text-gray-900">{campaign.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {campaign.startDate} - {campaign.endDate}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                            campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {campaign.status}
                          </span>
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleActionMenu(campaign.id);
                              }}
                              className="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                            >
                              <MoreVertical className="w-5 h-5 text-gray-500" />
                            </button>
                            
                            {actionMenuOpen === campaign.id && (
                              <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                                <div className="py-1">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      openEditForm(campaign);
                                      setActionMenuOpen(null);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                  >
                                    <Pencil className="w-4 h-4 mr-2 text-blue-600" />
                                    {t('campaigns.actions.edit')}
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteCampaign(campaign.id);
                                      setActionMenuOpen(null);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2 text-red-600" />
                                    {t('campaigns.actions.delete')}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase">{t('campaigns.table.cpm')}</p>
                          <p className="mt-1 text-sm font-medium text-gray-900">{currencySymbol}{campaign.cpm.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase">{t('campaigns.table.impressions')}</p>
                          <p className="mt-1 text-sm font-medium text-gray-900">{campaign.impressions.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase">{t('campaigns.table.clicks')}</p>
                          <p className="mt-1 text-sm font-medium text-gray-900">{campaign.clicks.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase">{t('campaigns.table.ctr')}</p>
                          <p className="mt-1 text-sm font-medium text-gray-900">{campaign.ctr.toFixed(2)}%</p>
                        </div>
                      </div>
                      
                      {/* Progress bar for budget spent - Updated to show dollar amounts */}
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium text-gray-500">{t('campaigns.table.progress')}</span>
                          <span className="text-xs text-gray-500">
                            {currencySymbol}{campaign.spent.toLocaleString()}/{currencySymbol}{campaign.budget.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-sky-600 h-1.5 rounded-full"
                            style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('preview.title')}</h2>
              {selectedCampaign ? (
                <AdPreview campaign={selectedCampaign} />
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p>{t('preview.selectCampaign')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <CampaignForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCampaign(undefined);
        }}
        onSubmit={editingCampaign ? handleEditCampaign : handleCreateCampaign}
        initialData={editingCampaign}
      />
    </div>
  );
}

export default Dashboard;