import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, MousePointerClick, Clock, MapPin } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { PageBanner, Empty, ApplyModal } from '../components/UI.jsx'
import { KindTabs } from './Clubs.jsx'
import { CLUBS } from '../data/clubs.js'
import { DIRECTIONS, SPECIAL_DIRECTIONS, directionById } from '../data/directions.js'
import { DISTRICTS } from '../data/site.js'

const WEEK = ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba']

export default function Schedule() {
  const { t, L } = useLang()
  const [tab, setTab] = useState('centers')
  const [dir, setDir] = useState('all')
  const [tuman, setTuman] = useState('all')
  const [orgType, setOrgType] = useState('all')
  const [sel, setSel] = useState(null)
  const [applyFor, setApplyFor] = useState(null)
  const dirs = tab === 'special' ? SPECIAL_DIRECTIONS : DIRECTIONS
  const list = useMemo(
    () =>
      CLUBS.filter(
        (c) =>
          c.kind === tab &&
          (dir === 'all' || c.direction === dir) &&
          (tuman === 'all' || c.district === tuman) &&
          (orgType === 'all' || (orgType === 'city' ? c.district.endsWith('-sh') : !c.district.endsWith('-sh'))),
      ),
    [tab, dir, tuman, orgType],
  )
  const selected = list.find((c) => c.id === sel?.id) || null

  return (
    <>
      <PageBanner title={t('schedule')} icon={CalendarDays} crumbs={[{ label: t('clubs'), to: '/clubs' }]} />
      <div className="container-x mt-8">
        <KindTabs
          tab={tab}
          onChange={(v) => {
            setTab(v)
            setDir('all')
            setSel(null)
          }}
        />
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <select className="input" value={dir} onChange={(e) => setDir(e.target.value)} aria-label={t('chooseDirection')}>
            <option value="all">{t('chooseDirection')}: {t('all')}</option>
            {dirs.map((d) => (
              <option key={d.id} value={d.id}>
                {L(d)}
              </option>
            ))}
          </select>
          <select className="input" value={tuman} onChange={(e) => setTuman(e.target.value)} aria-label={t('chooseDistrict')}>
            <option value="all">{t('chooseDistrict')}</option>
            {DISTRICTS.map((d) => (
              <option key={d.id} value={d.id}>
                {L(d)}
              </option>
            ))}
          </select>
          <select className="input" value={orgType} onChange={(e) => setOrgType(e.target.value)} aria-label={t('chooseOrgType')}>
            <option value="all">{t('chooseOrgType')}: {t('all')}</option>
            <option value="city">Shahar tashkilotlari</option>
            <option value="district">Tuman tashkilotlari</option>
          </select>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_400px]">
          <div className="min-w-0">
            <p className="mb-3 text-sm text-muted">
              Mavjud to‘garaklar: <b className="text-ink">{list.length}</b>
            </p>
            {list.length ? (
              <ul className="grid gap-3 sm:grid-cols-2">
                {list.map((c) => {
                  const d = directionById(c.direction)
                  const on = selected?.id === c.id
                  return (
                    <li key={c.id}>
                      <button
                        type="button"
                        onClick={() => {
                          setSel(c)
                          if (window.innerWidth < 1024) window.scrollTo({ top: 260, behavior: 'smooth' })
                        }}
                        aria-pressed={on}
                        className={`card flex h-full w-full items-start gap-3 p-4 text-left transition ${on ? 'ring-2 ring-violet' : 'hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(58,27,120,0.10)]'}`}
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: `linear-gradient(135deg, ${d.tone[0]}, ${d.tone[1]})` }}>
                          <d.icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-lato font-bold">{c.name}</span>
                          <span className="mt-0.5 line-clamp-1 text-xs text-muted">{c.org}</span>
                          <span className="mt-2 inline-flex items-center gap-1 rounded-lg bg-lilac-50 px-2 py-0.5 text-xs font-semibold text-brand">
                            <Clock className="h-3.5 w-3.5" /> {c.days.length} kun · {c.time}
                          </span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <Empty />
            )}
          </div>
          <aside className="order-first min-w-0 lg:order-none">
            <div className="card p-5 lg:sticky lg:top-28">
              {!selected ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-lilac-100 text-brand">
                    <MousePointerClick className="h-8 w-8" />
                  </span>
                  <p className="mt-4 font-lato text-lg font-bold">Dars jadvalini ko‘rish uchun to‘garakni tanlang</p>
                  <p className="mt-1 text-sm text-muted">Ro‘yxatdan kerakli to‘garakni bosing.</p>
                </div>
              ) : (
                <>
                  <p className="text-xs font-bold tracking-wider text-violet uppercase">{t('schedule')}</p>
                  <h3 className="mt-1 font-lato text-xl font-bold">{selected.name}</h3>
                  <p className="mt-1 flex items-start gap-1.5 text-sm text-muted">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {selected.org}
                  </p>
                  <div className="mt-4 overflow-hidden rounded-2xl border border-lilac-100">
                    <table className="w-full text-sm">
                      <thead className="bg-lilac-50 text-left text-brand">
                        <tr>
                          <th className="px-4 py-2.5 font-bold">Kun</th>
                          <th className="px-4 py-2.5 font-bold">Vaqt</th>
                        </tr>
                      </thead>
                      <tbody>
                        {WEEK.map((d) => {
                          const on = selected.days.includes(d)
                          return (
                            <tr key={d} className="border-t border-lilac-100">
                              <td className={`px-4 py-2.5 ${on ? 'font-bold' : 'text-muted'}`}>{d}</td>
                              <td className="px-4 py-2.5">
                                {on ? (
                                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-2 py-1 text-xs font-bold text-white">
                                    <Clock className="h-3.5 w-3.5" /> {selected.time}
                                  </span>
                                ) : (
                                  <span className="text-muted">—</span>
                                )}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link to={`/clubs/${selected.id}`} className="btn-soft">
                      {t('moreInfo')}
                    </Link>
                    <button type="button" className="btn-primary" onClick={() => setApplyFor(selected)}>
                      {t('apply')}
                    </button>
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
      <ApplyModal club={applyFor} onClose={() => setApplyFor(null)} />
    </>
  )
}
