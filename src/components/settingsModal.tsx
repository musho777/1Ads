import { useEffect, useState } from 'react';
import { Check, XCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { ClipLoader } from 'react-spinners';

interface AuthFormProps {
  onToggleMode: () => void;
  setSettings: (value: boolean) => void;
}

export default function SettingsModal({ setSettings }: AuthFormProps) {
  const { token, user, ChaneUserData } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const API_URL = import.meta.env.VITE_URL;
  const [notifcation, setNotifcation] = useState("false")
  const [autoNotifcation, setAutoNotifcation] = useState("false")

  const Save = async () => {
    setLoading(true)
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

    try {
      const response = await fetch(`${API_URL}/api/editProfileSetting`, requestOptions);

      if (!response.ok) {
        setSuccess(false)
        setLoading(false)
        return
      }
      setSuccess(true)
      ChaneUserData("userSettings", { notifcation, autoNotifcation })
      setLoading(false)
    } catch (error) {
      setSuccess(false)
      setLoading(false)
    }
  }


  useEffect(() => {
    if (user) {
      console.log(user?.data.get_profile_setting[0].notify_by_email)
      setNotifcation(user?.data.get_profile_setting[0].notify_by_email)
      setAutoNotifcation(user?.data.get_profile_setting[0].automatically_increase_CPM)
    }
  }, [user])


  return (
    <>
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-sky-100">
        <div className="px-8 py-6 relative"  >
          <div onClick={() => {
            setSuccess(false)
            setSettings(false)
          }} className='absolute right-2 top-2'>
            <XCircle />
          </div>
          {success ?
            <div className="w-full mt-5 mb-5 flex items-center justify-center px-4 py-8 border-2 border-dashed 
                  border-green-300 rounded-lg bg-green-50">
              <div className="text-center">
                <Check className="mx-auto h-12 w-12 text-green-500" />
                <p className="mt-2 text-sm text-green-600">
                  {t("settings.success")}
                </p>
              </div>
            </div> :
            <>
              <div className='mt-5'>
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    {/* {t('campaign.status.label')} */}
                    {t("settings.email")}
                  </label>
                  <select
                    name="status"
                    id="status"
                    value={notifcation}
                    onChange={(e) => setNotifcation(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 pl-3 pr-10 py-2 text-base focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm h-10 border shadow-sm"
                  >
                    <option value="true">{t("yes")}</option>
                    <option value="false">{t("no")}</option>
                    {/* <option value="completed">{t('campaign.status.completed')}</option> */}
                  </select>
                </div>
              </div>
              <div className='mt-5'>
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    {t("settings.cpm")}
                  </label>
                  <select
                    name="status"
                    id="status"
                    value={autoNotifcation}
                    onChange={(e) => setAutoNotifcation(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 pl-3 pr-10 py-2 text-base focus:border-sky-500 focus:outline-none focus:ring-sky-500 sm:text-sm h-10 border shadow-sm"
                  >
                    <option value="true">{t("yes")}</option>
                    <option value="false">{t("no")}</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => Save()}
                disabled={loading}
                type="submit"
                className="w-full mt-5 flex justify-center py-2 px-4 border border-transparent rounded-lg 
                  shadow-sm text-sm font-medium text-white bg-sky-500 hover:bg-sky-600 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 
                  transition-colors"
              >
                {loading ?
                  <ClipLoader
                    color={"white"}
                    loading={loading}
                    size={20}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  /> :
                  t("profile.save")
                }
              </button>
            </>
          }
        </div>
      </div>
    </>
  );
}