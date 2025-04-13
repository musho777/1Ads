import React, { useState, useRef, useEffect } from 'react';
import { Plus, Copy, Upload, X, Check } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface BudgetCardProps {
  userEmail?: string;
}

const SBERBANK_CARD = '2202 2062 4625 6403';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
  userEmail?: string;
}

function PaymentModal({ isOpen, onClose, amount, userEmail }: PaymentModalProps) {
  const API_URL = import.meta.env.VITE_URL;
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currencySymbol = '₽';
  const { token } = useAuth();
  const { t } = useLanguage();



  if (!isOpen) return null;

  const handleCopyCard = () => {
    navigator.clipboard.writeText(SBERBANK_CARD.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("+79280900821");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };



  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append("payment", amount);
      formData.append("image", file);
      const id = localStorage.getItem("id")
      var myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      try {
        const response = await
          fetch(`${API_URL}/api/user_payment?token=${token}&user_id=${id}`, {
            method: "POST",
            headers: myHeaders,
            body: formData,
            redirect: 'follow'
          });
        await response.json();
        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData?.message)
          setUploading(false)
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setUploading(false);
        setUploadComplete(true);
        // ChaneUserData("balance", amount)
      } catch (error) {
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">
            {showUpload ? t("payment.receipt") : t("payment.info")}
          </h3>
          {!uploading && (
            <button onClick={() => {
              setUploading(false)
              setUploadComplete(false)
              setShowUpload(false)
              onClose()
            }} className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {!showUpload ? (
          <>
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-blue-900">{t("payment.ammount")}</p>
                    <p className="text-2xl font-bold text-blue-900">{currencySymbol}{amount}</p>
                  </div>
                  <div className="w-8 h-8 text-blue-500 text-xl">
                    ₽
                  </div>
                  {/* <DollarSign className="w-8 h-8 text-blue-500" /> */}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {/* Карта Сбербанка */}
                    {t("payment.card")}
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 px-4 py-2 bg-gray-50 rounded-lg font-mono text-gray-900">
                      {SBERBANK_CARD}
                    </div>
                    <button
                      onClick={handleCopyCard}
                      className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {userEmail && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("payment.description")}
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 px-4 py-2 bg-gray-50 rounded-lg text-gray-900">
                        +79280900821
                      </div>
                      <button
                        onClick={handleCopyEmail}
                        className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        {emailCopied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                    <label className="block font-medium  text-gray-400 mt-3 text-xs ">
                      {t("budget.description2")}
                    </label>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <button
                  onClick={() => setShowUpload(true)}
                  className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md 
                    shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {t("payment.paid")}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {t("payment.upload.description")}
              {/* Пожалуйста, загрузите квитанцию об оплате. После проверки модератором ваш бюджет будет пополнен. */}
            </p>

            <div className="mt-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*,.pdf"
                className="hidden"
              />

              {!uploading && !uploadComplete && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center px-4 py-8 border-2 border-dashed 
                    border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-blue-500"
                >
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-600">
                      {t("payemnt.click")}
                    </p>
                  </div>
                </button>
              )}

              {uploading && (
                <div className="w-full flex items-center justify-center px-4 py-8 border-2 border-dashed 
                  border-blue-300 rounded-lg bg-blue-50">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-2 text-sm text-blue-600">{t("payment.loading")}</p>
                  </div>
                </div>
              )}

              {uploadComplete && (
                <div className="w-full flex items-center justify-center px-4 py-8 border-2 border-dashed 
                  border-green-300 rounded-lg bg-green-50">
                  <div className="text-center">
                    <Check className="mx-auto h-12 w-12 text-green-500" />
                    <p className="mt-2 text-sm text-green-600">
                      {t("payment.success")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BudgetCard({ }: BudgetCardProps) {
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [amount, setAmount] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { t } = useLanguage();
  const currencySymbol = '₽';
  const { user } = useAuth();
  const [userEmail, setuserEmail] = useState("")


  const handleAddFunds = () => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      setShowPaymentModal(true);
    }
  };

  const isValidAmount = amount !== '' && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0;
  const [spentPercentage, setSpentPercentage] = useState(0)

  useEffect(() => {
    if (user) {
      setuserEmail(user.data?.email)
      const percentage = ((user?.data?.get_budget[0].budget - user?.data?.get_budget[0]?.budget_balance) / user?.data?.get_budget[0].budget) * 100;
      if (user?.data?.get_budget[0].budget == 0 && user?.data?.get_budget[0]?.budget_balance == 0) {
        setSpentPercentage(100)
      }
      else {
        setSpentPercentage(percentage)
      }
    }
    else {
      setSpentPercentage(100)
    }
  }, [user])

  // const spentPercentage = ((totalBudget - remainingBudget) / totalBudget) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4 flex-wrap gap-1">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{t('budget.title')}</h3>
          <p className="text-sm text-gray-500">{t('budget.description')}</p>
        </div>
        <button
          onClick={() => setShowAddFunds(true)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md 
            text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
        >
          <Plus className="w-4 h-4 mr-1" />
          {t('budget.addFunds')}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">{t('budget.remaining')}</span>
            <span className="text-sm text-gray-500">
              {currencySymbol}{user?.data?.get_budget[0].budget_balance}/{currencySymbol}{user?.data?.get_budget[0].budget}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-sky-600 h-2 rounded-full transition-all duration-300"
              // style={{ width: `${100 - (spentPercentage ?? 40)}%` }}
              style={{ width: `${100 - (spentPercentage ?? 0)}%` }}
            />
          </div>
        </div>

        {showAddFunds && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-3">{t('budget.addFunds')}</h4>
            <div className="flex space-x-2 flex-wrap gap-1">
              <div className="relative flex-1">
                <div className="text-gray-400  absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  ₽
                  {/* <DollarSign className="h-5 w-5 text-gray-400" /> */}
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  step="1"
                  className="
                  min-w-32
                  block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
                    focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="0.00"
                />
              </div>
              <div className="flex gap-1">
                <button
                  onClick={handleAddFunds}
                  disabled={!isValidAmount}
                  className={`px-4 py-2 border border-transparent text-sm font-medium rounded-md 
                  text-white transition-colors
                  ${isValidAmount
                      ? 'bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500'
                      : 'bg-gray-400 cursor-not-allowed'}`}
                >
                  {t('budget.add')}
                </button>
                <button
                  onClick={() => setShowAddFunds(false)}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md 
                  text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-sky-500"
                >
                  {t('budget.cancel')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setShowAddFunds(false);
          setAmount('');
        }}
        amount={amount}
        userEmail={userEmail}
      />
    </div>
  );
}