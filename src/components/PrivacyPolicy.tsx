import { X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface PrivacyPolicyProps {
  onClose: () => void;
}

export default function PrivacyPolicy({ onClose }: PrivacyPolicyProps) {
  const { language } = useLanguage();
  if (language == "ru") {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Политика конфиденциальности</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 py-4 space-y-6">
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">1. Общие положения</h3>
              <p className="text-gray-600">
                Настоящая Политика конфиденциальности регулирует порядок обработки и защиты информации пользователей,
                взаимодействующих с рекламной сетью Islamic Ads Network. Мы уважаем право пользователей на конфиденциальность
                и стремимся к полной прозрачности в нашей деятельности.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">2. Отсутствие сбора данных</h3>
              <p className="text-gray-600">
                1Muslim Ads не собирает, не хранит и не обрабатывает персональные данные пользователей, включая IP-адреса,
                геолокацию, cookie-файлы или другую идентифицирующую информацию. Это означает, что мы не передаем и не
                продаем данные третьим лицам.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">3. Влияние на верификацию показов рекламы</h3>
              <p className="text-gray-600">
                Поскольку мы не храним информацию о пользователях, мы не можем предоставлять IP-адреса или иные данные,
                необходимые для независимой верификации показов рекламы.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">4. Безопасность и соответствие исламским нормам</h3>
              <p className="text-gray-600">
                Вся рекламная деятельность в нашей сети проходит строгую модерацию в соответствии с этическими нормами ислама.
                Мы не размещаем рекламу, содержащую запрещённый (харам) контент, а также рекламу, противоречащую исламским ценностям.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5. Политика прозрачности</h3>
              <p className="text-gray-600">
                1Muslim Ads стремится к полному соответствию исламским принципам честности и прозрачности. Все рекламодатели
                и издатели обязаны предоставлять точную и достоверную информацию о рекламных материалах.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">6. Согласие пользователей</h3>
              <p className="text-gray-600">
                Используя нашу рекламную сеть, пользователи подтверждают своё согласие с настоящей Политикой конфиденциальности
                и осознают ограничения, связанные с отсутствием сбора персональных данных.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">7. Изменения в Политике конфиденциальности</h3>
              <p className="text-gray-600">
                Мы оставляем за собой право вносить изменения в настоящую Политику. Изменения вступают в силу с момента их
                публикации на нашем веб-сайте.
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
            <h2 className="text-xl font-semibold text-gray-900">Privacy Policy</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 py-4 space-y-6">
            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">1. General Provisions</h3>
              <p className="text-gray-600">
                This Privacy Policy regulates the processing and protection of users' information interacting with the
                Islamic Ads Network. We respect users' right to privacy and strive for full transparency in our activities.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">2. No Data Collection</h3>
              <p className="text-gray-600">
                1Muslim Ads does not collect, store, or process personal data of users, including IP addresses, geolocation,
                cookies, or any other identifying information. This means that we do not share or sell data to third parties.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">3. Impact on Ad Impression Verification</h3>
              <p className="text-gray-600">
                Since we do not store user information, we cannot provide IP addresses or other data necessary for independent
                verification of ad impressions.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">4. Security and Compliance with Islamic Norms</h3>
              <p className="text-gray-600">
                All advertising activities in our network undergo strict moderation in accordance with Islamic ethical norms.
                We do not place ads that contain forbidden (haram) content, nor do we place ads that contradict Islamic values.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">5. Transparency Policy</h3>
              <p className="text-gray-600">
                1Muslim Ads strives for full compliance with Islamic principles of honesty and transparency. All advertisers
                and publishers are required to provide accurate and truthful information about advertising materials.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">6. User Consent</h3>
              <p className="text-gray-600">
                By using our advertising network, users confirm their consent to this Privacy Policy and acknowledge the
                limitations associated with the absence of personal data collection.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-medium text-gray-900 mb-2">7. Changes to the Privacy Policy</h3>
              <p className="text-gray-600">
                We reserve the right to make changes to this Policy. Changes will take effect as soon as they are published
                on our website.
              </p>
            </section>
          </div>
        </div>
      </div>
    );
  }
}