import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TermsOfUseProps {
  onClose: () => void;
}

export default function TermsOfUse({ onClose }: TermsOfUseProps) {
  const { language } = useLanguage();
  if (language == "ru") {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Условия использования</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="px-6 py-4 space-y-6">
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">1. Введение</h3>
              <p className="text-gray-600">
                Используя 1MuslimAds, вы соглашаетесь соблюдать настоящие Условия использования. Если вы не согласны, пожалуйста, не пользуйтесь нашими услугами.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">2. Принципы размещения рекламы</h3>
              <div className="space-y-3 text-gray-600">
                <p>
                  1MuslimAdsстремится размещать только этическую рекламу в соответствии с исламскими принципами. В рекламе строго запрещено следующее:
                </p>
                <ul className="list-disc pl-5 text-lg font-serif text-black">
                  <li>Алкоголь, табак и другие интоксиканты.</li>
                  <li>Азартные игры и ставки.</li>
                  <li>Контент для взрослых или любой иной откровенный материал.</li>
                  <li>Финансовые услуги, основанные на рибе.</li>
                  <li>Любой контент, считающийся неэтичным или противоречащим исламским ценностям.</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">3. Процесс одобрения рекламы</h3>
              <p className="text-gray-600">
                Все рекламные объявления проходят проверку. 1MuslimAdsоставляет за собой право отклонить или удалить любую рекламу, нарушающую нашу политику этической рекламы.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">4. Отсутствие гарантии результата</h3>
              <div className="space-y-3 text-gray-600">
                <p>
                  1MuslimAdsне гарантирует какого-либо уровня вовлеченности, кликов или конверсий от размещенных на платформе объявлений.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5. Отсутствие сбора данных для подтверждения показов</h3>
              <div className="space-y-3 text-gray-600">
                Мы не собираем IP-адреса и не отслеживаем пользователей, что означает невозможность предоставления индивидуальных данных пользователей для подтверждения показов рекламы. Рекламодатели признают и принимают это ограничение.
              </div>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">6. Платежи и возвраты</h3>
              <ul className="list-disc pl-5 text-lg font-serif text-black">
                <li>Рекламодатели должны оплачивать размещение объявлений заранее.</li>
                <li>Возвраты не производятся после утверждения и размещения объявления, за исключением случаев нарушения политики.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">7.Приостановка и удаление аккаунта</h3>
              <p className="text-gray-600">
                Аккаунты, нарушившие данные условия, могут быть приостановлены или удалены без предварительного уведомления.

              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">8. Изменения в Условиях использования</h3>
              <p className="text-gray-600">
                Мы оставляем за собой право обновлять данные условия в любое время. Дальнейшее использование сервиса означает принятие обновленных условий.
              </p>
            </section>
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">9. Свяжитесь с нами</h3>
              <p className="text-gray-600">
                По всем вопросам обращайтесь по адресу 1muslimapp.com@gmail.com
              </p>
            </section>
          </div>
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Terms of Use</h2>
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
                By using 1Muslim Ads, you agree to comply with these Terms of Use. If you do not agree, please do not use our services
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">2. Ethical Advertising Policy</h3>
              <div className="space-y-3 text-gray-600">
                <p>
                  1Muslim Ads is dedicated to displaying ethical advertisements in accordance with Islamic principles. The following content is strictly prohibited in ads:
                </p>
                <ul className="list-disc pl-5 text-lg font-serif text-black">
                  <li>Alcohol, tobacco, and intoxicants.</li>
                  <li>Gambling and betting services.</li>
                  <li>Adult content or any form of explicit material.</li>
                  <li>Riba-based financial services.</li>
                  <li>Any content deemed unethical or against Islamic values.</li>
                </ul>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">3. Ad Approval Process</h3>
              <p className="text-gray-600">
                All advertisements are subject to review. 1Muslim Ads reserves the right to reject or remove any ad that violates our ethical advertising policy.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">4. No Guarantee of Performance</h3>
              <div className="space-y-3 text-gray-600">
                <p>
                  1Muslim Ads does not guarantee any level of engagement, clicks, or conversions from ads placed on the platform.
                </p>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5. No Data Collection for Impression Verification</h3>
              <div className="space-y-3 text-gray-600">
                We do not collect IP addresses or track users, meaning we cannot provide individual user data to verify impressions. Advertisers acknowledge and accept this limitation.
              </div>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">6. Payments & Refunds</h3>
              <ul className="list-disc pl-5 text-lg font-serif text-black">
                <li>Advertisers must prepay for ad placements.</li>
                <li>No refunds will be issued once an ad is approved and displayed, except in cases of policy violations.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">7.Account Suspension & Termination</h3>
              <p className="text-gray-600">
                Accounts found in violation of these terms may be suspended or terminated without prior notice.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">8. Changes to These Terms</h3>
              <p className="text-gray-600">
                We reserve the right to update these terms at any time. Continued use of the service constitutes acceptance of the revised terms.
              </p>
            </section>
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">9.Contact Us</h3>
              <p className="text-gray-600">
                For inquiries, please reach out to 1muslimapp.com@gmail.com
              </p>
            </section>
          </div>
        </div>
      </div>
    );
  }
}