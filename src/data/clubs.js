import { DISTRICTS } from './site.js'

// NAMUNA ma'lumotlar. Haqiqiy to'garaklar ro'yxati bilan almashtiring.
// Har bir to'garakda `image` maydoni ixtiyoriy: '/images/clubs/rasm.jpg' bersangiz, muqova o'rniga rasm chiqadi.

const centerClubs = [
  ['ilm', 'Yosh kimyogarlar', 180000],
  ['ilm', 'Astronomiya va kosmos', 150000],
  ['ilm', 'Ekologiya laboratoriyasi', 120000],
  ['it', 'Yosh dasturchi (sun’iy intellekt)', 240000],
  ['it', 'Robototexnika (WeDo, EV3, Arduino)', 264000],
  ['it', 'Grafik dizayn va 3D modellashtirish', 220000],
  ['it', 'Web dasturlash asoslari', 240000],
  ['kasb', 'Yog‘och o‘ymakorligi', 140000],
  ['kasb', 'Kashtachilik va zardo‘zlik', 130000],
  ['kasb', 'Tikuvchilik va dizayn', 150000],
  ['til', 'Ingliz tili', 264000],
  ['til', 'Rus tili', 180000],
  ['til', 'Koreys tili', 220000],
  ['til', 'Nemis tili', 200000],
  ['sanat', 'Milliy va jahon raqslari', 220000],
  ['sanat', 'Tasviriy san’at', 160000],
  ['sanat', 'Doira ansambli', 150000],
  ['sanat', 'Teatr studiyasi', 140000],
  ['sport', 'Shaxmat va shashka', 120000],
  ['sport', 'Kurash', 100000],
  ['sport', 'Stol tennisi', 120000],
  ['sport', 'Voleybol', 100000],
]

const specialClubs = [
  ['umumtalim', 'Ona tili va adabiyot', 180000],
  ['umumtalim', 'O‘zbekiston tarixi', 160000],
  ['aniq', 'Matematika', 220000],
  ['aniq', 'Fizika', 200000],
  ['aniq', 'Informatika', 220000],
  ['filologiya', 'Rus tili', 180000],
  ['filologiya', 'Adabiyot va nutq madaniyati', 150000],
  ['tabiiy', 'Kimyo', 200000],
  ['tabiiy', 'Biologiya', 200000],
  ['tabiiy', 'Geografiya', 150000],
  ['xorijiy', 'Ingliz tili', 240000],
  ['xorijiy', 'Arab tili', 180000],
]

const streets = ['Navoiy shoh ko‘chasi', 'Bobur shoh ko‘chasi', 'Mustaqillik ko‘chasi', 'Amir Temur ko‘chasi', 'Istiqlol ko‘chasi', 'Ma’rifat ko‘chasi', 'Do‘stlik ko‘chasi', 'Yoshlik ko‘chasi']
const days = [
  ['Dushanba', 'Chorshanba', 'Juma'],
  ['Seshanba', 'Payshanba', 'Shanba'],
  ['Dushanba', 'Payshanba'],
  ['Seshanba', 'Juma'],
]
const times = ['09:00 – 10:30', '11:00 – 12:30', '14:00 – 15:30', '16:00 – 17:30']

const pad = (n) => String(n).padStart(2, '0')

function build(list, kind) {
  return list.map(([direction, name, price], i) => {
    const d = DISTRICTS[(i * 5 + (kind === 'special' ? 3 : 0)) % DISTRICTS.length]
    const isCity = d.id.endsWith('-sh')
    const short = d.uz.replace(' tumani', '').replace(' shahri', '')
    const org =
      kind === 'centers'
        ? `“${short.toUpperCase()} ${isCity ? 'SHAHAR' : 'TUMAN'} «KELAJAK» MARKAZI” DAVLAT MUASSASASI`
        : `${d.uz} ${(i % 40) + 3}-son umumta’lim maktabi`
    return {
      id: `${kind}-${i + 1}`,
      kind,
      direction,
      name,
      price,
      org,
      district: d.id,
      address: `Andijon viloyati, ${d.uz}, ${streets[i % streets.length]}, ${(i % 60) + 2}-uy`,
      phone: `+998 (74) 000-${pad(10 + i)}-${pad(20 + ((i * 7) % 70))}`,
      teacher: 'To‘garak rahbari (F.I.Sh.)',
      age: kind === 'centers' ? `${7 + (i % 4)}–${14 + (i % 4)} yosh` : `${5 + (i % 3)}–${9 + (i % 3)}-sinf`,
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
