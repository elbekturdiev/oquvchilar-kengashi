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
    title: {
      uz: 'Andijon viloyati O‘quvchilar kengashi hududiy bosqich saylovlari o‘tkazildi',
      ru: 'Состоялись региональные выборы Совета учащихся Андижанской области',
    },
    excerpt: {
      uz: 'Maktablarda 5–11-sinf o‘quvchilari o‘rtasida “tengdosh-tengdoshga” tamoyili asosida ish yurituvchi O‘quvchilar kengashi a’zolari saylandi.',
      ru: 'Среди учащихся 5–11 классов избраны члены Совета учащихся, работающего по принципу «равный — равному».',
    },
    body: {
      uz: [
        'Maktablarda 5–11-sinf o‘quvchilari o‘rtasida “tengdosh-tengdoshga” tamoyili asosida ish yuritadigan, ularni qo‘shimcha ta’limga jalb etadigan tizim — O‘quvchilar kengashi joriy etilmoqda.',
        'Kengash maktab direktori huzurida tashkil etiladi va uning faoliyati maktab maslahatchisi tomonidan muvofiqlashtiriladi. Hududiy bosqichda viloyatning barcha tuman va shaharlaridan g‘olib bo‘lgan nomzodlar ishtirok etdi.',
        'Saylov natijalariga ko‘ra viloyat kengashi raisi, uning o‘rinbosarlari hamda 7 ta asosiy yo‘nalish bo‘yicha mas’ul a’zolar aniqlandi. Yangi tarkib yaqin kunlarda faoliyat rejasini taqdim etadi.',
      ],
      ru: [
        'В школах внедряется система «Совет учащихся», которая работает среди учащихся 5–11 классов по принципу «равный — равному» и вовлекает их в дополнительное образование.',
        'Совет создаётся при директоре школы, а его деятельность координирует школьный консультант. В региональном этапе участвовали кандидаты-победители из всех районов и городов области.',
        'По итогам выборов определены председатель областного совета, его заместители и ответственные члены по 7 основным направлениям. Новый состав в ближайшие дни представит план работы.',
      ],
    },
  },
  {
    id: 'jadidlar-izidan',
    category: 'events',
    date: '2026-10-23',
    views: 943,
    title: {
      uz: '«Jadidlar izidan» tanlovining tuman-shahar bosqichi start oldi!',
      ru: 'Стартовал районно-городской этап конкурса «По следам джадидов»!',
    },
    excerpt: {
      uz: 'Viloyatimizning barcha tuman va shaharlarida «Jadidlar izidan» tanlovining tuman-shahar bosqichi bo‘lib o‘tmoqda.',
      ru: 'Во всех районах и городах области проходит районно-городской этап конкурса «По следам джадидов».',
    },
    body: {
      uz: [
        'Ayni paytda viloyatimizning barcha hududlarida «Jadidlar izidan» tanlovining tuman-shahar bosqichi bo‘lib o‘tmoqda.',
        'Tanlovda o‘quvchilar jadid ma’rifatparvarlarining hayoti va ijodi bo‘yicha bilimlarini namoyish etib, ijodiy chiqishlar tayyorlamoqda. G‘oliblar viloyat bosqichiga yo‘llanma oladi.',
      ],
      ru: [
        'В настоящее время во всех регионах области проходит районно-городской этап конкурса «По следам джадидов».',
        'Учащиеся демонстрируют знания о жизни и творчестве просветителей-джадидов и готовят творческие выступления. Победители получат путёвку на областной этап.',
      ],
    },
  },
  {
    id: 'liderlik-treningi',
    category: 'trainings',
    date: '2026-10-22',
    views: 142,
    title: {
      uz: 'Kengash a’zolari uchun “Kelajak lideri” liderlik treningi bo‘lib o‘tdi',
      ru: 'Для членов совета прошёл тренинг лидерства «Лидер будущего»',
    },
    excerpt: {
      uz: 'Treningda jamoada ishlash, notiqlik va loyiha boshqaruvi bo‘yicha amaliy mashg‘ulotlar tashkil etildi.',
      ru: 'На тренинге прошли практические занятия по командной работе, ораторскому мастерству и управлению проектами.',
    },
    body: {
      uz: [
        'Viloyat “Kelajak” markazida O‘quvchilar kengashi a’zolari uchun ikki kunlik liderlik treningi tashkil etildi.',
        'Ishtirokchilar jamoada ishlash, notiqlik san’ati, ijtimoiy loyihalarni rejalashtirish va ularni taqdimot qilish bo‘yicha amaliy ko‘nikmalarni egalladi.',
      ],
      ru: [
        'В областном центре «Kelajak» для членов Совета учащихся организован двухдневный тренинг лидерства.',
        'Участники освоили практические навыки командной работы, ораторского искусства, планирования социальных проектов и их презентации.',
      ],
    },
  },
  {
    id: 'kelajak-lideri-tanlovi',
    category: 'ads',
    date: '2026-10-21',
    views: 175,
    title: {
      uz: '“Kelajak lideri” tanloviga ro‘yxatdan o‘tish boshlandi',
      ru: 'Началась регистрация на конкурс «Лидер будущего»',
    },
    excerpt: {
      uz: 'Tanlovda 8–11-sinf o‘quvchilari ishtirok etishi mumkin. Arizalar 30-noyabrgacha qabul qilinadi.',
      ru: 'В конкурсе могут участвовать учащиеся 8–11 классов. Заявки принимаются до 30 ноября.',
    },
    body: {
      uz: [
        'Andijon viloyati O‘quvchilar kengashi “Kelajak lideri” tanloviga arizalar qabul qilinishini e’lon qiladi.',
        'Tanlovda 8–11-sinf o‘quvchilari ishtirok etishi mumkin. Ishtirokchilar o‘z ijtimoiy loyihasini taqdim etadi. Arizalar 30-noyabrga qadar maktab maslahatchilari orqali qabul qilinadi.',
      ],
      ru: [
        'Совет учащихся Андижанской области объявляет приём заявок на конкурс «Лидер будущего».',
        'В конкурсе могут участвовать учащиеся 8–11 классов. Участники представляют свой социальный проект. Заявки принимаются до 30 ноября через школьных консультантов.',
      ],
    },
  },
  {
    id: 'yashil-maktab',
    category: 'gallery',
    date: '2026-10-20',
    views: 105,
    title: {
      uz: '“Yashil maktab” aksiyasi: kengash a’zolari 2 000 dan ortiq ko‘chat o‘tqazdi',
      ru: 'Акция «Зелёная школа»: члены совета посадили более 2 000 саженцев',
    },
    excerpt: {
      uz: 'Ekologiya yo‘nalishi tashabbusi bilan viloyatdagi maktablar hududida ko‘kalamzorlashtirish ishlari olib borildi.',
      ru: 'По инициативе направления «Экология» на территории школ области проведено озеленение.',
    },
    body: {
      uz: [
        'O‘quvchilar kengashining Ekologiya yo‘nalishi tashabbusi bilan viloyat maktablarida “Yashil maktab” aksiyasi o‘tkazildi.',
        'Aksiya davomida kengash a’zolari va faol o‘quvchilar 2 000 dan ortiq ko‘chat o‘tqazib, maktab hovlilarini obodonlashtirdi.',
      ],
      ru: [
        'По инициативе направления «Экология» Совета учащихся в школах области прошла акция «Зелёная школа».',
        'В ходе акции члены совета и активные учащиеся посадили более 2 000 саженцев и благоустроили школьные дворы.',
      ],
    },
  },
  {
    id: 'tatil-ish-tartibi',
    category: 'seasonal',
    date: '2026-10-20',
    views: 90,
    title: {
      uz: 'Kuzgi ta’til kunlarida “Kelajak” markazlari to‘garaklari ish tartibi',
      ru: 'Режим работы кружков центров «Kelajak» в осенние каникулы',
    },
    excerpt: {
      uz: 'Ta’til davomida to‘garaklar odatdagi jadval asosida ishlaydi, qo‘shimcha ochiq darslar ham tashkil etiladi.',
      ru: 'Во время каникул кружки работают по обычному расписанию, также проводятся открытые уроки.',
    },
    body: {
      uz: [
        'Kuzgi ta’til kunlarida viloyatdagi barcha “Kelajak” markazlari to‘garaklari odatdagi dars jadvali asosida faoliyat yuritadi.',
        'Shuningdek, ta’til davomida o‘quvchilar uchun ochiq darslar, mahorat darslari va sport musobaqalari tashkil etiladi.',
      ],
      ru: [
        'В осенние каникулы все кружки центров «Kelajak» области работают по обычному расписанию.',
        'Также для учащихся организуются открытые уроки, мастер-классы и спортивные соревнования.',
      ],
    },
  },
  {
    id: 'media-maktabi',
    category: 'trainings',
    date: '2026-10-15',
    views: 211,
    title: {
      uz: 'Media va axborot yo‘nalishi: “Yosh jurnalist” maktabi ish boshladi',
      ru: 'Направление «Медиа и информация»: начала работу школа «Юный журналист»',
    },
    excerpt: {
      uz: 'Kengashning media yo‘nalishi a’zolari uchun mobil jurnalistika va kontent yaratish bo‘yicha kurs boshlandi.',
      ru: 'Для членов медиа-направления совета стартовал курс по мобильной журналистике и созданию контента.',
    },
    body: {
      uz: [
        'O‘quvchilar kengashining Media va axborot yo‘nalishi a’zolari uchun “Yosh jurnalist” maktabi ish boshladi.',
        'Kurs davomida o‘quvchilar mobil jurnalistika, foto va video kontent yaratish hamda axborot madaniyati asoslarini o‘rganadi.',
      ],
      ru: [
        'Для членов направления «Медиа и информация» Совета учащихся начала работу школа «Юный журналист».',
        'В ходе курса учащиеся изучат мобильную журналистику, создание фото- и видеоконтента и основы информационной культуры.',
      ],
    },
  },
  {
    id: 'sport-festivali',
    category: 'events',
    date: '2026-10-10',
    views: 318,
    title: {
      uz: 'Viloyat o‘quvchilari o‘rtasida sport festivali yakunlandi',
      ru: 'Завершился спортивный фестиваль среди учащихся области',
    },
    excerpt: {
      uz: 'Festivalda 16 ta tuman va shahardan 900 dan ortiq o‘quvchi mini-futbol, voleybol va shaxmat bo‘yicha bellashdi.',
      ru: 'Более 900 учащихся из 16 районов и городов соревновались в мини-футболе, волейболе и шахматах.',
    },
    body: {
      uz: [
        'Andijon viloyati o‘quvchilari o‘rtasidagi sport festivali yakunlandi.',
        'Festivalda 16 ta tuman va shahardan 900 dan ortiq o‘quvchi mini-futbol, voleybol, stol tennisi va shaxmat bo‘yicha bellashdi. G‘oliblar diplom va esdalik sovg‘alari bilan taqdirlandi.',
      ],
      ru: [
        'Завершился спортивный фестиваль среди учащихся Андижанской области.',
        'Более 900 учащихся из 16 районов и городов соревновались в мини-футболе, волейболе, настольном теннисе и шахматах. Победители награждены дипломами и памятными подарками.',
      ],
    },
  },
  {
    id: 'it-hakaton',
    category: 'news',
    date: '2026-10-05',
    views: 264,
    title: {
      uz: '“IT va sun’iy intellekt” yo‘nalishi bo‘yicha maktab hakatoni o‘tkazildi',
      ru: 'Проведён школьный хакатон по направлению «ИТ и искусственный интеллект»',
    },
    excerpt: {
      uz: 'O‘quvchilar 24 soat davomida maktab hayotini yengillashtiradigan raqamli yechimlar ustida ishladi.',
      ru: 'В течение 24 часов учащиеся работали над цифровыми решениями, облегчающими школьную жизнь.',
    },
    body: {
      uz: [
        'O‘quvchilar kengashining IT va sun’iy intellekt yo‘nalishi tashabbusi bilan maktab o‘quvchilari o‘rtasida hakaton tashkil etildi.',
        'Jamoalar 24 soat davomida maktab hayotini yengillashtiradigan raqamli yechimlar — elektron navbat, dars jadvali boti va boshqa loyihalar ustida ishladi.',
      ],
      ru: [
        'По инициативе направления «ИТ и искусственный интеллект» Совета учащихся среди школьников организован хакатон.',
        'В течение 24 часов команды работали над цифровыми решениями для школы — электронной очередью, ботом расписания и другими проектами.',
      ],
    },
  },
]

export const newsById = (id) => NEWS.find((n) => n.id === id)
export const formatDate = (iso) => {
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}
