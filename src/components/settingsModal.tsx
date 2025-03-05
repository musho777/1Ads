import React, { useEffect, useState } from 'react';
import { XCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface AuthFormProps {
  onToggleMode: () => void;
  setSettings: (value: boolean) => void;
}

export default function SettingsModal({ setSettings }: AuthFormProps) {
  const { token } = useAuth();
  const { t } = useLanguage();

  const [notifcation, setNotifcation] = useState("false")
  const [autoNotifcation, setAutoNotifcation] = useState("false")



  const Save = async () => {
    const data = {
      notify_by_email: notifcation,
      automatically_increase_CPM: autoNotifcation,
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    };

    let responseData: { message: string; status: boolean } = { message: "", status: false };
    try {
      const response = await fetch(`/api/editProfileSetting`, requestOptions);
      const result: any = await response.json();
      console.log(result, 'response')
      responseData = { message: result.errors, status: result.status };
      if (!result.errors) {
      }
    } catch (error) {
      responseData = { message: "Server Error", status: false };
    } finally {
    }
    return responseData;
  }

  const getInfo = async () => {

  }



  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-sky-100">
        <div className="px-8 py-6 relative"  >
          <div onClick={() => setSettings(false)} className='absolute right-2 top-2'>
            <XCircle />
          </div>
          <div className='mt-5'>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                {/* {t('campaign.status.label')} */}
                уведомлять по Email о приостановке кампании из-за увеличения порогового CPM.
              </label>
              <select
                name="status"
                id="status"
                value={notifcation}
                onChange={(e) => setNotifcation(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 pl-3 pr-10 py-2 text-base focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm h-10 border shadow-sm"
              >
                <option value="true">да</option>
                <option value="false">нет</option>
                {/* <option value="completed">{t('campaign.status.completed')}</option> */}
              </select>
            </div>
          </div>
          <div className='mt-5'>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                {/* {t('campaign.status.label')} */}
                Автоматически увеличивать CPM
              </label>
              <select
                name="status"
                id="status"
                value={autoNotifcation}
                onChange={(e) => setAutoNotifcation(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 pl-3 pr-10 py-2 text-base focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm h-10 border shadow-sm"
              >
                <option value="true">да</option>
                <option value="false">нет</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => Save()}
            type="submit"
            className="w-full mt-5 flex justify-center py-2 px-4 border border-transparent rounded-lg 
                  shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 
                  transition-colors"
          >
            Войти
          </button>
        </div>
      </div>
    </>
  );
}