import { Compass, Zap, Sparkles, BookOpenCheck, Briefcase, School, FileInput, Users, UserMinus, UserPlus, TrendingUp } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { usePageTitle } from '../components/UI.jsx'
import { fmt } from '../data/stats.js'

const ROLES = [
  ['“Mening kelajakdagi kasbim” dasturi doirasida o‘quvchilarni kasbga yo‘naltirish', 'O‘quvchilarning qiziqishi, qobiliyati, iqtidori va kasbiy maqsadlarini aniqlash, ularga individual tavsiyalar berish, zamonaviy va istiqbolli kasblar bilan tanishtirish hamda kasb tanlashga amaliy ko‘maklashish.', Compass],
  ['Tarmoq to‘garaklari faoliyatini tashkil etish va rivojlantirish', 'O‘quvchilarni qiziqishi va qobiliyatidan kelib chiqib madaniyat, san’at, robototexnika, kitobxonlik, sport, xorijiy tillar, IT va boshqa yo‘nalishlardagi to‘garak hamda klublarga jalb etish, bo‘sh vaqtini mazmunli tashkil etish.', Zap],
  ['“Prezident iqtidorli farzandlari” milliy dasturi doirasida akademik salohiyatni rivojlantirish', 'Iqtidorli o‘quvchilarni aniqlash, ularni nufuzli mahalliy va xorijiy oliy ta’lim muassasalari, grant va stipendiya imkoniyatlari bilan tanishtirish hamda maqsadli tayyorgarligini qo‘llab-quvvatlash.', Sparkles],
  ['“O‘quvchilar kengashi” faoliyatini tashkil etish va muvofiqlashtirish', 'O‘quvchilarning o‘zini o‘zi boshqarish tizimida faol ishtirokini ta’minlash, sinf va maktab saylovlarini tashkil etish, kengash a’zolarining liderlik va jamoada ishlash ko‘nikmalarini rivojlantirish.', BookOpenCheck],
  ['“Ijtimoiy portfolio” orqali o‘quvchilar faoliyati va yutuqlarini hisobga olish', 'O‘quvchilarning to‘garaklar, tanlovlar, loyihalar, olimpiadalar va sportdagi ishtiroki hamda yutuqlarini elektron tizimda muntazam qayd etish va rivojlanish dinamikasini kuzatib borish.', Briefcase],
]

// NAMUNA statistika (Andijon viloyati)
const TOTAL = 668
const FEMALE = 362
const STATS = [
  ['Jami maktablar soni', 742, 'ta', School, 'bg-sky/10 text-sky'],
  ['Kelib tushgan arizalar soni', 2960, 'ta', FileInput, 'bg-orange/10 text-orange'],
  ['Jami maslahatchilar soni', TOTAL, 'nafar', Users, 'bg-violet/15 text-brand-700', '+12,4%'],
  ['Vakant maktablar', 74, 'ta', UserMinus, 'bg-red-500/10 text-red-500'],
  ['Zaxira nomzodlar', 152, 'nafar', UserPlus, 'bg-emerald-500/10 text-emerald-600'],
]
const AGES = [
  ['30 yoshgacha', 52.8, '#3a1b78'],
  ['31–40 yosh', 37.4, '#a18bef'],
  ['40+ yosh', 9.8, '#cfc3ff'],
]
const EDU = [
  ['Bakalavr', 87],
  ['Magistratura', 10],
  ['PhD', 3],
]

function Donut({ value, total }) {
  const r = 52
  const c = 2 * Math.PI * r
  const p = value / total
  return (
    <svg viewBox="0 0 140 140" className="h-40 w-40" role="img" aria-label={`Ayollar ${Math.round(p * 100)}%`}>
      <circle cx="70" cy="70" r={r} fill="none" stroke="#cfc3ff" strokeWidth="18" />
      <circle cx="70" cy="70" r={r} fill="none" stroke="#3a1b78" strokeWidth="18" strokeDasharray={`${c * p} ${c}`} strokeLinecap="round" transform="rotate(-90 70 70)" />
      <text x="70" y="64" textAnchor="middle" className="fill-muted text-[11px]">
        jami
      </text>
      <text x="70" y="84" textAnchor="middle" className="fill-ink text-[20px] font-extrabold">
        {fmt(total)}
      </text>
    </svg>
  )
}

