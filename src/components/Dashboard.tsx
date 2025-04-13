import React, { useEffect, useState } from 'react';
import { BarChart3, DollarSign, MousePointerClick, Eye, Pencil, Trash2, ExternalLink, TrendingUp, MoreVertical } from 'lucide-react';
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
import ReactPaginate from 'react-paginate';
import AdminDashboard from './AdminDashboard';
import { ChartModal } from './chart';



const StatCard = ({ title, value, icon: Icon, color, rub }: {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
  rub: boolean;
}) => (
  <div className="bg-white rounded-lg p-6 shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        {rub ?
          <p className="w-6 h-6 text-white text-center text-xl">₽</p> :
          <Icon className="w-6 h-6 text-white" />
        }
      </div>
    </div>
  </div>
);

const CompetitiveStatus = ({ campaign, highestCpm, setOpenChart }: {
  campaign: Campaign;
  highestCpm: number;
  setOpenChart: boolean;
}) => {
  const { t } = useLanguage();
  const isCompetitive = campaign.CPM >= highestCpm;
  const currencySymbol = '₽';
  let activeText = ""
  let activeColor = ""
  let status = ""
  if (campaign.admin_status == "На модерации") {
    activeColor = "#515151"
    activeText = campaign.admin_status_comment || t("competitive.in.moderation")
    status = t("На модерации")
  }
  else if (campaign.admin_status == "Допущена") {
    activeColor = "#3860b1"
    activeText = campaign.admin_status_comment || t("competitive.in.access")
    status = t("competitive.access")

  }
  else if (campaign.admin_status == "Активна") {
    activeColor = "#45b117"
    activeText = campaign.admin_status_comment || t("competitive.showing")
    status = t("competitive.active")

  }
  else if (campaign.admin_status == "Не допущена") {
    activeColor = "#b3b2b2"
    activeText = campaign.admin_status_comment || t("competitive.comments")
    status = t("competitive.reject")
  }
  else if (campaign.admin_status == "Приостановлена") {
    activeColor = "#e1b42c"
    activeText = campaign.admin_status_comment || t("competitive.over")
    status = t("competitive.pause")

  }
  else if (campaign.admin_status == "Завершена") {
    activeColor = "#af5857"
    activeText = campaign.admin_status_comment || t("competitive.date.end")
    status = t("Завершена")

  }
  else if (campaign.admin_status == "Запланирована") {
    activeColor = "#516da5"
    activeText = campaign.admin_status_comment || t("competitive.completed")
    status = t("competitive.planned")
  }
  return (
    <div
      style={{ borderColor: activeColor }}
      className={`bg-white rounded-lg shadow-md p-6 mb-6 ${isCompetitive ? 'border-l-4 border-green-500' : 'border-l-4'
        }`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">{t('competitive.title')}:  {campaign.company_name}</h3>
          {isCompetitive ? (
            <div style={{ color: activeColor }} className="flex items-center text-green-600 mb-2">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span className="font-medium">
                {activeText}
                {/* {t('competitive.isCompetitive', { name: campaign?.company_name })} */}
              </span>
            </div>
          ) : (
            <div
              style={{ color: activeColor }}
              className="flex items-center  mb-2">
              <span className="font-medium">
                {activeText}
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
              {t('competitive.status')}: <span
                style={{ color: activeColor }}
                className={`font-semibold`}>
                {status}
              </span>
            </p>
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
          src={campaign?.videoImage ? campaign?.videoImage : campaign?.file}
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
  const { t } = useLanguage();
  const [campaigns, setCampaigns] = useState<Campaign[]>();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<Campaign | undefined>();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  const { token, user, loading, ChaneUserData } = useAuth();
  const [settings, setSettings] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [highestCpm, setHighestCpm] = useState(0)
  const [page, setPage] = useState(1)
  const [loading1, setLoading] = useState(false)
  const [pageCount, setPageCaunt] = useState(1)
  const [editLoading, setEditLoading] = useState(false)
  const [loadingCampaigns, setLoadingCampaigns] = useState(false)
  const [success, setSuccess] = useState(false)
  const [warningModal, setWarningModal] = useState(false)
  const [warningText, setWarningText] = useState("")
  const API_URL = import.meta.env.VITE_URL;
  const [openChart, setOpenChart] = useState(false)
  const [companyId, setCopmanyId] = useState(null)

  const currencySymbol = '₽';

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
  };

  const handleUpdateCampaign = (updatedCampaign: Campaign) => {

  };
  const handleSignOut = () => {
  };



  const handleCreateCampaign = async (campaignData: Omit<Campaign, 'id' | 'impressions' | 'clicks' | 'CTR' | 'spent'>) => {
    setLoading(true)
    const id = localStorage.getItem("id")
    const formData = new FormData();
    formData.append("company_name", campaignData.name);
    formData.append("budget", JSON.stringify(campaignData.budget));
    formData.append("CPM", JSON.stringify(campaignData.cpm));
    formData.append("start_date", campaignData.startDate)
    formData.append("finish_date", campaignData.endDate)
    formData.append("max_CPM_need", campaignData.max_CPM_need)
    formData.append("company_description", campaignData.adContent.description)
    formData.append("company_url", campaignData.adContent.targetUrl)
    formData.append("media_type", campaignData.adContent.mediaType)
    formData.append("status", campaignData.status)
    // formData.append("coutries", campaignData.targetCountries)
    campaignData.targetCountries.forEach(country => {
      formData.append("countries[]", country);
    });
    formData.append("company_title", campaignData.adContent.title)

    if (campaignData.adContent.imageUrl) {
      formData.append("file", campaignData.adContent.imageUrl);
      formData.append("videoImage", campaignData.adContent.thumbnailUrl);
    }
    if (campaignData.adContent.thumbnailUrl) {
    }
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    try {
      const response = await
        fetch(`${API_URL}/api/createCompany?token=${token}&user_id=${id}`, {
          method: "POST",
          headers: myHeaders,
          body: formData,
          redirect: 'follow'
        });
      const data = await response.json()
      if (!response.ok) {
        // const errorData = await response.json();
        setLoading(false)
        setSuccess(false)
        if (data.message) {
          // campaign.CPM.error
          if (data.message === "минимальная сумма CPM 1000 рублей") {
            alert(t("campaign.CPM.error"))
          }
          else if (data.message.includes("Цена ниже, чем у конкурентов")) {
            setWarningModal(true)
            setWarningText(data.message)
          }
          else {
            alert(JSON.stringify(data.message))
          }

        }
        setLoading(false)
        throw new Error(`HTTP error! Status: ${response.status}`);
      }


      // setCampaigns([...campaigns, newData]);
      setEditingCampaign(undefined);
      setIsFormOpen(false);
      setSuccess(true)
      setLoading(false)
      GetCompanys()
      console.log("campaignData.budget", campaignData.budget)
      ChaneUserData("balance", campaignData.budget)
    } catch (error) {
      setLoading(false)
      setSuccess(false)

      console.error("Error:", error);
    }


  };
  const GetCompanys = async () => {
    setLoadingCampaigns(true)
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const id = localStorage.getItem("id")
      const response = await fetch(`${API_URL}/api/getCompanies?token=${token}&user_id=${id}&page=${page}`, requestOptions);
      const result: any = await response.json();
      if (!result.errors) {
        setCampaigns(result.data)
        setPageCaunt(result.page_count)
        if (result.data.length > 0) {
          setHighestCpm(result.data[0].highest_CPM)
        }
      }
    }
    catch (error) {
    }
    finally {
      setLoadingCampaigns(false)
    }
  };


  const handleEditCampaign = async (campaignData: Omit<Campaign, 'id' | 'impressions' | 'clicks' | 'CTR' | 'spent'>) => {
    if (!editingCampaign) return;
    setEditLoading(true)
    const formData = new FormData();
    formData.append("company_name", campaignData.name);
    formData.append("budget", JSON.stringify(campaignData.budget));
    formData.append("CPM", campaignData.cpm);
    formData.append("start_date", campaignData.startDate)
    formData.append("finish_date", campaignData.endDate)
    formData.append("status", campaignData.status)
    formData.append("comapny_id", editingCampaign.id)
    formData.append("max_CPM_need", campaignData.max_CPM_need)
    campaignData.targetCountries.forEach(country => {
      formData.append("countries[]", country);
    });
    const requestOptions = {
      method: "POST",
      // headers: {
      //   // "Content-Type": "application/json",
      // },
      body: formData,
      // body: JSON.stringify({
      //   company_name: campaignData.name,
      //   budget: campaignData.budget,
      //   CPM: campaignData.cpm,
      //   comapny_id: editingCampaign.id,
      //   start_date: campaignData.startDate,
      //   finish_date: campaignData.endDate,
      //   status: campaignData.status,
      //   coutries: campaignData.targetCountries,
      // }),
    };
    try {
      const id = localStorage.getItem("id")
      const response = await fetch(`${API_URL}/api/editCompany?token=${token}&&user_id=${id}`, requestOptions);
      const data = await response.json();
      if (!response.ok) {
        setEditLoading(false)
        // setIsFormOpen(false)
        if (data.message == "минимальная сумма CPM 1000 рублей") {
          alert(t("campaign.CPM.error"));
        }
        else if (data.message.includes("Цена ниже, чем у конкурентов")) {
          setWarningModal(true)
          setWarningText(data.message)
        }
        else {
          alert(data.message);
        }
      }
      else {
        setEditLoading(false)
        setIsFormOpen(false)
        let item = [...campaigns]
        let index = campaigns?.findIndex((elm) => elm.id == editingCampaign.id)
        item[index] = data.data
        item[index].CTR = data.CTR
        /////////
        // ChaneUserData()
        setCampaigns(item)
        setEditingCampaign(undefined);
      }

    }


    // user?.data?.get_budget[0].budget_balance
    catch (error) {

      setEditLoading(false)
      setEditingCampaign(undefined);
    }
    // setEditingCampaign(undefined);
  };

  const handleDeleteCampaign = (id: string) => {
    const ids = localStorage.getItem("id")

    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ "company_id": id }),
      headers: {
        "Content-Type": "application/json",

      },
    };
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter(campaign => campaign?.id !== id));
      try {
        fetch(`${API_URL}/api/deleteCompany?token=${token}&&user_id=${ids}`, requestOptions);
      }
      catch (error) {
      }
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

  useEffect(() => {
    if (token) {
      GetCompanys()
    }
  }, [token, page])
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
  if (user?.data?.roll == "admin") {
    return <AdminDashboard
      onUpdateCampaign={handleUpdateCampaign}
      onSignOut={handleSignOut}
    />
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="mr-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            {t('dashboard.title')}
          </h1>
          <div className="flex items-center space-x-4">
            <button
              disabled={user?.data?.get_budget[0].budget_balance == 0}
              onClick={() => {
                setEditingCampaign(undefined);
                setIsFormOpen(true);
                setSuccess(false)
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md 
              text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500
              disabled:bg-gray-400 disabled:cursor-not-allowed"
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
          <BudgetCard />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title={t('dashboard.stats.totalSpent')}
            value={user?.allTimeStatistic?.Total_spent}
            rub
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
                setOpenChart={(e) => setOpenChart(e)}
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

                {loadingCampaigns ?
                  <div className="flex justify-center items-center py-5">
                    <ClipLoader
                      color={"black"}
                      loading={true}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                  :
                  <div>
                    {campaigns?.map((campaign) => (
                      <div
                        key={campaign?.id}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => setSelectedCampaign(campaign)}
                      >
                        <div className="p-4 sm:px-6">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                            <div className="mb-2 sm:mb-0">
                              <div className='flex items-center gap-5'>
                                <h3 className="text-base font-medium text-gray-900">{campaign?.company_name}</h3>
                                <img onClick={() => {
                                  console.log(campaign)
                                  setCopmanyId(campaign.id)
                                  setOpenChart(true)
                                }} src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%230EA5E9' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 3v18h18'/%3E%3Cpath d='m19 9-5 5-4-4-3 3'/%3E%3C/svg%3E" />
                              </div>
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
                                  <div className="absolute right-30 mt-1 w-36 bg-white rounded-md shadow-lg z-10 border border-gray-200">
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

                          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-5">
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

                                style={{
                                  width: `
                                  ${(
                                      !campaign?.get_company_budget[0].budget_balance / (campaign?.get_company_budget[0].budget_balance ?? 1) ?
                                        0 :
                                        campaign?.get_company_budget[0].budget_balance / campaign?.get_company_budget[0].budget_balance ?? 1) * 100
                                    }%`
                                }}
                              />}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                }
              </div>
            </div>
            <div className='height-40'>
              {pageCount > 1 && <ReactPaginate
                breakLabel="..."
                nextLabel=""
                onPageChange={(e) => setPage(e.selected + 1)}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel=""
                renderOnZeroPageCount={null}
                containerClassName="flex justify-center items-center gap-2 p-4 text-[14px]"
                activeClassName="bg-[rgb(2,132,199)] text-white rounded-full w-5 h-5 flex items-center justify-center "
                disabledClassName="opacity-50 cursor-not-allowed"
                previousClassName="font-bold "
                nextClassName="font-bold"
                breakClassName="px-3 py-2"
              />}
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
        loading={loading1 || editLoading}
        isOpen={isFormOpen}
        success={success}
        warningModal={warningModal}
        warningText={warningText}
        setWarningModal={(e: boolean) => setWarningModal(e)}
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
      {openChart && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <ChartModal companyId={companyId} onClose={() => setOpenChart(false)} />
      </div>
      }
    </div>
  );
}

export default Dashboard;