import { Newspaper, CalendarDays, Zap, Megaphone, Images, Sun } from 'lucide-react'

export const NEWS_CATEGORIES = {
  news: { uz: 'Yangiliklar', ru: 'Новости', icon: Newspaper, color: '#1c79c0', tone: ['#123e6b', '#2f9be0'] },
  events: { uz: 'Tadbirlar', ru: 'Мероприятия', icon: CalendarDays, color: '#6d3fd6', tone: ['#3a1b78', '#8f6ef5'] },
  trainings: { uz: 'Treninglar', ru: 'Тренинги', icon: Zap, color: '#fe830c', tone: ['#8a3b0a', '#fe9a3c'] },
  ads: { uz: 'E’lonlar', ru: 'Объявления', icon: Megaphone, color: '#0e9f6e', tone: ['#0e5c48', '#22c3a0'] },
  gallery: { uz: 'Fotogalereya', ru: 'Фотогалерея', icon: Images, color: '#d63f8c', tone: ['#7d1650', '#ec4f9c'] },
  seasonal: { uz: 'Mavsumiy', ru: 'Сезонное', icon: Sun, color: '#e0a100', tone: ['#7a5200', '#fbb81c'] },
}

// NAMUNA yangiliklar. `image` ixtiyoriy — '/images/news/rasm.jpg' qo'ysangiz, rasm chiqadi.
export const NEWS = [
  {
    id: 'hududiy-saylovlar',
    category: 'news',
    date: '2026-11-03',
    views: 125,
    image: '/images/hero.webp',
    title: 'Andijon viloyati O‘quvchilar kengashi hududiy bosqich saylovlari o‘tkazildi',
    excerpt: 'Maktablarda 5–11-sinf o‘quvchilari o‘rtasida “tengdosh-tengdoshga” tamoyili asosida ish yurituvchi O‘quvchilar kengashi a’zolari saylandi.',
    body: [
      'Maktablarda 5–11-sinf o‘quvchilari o‘rtasida “tengdosh-tengdoshga” tamoyili asosida ish yuritadigan, ularni qo‘shimcha ta’limga jalb etadigan tizim — O‘quvchilar kengashi joriy etilmoqda.',
      'Kengash maktab direktori huzurida tashkil etiladi va uning faoliyati maktab maslahatchisi tomonidan muvofiqlashtiriladi. Hududiy bosqichda viloyatning barcha tuman va shaharlaridan g‘olib bo‘lgan nomzodlar ishtirok etdi.',
      'Saylov natijalariga ko‘ra viloyat kengashi raisi, uning o‘rinbosarlari hamda 7 ta asosiy yo‘nalish bo‘yicha mas’ul a’zolar aniqlandi. Yangi tarkib yaqin kunlarda faoliyat rejasini taqdim etadi.',
    ],
  },
  {
    id: 'jadidlar-izidan',
    category: 'events',
    date: '2026-10-23',
    views: 943,
    title: '«Jadidlar izidan» tanlovining tuman-shahar bosqichi start oldi!',
    excerpt: 'Viloyatimizning barcha tuman va shaharlarida «Jadidlar izidan» tanlovining tuman-shahar bosqichi bo‘lib o‘tmoqda.',
    body: [
      'Ayni paytda viloyatimizning barcha hududlarida «Jadidlar izidan» tanlovining tuman-shahar bosqichi bo‘lib o‘tmoqda.',
      'Tanlovda o‘quvchilar jadid ma’rifatparvarlarining hayoti va ijodi bo‘yicha bilimlarini namoyish etib, ijodiy chiqishlar tayyorlamoqda. G‘oliblar viloyat bosqichiga yo‘llanma oladi.',
    ],
  },
  {
    id: 'liderlik-treningi',
    category: 'trainings',
    date: '2026-10-22',
    views: 142,
    title: 'Kengash a’zolari uchun “Kelajak lideri” liderlik treningi bo‘lib o‘tdi',
    excerpt: 'Treningda jamoada ishlash, notiqlik va loyiha boshqaruvi bo‘yicha amaliy mashg‘ulotlar tashkil etildi.',
    body: [
      'Viloyat “Kelajak” markazida O‘quvchilar kengashi a’zolari uchun ikki kunlik liderlik treningi tashkil etildi.',
      'Ishtirokchilar jamoada ishlash, notiqlik san’ati, ijtimoiy loyihalarni rejalashtirish va ularni taqdimot qilish bo‘yicha amaliy ko‘nikmalarni egalladi.',
    ],
  },
  {
    id: 'kelajak-lideri-tanlovi',
    category: 'ads',
    date: '2026-10-21',
    views: 175,
    title: '“Kelajak lideri” tanloviga ro‘yxatdan o‘tish boshlandi',
    excerpt: 'Tanlovda 8–11-sinf o‘quvchilari ishtirok etishi mumkin. Arizalar 30-noyabrgacha qabul qilinadi.',
    body: [
      'Andijon viloyati O‘quvchilar kengashi “Kelajak lideri” tanloviga arizalar qabul qilinishini e’lon qiladi.',
      'Tanlovda 8–11-sinf o‘quvchilari ishtirok etishi mumkin. Ishtirokchilar o‘z ijtimoiy loyihasini taqdim etadi. Arizalar 30-noyabrga qadar maktab maslahatchilari orqali qabul qilinadi.',
    ],
  },
  {
    id: 'yashil-maktab',
    category: 'gallery',
    date: '2026-10-20',
    views: 105,
    title: '“Yashil maktab” aksiyasi: kengash a’zolari 2 000 dan ortiq ko‘chat o‘tqazdi',
    excerpt: 'Ekologiya yo‘nalishi tashabbusi bilan viloyatdagi maktablar hududida ko‘kalamzorlashtirish ishlari olib borildi.',
    body: [
      'O‘quvchilar kengashining Ekologiya yo‘nalishi tashabbusi bilan viloyat maktablarida “Yashil maktab” aksiyasi o‘tkazildi.',
      'Aksiya davomida kengash a’zolari va faol o‘quvchilar 2 000 dan ortiq ko‘chat o‘tqazib, maktab hovlilarini obodonlashtirdi.',
    ],
  },
  {
    id: 'tatil-ish-tartibi',
    category: 'seasonal',
    date: '2026-10-20',
    views: 90,
    title: 'Kuzgi ta’til kunlarida “Kelajak” markazlari to‘garaklari ish tartibi',
    excerpt: 'Ta’til davomida to‘garaklar odatdagi jadval asosida ishlaydi, qo‘shimcha ochiq darslar ham tashkil etiladi.',
    body: [
      'Kuzgi ta’til kunlarida viloyatdagi barcha “Kelajak” markazlari to‘garaklari odatdagi dars jadvali asosida faoliyat yuritadi.',
      'Shuningdek, ta’til davomida o‘quvchilar uchun ochiq darslar, mahorat darslari va sport musobaqalari tashkil etiladi.',
    ],
  },
  {
    id: 'media-maktabi',
    category: 'trainings',
    date: '2026-10-15',
    views: 211,
    title: 'Media va axborot yo‘nalishi: “Yosh jurnalist” maktabi ish boshladi',
    excerpt: 'Kengashning media yo‘nalishi a’zolari uchun mobil jurnalistika va kontent yaratish bo‘yicha kurs boshlandi.',
    body: [
      'O‘quvchilar kengashining Media va axborot yo‘nalishi a’zolari uchun “Yosh jurnalist” maktabi ish boshladi.',
      'Kurs davomida o‘quvchilar mobil jurnalistika, foto va video kontent yaratish hamda axborot madaniyati asoslarini o‘rganadi.',
    ],
  },
  {
    id: 'sport-festivali',
    category: 'events',
    date: '2026-10-10',
    views: 318,
    title: 'Viloyat o‘quvchilari o‘rtasida sport festivali yakunlandi',
    excerpt: 'Festivalda 16 ta tuman va shahardan 900 dan ortiq o‘quvchi mini-futbol, voleybol va shaxmat bo‘yicha bellashdi.',
    body: [
      'Andijon viloyati o‘quvchilari o‘rtasidagi sport festivali yakunlandi.',
      'Festivalda 16 ta tuman va shahardan 900 dan ortiq o‘quvchi mini-futbol, voleybol, stol tennisi va shaxmat bo‘yicha bellashdi. G‘oliblar diplom va esdalik sovg‘alari bilan taqdirlandi.',
    ],
  },
  {
    id: 'it-hakaton',
    category: 'news',
    date: '2026-10-05',
    views: 264,
    title: '“IT va sun’iy intellekt” yo‘nalishi bo‘yicha maktab hakatoni o‘tkazildi',
    excerpt: 'O‘quvchilar 24 soat davomida maktab hayotini yengillashtiradigan raqamli yechimlar ustida ishladi.',
    body: [
      'O‘quvchilar kengashining IT va sun’iy intellekt yo‘nalishi tashabbusi bilan maktab o‘quvchilari o‘rtasida hakaton tashkil etildi.',
      'Jamoalar 24 soat davomida maktab hayotini yengillashtiradigan raqamli yechimlar — elektron navbat, dars jadvali boti va boshqa loyihalar ustida ishladi.',
    ],
  },
]

export const newsById = (id) => NEWS.find((n) => n.id === id)
export const formatDate = (iso) => {
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}
