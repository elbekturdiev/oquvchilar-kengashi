import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import {
  GraduationCap, Search, LayoutList, LayoutGrid, Users, Blocks, UserCheck, Award, MapPinned, Star, ArrowLeft, MapPin, Phone, Clock, CalendarDays, Wallet, UserRound, Baby,
} from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { PageBanner, Empty, Pagination, ApplyModal } from '../components/UI.jsx'
import { ClubRow, ClubCard } from '../components/Cards.jsx'
import Cover from '../components/Cover.jsx'
import { CLUBS, clubById, formatSum, WEEKDAYS } from '../data/clubs.js'
import { DIRECTIONS, SPECIAL_DIRECTIONS, directionById } from '../data/directions.js'
import { DISTRICTS, districtById, mapEmbed, mapLink } from '../data/site.js'
import { CLUB_STATS, fmt } from '../data/stats.js'
import NotFound from './NotFound.jsx'

export function KindTabs({ tab, onChange }) {
  const { t } = useLang()
  const tabs = [
    { id: 'centers', label: t('clubsCenters'), icon: Star },
    { id: 'special', label: t('clubsSpecial'), icon: GraduationCap },
  ]
  return (
    <div className="grid grid-cols-2 gap-1 rounded-2xl bg-white p-1 shadow-[0_2px_14px_rgba(58,27,120,0.05)] sm:inline-flex" role="tablist">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={tab === id}
          onClick={() => onChange(id)}
          className={`flex items-center justify-center gap-2 rounded-xl px-2 py-2.5 text-center text-xs leading-tight font-bold transition sm:px-4 sm:text-sm sm:whitespace-nowrap ${
            tab === id ? 'bg-lilac-100 text-brand' : 'text-muted hover:text-brand'
          }`}
        >
          <Icon className="hidden h-4 w-4 shrink-0 sm:block" /> {label}
        </button>
      ))}
    </div>
  )
}

const PER_PAGE = 6

