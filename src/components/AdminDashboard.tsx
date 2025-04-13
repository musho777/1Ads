import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, DollarSign, TrendingUp, X, FileText, ExternalLink, LogOut } from 'lucide-react';
import { Campaign, BudgetIncrease } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitch from './LanguageSwitch';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { ClipLoader } from 'react-spinners';


interface PaymentDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
  campaign: Campaign;
}

interface BudgetIncreaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: () => void;
  budgetIncrease: BudgetIncrease;
}

interface RejectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

function RejectionModal({ isOpen, onClose, onConfirm }: RejectionModalProps) {
  const [reason, setReason] = useState('');
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reason.trim()) {
      onConfirm(reason);
      setReason('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Причина отклонения
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Укажите причину отклонения
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              required
              placeholder="Введите причину отклонения кампании..."
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Отмена
            </button>
            <button
              // onClick={() => bow_out_company()}
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Отклонить кампанию
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function BudgetIncreaseModal({ isOpen, onClose, onVerify, budgetIncrease }: BudgetIncreaseModalProps) {
  if (!isOpen) return null;

  const date = new Date(budgetIncrease.created_at);

  const year = date.getFullYear();
  const { t } = useLanguage();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            {t("admin.payment.documents.title")}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm font-medium text-blue-900">{t("admin.payment.documents.amount")}</h4>
                <p className="text-2xl font-bold text-blue-900">₽{budgetIncrease.payment_amount}</p>
              </div>
              <div className="w-8 h-8 text-blue-500 text-lg">
                ₽
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-gray-900">{budgetIncrease.email}</p>
                <p className="text-sm text-gray-500">
                  {budgetIncrease.date}
                </p>
              </div>
            </div>
          </div>
          <div className="border rounded-lg">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <FileText className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    {t("admin.payment.documents.receipt")}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {year}-{month}-{day}
                  </p>
                </div>
              </div>
              <a
                href={budgetIncrease.image}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <span className="text-sm mr-1">{t("admin.payment.documents.verify")}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {t("admin.payment.documents.close")}
            </button>
            <button
              onClick={() => {
                onVerify({ payment_id: budgetIncrease.id });
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              {t("admin.payment.documents.verify")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentDocumentsModal({ isOpen, onClose, onVerify, campaign }: PaymentDocumentsModalProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  // Mock payment documents for demonstration
  const documents = [
    {
      id: '1',
      type: 'receipt' as const,
      url: 'https://example.com/receipt.pdf',
      date: '2024-03-15',
      amount: campaign.budget
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            Payment Documents for {campaign.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-sm font-medium text-blue-900">Campaign Budget</h4>
                <p className="text-2xl font-bold text-blue-900">₽{campaign.budget.toLocaleString()}</p>
              </div>

              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="border rounded-lg divide-y">
            {documents.map(doc => (
              <div key={doc.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FileText className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      Payment {doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {new Date(doc.date).toLocaleDateString()} • ₽{doc.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:text-blue-800"
                >
                  <span className="text-sm mr-1">View</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={() => {
                onVerify();
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Verify Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


interface AdminDashboardProps {
  campaigns: Campaign[];
  onUpdateCampaign: (campaign: Campaign) => void;
  onSignOut: () => void;
}

export default function AdminDashboard({ onUpdateCampaign }: AdminDashboardProps) {
  const [selectedTab, setSelectedTab] = useState<'all' | 'moderation' | 'competitive'>('all');
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showBudgetIncreaseModal, setShowBudgetIncreaseModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedBudgetIncrease, setSelectedBudgetIncrease] = useState<BudgetIncrease | null>(null);
  const [campaignToReject, setCampaignToReject] = useState<Campaign | null>(null);
  const [payment, setPayment] = useState([])
  const { t } = useLanguage();
  const { logout } = useAuth();
  const [companyStatistic, setCompanyStatistic] = useState({})
  const [campaigns, setCampaigns] = useState([])
  const [sortedByCPM, setSortedByCPM] = useState([])
  const [topCPMCampaigns, setTopCPMCampaigns] = useState([])
  const [company, setCompany] = useState([])
  const [adminSelect, setAdminSelect] = useState(null)
  const [loadingTop, setLoadingTop] = useState(false)
  const API_URL = import.meta.env.VITE_URL;



  useEffect(() => {
    let item = [...campaigns].sort((a, b) => b.CPM - a.CPM);
    setSortedByCPM(item)
  }, [campaigns])


  function parseDate(dateString) {
    const [day, month, year] = dateString.split('.');
    return new Date(year, month - 1, day);
  }

  const handleModerate = async (campaign: Campaign, status: 'approved' | 'rejected', note?: string) => {
    // onUpdateCampaign({
    //   ...campaign,
    //   moderationStatus: status,
    //   moderationNote: note,
    //   status: status === 'approved' ? 'active' : 'paused'
    // });

    let item = [...company]
    let index = item.findIndex((elm) => elm.id == campaign.id)
    if (index > -1) {
      item.splice(index, 1)
    }
    let statistic = { ...companyStatistic }
    statistic.under_moderation -= 1
    setCompanyStatistic(statistic)
    setCompany(item)


    let temp = [...campaigns]
    const today = new Date();
    const startDate = parseDate(campaign.start_date);
    const finishDate = parseDate(campaign.finish_date);
    const isInRange = today >= startDate && today <= finishDate;
    if (temp.status == "active" && isInRange) {
      temp.push(campaign)
      setCampaigns(temp)
    }
    const id = localStorage.getItem("id")
    const local_token = localStorage.getItem("token");
    try {
      await axios.post(`${API_URL}/api/confirm_company?token=${local_token}&user_id=${id}`, {
        company_id: campaign.id,
      });
    } catch (error: any) {
      console.log(error)
    }

  };

  const handleRejectClick = (campaign: Campaign) => {
    setCampaignToReject(campaign);
    setShowRejectionModal(true);
  };

  const handleRejectConfirm = async (reason: string) => {

    if (campaignToReject) {
      handleModerate(campaignToReject, 'rejected', reason);
      setShowRejectionModal(false);
      setCampaignToReject(null);
      let item = [...company]
      let index = item.findIndex((elm) => elm.id == campaignToReject.id)
      if (index > -1) {
        item.splice(index, 1)
      }
      let statistic = { ...companyStatistic }
      statistic.under_moderation -= 1
      setCompanyStatistic(statistic)
      setCompany(item)
      const local_token = localStorage.getItem("token");
      const id = localStorage.getItem("id")
      try {
        const response = await axios.post(`${API_URL}/api/bow_out_company?token=${local_token}&user_id=${id}`, {
          company_id: campaignToReject.id,
          reason_for_refusal: reason
        });
      } catch (error: any) {
        console.log(error)
      }
    }
  };

  const handleVerifyBudgetIncrease = (budgetIncrease: BudgetIncrease) => {
    setSelectedBudgetIncrease(budgetIncrease);
    setShowBudgetIncreaseModal(true);
  };

  const handlePaymentVerified = () => {
    if (selectedCampaign) {
      onUpdateCampaign({
        ...selectedCampaign,
        paymentStatus: {
          ...selectedCampaign.paymentStatus,
          verified: true
        }
      });
    }
  };


  const handleBudgetIncreaseVerified = async (data: any) => {
    const local_token = localStorage.getItem("token");
    let item = [...payment]

    let index = item.findIndex((elm) => elm.id == data.payment_id)
    if (index > -1) {
      item.splice(index, 1)
    }
    setPayment(item)
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const id = localStorage.getItem("id")
    try {
      const response = await fetch(`${API_URL}/api/confirm_payment?token=${local_token}&user_id=${id}`, requestOptions);
      const result: any = await response.json();
      console.log(result)
    } catch (error) {
    }
  };


  const ModerationQueue = () => {
    return <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">
        {t("admin.awaiting.moderation")} ({payment.length + company.length})
      </h3>

      {payment.map(budgetIncrease => (
        <div key={budgetIncrease.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-1">
                <p className="w-5 h-5 text-blue-500" >₽</p>
                {/* <DollarSign className="w-5 h-5 text-blue-500" /> */}
                <h4 className="text-lg font-medium text-gray-900">
                  {t("admin.payment.documents.request")}
                </h4>
              </div>
              <p className="text-sm text-gray-500">
                {t("admin.payment.documents.user")}: {budgetIncrease.email}
              </p>
              <p className="text-sm text-gray-500">
                {t("admin.payment.documents.amount")}: ₽{budgetIncrease.payment_amount}
              </p>
              <p className="text-sm text-gray-500">
                {t("admin.payment.documents.request.date")}: {budgetIncrease.date}
              </p>
            </div>
            <button
              onClick={() => handleVerifyBudgetIncrease(budgetIncrease)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <p className="w-4 h-4 mr-1" >₽</p>
              {/* <DollarSign className="w-4 h-4 mr-1" /> */}
              {t("admin.payment.verify")}
            </button>
          </div>
        </div>
      ))}

      {company.map(campaign => {
        return <div key={campaign.id} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start space-x-6">
            <div className="w-48 flex-shrink-0">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <img
                  src={campaign.file}
                  alt={campaign.company_title}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="text-lg font-medium text-gray-900">{campaign.company_name}</h4>
                  <p className="text-sm text-gray-500">
                    {t("campaigns.table.budget")}: ₽{campaign.budget}
                  </p>
                  <p className="text-sm text-gray-500">
                    CPM: ₽{campaign.CPM}
                  </p>
                  <div className="mt-2">
                    <h5 className="text-sm font-medium text-gray-900">{campaign.company_title}</h5>
                    <p className="text-sm text-gray-600">{campaign.company_description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleModerate(campaign, 'approved')}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {t("admin.moderation.approve")}
                  </button>
                  <button
                    onClick={() => handleRejectClick(campaign)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    {t("admin.moderation.reject")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      })}
      {payment.length === 0 && company.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">{t("admin.no.campaigns")}</p>
        </div>
      )}
    </div>
  };

  const activatePriorityCompany = async (id: string) => {
    setLoadingTop(true)
    const local_token = localStorage.getItem("token");
    try {
      const ids = localStorage.getItem("id")
      const respons = await axios.post(`${API_URL}/api/activatePriorityCompany?token=${local_token}&user_id=${ids}`, {
        company_id: id,
      });
      console.log(respons.data.data)
      setAdminSelect(respons.data.data)
    } catch (error: any) {
      console.log(error)
    }
    finally {
      setLoadingTop(false)
    }
  }

  const disactivatePriorityCompany = async (id: string) => {
    const local_token = localStorage.getItem("token");
    const ids = localStorage.getItem("id")
    try {
      await axios.post(`${API_URL}/api/disactivatePriorityCompany?token=${local_token}&user_id=${ids}`, {
        company_id: id,
      });
    } catch (error: any) {
      console.log(error)
    }
  }


  const CompetitiveAnalysis = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t('admin.competitive.title')}</h3>
        <div className="space-y-4">
          {topCPMCampaigns?.map((campaign, index) => {
            console.log(campaign)
            return <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full ${index === 0 ? 'bg-yellow-100 text-yellow-800' :
                  index === 1 ? 'bg-gray-100 text-gray-800' :
                    index === 2 ? 'bg-orange-100 text-orange-800' :
                      'bg-blue-100 text-blue-800'
                  }`}>
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{campaign.company_name}</h4>
                  <p className="text-sm text-gray-500">
                    {t('admin.competitive.budget')}: ₽{campaign.budget} | {t('admin.competitive.spent')}: ₽{campaign.spent}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">₽{campaign.CPM}</div>
                  <div className="text-sm text-gray-500">CPM</div>
                </div>
                {index === 3 && (
                  <button
                    onClick={() => onUpdateCampaign({
                      ...campaign,
                      status: campaign.status === 'active' ? 'paused' : 'active'
                    })}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${campaign.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                      }`}
                  >
                    {campaign.status === 'active' ? t('admin.competitive.pause') : t('admin.competitive.activate')}
                  </button>
                )}
              </div>
            </div>
          })}
          {loadingTop &&
            <div className='flex items-center justify-center'>
              <ClipLoader
                color={"black"}
                loading={true}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          }
          {adminSelect &&
            <div key={adminSelect.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-800`}>
                  4
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{adminSelect.company_name}</h4>
                  <p className="text-sm text-gray-500">
                    {t('admin.competitive.budget')}: ₽{adminSelect.budget} | {t('admin.competitive.spent')}: ₽{adminSelect.budget_difference}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">₽{adminSelect.CPM}</div>
                  <div className="text-sm text-gray-500">CPM</div>
                </div>
                <button
                  onClick={() => {
                    setAdminSelect(null)
                    disactivatePriorityCompany(adminSelect.id)
                  }
                    //   onUpdateCampaign({
                    //   ...campaign,
                    //   status: campaign.status === 'active' ? 'paused' : 'active'
                    // })
                  }
                  className={`px-3 py-1 rounded-full text-sm font-medium ${adminSelect.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                    }`}
                >
                  {adminSelect.status === 'active' ? t('admin.competitive.pause') : t('admin.competitive.activate')}
                </button>
              </div>
            </div>
          }
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t('admin.competitive.management')}</h3>
        <div className="space-y-4">
          {sortedByCPM.map(campaign => {
            return <div key={campaign.id} className="flex items-center justify-between p-4 border-b last:border-0">
              <div>
                <h4 className="font-medium text-gray-900">{campaign.company_name}</h4>
                <p className="text-sm text-gray-500">CPM: ₽{campaign.CPM}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                  campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                  {campaign.status}
                </span>
                <button
                  onClick={() => {
                    if (campaign.id !== adminSelect?.id) {
                      setAdminSelect(null)
                      activatePriorityCompany(campaign.id)
                      // setAdminSelect(campaign)
                    }
                    else {
                      setAdminSelect(null)
                      disactivatePriorityCompany(campaign.id)
                    }
                  }
                    //   onUpdateCampaign({
                    //   ...campaign,
                    //   status: campaign.status === 'active' ? 'paused' : 'active'
                    // })
                  }
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {campaign.id === adminSelect?.id ? t('admin.competitive.pause') : t('admin.competitive.activate')}
                </button>
              </div>
            </div>
          })}

        </div>
      </div>
    </div>
  );

  const getCompanyStatistic = async () => {
    const local_token = localStorage.getItem("token");
    const ids = localStorage.getItem("id")
    try {
      const response = await axios.get(`${API_URL}/api/getCompanyStatistic?token=${local_token}&user_id=${ids}`);
      setCompanyStatistic(response.data)
    } catch (error: any) {
    }
  }

  const getPaymentOnModeration = async () => {
    const local_token = localStorage.getItem("token");
    const ids = localStorage.getItem("id")
    try {
      const response = await axios.get(`${API_URL}/api/getPaymentOnModeration?token=${local_token}&user_id=${ids}`);
      setPayment(response.data.message)
    } catch (error: any) {
    }
  }

  const getBestCompany = async () => {
    const local_token = localStorage.getItem("token");
    const ids = localStorage.getItem("id")
    try {
      const response = await axios.get(`${API_URL}/api/getBestCompany?token=${local_token}&user_id=${ids}`);
      setTopCPMCampaigns(response.data.bestCompany)
      setAdminSelect(response.data.admin_company)
    } catch (error: any) {
    }
  }

  const getPrioretCompany = async () => {
    const local_token = localStorage.getItem("token");
    const id = localStorage.getItem("id")
    try {
      const response = await axios.get(`${API_URL}/api/getPriorityCompanies?token=${local_token}&user_id=${id}`);
      setCampaigns(response.data.data)
    } catch (error: any) {
    }
  }

  const getCompanyАwaitingМoderation = async () => {
    const local_token = localStorage.getItem("token");
    const ids = localStorage.getItem('id')
    try {
      const response = await axios.get(`${API_URL}/api/getCompanyАwaitingМoderation?token=${local_token}&user_id=${ids}`);

      setCompany(response.data[1])
    } catch (error: any) {
    }
  }

  useEffect(() => {
    getCompanyStatistic()
    getPaymentOnModeration()
    getCompanyАwaitingМoderation()
    getBestCompany()
    getPrioretCompany()
  }, [])


  console.log(company)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{t("admin.title")}</h2>
          <div className="flex items-center space-x-4">
            <LanguageSwitch />
            <button
              onClick={() => logout()}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 
                transition-colors rounded-lg hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {t("profile.logout")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t('admin.stats.highestCpm')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {companyStatistic.max_CPM}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t('admin.stats.pendingModeration')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {companyStatistic.under_moderation}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t('admin.stats.activeCampaigns')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {companyStatistic.active_company}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <p className="text-green-600">₽</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setSelectedTab('all')}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${selectedTab === 'all'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {t('admin.tabs.all')}
              </button>
              <button
                onClick={() => setSelectedTab('moderation')}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${selectedTab === 'moderation'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {t('admin.tabs.moderation')}
              </button>
            </nav>
          </div>

          <div className="p-6">
            {selectedTab === 'moderation' && <ModerationQueue />}
            {selectedTab === 'competitive' && <CompetitiveAnalysis />}
            {selectedTab === 'all' && (
              <div className="space-y-6">
                <CompetitiveAnalysis />
                <ModerationQueue />
              </div>
            )}
          </div>
        </div>
      </div>

      <RejectionModal
        isOpen={showRejectionModal}
        onClose={() => {
          setShowRejectionModal(false);
          setCampaignToReject(null);
        }}
        onConfirm={handleRejectConfirm}
      />

      {selectedBudgetIncrease && (
        <BudgetIncreaseModal
          isOpen={showBudgetIncreaseModal}
          onClose={() => {
            setShowBudgetIncreaseModal(false);
            setSelectedBudgetIncrease(null);
          }}
          onVerify={handleBudgetIncreaseVerified}
          budgetIncrease={selectedBudgetIncrease}
        />
      )}
    </div>
  );
}