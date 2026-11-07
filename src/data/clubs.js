import { DISTRICTS } from './site.js'

// NAMUNA ma'lumotlar. Haqiqiy to'garaklar ro'yxati bilan almashtiring.
// Har bir to'garakda `image` maydoni ixtiyoriy: '/images/clubs/rasm.jpg' bersangiz, muqova o'rniga rasm chiqadi.

const centerClubs = [
  ['ilm', { uz: 'Yosh kimyogarlar', ru: 'Юные химики' }, 180000],
  ['ilm', { uz: 'Astronomiya va kosmos', ru: 'Астрономия и космос' }, 150000],
  ['ilm', { uz: 'Ekologiya laboratoriyasi', ru: 'Экологическая лаборатория' }, 120000],
  ['it', { uz: 'Yosh dasturchi (sun’iy intellekt)', ru: 'Юный программист (искусственный интеллект)' }, 240000],
  ['it', { uz: 'Robototexnika (WeDo, EV3, Arduino)', ru: 'Робототехника (WeDo, EV3, Arduino)' }, 264000],
  ['it', { uz: 'Grafik dizayn va 3D modellashtirish', ru: 'Графический дизайн и 3D-моделирование' }, 220000],
  ['it', { uz: 'Web dasturlash asoslari', ru: 'Основы веб-программирования' }, 240000],
  ['kasb', { uz: 'Yog‘och o‘ymakorligi', ru: 'Резьба по дереву' }, 140000],
  ['kasb', { uz: 'Kashtachilik va zardo‘zlik', ru: 'Вышивка и золотое шитьё' }, 130000],
  ['kasb', { uz: 'Tikuvchilik va dizayn', ru: 'Шитьё и дизайн' }, 150000],
  ['til', { uz: 'Ingliz tili', ru: 'Английский язык' }, 264000],
  ['til', { uz: 'Rus tili', ru: 'Русский язык' }, 180000],
  ['til', { uz: 'Koreys tili', ru: 'Корейский язык' }, 220000],
  ['til', { uz: 'Nemis tili', ru: 'Немецкий язык' }, 200000],
  ['sanat', { uz: 'Milliy va jahon raqslari', ru: 'Национальные и мировые танцы' }, 220000],
  ['sanat', { uz: 'Tasviriy san’at', ru: 'Изобразительное искусство' }, 160000],
  ['sanat', { uz: 'Doira ansambli', ru: 'Ансамбль дойристов' }, 150000],
  ['sanat', { uz: 'Teatr studiyasi', ru: 'Театральная студия' }, 140000],
  ['sport', { uz: 'Shaxmat va shashka', ru: 'Шахматы и шашки' }, 120000],
  ['sport', { uz: 'Kurash', ru: 'Кураш' }, 100000],
  ['sport', { uz: 'Stol tennisi', ru: 'Настольный теннис' }, 120000],
  ['sport', { uz: 'Voleybol', ru: 'Волейбол' }, 100000],
]

const specialClubs = [
  ['umumtalim', { uz: 'Ona tili va adabiyot', ru: 'Родной язык и литература' }, 180000],
  ['umumtalim', { uz: 'O‘zbekiston tarixi', ru: 'История Узбекистана' }, 160000],
  ['aniq', { uz: 'Matematika', ru: 'Математика' }, 220000],
  ['aniq', { uz: 'Fizika', ru: 'Физика' }, 200000],
  ['aniq', { uz: 'Informatika', ru: 'Информатика' }, 220000],
  ['filologiya', { uz: 'Rus tili', ru: 'Русский язык' }, 180000],
  ['filologiya', { uz: 'Adabiyot va nutq madaniyati', ru: 'Литература и культура речи' }, 150000],
  ['tabiiy', { uz: 'Kimyo', ru: 'Химия' }, 200000],
  ['tabiiy', { uz: 'Biologiya', ru: 'Биология' }, 200000],
  ['tabiiy', { uz: 'Geografiya', ru: 'География' }, 150000],
  ['xorijiy', { uz: 'Ingliz tili', ru: 'Английский язык' }, 240000],
  ['xorijiy', { uz: 'Arab tili', ru: 'Арабский язык' }, 180000],
]

