import { Link } from 'react-router-dom'
import { ArrowLeft, CalendarDays, MapPin, Globe2, UserRound, Trophy, Music, BadgeCheck, Award, Compass, ScrollText, Brain, Download, Printer, GraduationCap } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { usePageTitle } from '../components/UI.jsx'

function FakeQR() {
  // dekorativ QR (namuna) — haqiqiy tizimda o'quvchi profiliga havola bo'ladi
  const n = 21
  const cells = []
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const finder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13)
      if (finder) continue
      if (((x * 7 + y * 13 + x * y) % 5) < 2) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />)
    }
  const F = ({ x, y }) => (
    <g transform={`translate(${x} ${y})`}>
      <rect width="7" height="7" />
      <rect x="1" y="1" width="5" height="5" fill="#fff" />
      <rect x="2" y="2" width="3" height="3" />
    </g>
  )
  return (
    <svg viewBox="-1 -1 23 23" className="h-20 w-20" fill="#020a0c" role="img" aria-label="Tasdiqlangan QR kod">
      <rect x="-1" y="-1" width="23" height="23" fill="#fff" />
      {cells}
      <F x={0} y={0} />
      <F x={14} y={0} />
      <F x={0} y={14} />
    </svg>
  )
}

function Block({ title, icon: Icon, rows, color = 'text-orange bg-orange/10', children }) {
  return (
    <section className="card p-5 sm:p-6">
      <h2 className="flex items-center gap-2.5 font-lato text-lg font-bold">
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${color}`}>
          <Icon className="h-4.5 w-4.5" />
        </span>
        {title}
      </h2>
      <dl className="mt-4 divide-y divide-lilac-100">
        {rows.map(([k, v, badge]) => (
          <div key={k} className="flex flex-col gap-0.5 py-2.5 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <dt className="text-muted">{k}</dt>
            <dd className="font-semibold sm:text-right">
              {badge ? <span className={`inline-block rounded-lg px-2 py-0.5 text-xs font-bold ${badge}`}>{v}</span> : v}
            </dd>
          </div>
        ))}
      </dl>
      {children}
    </section>
  )
}

export default function Portfolio() {
  const { t } = useLang()
  usePageTitle(t('portfolio'))
  return (
    <div className="container-x mt-6 sm:mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/" className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-sm font-semibold shadow-sm hover:text-brand">
          <ArrowLeft className="h-4 w-4" /> {t('back')}
        </Link>
        <div className="flex gap-2">
          <button type="button" className="btn-soft" onClick={() => window.print()}>
            <Printer className="h-4 w-4" /> Chop etish
          </button>
        </div>
      </div>

      <section className="card mt-4 flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-7">
        <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-lilac-100 text-violet">
          <UserRound className="h-12 w-12" />
        </span>
        <div className="min-w-0 flex-1">
          <span className="rounded-full bg-lilac-100 px-3 py-1 text-[11px] font-extrabold tracking-wider text-brand-700 uppercase">O‘quvchi ijtimoiy portfoliosi</span>
          <h1 className="mt-2 font-lato text-2xl font-bold uppercase sm:text-3xl">O‘quvchi ism familiyasi</h1>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink/75">
            <li className="flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4 text-violet" /> 10-sinf
            </li>
            <li className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-violet" /> Tug‘ilgan sanasi: <b>__.__.____</b>
            </li>
            <li className="flex items-center gap-1.5">
              <UserRound className="h-4 w-4 text-violet" /> Jinsi: <b>—</b>
            </li>
            <li className="flex items-center gap-1.5">
              <Globe2 className="h-4 w-4 text-violet" /> Fuqaroligi: <b>O‘zbekiston</b>
            </li>
          </ul>
          <p className="mt-2 flex items-start gap-1.5 text-sm text-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-violet" /> Andijon viloyati, Andijon shahri, ___ MFY, ___ ko‘chasi, __-uy
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden -rotate-6 rounded-xl border border-violet/40 bg-lilac-50 px-3 py-2 text-xs font-bold text-brand-700 italic md:block">
            Kelajak sizdan
            <br />— yangi qadam!
          </span>
          <div className="text-center">
            <div className="rounded-xl border border-lilac-200 p-1.5">
              <FakeQR />
            </div>
            <p className="mt-1 text-[11px] text-muted">Tasdiqlangan QR kod</p>
          </div>
        </div>
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Block
          title="Ijtimoiy loyihalar va ko‘rik-tanlovlar"
          icon={Trophy}
          rows={[
            ['Tanlov nomi', 'Iqtidor maktab ansambli'],
            ['Jamoa rahbari', 'F.I.Sh.'],
            ['Hudud va shahar', 'Andijon viloyati, Andijon shahri'],
            ['Ta’lim muassasasi', '__-son maktab'],
            ['Jamoa va ishtirokchilar', '“Navo” jamoasi (8 nafar a’zo)'],
            ['O‘quv yili', '2025–2026'],
            ['Ijodiy yo‘nalishi', 'Doira ijrochiligi', 'bg-lilac-100 text-brand'],
            ['Egallagan o‘rni', '1-o‘rin (G‘olib)', 'bg-emerald-500/15 text-emerald-700'],
            ['Diplom turi va mukofot', 'Xorijiy ta’lim sayohati'],
          ]}
        >
          <button type="button" className="btn-soft mt-4 w-full">
            <Download className="h-4 w-4" /> Tasdiqlovchi hujjat (Foto / PDF)
          </button>
        </Block>
        <div className="space-y-5">
          <Block
            title="To‘garaklardagi faol ishtiroki (Kelajak markazi va maktab)"
            icon={Music}
            color="text-orange bg-orange/10"
            rows={[
              ['To‘garak yo‘nalishi', 'Milliy cholg‘u asboblari (Doira ansambli)'],
              ['To‘garak turi va nomi', 'Ijodiy to‘garak — “Yosh doirachilar”'],
              ['Ishtirok holati', 'Faol qatnashchi (100% davomat)', 'bg-emerald-500/15 text-emerald-700'],
              ['Qo‘shimcha to‘garak', 'Raqamli savodxonlik va IT asoslari'],
              ['To‘garak turi', 'Kelajak markazi to‘garagi (haftasiga 3 kun)'],
            ]}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Block title="Milliy sertifikat" icon={BadgeCheck} color="text-emerald-600 bg-emerald-500/10" rows={[['Yo‘nalish / fan', 'San’at (Musiqa)'], ['Darajasi', 'A (a’lo)'], ['Natijasi', '94 / 100 ball']]} />
            <Block title="Xorijiy sertifikat" icon={Award} color="text-sky bg-sky/10" rows={[['Dastur', 'Xalqaro yoshlar forumi'], ['Sertifikat turi', 'Xalqaro ishtirokchi'], ['Holati', 'Tasdiqlangan', 'bg-emerald-500/15 text-emerald-700']]} />
          </div>
        </div>
        <Block title="Kasblarga qiziqishi" icon={Compass} color="text-violet bg-violet/15" rows={[['Qiziqqan fani', 'Adabiyot va tillar'], ['Tanlagan yo‘nalish', 'Pedagogika va tilshunoslik'], ['Kelgusi reja', 'Oliy ta’lim muassasasida o‘qish']]} />
        <Block title="Shahodatnoma" icon={ScrollText} color="text-brand bg-lilac-100" rows={[['Sinfi', '10-sinf'], ['Seriya va raqam', 'AA _______'], ['Berilgan sana', '2026-yil']]} />
        <div className="lg:col-span-2">
          <Block
            title="Fan olimpiadalari va intellektual tanlovlar"
            icon={Brain}
            color="text-pink-600 bg-pink-500/10"
            rows={[
              ['Olimpiada nomi', 'Umumta’lim fanlari va ijodiy yo‘nalishlar olimpiadasi'],
              ['Bosqich va yo‘nalish', 'Shahar bosqichi — 1-o‘rin (G‘olib)'],
              ['O‘quv yili va natija', '2025/2026 o‘quv yili · Viloyat bosqichiga yo‘llanma'],
            ]}
          />
        </div>
      </div>

      <p className="mt-8 rounded-3xl bg-brand px-6 py-8 text-center font-lato text-xl font-bold text-white sm:text-2xl">
        “Bilim, iqtidor va faollik — yorug‘ kelajak sari eng ishonchli yo‘l!”
      </p>
    </div>
  )
}
