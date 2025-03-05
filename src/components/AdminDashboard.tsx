import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, DollarSign, TrendingUp, X, FileText, ExternalLink, LogOut } from 'lucide-react';
import { Campaign, BudgetIncrease } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitch from './LanguageSwitch';

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
  const { t } = useLanguage();

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
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            Платежные документы
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
                <h4 className="text-sm font-medium text-blue-900">Сумма пополнения</h4>
                <p className="text-2xl font-bold text-blue-900">${budgetIncrease.amount.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-gray-900">{budgetIncrease.userEmail}</p>
                <p className="text-sm text-gray-500">
                  {new Date(budgetIncrease.requestDate).toLocaleDateString()}
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
                    Квитанция
                  </h4>
                  <p className="text-sm text-gray-500">
                    {new Date(budgetIncrease.receipt.uploadDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <a
                href={budgetIncrease.receipt.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:text-blue-800"
              >
                <span className="text-sm mr-1">Просмотреть</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Закрыть
            </button>
            <button
              onClick={() => {
                onVerify();
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              Подтвердить оплату
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
                <p className="text-2xl font-bold text-blue-900">${campaign.budget.toLocaleString()}</p>
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
                      {new Date(doc.date).toLocaleDateString()} • ${doc.amount.toLocaleString()}
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

const mockBudgetIncreases: BudgetIncrease[] = [
  {
    id: 'bi1',
    userId: 'user1',
    userEmail: 'advertiser@example.com',
    amount: 5000,
    requestDate: '2024-03-20',
    status: 'pending',
    receipt: {
      url: 'https://example.com/receipt.pdf',
      uploadDate: '2024-03-20'
    }
  }
];

interface AdminDashboardProps {
  campaigns: Campaign[];
  onUpdateCampaign: (campaign: Campaign) => void;
  onSignOut: () => void;
}

export default function AdminDashboard({ campaigns, onUpdateCampaign, onSignOut }: AdminDashboardProps) {
  const [selectedTab, setSelectedTab] = useState<'all' | 'moderation' | 'competitive'>('all');
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showBudgetIncreaseModal, setShowBudgetIncreaseModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedBudgetIncrease, setSelectedBudgetIncrease] = useState<BudgetIncrease | null>(null);
  const [campaignToReject, setCampaignToReject] = useState<Campaign | null>(null);
  const { t } = useLanguage();

  const pendingModeration = campaigns.filter(c => c.moderationStatus === 'pending');
  const pendingBudgetIncreases = mockBudgetIncreases.filter(bi => bi.status === 'pending');
  const sortedByCPM = [...campaigns].sort((a, b) => b.cpm - a.cpm);
  const topCPMCampaigns = sortedByCPM.slice(0, 4);

  const handleModerate = (campaign: Campaign, status: 'approved' | 'rejected', note?: string) => {
    onUpdateCampaign({
      ...campaign,
      moderationStatus: status,
      moderationNote: note,
      status: status === 'approved' ? 'active' : 'paused'
    });
  };

  const handleRejectClick = (campaign: Campaign) => {
    setCampaignToReject(campaign);
    setShowRejectionModal(true);
  };

  const handleRejectConfirm = (reason: string) => {
    if (campaignToReject) {
      handleModerate(campaignToReject, 'rejected', reason);
      setShowRejectionModal(false);
      setCampaignToReject(null);
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

  const handleBudgetIncreaseVerified = () => {
    // Handle budget increase verification
    console.log('Budget increase verified:', selectedBudgetIncrease);
  };

  const ModerationQueue = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">
        Ожидают модерации ({pendingModeration.length + pendingBudgetIncreases.length})
      </h3>

      {/* Budget Increase Requests */}
      {pendingBudgetIncreases.map(budgetIncrease => (
        <div key={budgetIncrease.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-blue-500" />
                <h4 className="text-lg font-medium text-gray-900">
                  Запрос на пополнение бюджета
                </h4>
              </div>
              <p className="text-sm text-gray-500">
                Пользователь: {budgetIncrease.userEmail}
              </p>
              <p className="text-sm text-gray-500">
                Сумма: ${budgetIncrease.amount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Дата запроса: {new Date(budgetIncrease.requestDate).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => handleVerifyBudgetIncrease(budgetIncrease)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <DollarSign className="w-4 h-4 mr-1" />
              Проверить оплату
            </button>
          </div>
        </div>
      ))}

      {/* Campaign Moderation Requests */}
      {pendingModeration.map(campaign => (
        <div key={campaign.id} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start space-x-6">
            <div className="w-48 flex-shrink-0">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <img
                  src={campaign.adContent.imageUrl}
                  alt={campaign.adContent.title}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="text-lg font-medium text-gray-900">{campaign.name}</h4>
                  <p className="text-sm text-gray-500">
                    Бюджет: ${campaign.budget.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    CPM: ${campaign.cpm.toFixed(2)}
                  </p>
                  <div className="mt-2">
                    <h5 className="text-sm font-medium text-gray-900">{campaign.adContent.title}</h5>
                    <p className="text-sm text-gray-600">{campaign.adContent.description}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleModerate(campaign, 'approved')}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Одобрить
                  </button>
                  <button
                    onClick={() => handleRejectClick(campaign)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Отклонить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {pendingModeration.length === 0 && pendingBudgetIncreases.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">Нет кампаний на модерации</p>
        </div>
      )}
    </div>
  );

  const CompetitiveAnalysis = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t('admin.competitive.title')}</h3>
        <div className="space-y-4">
          {topCPMCampaigns.map((campaign, index) => (
            <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full ${index === 0 ? 'bg-yellow-100 text-yellow-800' :
                    index === 1 ? 'bg-gray-100 text-gray-800' :
                      index === 2 ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                  }`}>
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                  <p className="text-sm text-gray-500">
                    {t('admin.competitive.budget')}: ${campaign.budget.toLocaleString()} | {t('admin.competitive.spent')}: ${campaign.spent.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">${campaign.cpm.toFixed(2)}</div>
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
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{t('admin.competitive.management')}</h3>
        <div className="space-y-4">
          {sortedByCPM.map(campaign => (
            <div key={campaign.id} className="flex items-center justify-between p-4 border-b last:border-0">
              <div>
                <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                <p className="text-sm text-gray-500">CPM: ${campaign.cpm.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                    campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                  }`}>
                  {campaign.status}
                </span>
                <button
                  onClick={() => onUpdateCampaign({
                    ...campaign,
                    status: campaign.status === 'active' ? 'paused' : 'active'
                  })}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {campaign.status === 'active' ? t('admin.competitive.pause') : t('admin.competitive.activate')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Панель администратора</h2>
          <div className="flex items-center space-x-4">
            <LanguageSwitch />
            <button
              onClick={onSignOut}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 
                transition-colors rounded-lg hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Выйти
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{t('admin.stats.highestCpm')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${sortedByCPM[0]?.cpm.toFixed(2) || '0.00'}
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
                  {pendingModeration.length + pendingBudgetIncreases.length}
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
                  {campaigns.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
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
              <button
                onClick={() => setSelectedTab('competitive')}
                className={`whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm ${selectedTab === 'competitive'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {t('admin.tabs.competitive')}
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