const streets = [
  ['Navoiy shoh ko‘chasi', 'ул. Навои'],
  ['Bobur shoh ko‘chasi', 'ул. Бобур шох'],
  ['Mustaqillik ko‘chasi', 'ул. Мустакиллик'],
  ['Amir Temur ko‘chasi', 'ул. Амира Темура'],
  ['Istiqlol ko‘chasi', 'ул. Истиклол'],
  ['Ma’rifat ko‘chasi', 'ул. Марифат'],
  ['Do‘stlik ko‘chasi', 'ул. Дустлик'],
  ['Yoshlik ko‘chasi', 'ул. Ёшлик'],
]
// Hafta kunlari: 0 = Dushanba ... 5 = Shanba (nomlari WEEKDAYS'da)
export const WEEKDAYS = [
  { uz: 'Dushanba', ru: 'Понедельник', short: { uz: 'Du', ru: 'Пн' } },
  { uz: 'Seshanba', ru: 'Вторник', short: { uz: 'Se', ru: 'Вт' } },
  { uz: 'Chorshanba', ru: 'Среда', short: { uz: 'Chor', ru: 'Ср' } },
  { uz: 'Payshanba', ru: 'Четверг', short: { uz: 'Pay', ru: 'Чт' } },
  { uz: 'Juma', ru: 'Пятница', short: { uz: 'Ju', ru: 'Пт' } },
  { uz: 'Shanba', ru: 'Суббота', short: { uz: 'Sha', ru: 'Сб' } },
]
const days = [
  [0, 2, 4],
  [1, 3, 5],
  [0, 3],
  [1, 4],
]
const times = ['09:00 – 10:30', '11:00 – 12:30', '14:00 – 15:30', '16:00 – 17:30']

const pad = (n) => String(n).padStart(2, '0')

function build(list, kind) {
  return list.map(([direction, name, price], i) => {
    const d = DISTRICTS[(i * 5 + (kind === 'special' ? 3 : 0)) % DISTRICTS.length]
    const isCity = d.id.endsWith('-sh')
    const short = d.uz.replace(' tumani', '').replace(' shahri', '')
    const num = (i % 40) + 3
    const org =
      kind === 'centers'
        ? {
            uz: `“${short.toUpperCase()} ${isCity ? 'SHAHAR' : 'TUMAN'} «KELAJAK» MARKAZI” DAVLAT MUASSASASI`,
            ru: `ГУ «ЦЕНТР «KELAJAK»» — ${d.ru.toUpperCase()}`,
          }
        : { uz: `${d.uz} ${num}-son umumta’lim maktabi`, ru: `Общеобразовательная школа №${num}, ${d.ru}` }
    const [stUz, stRu] = streets[i % streets.length]
    const house = (i % 60) + 2
    return {
      id: `${kind}-${i + 1}`,
      kind,
      direction,
      name,
      price,
      org,
      district: d.id,
      address: {
        uz: `Andijon viloyati, ${d.uz}, ${stUz}, ${house}-uy`,
        ru: `Андижанская область, ${d.ru}, ${stRu}, д. ${house}`,
      },
      phone: `+998 (74) 000-${pad(10 + i)}-${pad(20 + ((i * 7) % 70))}`,
      teacher: { uz: 'To‘garak rahbari (F.I.Sh.)', ru: 'Руководитель кружка (Ф.И.О.)' },
      age:
        kind === 'centers'
          ? { uz: `${7 + (i % 4)}–${14 + (i % 4)} yosh`, ru: `${7 + (i % 4)}–${14 + (i % 4)} лет` }
          : { uz: `${5 + (i % 3)}–${9 + (i % 3)}-sinf`, ru: `${5 + (i % 3)}–${9 + (i % 3)} классы` },
      seats: 12 + ((i * 3) % 14),
      enrolled: 8 + ((i * 5) % 12),
      days: days[i % days.length],
      time: times[i % times.length],
      lat: d.lat + ((i % 5) - 2) * 0.003,
      lng: d.lng + ((i % 3) - 1) * 0.003,
      featured: i % 3 === 0,
    }
  })
}

export const CLUBS = [...build(centerClubs, 'centers'), ...build(specialClubs, 'special')]
export const clubById = (id) => CLUBS.find((c) => c.id === id)

export const formatSum = (n) => n.toLocaleString('ru-RU').replace(/,/g, ' ')
