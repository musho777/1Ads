import { X } from 'lucide-react';

interface TermsOfUseProps {
  onClose: () => void;
}

export default function TermsOfUse({ onClose }: TermsOfUseProps) {
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
              Настоящие Условия использования регулируют отношения между 1Muslim Ads, рекламодателями и издателями,
              использующими нашу сеть для размещения рекламы. Использование нашей платформы означает согласие с данными условиями.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-2">2. Принципы размещения рекламы</h3>
            <div className="space-y-3 text-gray-600">
              <p>
                Вся реклама должна соответствовать нормам и этическим стандартам ислама.
              </p>
              <p>
                Запрещена реклама алкогольной продукции, азартных игр, процентных финансовых услуг (риба), непристойного
                контента и других запрещённых (харам) материалов.
              </p>
              <p>
                Мы оставляем за собой право отказать в размещении рекламы без объяснения причин, если она противоречит
                нашим принципам.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-2">3. Ограниченная ответственность</h3>
            <p className="text-gray-600">
              1Muslim Ads не несет ответственности за возможные убытки, связанные с невозможностью верификации
              показов рекламы, поскольку сеть не собирает персональные данные пользователей.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-2">4. Обязанности рекламодателей и издателей</h3>
            <div className="space-y-3 text-gray-600">
              <p>
                Рекламодатели несут полную ответственность за точность и достоверность рекламных материалов.
              </p>
              <p>
                Издатели обязуются не изменять рекламный контент и соблюдать принципы исламской этики.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-2">5. Запрещенные виды рекламы</h3>
            <div className="space-y-3 text-gray-600">
              <p>
                Любая реклама, содержащая обманчивую информацию или вводящая пользователей в заблуждение.
              </p>
              <p>
                Реклама, продвигающая товары и услуги, которые прямо или косвенно противоречат исламским ценностям.
              </p>
              <p>
                Любая форма рекламы, побуждающая к недобросовестному поведению или нарушению норм морали.
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-2">6. Политика отказа от гарантий</h3>
            <p className="text-gray-600">
              1Muslim Ads не предоставляет никаких гарантий в отношении эффективности рекламы, числа просмотров
              или возможного дохода. Все рекламные кампании осуществляются на условиях «как есть».
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-2">7. Изменения условий</h3>
            <p className="text-gray-600">
              1Muslim Ads оставляет за собой право изменять настоящие Условия использования без предварительного
              уведомления. Продолжение использования платформы означает согласие с обновлёнными условиями.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-2">8. Контактная информация</h3>
            <p className="text-gray-600">
              Для вопросов и предложений вы можете связаться с нами по указанным контактным данным на нашем веб-сайте.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}