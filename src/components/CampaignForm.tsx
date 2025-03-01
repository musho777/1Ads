import React, { useState } from 'react';
import { X, ChevronDown, Upload, Image, Video, Globe, Calendar, DollarSign, Target, Lock } from 'lucide-react';
import { Campaign } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

// List of countries with their names in English and Russian
const countries = [
  // CIS Countries
  { code: 'RU', nameEn: 'Russia', nameRu: 'Россия', isCIS: true },
  { code: 'KZ', nameEn: 'Kazakhstan', nameRu: 'Казахстан', isCIS: true },
  { code: 'BY', nameEn: 'Belarus', nameRu: 'Беларусь', isCIS: true },
  { code: 'UZ', nameEn: 'Uzbekistan', nameRu: 'Узбекистан', isCIS: true },
  { code: 'KG', nameEn: 'Kyrgyzstan', nameRu: 'Кыргызстан', isCIS: true },
  { code: 'TJ', nameEn: 'Tajikistan', nameRu: 'Таджикистан', isCIS: true },
  { code: 'AM', nameEn: 'Armenia', nameRu: 'Армения', isCIS: true },
  { code: 'AZ', nameEn: 'Azerbaijan', nameRu: 'Азербайджан', isCIS: true },
  { code: 'MD', nameEn: 'Moldova', nameRu: 'Молдова', isCIS: true },
  // Other Major Countries
  { code: 'TR', nameEn: 'Turkey', nameRu: 'Турция' },
  { code: 'AE', nameEn: 'UAE', nameRu: 'ОАЭ' },
  { code: 'SA', nameEn: 'Saudi Arabia', nameRu: 'Саудовская Аравия' },
  { code: 'EG', nameEn: 'Egypt', nameRu: 'Египет' },
  { code: 'ID', nameEn: 'Indonesia', nameRu: 'Индонезия' },
  { code: 'MY', nameEn: 'Malaysia', nameRu: 'Малайзия' },
  { code: 'PK', nameEn: 'Pakistan', nameRu: 'Пакистан' },
  { code: 'GB', nameEn: 'United Kingdom', nameRu: 'Великобритания' },
  { code: 'DE', nameEn: 'Germany', nameRu: 'Германия' },
  { code: 'FR', nameEn: 'France', nameRu: 'Франция' },
  { code: 'US', nameEn: 'United States', nameRu: 'США' }
];

interface CampaignFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (campaign: Omit<Campaign, 'id' | 'impressions' | 'clicks' | 'ctr' | 'spent'>) => void;
  initialData?: Campaign;
}