export function ClubsPage() {
  const { t, L, tr } = useLang()
  const [params, setParams] = useSearchParams()
  const tab = params.get('tab') === 'special' ? 'special' : 'centers'
  const dir = params.get('dir') || 'all'
  const tuman = params.get('tuman') || 'all'
  const [q, setQ] = useState('')
  const [view, setView] = useState('list')
  const [page, setPage] = useState(1)
  const [applyFor, setApplyFor] = useState(null)

  const setParam = (k, v) => {
    const p = new URLSearchParams(params)
    if (!v || v === 'all' || (k === 'tab' && v === 'centers')) p.delete(k)
    else p.set(k, v)
    if (k === 'tab') p.delete('dir')
    setParams(p, { replace: true })
    setPage(1)
  }

  const dirs = tab === 'special' ? SPECIAL_DIRECTIONS : DIRECTIONS
  const stats = CLUB_STATS[tab]
  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return CLUBS.filter(
      (c) =>
        c.kind === tab &&
        (dir === 'all' || c.direction === dir) &&
        (tuman === 'all' || c.district === tuman) &&
        (!s || [c.name, c.org, c.address].flatMap((v) => [v.uz, v.ru]).join(' ').toLowerCase().includes(s)),
    )
  }, [tab, dir, tuman, q])
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE))
  const cur = Math.min(page, pages)
  const shown = list.slice((cur - 1) * PER_PAGE, cur * PER_PAGE)

  const statCards = [
    { label: tr('Jami o‘quvchilar soni', 'Всего учащихся'), value: stats.students, unit: tr('nafar', 'чел.'), icon: Users, c: 'bg-sky/10 text-sky' },
    { label: tr('Jami to‘garaklar soni', 'Всего кружков'), value: stats.clubs, unit: tr('ta', 'шт.'), icon: Blocks, c: 'bg-orange/10 text-orange' },
    { label: tr('To‘garak rahbarlari', 'Руководители кружков'), value: stats.teachers, unit: tr('nafar', 'чел.'), icon: UserCheck, c: 'bg-violet/15 text-brand-700' },
    { label: tr('Oliy ma’lumotli', 'С высшим образованием'), value: stats.higher, unit: tr('nafar', 'чел.'), icon: Award, c: 'bg-emerald-500/10 text-emerald-600', pct: Math.round((stats.higher / stats.teachers) * 100) },
  ]

  return (
    <>
      <PageBanner title={t('clubs')} icon={GraduationCap} photo="/images/boy.webp" />
      <div className="container-x mt-8">
        <KindTabs tab={tab} onChange={(v) => setParam('tab', v)} />

        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_300px]">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
            {statCards.map((s) => (
              <div key={s.label} className="card flex items-center gap-3 p-4">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${s.c}`}>
                  <s.icon className="h-6 w-6" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs leading-tight text-muted">{s.label}</span>
                  <span className="mt-1 flex flex-wrap items-baseline gap-1">
                    <span className="text-xl font-extrabold sm:text-2xl">{fmt(s.value)}</span>
                    <span className="text-xs text-muted">{s.unit}</span>
                    {s.pct && <span className="rounded-md bg-emerald-500/15 px-1.5 text-[11px] font-bold text-emerald-700">{s.pct}%</span>}
                  </span>
                </span>
              </div>
            ))}
          </div>
          <a href="https://www.google.com/maps/search/?api=1&query=Andijon+viloyati" target="_blank" rel="noreferrer" className="card group relative block min-h-[120px] overflow-hidden bg-[linear-gradient(135deg,#ede8ff,#cfc3ff)]">
            <iframe title={tr('Xarita', 'Карта')} src={mapEmbed(40.76, 72.35, 9)} className="pointer-events-none absolute inset-0 h-full w-full border-0 grayscale-[30%]" loading="lazy" tabIndex={-1} />
            <span className="absolute inset-x-4 bottom-4 inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white shadow-lg transition group-hover:bg-brand-700">
              <MapPinned className="h-4 w-4" /> {t('onMap')}
            </span>
          </a>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0">
            <div className="flex flex-col gap-3 sm:flex-row">
              <label className="relative flex-1">
                <span className="sr-only">{t('search')}</span>
                <Search className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-violet" />
                <input
                  type="search"
                  value={q}
                  onChange={(e) => {
                    setQ(e.target.value)
                    setPage(1)
                  }}
                  placeholder={t('search')}
                  className="input !py-3 !pl-12"
                />
              </label>
              <select className="input sm:!w-56" value={tuman} onChange={(e) => setParam('tuman', e.target.value)} aria-label={t('chooseDistrict')}>
                <option value="all">{t('chooseDistrict')}</option>
                {DISTRICTS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {L(d)}
                  </option>
                ))}
              </select>
              <div className="hidden gap-1 rounded-xl border border-lilac-200 bg-white p-1 sm:flex" role="group" aria-label={tr('Ko‘rinish', 'Вид')}>
                {[
                  ['list', LayoutList],
                  ['grid', LayoutGrid],
                ].map(([v, Icon]) => (
                  <button key={v} type="button" onClick={() => setView(v)} aria-pressed={view === v} className={`rounded-lg p-2 transition ${view === v ? 'bg-brand text-white' : 'text-muted hover:text-brand'}`}>
                    <Icon className="h-5 w-5" />
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm text-muted">
              {t('found')}: <b className="text-ink">{list.length}</b> {t('clubsCount')}
            </p>
            <div className="mt-3">
              {!shown.length ? (
                <Empty />
              ) : view === 'list' ? (
                <div className="space-y-4">
                  {shown.map((c) => (
                    <ClubRow key={c.id} club={c} onApply={setApplyFor} />
                  ))}
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {shown.map((c) => (
                    <ClubCard key={c.id} club={c} />
                  ))}
                </div>
              )}
            </div>
            <Pagination page={cur} pages={pages} onChange={(p) => { setPage(p); window.scrollTo({ top: 300, behavior: 'smooth' }) }} />
          </div>

          <aside className="order-first min-w-0 lg:order-none">
            <div className="card p-5 lg:sticky lg:top-28">
              <p className="font-lato text-lg font-bold">{t('filter')}</p>
              <p className="mt-4 text-sm font-semibold text-ink/80">{t('clubDirections')}</p>
              <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto lg:flex-col lg:gap-0.5">
                {[{ id: 'all', uz: t('all'), ru: t('all') }, ...dirs].map((d) => (
                  <label
                    key={d.id}
                    className={`flex shrink-0 cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-sm whitespace-nowrap transition lg:whitespace-normal ${
                      dir === d.id ? 'bg-lilac-100 font-bold text-brand' : 'bg-lilac-50 text-ink/80 hover:bg-lilac-100 lg:bg-transparent'
                    }`}
                  >
                    <input type="radio" name="dir" className="accent-brand" checked={dir === d.id} onChange={() => setParam('dir', d.id)} />
                    {L(d)}
                  </label>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
      <ApplyModal club={applyFor} onClose={() => setApplyFor(null)} />
    </>
  )
}

export function ClubDetail() {
  const { id } = useParams()
  const { t, L, tr } = useLang()
  const club = clubById(id)
  const [applyFor, setApplyFor] = useState(null)
  if (!club) return <NotFound />
  const dir = directionById(club.direction)
  const dist = districtById(club.district)
  const free = Math.max(0, club.seats - club.enrolled)
  const info = [
    [MapPin, t('address'), L(club.address)],
    [Phone, t('phone'), club.phone],
    [CalendarDays, tr('Dars kunlari', 'Дни занятий'), club.days.map((d) => L(WEEKDAYS[d])).join(', ')],
    [Clock, tr('Dars vaqti', 'Время занятий'), club.time],
    [Baby, tr('Yosh toifasi', 'Возраст'), L(club.age)],
    [UserRound, tr('To‘garak rahbari', 'Руководитель'), L(club.teacher)],
    [Wallet, tr('Oylik to‘lov', 'Оплата в месяц'), `${formatSum(club.price)} ${t('sum')}`],
  ]
  const similar = CLUBS.filter((c) => c.direction === club.direction && c.id !== club.id).slice(0, 3)
  return (
    <>
      <PageBanner title={L(club.name)} icon={GraduationCap} crumbs={[{ label: t('clubs'), to: club.kind === 'special' ? '/clubs?tab=special' : '/clubs' }]} photo="/images/boy.webp" />
      <div className="container-x mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0 space-y-6">
          <div className="card p-4 sm:p-6">
            <Link to="/clubs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-violet">
              <ArrowLeft className="h-4 w-4" /> {t('back')}
            </Link>
            <div className="mt-4 grid gap-6 md:grid-cols-[280px_1fr]">
              <Cover image={club.image} tone={dir.tone} icon={dir.icon} iconSize="h-20 w-20" alt={L(club.name)} className="aspect-[4/3] rounded-2xl" />
              <div>
                <span className="rounded-lg bg-lilac-100 px-2.5 py-1 text-xs font-bold text-brand">{L(dir)}</span>
                <h2 className="mt-3 font-lato text-2xl font-bold sm:text-3xl">{L(club.name)}</h2>
                <p className="mt-2 text-sm font-semibold text-ink/70">{L(club.org)}</p>
                <p className="mt-1 text-sm text-muted">{L(dist)}</p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="text-2xl font-extrabold text-violet">
                    {formatSum(club.price)} {t('sum')}
                  </span>
                  <span className={`rounded-lg px-2.5 py-1 text-xs font-bold ${free ? 'bg-emerald-500/15 text-emerald-700' : 'bg-red-500/10 text-red-600'}`}>
                    {free ? tr(`${free} ta bo‘sh o‘rin`, `Свободных мест: ${free}`) : tr('Bo‘sh o‘rin yo‘q', 'Мест нет')}
                  </span>
                </div>
                <button type="button" className="btn-primary mt-5 !py-3" onClick={() => setApplyFor(club)} disabled={!free}>
                  {t('apply')}
                </button>
              </div>
            </div>
          </div>
          <div className="card p-4 sm:p-6">
            <h3 className="font-lato text-xl font-bold">{tr('Haftalik dars jadvali', 'Расписание на неделю')}</h3>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
              {WEEKDAYS.map((w, d) => {
                const on = club.days.includes(d)
                return (
                  <div key={w.uz} className={`rounded-xl p-3 text-center ${on ? 'bg-brand text-white' : 'bg-lilac-50 text-muted'}`}>
                    <p className="text-sm font-bold">{L(w)}</p>
                    <p className="mt-1 text-xs">{on ? club.time : tr('Dars yo‘q', 'Нет занятий')}</p>
                  </div>
                )
              })}
            </div>
          </div>
          {similar.length > 0 && (
            <div>
              <h3 className="mb-4 font-lato text-xl font-bold">{tr('O‘xshash to‘garaklar', 'Похожие кружки')}</h3>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {similar.map((c) => (
                  <ClubCard key={c.id} club={c} />
                ))}
              </div>
            </div>
          )}
        </div>
        <aside className="space-y-4">
          <div className="card p-5">
            <ul className="space-y-3.5">
              {info.map(([Icon, label, value]) => (
                <li key={label} className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lilac-50 text-brand">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted">{label}</span>
                    <span className="block text-sm font-semibold break-words">{value}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card overflow-hidden">
            <iframe title={tr('Xarita', 'Карта')} src={mapEmbed(club.lat, club.lng, 15)} className="h-56 w-full border-0" loading="lazy" />
            <a href={mapLink(club.lat, club.lng)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 p-3 text-sm font-bold text-brand hover:bg-lilac-50">
              <MapPinned className="h-4 w-4" /> {t('onMap')}
            </a>
          </div>
        </aside>
      </div>
      <ApplyModal club={applyFor} onClose={() => setApplyFor(null)} />
    </>
  )
}
