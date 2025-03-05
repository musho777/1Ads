import React, { useEffect, useState } from 'react';
import { BarChart3, DollarSign, MousePointerClick, Eye, Pencil, Trash2, ExternalLink, AlertTriangle, TrendingUp, TrendingDown, MoreVertical } from 'lucide-react';
import { Campaign } from '../types';
import CampaignForm from './CampaignForm';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitch from './LanguageSwitch';
import ProfileMenu from './ProfileMenu';
import BudgetCard from './BudgetCard';
import { useAuth } from '../contexts/AuthContext';
import EditAccaunt from './auth/editAccaunt';
import SettingsModal from './settingsModal';
import { ClipLoader } from 'react-spinners';



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
  const isCompetitive = campaign.CPM >= highestCpm;
  const recommendedCpm = Math.ceil(highestCpm * 1.1 * 100) / 100;
  const currencySymbol = language === 'ru' ? '₽' : '$';
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 mb-6 ${isCompetitive ? 'border-l-4 border-green-500' : 'border-l-4 border-yellow-500'
      }`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">{t('competitive.title')}</h3>
          {isCompetitive ? (
            <div className="flex items-center text-green-600 mb-2">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span className="font-medium">
                {t('competitive.isCompetitive', { name: campaign.company_name })}
              </span>
            </div>
          ) : (
            <div className="flex items-center text-yellow-600 mb-2">
              <TrendingDown className="w-5 h-5 mr-2" />
              <span className="font-medium">
                {t('competitive.needsBoost', { name: campaign.company_name })}
              </span>
            </div>
          )}
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              {t('competitive.yourCpm')}: <span className="font-semibold">{currencySymbol}{campaign.CPM}</span>
            </p>
            <p className="text-sm text-gray-600">
              {t('competitive.highestCpm')}: <span className="font-semibold">{currencySymbol}{highestCpm}</span>
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
                  {t('competitive.recommendation', { amount: recommendedCpm })}
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
          src={campaign?.adContent.fileUrl}
          alt={campaign?.company_title}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
        />
      </div>
      <h3 className="font-medium text-lg mb-2">{campaign?.company_title}</h3>
      <p className="text-gray-600 text-sm mb-4">{campaign?.company_description}</p>
      <a
        href={campaign?.company_url}
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
  const [campaigns, setCampaigns] = useState<Campaign[]>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | undefined>();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  const { token, user, loading } = useAuth();
  const [settings, setSettings] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)


  const [loading1, setLoading] = useState(false)

  const [success, setSuccess] = useState(false)

  const totalBudget = 10000;
  const totalSpent = 0;
  const remainingBudget = totalBudget - totalSpent;
  const currencySymbol = language === 'ru' ? '₽' : '$';

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
  };

  const handleCreateCampaign = async (campaignData: Omit<Campaign, 'id' | 'impressions' | 'clicks' | 'CTR' | 'spent'>) => {
    setLoading(true)
    const formData = new FormData();
    formData.append("company_name", "fsjdfsd");
    formData.append("budget", JSON.stringify(campaignData.budget));
    formData.append("CPM", JSON.stringify(campaignData.cpm));
    formData.append("start_date", campaignData.startDate)
    formData.append("finish_date", campaignData.endDate)
    formData.append("finish_date", campaignData.endDate)
    formData.append("company_description", campaignData.adContent.description)
    formData.append("company_url", campaignData.adContent.targetUrl)
    formData.append("media_type", campaignData.adContent.mediaType)
    formData.append("status", campaignData.status)
    formData.append("coutries", JSON.stringify(campaignData.targetCountries))

    if (campaignData.adContent.imageUrl) {
      formData.append("file", campaignData.adContent.imageUrl);
      formData.append("videoImage", campaignData.adContent.imageUrl);
    }
    if (campaignData.adContent.thumbnailUrl) {
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`)
    myHeaders.append("Accept", "application/json");
    try {
      const response = await
        fetch(`/api/createCompany`, {
          method: "POST",
          headers: myHeaders,
          body: formData,
          redirect: 'follow'
        });
      const data = await response.json()
      console.log(data)
      if (!response.ok) {
        const errorData = await response.json();
        setLoading(false)
        setSuccess(false)
        if (errorData.messag) {
          alert(JSON.stringify(errorData.message))
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(data.data.CPM)
      let newData = {
        "CPM": data.data.CPM,
        "CTR": 0.0,
        // "admin_status": "Готова к публикации",
        // "admin_status_comment": null,
        "budget": data.data.budget,
        "company_description": data.data.company_description,
        "company_name": data.data.company_name,
        "company_title": data.data.company_title,
        "company_url": data.data.company_url,
        "created_at": data.data.created_at,
        "file": data.data.file,
        "finish_date": data.data.finish_date,
        "get_company_budget": [],
        "get_company_statistic": [],
        "highest_CPM": 9439349,
        "id": data.data.id,
        "media_type": data.data.media_type,
        "start_date": data.data.start_date,
        "status": data.data.status,
        "updated_at": data.data?.updated_at,
        "user_id": data.data.user_id,
        "videoImage": data.data.videoImage
      }
      setCampaigns([...campaigns, newData]);
      setEditingCampaign(undefined);
      setIsFormOpen(false);
      setSuccess(true)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setSuccess(false)

      console.error("Error:", error);
    }


  };

  const GetCompanys = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };

    let responseData: { message: string; status: boolean } = { message: "", status: false };
    try {
      const response = await fetch(`/api/getCompanies`, requestOptions);
      const result: any = await response.json();
      responseData = { message: result.errors, status: result.status };
      if (!result.errors) {
        setCampaigns(result.data)
        console.log(result.data)
      }
    }
    catch (error) {
      responseData = { message: "Server Error", status: false };
    }
    finally {
    }
    return responseData;
  };

  const handleEditCampaign = (campaignData: Omit<Campaign, 'id' | 'impressions' | 'clicks' | 'CTR' | 'spent'>) => {
    if (!editingCampaign) return;

    const updatedCampaigns = campaigns?.map(campaign =>
      campaign.id === editingCampaign.id
        ? { ...campaign, ...campaignData }
        : campaign
    );

    console.log(editingCampaign.id)
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        "company_name": campaignData.name,
        "budget": 1000,
        "CPM": 1000,
        "company_id": editingCampaign.id,
        "start_date": campaignData.startDate,
        "finish_date": campaignData.endDate,
        "status": campaignData.status,
        "coutries": campaignData.targetCountries,
      })
    };

    // let responseData: { message: string; status: boolean } = { message: "", status: false };
    try {
      const response = fetch(`/api/editCompany`, requestOptions);
      const result: any = response.json();
      console.log(result)
      // responseData = { message: result.errors, status: result.status };
      // if (!result.errors) {
      //   setCampaigns(result.data)
      //   console.log(result.data)
      // }
    }
    catch (error) {
      console.log(error)
      // responseData = { message: "Server Error", status: false };
    }

    setCampaigns(updatedCampaigns);
    setEditingCampaign(undefined);
  };

  const handleDeleteCampaign = (id: string) => {
    console.log(token)
    console.log(id)
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ "company_id": id }),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    };
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(campaign => campaign?.id !== id));
      try {
        fetch(`/api/deleteCompany`, requestOptions);
      }
      catch (error) {
      }
      if (selectedCampaign?.id === id) {
        setSelectedCampaign(null);
      }
    }
  };

  const openEditForm = (campaign: Campaign) => {
    console.log(campaign, 'campaign')
    setEditingCampaign(campaign);
    setIsFormOpen(true);
  };

  const toggleActionMenu = (id: string) => {
    setActionMenuOpen(actionMenuOpen === id ? null : id);
  };

  useEffect(() => {
    if (token) {
      GetCompanys()
    }
  }, [token])

  // const highestCpm = Math.max(...campaigns?.map(c => c?.CPM));
  const highestCpm = 0;
  if (loading)
    return <div className="flex justify-center items-center h-screen">
      <ClipLoader
        color={"black"}
        loading={true}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
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
                setSuccess(false)
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md 
                text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              {t('dashboard.createCampaign')}
            </button>
            <LanguageSwitch />
            <ProfileMenu
              setIsEditMode={(e: boolean) => setIsEditMode(e)}
              onEditProfile={handleEditProfile}
              setSettings={() => setSettings(true)}
            />
          </div>
        </div>

        <div className="mb-8">
          <BudgetCard totalBudget={totalBudget} remainingBudget={remainingBudget} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title={t('dashboard.stats.totalSpent')}
            value={user?.allTimeStatistic?.Total_spent}
            icon={DollarSign}
            color="bg-green-500"
          />
          <StatCard
            title={t('dashboard.stats.impressions')}
            value={user?.allTimeStatistic?.Impressions}
            icon={Eye}
            color="bg-blue-500"
          />
          <StatCard
            title={t('dashboard.stats.clicks')}
            value={user?.allTimeStatistic?.Clicks}
            icon={MousePointerClick}
            color="bg-purple-500"
          />
          <StatCard
            title={t('dashboard.stats.averageCpm')}
            value={user?.allTimeStatistic?.average_CPM}
            icon={BarChart3}
            color="bg-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {campaigns?.map(campaign => (
              <CompetitiveStatus
                key={campaign?.id}
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
                {campaigns?.map((campaign) => (
                  <div
                    key={campaign?.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedCampaign(campaign)}
                  >
                    <div className="p-4 sm:px-6">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div className="mb-2 sm:mb-0">
                          <h3 className="text-base font-medium text-gray-900">{campaign?.company_name}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {campaign?.start_date} - {campaign?.finish_date}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${campaign?.status === 'active' ? 'bg-green-100 text-green-800' :
                            campaign?.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                            {campaign?.status}
                          </span>
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleActionMenu(campaign?.id);
                              }}
                              className="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
                            >
                              <MoreVertical className="w-5 h-5 text-gray-500" />
                            </button>

                            {actionMenuOpen === campaign?.id && (
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
                                      handleDeleteCampaign(campaign?.id);
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
                          <p className="mt-1 text-sm font-medium text-gray-900">{currencySymbol}{campaign.CPM}</p>
                        </div>
                        <div>
                          <p className="text-xs  font-medium text-gray-500 uppercase">{t('campaigns.table.impressions')}</p>
                          {campaign?.get_company_statistic?.length > 0 &&
                            <p className="mt-1 text-sm font-medium text-gray-900">{campaign?.get_company_statistic[0].Impressions}</p>
                          }
                        </div>
                        <div>
                          <p className="text-xs  font-medium text-gray-500 uppercase">{t('campaigns.table.clicks')}</p>
                          {campaign?.get_company_statistic?.length > 0 &&
                            <p className="mt-1  text-sm font-medium text-gray-900">{campaign?.get_company_statistic[0]?.Clicks}</p>
                          }
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase">{t('campaigns.table.ctr')}</p>
                          <p className="mt-1 text-sm font-medium text-gray-900">{campaign.CTR}%</p>
                        </div>
                      </div>
                      {/* Progress bar for budget spent - Updated to show dollar amounts */}
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-medium text-gray-500">{t('campaigns.table.progress')}</span>
                          {campaign?.get_company_budget?.length > 0 && <span className="text-xs text-gray-500">
                            {currencySymbol}{campaign.get_company_budget[0].budget_balance}/{currencySymbol}{campaign?.get_company_budget[0].budget}
                          </span>}
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          {campaign?.get_company_budget?.length > 0 && <div
                            className="bg-sky-600 h-1.5 rounded-full"
                            style={{ width: `${(campaign?.get_company_budget[0].budget_balance / campaign?.get_company_budget[0].budget_balance ?? 1) * 100}%` }}
                          />}
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
        loading1={loading1}
        isOpen={isFormOpen}
        success={success}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCampaign(undefined);
        }}
        onSubmit={editingCampaign ? handleEditCampaign : handleCreateCampaign}
        initialData={editingCampaign}
      />
      {isEditMode &&
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <EditAccaunt setIsEditMode={(e) => setIsEditMode(e)} onToggleMode={() => setIsEditMode(!isEditMode)} />
        </div>
      }
      {settings &&
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <SettingsModal setSettings={(e: any) => setSettings(e)} onToggleMode={() => setIsEditMode(!isEditMode)} />
        </div>
      }

    </div>
  );
}

export default Dashboard;