export default function CampaignForm({ isOpen, onClose, onSubmit, initialData }: CampaignFormProps) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'details' | 'content' | 'targeting'>('details');
  const [mediaType, setMediaType] = useState<'image' | 'video'>(initialData?.adContent?.mediaType || 'image');
  const [previewUrl, setPreviewUrl] = useState(initialData?.adContent?.imageUrl || '');
  const [thumbnailUrl, setThumbnailUrl] = useState(initialData?.adContent?.thumbnailUrl || '');
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    budget: initialData?.budget?.toString() || '',
    cpm: initialData?.cpm?.toString() || '5.00',
    status: initialData?.status || 'active',
    startDate: initialData?.startDate || '',
    endDate: initialData?.endDate || '',
    adTitle: initialData?.adContent?.title || '',
    adDescription: initialData?.adContent?.description || '',
    targetUrl: initialData?.adContent?.targetUrl || '',
  });
  const [selectedCISCountries, setSelectedCISCountries] = useState<string[]>(
    initialData?.targetCountries?.filter(code => countries.find(c => c.code === code)?.isCIS) || ['RU']
  );
  const [selectedOtherCountries, setSelectedOtherCountries] = useState<string[]>(
    initialData?.targetCountries?.filter(code => !countries.find(c => c.code === code)?.isCIS) || []
  );
  const [showOtherCountries, setShowOtherCountries] = useState(false);
  const currencySymbol = language === 'ru' ? '₽' : '$';

  const defaultPreviewImage = 'https://images.unsplash.com/photo-1590845947676-fa2576f401b2?w=1200&h=600&fit=crop&q=80';
  const isEditing = !!initialData;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Combine CIS and other countries
    const allSelectedCountries = [...selectedCISCountries, ...selectedOtherCountries];

    const campaign = {
      name: formData.name,
      budget: Number(formData.budget),
      status: formData.status as Campaign['status'],
      startDate: formData.startDate,
      endDate: formData.endDate,
      cpm: Number(formData.cpm),
      targetCountries: allSelectedCountries.length > 0 ? allSelectedCountries : ['RU'],
      adContent: isEditing 
        ? initialData.adContent // Keep original ad content when editing
        : {
            title: formData.adTitle,
            description: formData.adDescription,
            imageUrl: previewUrl || defaultPreviewImage,
            targetUrl: formData.targetUrl,
            mediaType: mediaType,
            thumbnailUrl: mediaType === 'video' ? thumbnailUrl : undefined
          },
    };

    onSubmit(campaign);
    onClose();
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditing) {
      setPreviewUrl(e.target.value);
    }
  };

  const handleThumbnailUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditing) {
      setThumbnailUrl(e.target.value);
    }
  };

  const handleMediaTypeChange = (type: 'image' | 'video') => {
    if (!isEditing) {
      setMediaType(type);
      // Clear the preview URL when switching media types
      if (type !== mediaType) {
        setPreviewUrl('');
        if (type === 'video') {
          setThumbnailUrl('');
        }
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // If editing and trying to change ad content fields, don't update
    if (isEditing && (name === 'adTitle' || name === 'adDescription' || name === 'targetUrl')) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleCISCountry = (code: string) => {
    setSelectedCISCountries(prev => {
      if (prev.includes(code)) {
        return prev.filter(c => c !== code);
      }
      return [...prev, code];
    });
  };

  const toggleOtherCountry = (code: string) => {
    setSelectedOtherCountries(prev => {
      if (prev.includes(code)) {
        return prev.filter(c => c !== code);
      }
      return [...prev, code];
    });
  };

  const cisCountries = countries.filter(country => country.isCIS);
  const otherCountries = countries.filter(country => !country.isCIS);

  const isFormValid = () => {
    if (isEditing) {
      return (
        formData.name.trim() !== '' &&
        Number(formData.budget) > 0 &&
        Number(formData.cpm) > 0 &&
        formData.startDate !== '' &&
        formData.endDate !== ''
      );
    }
    
    return (
      formData.name.trim() !== '' &&
      Number(formData.budget) > 0 &&
      Number(formData.cpm) > 0 &&
      formData.startDate !== '' &&
      formData.endDate !== '' &&
      formData.adTitle.trim() !== '' &&
      formData.adDescription.trim() !== '' &&
      formData.targetUrl.trim() !== '' &&
      (mediaType === 'image' ? previewUrl.trim() !== '' : (previewUrl.trim() !== '' && thumbnailUrl.trim() !== ''))
    );
  };

  // Helper function to safely extract hostname from URL
  const getHostnameFromUrl = (url: string): string => {
    try {
      if (!url || !url.trim()) return '';
      // Make sure URL has a protocol
      const urlWithProtocol = url.startsWith('http') ? url : `https://${url}`;
      return new URL(urlWithProtocol).hostname;
    } catch (error) {
      return '';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {t('campaign.name.label')}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-sky-500 focus:ring-sky-500 sm:text-sm h-10 border shadow-sm"
                    placeholder={t('campaign.name.label')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
                    {t('campaign.budget.label')}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="budget"
                      id="budget"
                      min="1"
                      step="0.01"
                      value={formData.budget}
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-md border-gray-300 pl-9 pr-12 focus:border-sky-500 focus:ring-sky-500 sm:text-sm h-10 border shadow-sm"
                      placeholder="1000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="cpm" className="block text-sm font-medium text-gray-700">
                    {t('campaign.cpm.label')}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="cpm"
                      id="cpm"
                      min="0.01"
                      step="0.01"
                      value={formData.cpm}
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded- md border-gray-300 pl-9 pr-12 focus:border-sky-500 focus:ring-sky-500 sm:text-sm h-10 border shadow-sm"
                      placeholder="5.00"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{t('campaign.cpm.description')}</p>
                </div>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  {t('campaign.status.label')}
                </label>
                <select
                  name="status"
                  id="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 pl-3 pr-10 py-2 text-base focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm h-10 border shadow-sm"
                >
                  <option value="active">{t('campaign.status.active')}</option>
                  <option value="paused">{t('campaign.status.paused')}</option>
                  <option value="completed">{t('campaign.status.completed')}</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                    {t('campaign.dates.start')}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-md border-gray-300 pl-9 pr-12 focus:border-sky-500 focus:ring-sky-500 sm:text-sm h-10 border shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                    {t('campaign.dates.end')}
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="endDate"
                      id="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                      className="block w-full rounded-md border-gray-300 pl-9 pr-12 focus:border-sky-500 focus:ring-sky-500 sm:text-sm h-10 border shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'content':
        // If editing, show a locked version of the content
        if (isEditing) {
          return (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-yellow-100 rounded-full p-3">
                    <Lock className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <h3 className="text-lg font-medium text-center text-gray-900 mb-2">
                  {language === 'ru' ? 'Содержимое рекламы нельзя изменить' : 'Ad content cannot be modified'}
                </h3>
                <p className="text-center text-gray-600 mb-4">
                  {language === 'ru' 
                    ? 'Содержимое рекламы нельзя изменить после одобрения кампании. Если вам нужно изменить содержимое рекламы, удалите эту и создайте новую кампанию.' 
                    : 'Ad content cannot be changed after a campaign has been approved. If you need to change the ad content, please delete this and create a new campaign.'}
                </p>
                
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mt-6 max-w-md mx-auto">
                  <div className="p-3 border-b border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900">{t('campaign.ad.preview.title')}</h4>
                  </div>
                  <div className="p-3">
                    <div className="relative w-full pb-[40%] mb-2 bg-gray-100 rounded overflow-hidden">
                      <img
                        src={initialData.adContent.mediaType === 'video' ? (initialData.adContent.thumbnailUrl || initialData.adContent.imageUrl) : initialData.adContent.imageUrl}
                        alt="Ad preview"
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = defaultPreviewImage;
                        }}
                      />
                      {initialData.adContent.mediaType === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                            <div className="w-0 h-0 border-t-5 border-b-5 border-l-8 border-transparent border-l-white ml-1"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <h5 className="font-medium text-gray-900 text-sm mb-1">
                      {initialData.adContent.title}
                    </h5>
                    <p className="text-gray-600 text-xs">
                      {initialData.adContent.description}
                    </p>
                    {initialData.adContent.targetUrl && (
                      <div className="mt-1 text-xs text-sky-600 truncate">
                        {getHostnameFromUrl(initialData.adContent.targetUrl)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        }
        
        // If creating a new campaign, show the editable content form
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="w-full md:w-1/2 space-y-4">
                  <div>
                    <label htmlFor="adTitle" className="block text-sm font-medium text-gray-700">
                      {t('campaign.ad.headline.label')}
                    </label>
                    <input
                      type="text"
                      name="adTitle"
                      id="adTitle"
                      value={formData.adTitle}
                      onChange={handleInputChange}
                      required
                      maxLength={50}
                      className="mt-1 block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-sky-500 focus:ring-sky-500 sm:text-sm h-10 border shadow-sm"
                      placeholder={t('campaign.ad.headline.label')}
                    />
                    <p className="mt-1 text-xs text-gray-500">{t('campaign.ad.headline.description')}</p>
                  </div>

                  <div>
                    <label htmlFor="adDescription" className="block text-sm font-medium text-gray-700">
                      {t('campaign.ad.description.label')}
                    </label>
                    <textarea
                      name="adDescription"
                      id="adDescription"
                      rows={3}
                      value={formData.adDescription}
                      onChange={handleInputChange}
                      required
                      maxLength={200}
                      className="mt-1 block w-full rounded-md border-gray-300 pl-3 pr-3 py-2 focus:border-sky-500 focus:ring-sky-500 sm:text-sm border shadow-sm"
                      placeholder={t('campaign.ad.description.label')}
                    />
                    <p className="mt-1 text-xs text-gray-500">{t('campaign.ad.description.description')}</p>
                  </div>

                  <div>
                    <label htmlFor="targetUrl" className="block text-sm font-medium text-gray-700">
                      {t('campaign.ad.url.label')}
                    </label>
                    <input
                      type="url"
                      name="targetUrl"
                      id="targetUrl"
                      value={formData.targetUrl}
                      onChange={handleInputChange}
                      required
                      placeholder="https://example.com"
                      className="mt-1 block w-full rounded-md border-gray-300 pl-3 pr-12 focus:border-sky-500 focus:ring-sky-500 sm:text-sm h-10 border shadow-sm"
                    />
                    <p className="mt-1 text-xs text-gray-500">{t('campaign.ad.url.description')}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('campaign.ad.mediaType.label')}
                    </label>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleMediaTypeChange('image')}
                        className={`flex-1 flex items-center justify-center px-4 py-2 border ${
                          mediaType === 'image' 
                            ? 'border-sky-500 bg-sky-50 text-sky-700' 
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        } rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
                      >
                        <Image className="w-4 h-4 mr-2" />
                        {t('campaign.ad.mediaType.image')}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMediaTypeChange('video')}
                        className={`flex-1 flex items-center justify-center px-4 py-2 border ${
                          mediaType === 'video' 
                            ? 'border-sky-500 bg-sky-50 text-sky-700' 
                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                        } rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
                      >
                        <Video className="w-4 h-4 mr-2" />
                        {t('campaign.ad.mediaType.video')}
                      </button>
                    </div>
                  </div>

                  {mediaType === 'image' ? (
                    <div>
                      <label htmlFor="adImage" className="block text-sm font-medium text-gray-700">
                        {t('campaign.ad.image.label')}
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Upload className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="url"
                          name="adImage"
                          id="adImage"
                          value={previewUrl}
                          onChange={handleImageUrlChange}
                          required
                          placeholder="https://example.com/image.jpg"
                          className="block w-full rounded-md border-gray-300 pl-9 pr-12 focus:border-sky-500 focus:ring-sky-500 sm:text-sm h-10 border shadow-sm"
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">{t('campaign.ad.image.description')}</p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <label htmlFor="adVideo" className="block text-sm font-medium text-gray-700">
                          {t('campaign.ad.video.label')}
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Upload className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="url"
                            name="adVideo"
                            id="adVideo"
                            value={previewUrl}
                            onChange={handleImageUrlChange}
                            required
                            placeholder="https://example.com/video.mp4"
                            className="block w-full rounded-md border-gray-300 pl-9 pr-12 focus:border-sky-500 focus:ring-sky-500 sm:text-sm h-10 border shadow-sm"
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">{t('campaign.ad.video.description')}</p>
                      </div>

                      <div>
                        <label htmlFor="thumbnailUrl" className="block text-sm font-medium text-gray-700">
                          {t('campaign.ad.thumbnail.label')}
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Upload className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="url"
                            name="thumbnailUrl"
                            id="thumbnailUrl"
                            value={thumbnailUrl}
                            onChange={handleThumbnailUrlChange}
                            required
                            placeholder="https://example.com/thumbnail.jpg"
                            className="block w-full rounded-md border-gray-300 pl-9 pr-12 focus:border-sky-500 focus:ring-sky-500 sm:text-sm h-10 border shadow-sm"
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">{t('campaign.ad.thumbnail.description')}</p>
                      </div>
                    </>
                  )}
                </div>

                <div className="w-full md:w-1/2">
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-3 border-b border-gray-200">
                      <h4 className="text-sm font-medium text-gray-900">{t('campaign.ad.preview.title')}</h4>
                    </div>
                    <div className="p-3">
                      <div className="relative w-full pb-[40%] mb-2 bg-gray-100 rounded overflow-hidden">
                        <img
                          src={mediaType === 'video' ? (thumbnailUrl || defaultPreviewImage) : (previewUrl || defaultPreviewImage)}
                          alt="Ad preview"
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = defaultPreviewImage;
                          }}
                        />
                        {mediaType === 'video' && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-10 h-10 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                              <div className="w-0 h-0 border-t-5 border-b-5 border-l-8 border-transparent border-l-white ml-1"></div>
                            </div>
                          </div>
                        )}
                      </div>
                      <h5 className="font-medium text-gray-900 text-sm mb-1">
                        {formData.adTitle || t('campaign.ad.preview.title.placeholder')}
                      </h5>
                      <p className="text-gray-600 text-xs">
                        {formData.adDescription || t('campaign.ad.preview.description.placeholder')}
                      </p>
                      {formData.targetUrl && (
                        <div className="mt-1 text-xs text-sky-600 truncate">
                          {getHostnameFromUrl(formData.targetUrl)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'targeting':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('campaign.countries.label')}
                </label>
                
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900">{t('campaign.countries.cis')}</h4>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {cisCountries.map(({ code, nameEn, nameRu }) => (
                        <div key={code} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`country_${code}`}
                            checked={selectedCISCountries.includes(code)}
                            onChange={() => toggleCISCountry(code)}
                            className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`country_${code}`} className="ml-2 text-sm text-gray-700">
                            {language === 'ru' ? nameRu : nameEn}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h4 className="text-sm font-medium text-gray-900">
                      {t('campaign.countries.other')}
                      {selectedOtherCountries.length > 0 && ` (${selectedOtherCountries.length})`}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setShowOtherCountries(!showOtherCountries)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <ChevronDown className={`w-5 h-5 transition-transform ${showOtherCountries ? 'transform rotate-180' : ''}`} />
                    </button>
                  </div>
                  {showOtherCountries && (
                    <div className="p-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {otherCountries.map(({ code, nameEn, nameRu }) => (
                          <div key={code} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`country_other_${code}`}
                              checked={selectedOtherCountries.includes(code)}
                              onChange={() => toggleOtherCountry(code)}
                              className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`country_other_${code}`} className="ml-2 text-sm text-gray-700">
                              {language === 'ru' ? nameRu : nameEn}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <p className="mt-2 text-xs text-gray-500">{t('campaign.countries.description')}</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0 z-10">
            <h2 className="text-xl font-semibold text-gray-900">
              {initialData ? t('campaign.edit.title') : t('campaign.create.title')}
            </h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-full p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            {/* Tabs */}
            <div className="px-6 py-2 bg-white border-b border-gray-200 flex space-x-1">
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'details'
                    ? 'bg-sky-100 text-sky-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-2" />
                  {t('campaign.details.title')}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('content')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'content'
                    ? 'bg-sky-100 text-sky-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <Image className="w-4 h-4 mr-2" />
                  {t('campaign.ad.title')}
                  {isEditing && <Lock className="w-3 h-3 ml-1 text-gray-400" />}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('targeting')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'targeting'
                    ? 'bg-sky-100 text-sky-700'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  {t('campaign.countries.label')}
                </div>
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {renderTabContent()}
            </div>
            
            {/* Footer */}
            <div className="px-6 py-4 bg-white border-t border-gray-200 flex justify-between items-center sticky bottom-0">
              <div className="flex items-center text-sm text-gray-500">
                <Globe className="w-4 h-4 mr-1 text-gray-400" />
                <span>
                  {selectedCISCountries.length + selectedOtherCountries.length} {t('campaign.countries.label')}
                </span>
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  {t('campaign.button.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid()}
                  className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${
                    isFormValid()
                      ? 'bg-sky-600 hover:bg-sky-700'
                      : 'bg-sky-400 cursor-not-allowed'
                  }`}
                >
                  {initialData ? t('campaign.button.save') : t('campaign.button.create')}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}