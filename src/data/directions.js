import {
  FlaskConical, Cpu, Hammer, Languages, Palette, Trophy, BookOpen, Calculator, Globe2,
} from 'lucide-react'

// To'garak yo'nalishlari. `tone` — muqova rangi (rasm bo'lmasa avtomatik muqova chiziladi).
export const DIRECTIONS = [
  { id: 'ilm', uz: 'Ilm-fan yo‘nalishi', ru: 'Наука', icon: FlaskConical, tone: ['#3a1b78', '#7c5cf0'] },
  { id: 'it', uz: 'Axborot texnologiyalari', ru: 'Информационные технологии', icon: Cpu, tone: ['#0f4c81', '#2f9be0'] },
  { id: 'kasb', uz: 'Kasb-hunar yo‘nalishi', ru: 'Профессии и ремёсла', icon: Hammer, tone: ['#8a3b0a', '#fe830c'] },
  { id: 'til', uz: 'Xorijiy tillar', ru: 'Иностранные языки', icon: Languages, tone: ['#0e6b5c', '#22c3a0'] },
  { id: 'sanat', uz: 'Madaniyat va san’at', ru: 'Культура и искусство', icon: Palette, tone: ['#8c1d5c', '#ec4f9c'] },
  { id: 'sport', uz: 'Jismoniy tarbiya va sport', ru: 'Физкультура и спорт', icon: Trophy, tone: ['#1f5f1f', '#4cbb4a'] },
]

// "Ayrim toifadagi o'quvchilar uchun" (maktablardagi uzaytirilgan kun guruhlari) yo'nalishlari
export const SPECIAL_DIRECTIONS = [
  { id: 'umumtalim', uz: 'Umumta’lim fanlari', ru: 'Общеобразовательные предметы', icon: BookOpen, tone: ['#3a1b78', '#a18bef'] },
  { id: 'aniq', uz: 'Aniq fanlar', ru: 'Точные науки', icon: Calculator, tone: ['#0f4c81', '#2f9be0'] },
  { id: 'filologiya', uz: 'Filologiya fanlari', ru: 'Филология', icon: Languages, tone: ['#8c1d5c', '#ec4f9c'] },
  { id: 'tabiiy', uz: 'Tabiiy fanlar', ru: 'Естественные науки', icon: FlaskConical, tone: ['#1f5f1f', '#4cbb4a'] },
  { id: 'xorijiy', uz: 'Xorijiy tillar', ru: 'Иностранные языки', icon: Globe2, tone: ['#0e6b5c', '#22c3a0'] },
]

export const ALL_DIRECTIONS = [...DIRECTIONS, ...SPECIAL_DIRECTIONS]
export const directionById = (id) => ALL_DIRECTIONS.find((d) => d.id === id)