export default function Counselors() {
  const { t } = useLang()
  usePageTitle(t('counselors'))
  const pf = Math.round((FEMALE / TOTAL) * 100)
  return (
    <div className="container-x mt-6 space-y-6 sm:mt-8">
      <section className="rounded-3xl bg-gradient-to-br from-white to-lilac-100 p-5 shadow-[0_2px_14px_rgba(58,27,120,0.06)] sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="inline-block rounded-full bg-lilac-200 px-3 py-1 text-xs font-extrabold tracking-wider text-brand-700 uppercase">Maslahatchi haqida</span>
            <h1 className="mt-3 font-lato text-3xl font-bold sm:text-4xl">Maktab maslahatchisi kim?</h1>
            <p className="mt-1 text-sm text-muted">Zamonaviy ta’limni qo‘llab-quvvatlash va professional yo‘naltirish tizimi.</p>
          </div>
          <p className="hidden -rotate-3 font-lato text-lg font-bold text-brand-700 italic md:block">Har bir o‘quvchi — katta imkoniyat!</p>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {ROLES.map(([title, text, Icon], i) => (
            <div key={title} className="flex flex-col rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lilac-100 text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="rounded-lg bg-lilac-50 px-2 py-0.5 text-xs font-bold text-violet">0{i + 1}</span>
              </div>
              <h3 className="mt-4 font-lato text-[15px] leading-snug font-bold">{title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {STATS.map(([label, v, unit, Icon, c, delta]) => (
          <div key={label} className="card p-4">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${c}`}>
              <Icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-xs text-muted">{label}</p>
            <p className="mt-1 flex flex-wrap items-baseline gap-1">
              <span className="text-2xl font-extrabold">{fmt(v)}</span>
              <span className="text-xs text-muted">{unit}</span>
              {delta && (
                <span className="inline-flex items-center gap-0.5 rounded-md bg-emerald-500/15 px-1.5 text-[11px] font-bold text-emerald-700">
                  <TrendingUp className="h-3 w-3" /> {delta}
                </span>
              )}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="card p-6">
          <h2 className="font-lato text-xl font-bold">Demografik va yosh kesimi tahlili</h2>
          <p className="text-sm text-muted">Maktab maslahatchilarining yosh toifalari bo‘yicha taqsimoti</p>
          <div className="mt-6 flex h-56 items-end justify-around gap-4 border-b border-lilac-200 px-2">
            {AGES.map(([label, v, color]) => (
              <div key={label} className="flex h-full w-full max-w-[90px] flex-col items-center justify-end">
                <span className="mb-1.5 text-sm font-extrabold">{String(v).replace('.', ',')}%</span>
                <div className="w-full rounded-t-xl transition-all" style={{ height: `${(v / 60) * 100}%`, background: color }} />
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-around gap-4 px-2 text-xs text-muted">
            {AGES.map(([label]) => (
              <span key={label} className="w-full max-w-[90px] text-center">
                {label}
              </span>
            ))}
          </div>
        </section>

        <section className="card p-6">
          <h2 className="font-lato text-xl font-bold">Gender va OTM darajasi taqsimoti</h2>
          <div className="mt-4 grid items-center gap-6 sm:grid-cols-2">
            <div className="flex flex-col items-center">
              <p className="mb-2 self-start text-sm font-semibold text-ink/80">Gender balansi</p>
              <Donut value={FEMALE} total={TOTAL} />
              <div className="mt-3 flex gap-4 text-sm">
                <span className="flex items-center gap-1.5">
                  <i className="h-3 w-3 rounded-full bg-brand" /> Ayollar ({pf}%)
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="h-3 w-3 rounded-full bg-lilac" /> Erkaklar ({100 - pf}%)
                </span>
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-ink/80">Oliy ma’lumot darajalari</p>
              <ul className="space-y-4">
                {EDU.map(([label, v]) => (
                  <li key={label}>
                    <div className="flex justify-between text-sm">
                      <span>{label}</span>
                      <b>{v}%</b>
                    </div>
                    <div className="mt-1.5 h-2.5 rounded-full bg-lilac-100">
                      <div className="h-full rounded-full bg-gradient-to-r from-brand to-violet" style={{ width: `${v}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
