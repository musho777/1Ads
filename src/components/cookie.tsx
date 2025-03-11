import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CookieProps {
  onClose: () => void;
}

export default function Cookie({ onClose }: CookieProps) {
  const { language } = useLanguage();
  if (language === "ru")
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Политика использования файлов cookie</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 py-4 space-y-6">
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">1.Введение</h3>
              <p className="text-gray-600">
                Данная Политика использования файлов cookieобъясняет, как 1MuslimAdsиспользует файлы cookieи аналогичные технологии на нашей платформе.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">2. Используем ли мы файлы cookie?</h3>
              <p className="text-gray-600">
                1MuslimAdsне использует файлы cookieили аналогичные технологии отслеживания для сбора каких-либо данных о пользователях.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">3. Сторонние файлы cookie</h3>
              <p className="text-gray-600">
                Хотя мы не используем файлы cookie, сторонние веб-сайты, на которые вы можете перейти по ссылкам на нашей платформе, могут их использовать. Мы не контролируем эти файлы cookieи рекомендуем ознакомиться с политиками конфиденциальности соответствующих третьих сторон
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">4. Управлениефайлами cookie</h3>
              <p className="text-gray-600">
                Поскольку 1MuslimAdsне использует файлы cookie, вам не нужно изменять какие-либо настройки на нашей платформе. Однако, если вы хотите управлять файлами cookieна сторонних сайтах, вы можете настроить параметры своего браузера для их принятия, отклонения или удаления.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5.Изменения в данной Политике использования файлов cookie</h3>
              <p className="text-gray-600">
                Мы оставляем за собой право изменять данную политику в любое время. Все обновления будут опубликованы на этой странице.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">6.Контакты</h3>
              <p className="text-gray-600">
                Если у вас есть вопросы по данной политике, пожалуйста, свяжитесь с нами по адресу 1muslimapp.com@gmail.com
              </p>
            </section>
          </div>
        </div>
      </div>
    );
  else {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Cookie Policy</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 py-4 space-y-6">
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">1. Introduction</h3>
              <p className="text-gray-600">
                This Cookie Policy explains how 1Muslim Ads uses cookies and similar technologies on our platform
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">2. Do We Use Cookies?</h3>
              <p className="text-gray-600">
                1Muslim Ads does not use cookies or similar tracking technologies to collect any user data.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">3. Third-Party Cookies</h3>
              <p className="text-gray-600">
                While we do not use cookies, third-party websites that you may access via links on our platform may use cookies. We do not control these cookies and recommend reviewing the respective privacy policies of these third parties
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">4.Managing Cookies</h3>
              <p className="text-gray-600">
                Since 1Muslim Ads does not use cookies, there are no settings required for managing them on our platform. However, if you wish to manage cookies on third-party sites, you can adjust your browser settings to accept, reject, or delete cookies.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5. Changes to This Cookie Policy</h3>
              <p className="text-gray-600">
                We reserve the rightto modify this policy at any time. Any updates will be posted on this page.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">6.Contact Us</h3>
              <p className="text-gray-600">
                For questions regarding this policy, please reach out to 1muslimapp.com@gmail.com
              </p>
            </section>
          </div>
        </div>
      </div>
    );
  }
}