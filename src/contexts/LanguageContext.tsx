import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const translations = {
  en: {
    "no": "no",
    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.remember': "Remember me",
    "auth.email": "Email",
    "auth.forgot.password": "Forgot your password?",
    "auth.no.account": "No account?",
    'auth.Register': "Register",
    'auth.password': "Password",
    "auth.name": "Name or Company Name",
    "auth.plaseholder": "Ivan Ivanov or LLC Company",
    "auth.confirm": "Confirm password",
    "auth.security": "Security check",
    "auth.creat": "Create an account",
    "auth.have.accaunt": "Already have an account?",
    "auth.agee": "By registering, you agree to",
    "auth.strength": "Password strength:",


    //password
    "passowrd.min": "Minimum 8 characters",
    "password.lowercase": "One lowercase letter",
    "password.capital": "One capital letter",
    "password.digit": "One digit",
    "password.special": "One special character",
    "password.very.weak": "Very weak",
    "password.weak": "weak",
    "password.average": "Average",
    "password.good": "Good",
    "password.strong": "Strong",
    //error  
    'login.error': 'login or password is wrong',
    'mail.error': "The email has already been taken.",
    'password.error': "Password must be at least 8 characters long",
    'no.password': "Enter password",
    'enter.email': "Enter email",
    'confirm.password': "Confirm password",
    'valid.email': "Please enter a valid email",
    "enter.company.name": "Enter your name or company name",
    "passwords.not.match": "The passwords do not match",
    "cpm.error": "Price is lower than competitors. For a quick campaign launch",

    // Hero Section
    'hero.timeForAds': 'Perfect time for your advertising',
    'hero.description': 'Every month, 1Muslim app users generate millions of views. Anyone can place their ads on our platform.',
    'hero.startAdvertising': 'Start Advertising',

    // Features
    'features.halal.title': 'Halal Advertising',
    'features.halal.description': 'Ethical and Shariah-compliant',
    'features.global.title': 'Global Reach',
    'features.global.description': 'Targeting different countries',
    'features.analytics.title': 'Analytics',
    'features.analytics.description': 'Real-time tracking',

    // Footer
    'footer.description': 'Reach your audience with a reliable halal advertising network. No inappropriate content - only ethical and Shariah-compliant advertising.',
    'footer.legal.title': 'Legal Information',
    'footer.legal.privacy': 'Privacy Policy',
    'footer.legal.terms': 'Terms of Use',
    'footer.legal.cookies': 'Cookie Policy',
    'footer.resources.title': 'Resources',
    'footer.resources.docs': 'Documentation',
    'footer.resources.api': 'API Reference',
    'footer.resources.support': 'Support',
    'footer.copyright': '© {year} 1Muslim Ads. All rights reserved.',
    'footer.resources.language': 'Change language',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.createCampaign': 'Create Campaign',
    'dashboard.stats.totalSpent': 'Total Spent',
    'dashboard.stats.impressions': 'Impressions',
    'dashboard.stats.clicks': 'Clicks',
    'dashboard.stats.averageCpm': 'Average CPM',

    // Campaign Form
    'campaign.create.title': 'Create New Campaign',
    'campaign.edit.title': 'Edit Campaign',
    'campaign.details.title': 'Campaign Details',
    'campaign.name.label': 'Campaign Name',
    'campaign.budget.label': 'Fill up the budget (RUB)',
    'campaign.cpm.label': 'Cost per 1000 Views (CPM)',
    'campaign.cpm.description': 'Amount charged per 1,000 ad views',
    'campaign.status.label': 'Status',
    'campaign.status.active': 'Active',
    'campaign.status.paused': 'Paused',
    'campaign.status.completed': 'Completed',
    'campaign.dates.start': 'Start Date',
    'campaign.dates.end': 'End Date',
    'campaign.languages.label': 'Target Languages',
    'campaign.languages.description': 'Select languages for your target audience',
    'campaign.CPM.error': "Minimum CPM amount 1000 rubles",
    "campaign.status.accept": "Yes, I agree to increase it to the recommended level.",
    "campaign.status.reject": "Ignore",

    // Ad Content Section
    'campaign.ad.title': 'Ad Content',
    'campaign.ad.headline.label': 'Ad Title',
    'campaign.ad.headline.description': 'Maximum 50 characters',
    'campaign.ad.description.label': 'Ad Description',
    'campaign.ad.description.description': 'Maximum 200 characters',
    'campaign.ad.image.label': 'Select file',
    'campaign.ad.image.description': 'Enter a valid image (2:1 aspect ratio required)',
    'campaign.ad.url.label': 'Target URL',
    'campaign.ad.url.description': 'Where users will go when they click the ad',
    'campaign.ad.preview.title': 'Ad Preview',
    'campaign.ad.preview.title.placeholder': 'Your Ad Title Here',
    'campaign.ad.preview.description.placeholder': 'Your ad description will appear here',

    // Buttons
    'campaign.button.cancel': 'Cancel',
    'campaign.button.create': 'Create Campaign',
    'campaign.button.save': 'Save Changes',

    // Campaigns Table
    'campaigns.title': 'Active Campaigns',
    'campaigns.table.campaign': 'Campaign',
    'campaigns.table.status': 'Status',
    'campaigns.table.budget': 'Budget',
    'campaigns.table.spent': 'Spent',
    'campaigns.table.cpm': 'CPM',
    'campaigns.table.impressions': 'Impressions',
    'campaigns.table.clicks': 'Clicks',
    'campaigns.table.ctr': 'CTR',
    'campaigns.table.oneDay': 'one Day Clicks',
    'campaigns.table.actions': 'Actions',
    'campaigns.table.progress': 'Budget Usage',
    'campaigns.actions.edit': 'Edit',
    'campaigns.actions.delete': 'Delete',

    // Preview
    'preview.title': 'Ad Preview',
    'preview.selectCampaign': 'Select a campaign to preview the ad',
    'preview.viewLanding': 'View Landing Page',

    // Competitive Analysis
    'competitive.title': 'Competitive Status',
    'competitive.isCompetitive': 'Your ad "{name}" is currently competitive!',
    'competitive.needsBoost': 'Your ad "{name}" needs a CPM boost',
    'competitive.yourCpm': 'Your CPM',
    'competitive.highestCpm': 'Highest CPM',
    'competitive.status': 'Status',
    'competitive.active': 'Active',
    'competitive.paused': 'Paused (Low CPM)',
    'competitive.recommendation': 'Recommendation: Increase your CPM to {amount} to become competitive and resume the campaign',

    "competitive.in.moderation": "paid, under manual moderation by an administrator",
    "competitive.moderation": "Under moderation",

    "competitive.in.access": "can be launched, manual moderation passed",
    "competitive.access": "Approved",

    "competitive.showing": "ads are being displayed",

    "competitive.comments": "there are remarks after manual moderation",
    "competitive.reject": "Not approved",

    "competitive.over": "ad display has been suspended for the following reasons: - budget exhausted или CPM lower than competitors",
    "competitive.pause": "Suspended",

    "competitive.date.end": "campaign end date has passed",
    "competitive.end": "Completed",

    "competitive.completed": "moderation passed, budget available, but campaign start date has not yet arrived",
    "competitive.planned": "Planned",


    // Settings
    'settings.language': 'Change Language',
    'settings.english': 'English',
    'settings.russian': 'Русский',
    'settings.success': "Settings saved successfully",
    'settings.email': "Notify via Email about campaign pause due to CPM threshold increase.",
    'settings.cpm': "Automatically increase CPM",

    // Profile Menu
    'profile.settings': 'Settings',
    'profile.billing': 'Billing',
    'profile.help': 'Help & Support',
    'profile.logout': 'Log out',
    "profile.edit": "edit profile",
    "profile.save": "save",

    // Budget
    'budget.title': 'Campaign Budget',
    'budget.description': 'Track and manage your advertising budget',
    'budget.addFunds': 'Add Funds',
    'budget.remaining': 'Remaining Budget',
    'budget.add': 'Add',
    'budget.cancel': 'Cancel',
    'budget.description2': "If certain symbols aren't allowed, you can try spacing (e.g., 'dot' instead of '.') or replacing @ with (at).",

    // Campaign Countries
    'campaign.countries.label': 'Target Countries',
    'campaign.countries.description': 'Select countries where your ad will be shown',
    'campaign.countries.cis': 'Russia and CIS Countries',
    'campaign.countries.other': 'Other Countries',

    // Continuing the LanguageContext.tsx content exactly where it left off:

    // Ad Media
    'campaign.ad.mediaType.label': 'Media Type',
    'campaign.ad.mediaType.image': 'Image',
    'campaign.ad.mediaType.video': 'Video',
    'campaign.ad.video.label': 'Select video',
    'campaign.ad.video.description': 'Enter a valid video (2:1 aspect ratio required)',
    'campaign.ad.thumbnail.label': 'Select images for video',
    'campaign.ad.thumbnail.description': 'Image that will be shown before the video plays (2:1 ratio required)',

    // Admin Dashboard
    'admin.title': 'Admin Dashboard',
    'admin.moderation.title': 'Pending Moderation',
    'admin.moderation.empty': 'No campaigns pending moderation',
    'admin.moderation.approve': 'Approve',
    'admin.moderation.reject': 'Reject',
    'admin.moderation.budget': 'Budget',
    'admin.moderation.cpm': 'CPM',
    'admin.awaiting.moderation': "Awaiting moderation",
    'admin.no.campaigns': "No campaigns are being moderated",

    'admin.stats.highestCpm': 'Highest CPM',
    'admin.stats.pendingModeration': 'Pending Moderation',
    'admin.stats.activeCampaigns': 'Active Campaigns',

    'admin.tabs.all': 'All Campaigns',
    'admin.tabs.moderation': 'Moderation Queue',
    'admin.tabs.competitive': 'Competitive Analysis',

    'admin.competitive.title': 'Top Performing Campaigns by CPM',
    'admin.competitive.budget': 'Budget',
    'admin.competitive.spent': 'Spent',
    'admin.competitive.management': 'Campaign Priority Management',
    'admin.competitive.pause': 'Pause',
    'admin.competitive.activate': 'Activate',

    // Rejection Modal
    'admin.moderation.rejectReason.title': 'Rejection Reason',
    'admin.moderation.rejectReason.label': 'Please provide a reason for rejection',
    'admin.moderation.rejectReason.placeholder': 'Enter the reason for rejecting this campaign...',
    'admin.moderation.rejectReason.cancel': 'Cancel',
    'admin.moderation.rejectReason.confirm': 'Reject Campaign',
    //Payment
    "payment.info": "Payment information",
    "payment.ammount": "Amount to be paid",
    "payment.card": "Sberbank card",
    "payment.description": "Payment description (your email)",
    "payment.receipt": "Upload receipt",
    "payment.paid": "I paid",
    "payment.upload.description": "Please upload your payment receipt. After moderator verification, your budget will be replenished.",
    "payemnt.click": "Click to download the receipt",
    "payment.loading": "Loading receipt...",
    "payment.success": "Receipt successfully uploaded! Wait for moderator verification.",




    // Payment Verification
    'admin.payment.verify': 'Verify Payment',
    'admin.payment.verified': 'Payment Verified',
    'admin.payment.documents.title': 'Payment Documents',
    'admin.payment.documents.receipt': 'Receipt',
    'admin.payment.documents.invoice': 'Invoice',
    'admin.payment.documents.transfer': 'Transfer',
    'admin.payment.documents.view': 'View Document',
    'admin.payment.documents.close': 'Close',
    'admin.payment.documents.verify': 'Verify Payment',
    'admin.payment.documents.amount': 'Amount',
    'admin.payment.documents.date': 'Date',
    'admin.payment.documents.type': 'Document Type',
    'admin.payment.documents.empty': 'No payment documents available',
    'admin.payment.documents.request': "Request for budget replenishment",
    "admin.payment.documents.user": "User",
    "admin.payment.documents.request.date": "Request date",


  },
  ru: {
    "yes": "да",
    "no": "нет",
    // Auth
    'auth.login': 'Войти',
    'auth.register': 'Регистрация',
    'auth.remember': "Запомнить меня",
    "auth.email": "Электронная почта",
    "auth.forgot.password": "Забыли пароль?",
    "auth.no.account": "Нет аккаунта?",
    'auth.Register': "Зарегистрироваться",
    'auth.password': "Пароль",
    "auth.name": "Имя или Название Компании",
    "auth.plaseholder": "Иван Иванов или ООО Компания",
    "auth.confirm": "Подтверждение пароля",
    "auth.security": "Проверка безопасности",
    "auth.creat": "Создать аккаунт",
    "auth.have.accaunt": "Уже есть аккаунт?",
    "auth.agee": "Регистрируясь, вы соглашаетесь с",
    "auth.strength": "Надежность пароля:",

    //password
    "passowrd.min": "Минимум 8 символов",
    "password.lowercase": "Одна строчная буква",
    "password.capital": "Одна заглавная буква",
    "password.digit": "Одна цифра",
    "password.special": "Один специальный символ",
    "password.very.weak": "Очень слабый",
    "password.weak": "Слабый",
    "password.average": "Средний",
    "password.good": "Хороший",
    "password.strong": "Сильный",
    //error  
    'login.error': 'Неправильный логин или пароль',
    'mail.error': "Электронная почта уже занята.",
    'password.error': "Пароль должен быть не менее 8 символов",
    'no.password': "Введите пароль",
    'enter.email': 'Введите email',
    'confirm.password': "Подтвердите пароль",
    'valid.email': "Пожалуйста, введите действительный адрес электронной почты",
    "enter.company.name": "Введите имя или название компании",
    "passwords.not.match": "Пароли не совпадают",

    // Hero Section
    'hero.timeForAds': 'Идеальное время для вашей рекламы',
    'hero.description': 'Каждый месяц пользователи приложения 1Muslim генерируют миллионы просмотров. Любой может разместить свою рекламу у нас через нашу платформу.',
    'hero.startAdvertising': 'Начать рекламировать',

    // Features
    'features.halal.title': 'Халяльная реклама',
    'features.halal.description': 'Этичная и соответствующая шариату',
    'features.global.title': 'Глобальный охват',
    'features.global.description': 'Таргетинг на разные страны',
    'features.analytics.title': 'Аналитика',
    'features.analytics.description': 'Отслеживание в реальном времени',

    // Footer
    'footer.description': 'Достигайте своей аудитории с помощью надежной халяльной рекламной сети. Никакого неподобающего контента - только этичная и соответствующая шариату реклама.',
    'footer.legal.title': 'Правовая информация',
    'footer.legal.privacy': 'Политика конфиденциальности',
    'footer.legal.terms': 'Условия использования',
    'footer.legal.cookies': 'Политика использования файлов cookie',
    'footer.resources.title': 'Ресурсы',
    'footer.resources.language': 'Изменить язык',

    'footer.resources.docs': 'Документация',
    'footer.resources.api': 'API справочник',
    'footer.resources.support': 'Поддержка',
    'footer.copyright': '© {year} 1Muslim Ads. Все права защищены.',


    // Dashboard
    'dashboard.title': 'Дашборд',
    'dashboard.createCampaign': 'Создать кампанию',
    'dashboard.stats.totalSpent': 'Всего потрачено',
    'dashboard.stats.impressions': 'Показы',
    'dashboard.stats.clicks': 'Клики',
    'dashboard.stats.averageCpm': 'Средний CPM',

    // Campaign Form
    'campaign.create.title': 'Новая Кампания',
    'campaign.edit.title': 'Редактировать',
    'campaign.details.title': 'Детали кампании',
    'campaign.name.label': 'Название кампании',
    'campaign.budget.label': 'Назначить бюджет (RUB)',
    'campaign.cpm.label': 'Стоимость за 1000 показов (CPM)',
    'campaign.cpm.description': 'Сумма, взимаемая за 1000 показов рекламы',
    'campaign.status.label': 'Статус',
    'campaign.status.active': 'Активна',
    'campaign.status.paused': 'Приостановлена',
    'campaign.status.completed': 'Завершена',
    'campaign.dates.start': 'Дата начала',
    'campaign.dates.end': 'Дата окончания',
    'campaign.languages.label': 'Целевые языки',
    'campaign.languages.description': 'Выберите языки целевой аудитории',
    'campaign.CPM.error': "Минимальная сумма CPM 1000 руб.",
    "campaign.status.accept": "Да согласен повысить до рекомендованной.",
    "campaign.status.reject": "Игнорировать",

    // Ad Content Section
    'campaign.ad.title': 'Содержание рекламы',
    'campaign.ad.headline.label': 'Заголовок рекламы',
    'campaign.ad.headline.description': 'Максимум 50 символов',
    'campaign.ad.description.label': 'Описание рекламы',
    'campaign.ad.description.description': 'Максимум 200 символов',
    'campaign.ad.image.label': 'Выберите файл',
    'campaign.ad.image.description': 'JPG или GIF (требуется соотношение 2:1)',
    'campaign.ad.url.label': 'Целевой URL',
    'campaign.ad.url.description': 'Куда пользователи перейдут при клике на рекламу',
    'campaign.ad.preview.title': 'Предпросмотр рекламы',
    'campaign.ad.preview.title.placeholder': 'Заголовок вашей рекламы',
    'campaign.ad.preview.description.placeholder': 'Здесь появится описание вашей рекламы',

    // Buttons
    'campaign.button.cancel': 'Отмена',
    'campaign.button.create': 'Создать кампанию',
    'campaign.button.save': 'Сохранить изменения',

    // Campaigns Table
    'campaigns.title': 'Активные кампании',
    'campaigns.table.campaign': 'Кампания',
    'campaigns.table.status': 'Статус',
    'campaigns.table.budget': 'Бюджет',
    'campaigns.table.spent': 'Потрачено',
    'campaigns.table.cpm': 'CPM',
    'campaigns.table.impressions': 'Показы',
    'campaigns.table.clicks': 'Клики',
    'campaigns.table.ctr': 'CTR',
    'campaigns.table.oneDay': 'Клики за один день',
    'campaigns.table.actions': 'Действия',
    'campaigns.table.progress': 'Использование бюджета',
    'campaigns.actions.edit': 'Редактировать',
    'campaigns.actions.delete': 'Удалить',

    // Preview
    'preview.title': 'Предпросмотр рекламы',
    'preview.selectCampaign': 'Выберите кампанию для просмотра рекламы',
    'preview.viewLanding': 'Перейти на целевую страницу',
    "profile.save": "сохранять",

    // Competitive Analysis
    'competitive.title': 'Конкурентный статус',
    'competitive.isCompetitive': 'Ваша реклама "{name}" конкурентоспособна!',
    'competitive.needsBoost': 'Вашей рекламе "{name}" требуется повышение CPM',
    'competitive.yourCpm': 'Ваш CPM',
    'competitive.highestCpm': 'Наивысший CPM',
    'competitive.status': 'Статус',
    'competitive.active': 'Активна',
    'competitive.paused': 'Приостановлена (Низкий CPM)',
    'competitive.recommendation': 'Рекомендация: Повысьте ваш CPM до {amount} для возобновления конкурентоспособности кампании',

    "competitive.in.moderation": "оплачена, находится на ручной модерации у администратора",
    "competitive.moderation": "На модерации",

    "competitive.in.access": "можно запускать, ручная модерация пройдена",
    "competitive.access": "Допущена",

    "competitive.showing": "показ объявлений идет",

    "competitive.comments": "есть замечания после ручной модерации",
    "competitive.reject": "Не допущена",

    "competitive.over": "показ объявлений приостановлен по причинам: -закончился бюджет или CPM ниже конкурентов",
    "competitive.pause": "Приостановлена",

    "competitive.date.end": "дата завершения кампании прошла",
    "competitive.end": "Завершена",

    "competitive.completed": "модерация пройдена, есть бюджет, но дата старта кампании еще не наступила",
    "competitive.planned": "Запланирована",



    // Settings
    'settings.language': 'Изменить язык',
    'settings.english': 'English',
    'settings.russian': 'Русский',
    'settings.success': "Настройки успешно сохранены",
    'settings.email': "уведомлять по Email о приостановке кампании из-за увеличения порогового CPM.",
    'settings.cpm': "Автоматически увеличивать CPM",
    // Profile Menu
    'profile.settings': 'Настройки',
    'profile.billing': 'Оплата',
    'profile.help': 'Помощь и поддержка',
    'profile.logout': 'Выйти',
    "profile.edit": "редактировать",

    // Budget
    'budget.title': 'Бюджет кампаний',
    'budget.description': 'Отслеживайте и управляйте рекламным бюджетом',
    'budget.addFunds': 'Пополнить',
    'budget.remaining': 'Остаток бюджета',
    'budget.add': 'Добавить',
    'budget.cancel': 'Отмена',
    "budget.description2": "Если определенные символы не разрешены, вы можете попробовать использовать пробелы (например, 'точка' вместо '.') или заменить @ на (at)",



    // Campaign Countries
    'campaign.countries.label': 'Целевые страны',
    'campaign.countries.description': 'Выберите страны, где будет показываться ваша реклама',
    'campaign.countries.cis': 'Россия и страны СНГ',
    'campaign.countries.other': 'Другие страны',

    // Ad Media
    'campaign.ad.mediaType.label': 'Тип медиа',
    'campaign.ad.mediaType.image': 'Изображение',
    'campaign.ad.mediaType.video': 'Видео',
    'campaign.ad.video.label': 'Выберите видео',
    'campaign.ad.video.description': 'Формат видео: MP4, M4V (требуется соотношение 2:1)',
    'campaign.ad.thumbnail.label': 'Выберите изображения для видео',
    'campaign.ad.thumbnail.description': 'Изображение, которое будет показано перед воспроизведением видео (требуется соотношение 2:1)',

    // Admin Dashboard
    'admin.title': 'Панель администратора',
    'admin.moderation.title': 'Ожидают модерации',
    'admin.moderation.empty': 'Нет кампаний на модерации',
    'admin.moderation.approve': 'Одобрить',
    'admin.moderation.reject': 'Отклонить',
    'admin.moderation.budget': 'Бюджет',
    'admin.moderation.cpm': 'CPM',
    'admin.awaiting.moderation': " Ожидают модерации",
    'admin.no.campaigns': "Нет кампаний на модерации",

    'admin.stats.highestCpm': 'Наивысший CPM',
    'admin.stats.pendingModeration': 'На модерации',
    'admin.stats.activeCampaigns': 'Активные кампании',

    'admin.tabs.all': 'Все кампании',
    'admin.tabs.moderation': 'Очередь модерации',
    'admin.tabs.competitive': 'Конкурентный анализ',

    'admin.competitive.title': 'Лучшие кампании по CPM',
    'admin.competitive.budget': 'Бюджет',
    'admin.competitive.spent': 'Потрачено',
    'admin.competitive.management': 'Управление приоритетами кампаний',
    'admin.competitive.pause': 'Приостановить',
    'admin.competitive.activate': 'Активировать',

    // Rejection Modal
    'admin.moderation.rejectReason.title': 'Причина отклонения',
    'admin.moderation.rejectReason.label': 'Укажите причину отклонения',
    'admin.moderation.rejectReason.placeholder': 'Введите причину отклонения кампании...',
    'admin.moderation.rejectReason.cancel': 'Отмена',
    'admin.moderation.rejectReason.confirm': 'Отклонить кампанию',

    //Payment
    "payment.info": "Платежная информация",
    "payment.ammount": "Сумма к оплате",
    "payment.card": "На карту Сбербанка",
    "payment.description": "Через СБП (Сбербанк)",
    "payment.receipt": "Загрузить квитанцию",
    "payment.paid": "Я оплатил",
    "payment.upload.description": "Пожалуйста, загрузите квитанцию об оплате. После проверки модератором ваш бюджет будет пополнен.",
    "payemnt.click": " Нажмите для загрузки квитанции",
    "payment.loading": "Загрузка квитанции...",
    "payment.success": " Квитанция успешно загружена! Ожидайте проверки модератором.",

    // Payment Verification
    'admin.payment.verify': 'Проверить оплату',
    'admin.payment.verified': 'Оплата подтверждена',
    'admin.payment.documents.title': 'Платежные документы',
    'admin.payment.documents.receipt': 'Квитанция',
    'admin.payment.documents.invoice': 'Счет',
    'admin.payment.documents.transfer': 'Перевод',
    'admin.payment.documents.view': 'Просмотр документа',
    'admin.payment.documents.close': 'Закрыть',
    'admin.payment.documents.verify': 'Подтвердить оплату',
    'admin.payment.documents.amount': 'Сумма',
    'admin.payment.documents.date': 'Дата',
    'admin.payment.documents.type': 'Тип документа',
    'admin.payment.documents.empty': 'Нет платежных документов',
    'admin.payment.documents.request': "Запрос на пополнение бюджета",
    "admin.payment.documents.user": "Пользователь",
    "admin.payment.documents.request.date": "Дата запроса",

  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string, params?: Record<string, string | number>): string => {
    let translation = translations[language][key] || key;

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        translation = translation.replace(`{${key}}`, String(value));
      });
    }

    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}