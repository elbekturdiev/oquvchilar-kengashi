// ⚠️ Barcha aloqa ma'lumotlari shu yerda — bir marta o'zgartirsangiz, sayt bo'ylab yangilanadi.
// (Namuna qiymatlar: haqiqiy raqam, pochta va manzil bilan almashtiring.)
export const SITE = {
  phone: '+998 (74) 000-00-00',
  phoneHref: 'tel:+998740000000',
  email: 'info@andijon-kengash.uz',
  address: {
    uz: '170100, O‘zbekiston, Andijon shahri, Amir Umarxon ko‘chasi, 23',
    ru: '170100, Узбекистан, г. Андижан, ул. Амира Умархона, 23',
  },
  // Xarita uchun manzil so'rovi (Google Maps o'zi topadi)
  mapQuery: 'Amir Umarxon ko‘chasi 23, Andijon, Uzbekistan',
  workHours: '09:00 – 18:00',
  socials: {
    instagram: 'https://instagram.com/',
    telegram: 'https://t.me/',
    youtube: 'https://youtube.com/',
    facebook: 'https://facebook.com/',
  },
}

// Xarita: manzil matni yoki koordinata bo'yicha (kalitsiz Google Maps embed)
const q = (lat, lng) => (lat != null && lng != null ? `${lat},${lng}` : SITE.mapQuery)
export const mapEmbed = (lat, lng, zoom = 16) =>
  `https://maps.google.com/maps?q=${encodeURIComponent(q(lat, lng))}&z=${zoom}&hl=uz&output=embed`
export const mapLink = (lat, lng) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q(lat, lng))}`

export const DISTRICTS = [
  { id: 'andijon-sh', uz: 'Andijon shahri', ru: 'г. Андижан', lat: 40.7821, lng: 72.3442 },
  { id: 'xonobod-sh', uz: 'Xonobod shahri', ru: 'г. Ханабад', lat: 40.8044, lng: 73.0013 },
  { id: 'andijon-t', uz: 'Andijon tumani', ru: 'Андижанский район', lat: 40.7398, lng: 72.2864 },
  { id: 'asaka', uz: 'Asaka tumani', ru: 'Асакинский район', lat: 40.6415, lng: 72.2388 },
  { id: 'baliqchi', uz: 'Baliqchi tumani', ru: 'Балыкчинский район', lat: 40.8739, lng: 71.8455 },
  { id: 'boston', uz: 'Bo‘ston tumani', ru: 'Бустанский район', lat: 40.7069, lng: 71.9244 },
  { id: 'buloqboshi', uz: 'Buloqboshi tumani', ru: 'Булакбашинский район', lat: 40.6234, lng: 72.5074 },
  { id: 'izboskan', uz: 'Izboskan tumani', ru: 'Избасканский район', lat: 40.9175, lng: 72.2442 },
  { id: 'jalaquduq', uz: 'Jalaquduq tumani', ru: 'Джалакудукский район', lat: 40.7271, lng: 72.6436 },
  { id: 'xojaobod', uz: 'Xo‘jaobod tumani', ru: 'Ходжаабадский район', lat: 40.6681, lng: 72.5574 },
  { id: 'qorgontepa', uz: 'Qo‘rg‘ontepa tumani', ru: 'Кургантепинский район', lat: 40.7317, lng: 72.7586 },
  { id: 'marhamat', uz: 'Marhamat tumani', ru: 'Мархаматский район', lat: 40.4980, lng: 72.3213 },
  { id: 'oltinkol', uz: 'Oltinko‘l tumani', ru: 'Алтынкульский район', lat: 40.8016, lng: 72.1715 },
  { id: 'paxtaobod', uz: 'Paxtaobod tumani', ru: 'Пахтаабадский район', lat: 40.9302, lng: 72.4969 },
  { id: 'shahrixon', uz: 'Shahrixon tumani', ru: 'Шахриханский район', lat: 40.7130, lng: 72.0569 },
  { id: 'ulugnor', uz: 'Ulug‘nor tumani', ru: 'Улугнорский район', lat: 40.7720, lng: 71.6610 },
]

export const districtById = (id) => DISTRICTS.find((d) => d.id === id)
