import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Phone, MapPin, Mail, Clock, Users, ChevronRight, Blocks, UserCheck, School, Contact, Landmark } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { PageBanner, Modal } from '../components/UI.jsx'
import { SITE, DISTRICTS, mapEmbed, mapLink } from '../data/site.js'
import { CLUBS } from '../data/clubs.js'
import { fmt } from '../data/stats.js'

// ---------- Kelajak markazlari (tumanlar kesimida) ----------
export function Centers() {
  const { t, L, tr } = useLang()
  const summary = [
    { label: tr('Kelajak markazlari', 'Центры «Kelajak»'), value: DISTRICTS.length + 2, icon: Building2 },
    { label: tr('To‘garaklar', 'Кружки'), value: 412, icon: Blocks },
    { label: tr('Kengash a’zolari', 'Члены совета'), value: 1284, icon: Users },
    { label: tr('Xodimlar', 'Сотрудники'), value: 386, icon: UserCheck },
  ]
  return (
    <>
      <PageBanner title={t('centers')} icon={Building2} crumbs={[{ label: t('about') }]} />
      <div className="container-x mt-8">
        <div className="grid gap-4 lg:grid-cols-[260px_1fr_380px]">
          <div className="card flex items-center justify-center bg-brand p-8">
            <img src="/images/logo-white.webp" alt={t('brandName')} className="h-auto w-full max-w-[200px]" />
          </div>
          <div className="card p-5 sm:p-6">
            <h2 className="font-lato text-2xl font-bold">{tr('Andijon viloyati “Kelajak” markazi', 'Центр «Kelajak» Андижанской области')}</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink/80">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-violet" />
                <a href={SITE.phoneHref} className="hover:text-brand">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-violet" /> {L(SITE.address)}
              </li>
            </ul>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {summary.map((s) => (
                <div key={s.label} className="rounded-2xl bg-lilac-50 p-3">
                  <s.icon className="h-6 w-6 text-brand-700" />
                  <p className="mt-2 text-xl font-extrabold">{fmt(s.value)}</p>
                  <p className="text-xs text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card min-h-[260px] overflow-hidden">
            <iframe title={tr('Xarita', 'Карта')} src={mapEmbed(undefined, undefined, 16)} className="h-full min-h-[260px] w-full border-0" loading="lazy" />
          </div>
        </div>

        <h2 className="mt-12 mb-5 font-lato text-2xl font-bold sm:text-3xl">{tr('Tuman va shahar markazlari', 'Районные и городские центры')}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {DISTRICTS.map((d, i) => {
            const clubs = CLUBS.filter((c) => c.district === d.id).length
            const centers = d.id === 'andijon-sh' ? 3 : 1
            return (
              <Link key={d.id} to={`/clubs?tuman=${d.id}`} className="group card p-5 transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(58,27,120,0.12)]">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-lato text-lg leading-tight font-bold group-hover:text-brand-700">{L(d)}</h3>
                  <ChevronRight className="h-5 w-5 shrink-0 text-violet transition group-hover:translate-x-1" />
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  {[
                    [Building2, tr('Kelajak markazlari', 'Центры «Kelajak»'), centers],
                    [Blocks, tr('To‘garaklar', 'Кружки'), 18 + ((i * 7) % 23) + clubs],
                    [School, tr('Maktablar', 'Школы'), 28 + ((i * 11) % 45)],
                  ].map(([Icon, label, v]) => (
                    <li key={label} className="flex items-center justify-between gap-2 rounded-xl bg-lilac-50 px-3 py-2">
                      <span className="flex items-center gap-2 text-ink/75">
                        <Icon className="h-4 w-4 text-brand-700" /> {label}
                      </span>
                      <b>{v}</b>
                    </li>
                  ))}
                </ul>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

// ---------- Rahbariyat ----------
const COUNCIL = [
  [{ uz: 'Viloyat O‘quvchilar kengashi raisi', ru: 'Председатель областного Совета учащихся' }, 'student'],
  [{ uz: 'Rais o‘rinbosari', ru: 'Заместитель председателя' }, 'student'],
  [{ uz: 'Kengash kotibi', ru: 'Секретарь совета' }, 'student'],
  [{ uz: '“Ta’lim” yo‘nalishi rahbari', ru: 'Руководитель направления «Образование»' }, 'student'],
  [{ uz: '“Madaniyat” yo‘nalishi rahbari', ru: 'Руководитель направления «Культура»' }, 'student'],
  [{ uz: '“IT va sun’iy intellekt” yo‘nalishi rahbari', ru: 'Руководитель направления «ИТ и искусственный интеллект»' }, 'student'],
  [{ uz: '“Sport” yo‘nalishi rahbari', ru: 'Руководитель направления «Спорт»' }, 'student'],
  [{ uz: '“Ekologiya” yo‘nalishi rahbari', ru: 'Руководитель направления «Экология»' }, 'student'],
  [{ uz: '“Media va axborot” yo‘nalishi rahbari', ru: 'Руководитель направления «Медиа и информация»' }, 'student'],
  [{ uz: '“Ijtimoiy tashabbus” yo‘nalishi rahbari', ru: 'Руководитель направления «Социальные инициативы»' }, 'student'],
  [{ uz: 'Kengash faoliyati muvofiqlashtiruvchisi', ru: 'Координатор деятельности совета' }, 'staff'],
  [{ uz: 'Maktab maslahatchilari koordinatori', ru: 'Координатор школьных консультантов' }, 'staff'],
].map(([role, group]) => ({ role, group }))
const GROUPS = { student: { uz: 'O‘quvchi', ru: 'Учащийся' }, staff: { uz: 'Mas’ul xodim', ru: 'Ответственный сотрудник' } }
const PLACEHOLDER = { uz: 'Ism Familiya Otasining ismi', ru: 'Фамилия Имя Отчество' }


function Avatar({ i }) {
  const grads = [
    ['#3a1b78', '#a18bef'],
    ['#1c79c0', '#7cc0f0'],
    ['#fe830c', '#fbb81c'],
    ['#0e9f6e', '#5fd3a8'],
  ]
  const [a, b] = grads[i % grads.length]
  return (
    <div className="relative flex h-full w-full items-end justify-center overflow-hidden" style={{ background: `linear-gradient(160deg, ${a}, ${b})` }}>
      <svg viewBox="0 0 100 100" className="h-[85%] w-[85%] text-white/85" aria-hidden="true">
        <circle cx="50" cy="36" r="18" fill="currentColor" />
        <path d="M14 100c2-24 18-38 36-38s34 14 36 38Z" fill="currentColor" />
      </svg>
    </div>
  )
}

export function Leadership() {
  const { t, L, tr } = useLang()
  const [tab, setTab] = useState('council')
  const [open, setOpen] = useState(null)
  return (
    <>
      <PageBanner title={t('leadership')} icon={Landmark} crumbs={[{ label: t('about') }]} photo="/images/boy.webp" />
      <div className="container-x mt-8">
        <div className="no-scrollbar inline-flex max-w-full gap-1 overflow-x-auto rounded-2xl bg-white p-1 shadow-[0_2px_14px_rgba(58,27,120,0.05)]" role="tablist">
          {[
            ['council', tr('Viloyat kengashi', 'Областной совет'), Users],
            ['districts', tr('Tuman kengashlari', 'Районные советы'), MapPin],
          ].map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold whitespace-nowrap transition ${tab === id ? 'bg-lilac-100 text-brand' : 'text-muted hover:text-brand'}`}
            >
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>

        {tab === 'council' ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {COUNCIL.map((p, i) => (
              <article key={p.role.uz} className="card flex flex-col gap-4 p-3 sm:flex-row">
                <div className="aspect-square w-full shrink-0 overflow-hidden rounded-xl sm:h-40 sm:w-36">
                  <Avatar i={i} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col py-1 pr-1">
                  <span className="w-fit rounded-md bg-lilac-100 px-2 py-0.5 text-[11px] font-bold text-brand-700">{L(GROUPS[p.group])}</span>
                  <h3 className="mt-2 font-lato text-lg font-bold">{L(PLACEHOLDER)}</h3>
                  <p className="text-sm text-muted">{L(p.role)}</p>
                  <div className="mt-3 space-y-1.5 text-sm">
                    <p className="flex items-center justify-between gap-2">
                      <span className="text-muted">{tr('Qabul vaqti', 'Часы приёма')}</span>
                      <span className="inline-flex items-center gap-1 rounded-lg border border-lilac-200 px-2 py-0.5 text-xs font-semibold">
                        <Clock className="h-3.5 w-3.5" /> {SITE.workHours}
                      </span>
                    </p>
                    <p className="flex items-center justify-between gap-2">
                      <span className="text-muted">{t('phone')}</span>
                      <a href={SITE.phoneHref} className="inline-flex items-center gap-1 rounded-lg border border-lilac-200 px-2 py-0.5 text-xs font-semibold hover:bg-lilac-50">
                        <Phone className="h-3.5 w-3.5" /> {SITE.phone}
                      </a>
                    </p>
                  </div>
                  <button type="button" className="btn-soft mt-3 w-full sm:mt-auto" onClick={() => setOpen({ ...p, i })}>
                    {t('moreInfo')} <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DISTRICTS.map((d, i) => (
              <div key={d.id} className="card p-5">
                <h3 className="font-lato text-lg font-bold">{L(d)}</h3>
                <p className="mt-1 text-sm text-muted">{t('council')}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex justify-between gap-2">
                    <span className="text-muted">{tr('Kengash raisi', 'Председатель совета')}</span>
                    <span className="font-semibold">{tr('Ism Familiya', 'Имя Фамилия')}</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span className="text-muted">{tr('Kengash a’zolari', 'Члены совета')}</span>
                    <span className="font-semibold">{42 + ((i * 13) % 60)} {tr('nafar', 'чел.')}</span>
                  </li>
                  <li className="flex justify-between gap-2">
                    <span className="text-muted">{tr('Maktablar', 'Школы')}</span>
                    <span className="font-semibold">{28 + ((i * 11) % 45)}</span>
                  </li>
                </ul>
                <Link to={`/clubs?tuman=${d.id}`} className="btn-soft mt-4 w-full">
                  {t('clubs')} <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal open={!!open} onClose={() => setOpen(null)} title={open ? L(open.role) : ''}>
        {open && (
          <div className="space-y-4">
            <div className="mx-auto h-40 w-36 overflow-hidden rounded-2xl">
              <Avatar i={open.i} />
            </div>
            <p className="text-center font-lato text-lg font-bold">{L(PLACEHOLDER)}</p>
            <p className="text-sm leading-relaxed text-ink/80">
              {tr(
                'Bu yerga kengash a’zosi haqida qisqacha ma’lumot yoziladi: sinfi va maktabi, yutuqlari, mas’ul bo‘lgan loyihalari hamda kengashdagi vazifalari.',
                'Здесь размещается краткая информация о члене совета: класс и школа, достижения, курируемые проекты и обязанности в совете.',
              )}
            </p>
            <a href={SITE.phoneHref} className="btn-primary w-full">
              <Phone className="h-4 w-4" /> {SITE.phone}
            </a>
          </div>
        )}
      </Modal>
    </>
  )
}

// ---------- Kontaktlar ----------
export function Contacts() {
  const { t, L, tr } = useLang()
  const items = [
    [Phone, t('phone'), SITE.phone, SITE.phoneHref],
    [Mail, t('email'), SITE.email, `mailto:${SITE.email}`],
    [MapPin, t('address'), L(SITE.address), mapLink()],
    [Clock, tr('Ish vaqti', 'Режим работы'), `${tr('Dushanba – Shanba', 'Понедельник – Суббота')}, ${SITE.workHours}`],
  ]
  return (
    <>
      <PageBanner title={t('contacts')} icon={Contact} crumbs={[{ label: t('about') }]} />
      <div className="container-x mt-8 grid gap-4 lg:grid-cols-[400px_1fr]">
        <div className="space-y-4">
          {items.map(([Icon, label, value, href]) => (
            <div key={label} className="card p-5">
              <p className="flex items-center gap-2 text-sm text-muted">
                <Icon className="h-4 w-4 text-violet" /> {label}:
              </p>
              {href ? (
                <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="mt-1 block text-lg font-bold break-words hover:text-brand-700">
                  {value}
                </a>
              ) : (
                <p className="mt-1 text-lg font-bold">{value}</p>
              )}
            </div>
          ))}
        </div>
        <div className="card min-h-[360px] overflow-hidden">
          <iframe title={tr('Xarita', 'Карта')} src={mapEmbed(undefined, undefined, 17)} className="h-full min-h-[360px] w-full border-0" loading="lazy" />
        </div>
      </div>
    </>
  )
}
