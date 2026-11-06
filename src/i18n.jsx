import { createContext, useContext, useEffect, useState } from 'react'

const dict = {
  uz: {
    brandTop: 'Andijon viloyati',
    brandName: 'O‘quvchilar kengashi',
    home: 'Asosiy sahifa',
    about: 'Markaz haqida',
    news: 'Yangiliklar',
    centers: 'Kelajak markazlari',
    leadership: 'Rahbariyat va tuman kengashlari',
    contacts: 'Kontaktlar',
    counselors: 'Maktab maslahatchilari',
    clubs: 'To‘garaklar',
    clubsCenters: 'Kelajak markazlari to‘garaklari',
    clubsSpecial: 'Ayrim toifadagi o‘quvchilar uchun',
    schedule: 'Dars jadvali',
    council: 'O‘quvchilar kengashi',
    portfolio: 'Ijtimoiy portfolio',
    login: 'Kirish',
    menu: 'Menyu',
    sections: 'Bo‘limlar',
    contact: 'Aloqa',
    rights: 'Barcha huquqlar himoyalangan.',
    tabCenters: 'Kelajak markazlari uchun',
    tabSpecial: 'Ayrim toifadagi o‘quvchilar uchun',
    heroTitle: 'O‘quvchilarni rivojlantirishning milliy ekotizimi',
    statOrgs: 'Tashkilotlar umumiy soni',
    statClubs: 'Tashkilotlardagi mavjud to‘garaklar soni',
    statApps: 'To‘garaklar uchun kelib tushgan arizalar soni',
    statStudents: 'To‘garaklarga jalb qilingan o‘quvchilar soni',
    statExtended: 'Uzaytirilgan kun guruhlaridagi o‘quvchilar soni',
    topDirections: 'Eng ko‘p qiziqish bildirilgan yo‘nalishlar',
    more: 'Batafsil',
    moreInfo: 'Batafsil ma’lumot',
    readMore: 'Batafsil o‘qish',
    clubsWord: 'ta to‘garak',
    sum: 'so‘m',
    address: 'Manzil',
    phone: 'Telefon raqam',
    email: 'Elektron manzil',
    search: 'Izlash',
    filter: 'Filtr',
    period: 'Davr oralig‘i',
    from: 'Boshlanish sanasi',
    to: 'Tugash sanasi',
    category: 'Turkum',
    all: 'Hammasi',
    applyFilter: 'Filtrlash',
    clearFilter: 'Filtrlarni tozalash',
    nothing: 'Hech narsa topilmadi',
    nothingHint: 'Qidiruv so‘zini yoki filtrlarni o‘zgartirib ko‘ring.',
    prev: 'Oldingi',
    next: 'Keyingi',
    apply: 'Ariza qoldirish',
    onMap: 'Xaritadan ko‘rish',
    direction: 'Yo‘nalish',
    chooseDistrict: 'Tumanni tanlang',
    chooseDirection: 'To‘garak yo‘nalishi',
    chooseOrgType: 'Tashkilot turi',
    clubDirections: 'To‘garak yo‘nalishlari',
    back: 'Orqaga',
    latestNews: 'So‘nggi yangiliklar',
    share: 'Ulashish',
    views: 'ko‘rishlar',
    notFound: 'Sahifa topilmadi',
    toHome: 'Bosh sahifaga qaytish',
  },
  ru: {
    brandTop: 'Андижанская область',
    brandName: 'Совет учащихся',
    home: 'Главная',
    about: 'О центре',
    news: 'Новости',
    centers: 'Центры «Kelajak»',
    leadership: 'Руководство и районные советы',
    contacts: 'Контакты',
    counselors: 'Школьные консультанты',
    clubs: 'Кружки',
    clubsCenters: 'Кружки центров «Kelajak»',
    clubsSpecial: 'Для отдельных категорий учащихся',
    schedule: 'Расписание занятий',
    council: 'Совет учащихся',
    portfolio: 'Социальное портфолио',
    login: 'Войти',
    menu: 'Меню',
    sections: 'Разделы',
    contact: 'Связь',
    rights: 'Все права защищены.',
    tabCenters: 'Для центров «Kelajak»',
    tabSpecial: 'Для отдельных категорий учащихся',
    heroTitle: 'Национальная экосистема развития учащихся',
    statOrgs: 'Общее количество организаций',
    statClubs: 'Количество кружков в организациях',
    statApps: 'Количество заявок в кружки',
    statStudents: 'Количество учащихся в кружках',
    statExtended: 'Учащиеся в группах продлённого дня',
    topDirections: 'Самые популярные направления',
    more: 'Подробнее',
    moreInfo: 'Подробнее',
    readMore: 'Читать далее',
    clubsWord: 'кружков',
    sum: 'сум',
    address: 'Адрес',
    phone: 'Телефон',
    email: 'Электронная почта',
    search: 'Поиск',
    filter: 'Фильтр',
    period: 'Период',
    from: 'Дата начала',
    to: 'Дата окончания',
    category: 'Категория',
    all: 'Все',
    applyFilter: 'Применить',
    clearFilter: 'Сбросить фильтры',
    nothing: 'Ничего не найдено',
    nothingHint: 'Попробуйте изменить запрос или фильтры.',
    prev: 'Назад',
    next: 'Далее',
    apply: 'Оставить заявку',
    onMap: 'На карте',
    direction: 'Направление',
    chooseDistrict: 'Выберите район',
    chooseDirection: 'Направление кружка',
    chooseOrgType: 'Тип организации',
    clubDirections: 'Направления кружков',
    back: 'Назад',
    latestNews: 'Последние новости',
    share: 'Поделиться',
    views: 'просмотров',
    notFound: 'Страница не найдена',
    toHome: 'Вернуться на главную',
  },
}

const LangCtx = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('lang') || 'uz'
    } catch {
      return 'uz'
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* storage unavailable */
    }
    document.documentElement.lang = lang
  }, [lang])
  const t = (key) => dict[lang][key] ?? dict.uz[key] ?? key
  // pick a localized field: L({uz:'..', ru:'..'}) or plain string
  const L = (v) => (v && typeof v === 'object' ? v[lang] ?? v.uz : v)
  return <LangCtx.Provider value={{ lang, setLang, t, L }}>{children}</LangCtx.Provider>
}

export const useLang = () => useContext(LangCtx)
