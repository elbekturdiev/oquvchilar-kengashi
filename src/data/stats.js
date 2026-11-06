// NAMUNA statistika (Andijon viloyati). Haqiqiy raqamlar bilan almashtiring.
// Har bir ko'rsatkich o'z qiymatiga ega — ikki xil ko'rsatkichga bir xil son yozilmasin.
export const HOME_STATS = {
  centers: [
    { key: 'statOrgs', value: 18, icon: 'building' },
    { key: 'statClubs', value: 412, icon: 'cap' },
    { key: 'statApps', value: 9840, icon: 'bag' },
    { key: 'statStudents', value: 7265, icon: 'people' },
  ],
  special: [
    { key: 'statOrgs', value: 742, icon: 'building' },
    { key: 'statClubs', value: 3126, icon: 'cap' },
    { key: 'statApps', value: 21540, icon: 'bag' },
    { key: 'statExtended', value: 16380, icon: 'people' },
  ],
}

// "Eng ko'p qiziqish bildirilgan yo'nalishlar" — yo'nalish id va to'garaklar soni
export const TOP_DIRECTIONS = {
  centers: [
    { id: 'it', count: 96 },
    { id: 'til', count: 88 },
    { id: 'sanat', count: 74 },
    { id: 'ilm', count: 61 },
    { id: 'sport', count: 55 },
    { id: 'kasb', count: 38 },
  ],
  special: [
    { id: 'umumtalim', count: 812 },
    { id: 'aniq', count: 704 },
    { id: 'filologiya', count: 596 },
    { id: 'tabiiy', count: 541 },
    { id: 'xorijiy', count: 473 },
  ],
}

export const CLUB_STATS = {
  centers: { students: 7265, clubs: 412, teachers: 386, higher: 341 },
  special: { students: 16380, clubs: 3126, teachers: 2210, higher: 1987 },
}

export const fmt = (n) => Number(n).toLocaleString('ru-RU').replace(/,/g, ' ')
