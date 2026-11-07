import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, LogIn, Menu, X, UserRound } from 'lucide-react'
import { Logo } from './Brand.jsx'
import { useLang } from '../i18n.jsx'
import { useAuth } from '../auth.jsx'

export const NAV = [
  { key: 'home', to: '/' },
  {
    key: 'about',
    children: [
      { key: 'news', to: '/news' },
      { key: 'centers', to: '/centers' },
      { key: 'leadership', to: '/leadership' },
      { key: 'contacts', to: '/contacts' },
    ],
  },
  { key: 'counselors', to: '/school-counselors' },
  {
    key: 'clubs',
    children: [
      { key: 'clubsCenters', to: '/clubs' },
      { key: 'clubsSpecial', to: '/clubs?tab=special' },
      { key: 'schedule', to: '/schedule' },
    ],
  },
  { key: 'council', to: '/student-council' },
  { key: 'portfolio', to: '/portfolio' },
]

function Flag({ code }) {
  if (code === 'uz')
    return (
      <svg viewBox="0 0 30 20" className="h-3.5 w-5 rounded-[3px] shadow-sm" aria-hidden="true">
        <rect width="30" height="20" fill="#1eb53a" />
        <rect width="30" height="13.3" fill="#fff" />
        <rect width="30" height="6.67" fill="#0099b5" />
        <rect y="6.3" width="30" height=".7" fill="#ce1126" />
        <rect y="13" width="30" height=".7" fill="#ce1126" />
      </svg>
    )
  return (
    <svg viewBox="0 0 30 20" className="h-3.5 w-5 rounded-[3px] shadow-sm" aria-hidden="true">
      <rect width="30" height="20" fill="#d52b1e" />
      <rect width="30" height="13.3" fill="#0039a6" />
      <rect width="30" height="6.67" fill="#fff" />
    </svg>
  )
}

export function LangSwitch({ full = false }) {
  const { lang, setLang } = useLang()
  const opts = [
    { code: 'uz', label: 'O‘zbekcha', short: 'O‘z' },
    { code: 'ru', label: 'Русский', short: 'Рус' },
  ]
  return (
    <div className={`flex items-center gap-1 rounded-xl border border-lilac-200 bg-lilac-50 p-1 ${full ? 'w-full' : ''}`} role="group" aria-label="Til / Язык">
      {opts.map((o) => (
        <button
          key={o.code}
          type="button"
          onClick={() => setLang(o.code)}
          aria-pressed={lang === o.code}
          className={`flex items-center justify-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-bold whitespace-nowrap transition ${full ? 'flex-1' : ''} ${
            lang === o.code ? 'bg-white text-brand shadow-sm' : 'text-muted hover:text-brand'
          }`}
        >
          <Flag code={o.code} />
          {full ? o.label : o.short}
        </button>
      ))}
    </div>
  )
}

function LangMenu() {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    if (!open) return
    const onDoc = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])
  const opts = [
    ['uz', 'O‘zbekcha', 'O‘z'],
    ['ru', 'Русский', 'Рус'],
  ]
  const cur = opts.find((o) => o[0] === lang)
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Til / Язык"
        className="flex h-11 items-center gap-1.5 rounded-xl border border-lilac-200 px-3 text-sm font-bold whitespace-nowrap text-brand transition hover:bg-lilac-50"
      >
        <Flag code={lang} /> {cur[2]}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full right-0 z-50 mt-2 w-44 rounded-2xl border border-lilac-100 bg-white p-1.5 shadow-xl shadow-brand/10">
          {opts.map(([code, label]) => (
            <button
              key={code}
              type="button"
              onClick={() => {
                setLang(code)
                setOpen(false)
              }}
              className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${lang === code ? 'bg-lilac-100 text-brand' : 'hover:bg-lilac-50'}`}
            >
              <Flag code={code} /> {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Dropdown({ item, active }) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const loc = useLocation()
  useEffect(() => setOpen(false), [loc.pathname, loc.search])
  useEffect(() => {
    if (!open) return
    const onDoc = (e) => ref.current && !ref.current.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])
  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={`flex items-center gap-1 rounded-lg px-2.5 py-2 text-[15px] font-semibold whitespace-nowrap transition hover:text-violet 2xl:px-3 ${active ? 'text-brand' : 'text-ink/80'}`}
      >
        {t(item.key)}
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`absolute top-full left-0 z-50 pt-2 transition ${open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'}`}>
        <div className="min-w-[260px] rounded-2xl border border-lilac-100 bg-white p-2 shadow-xl shadow-brand/10">
          {item.children.map((c) => (
            <Link key={c.key} to={c.to} className="block rounded-xl px-3.5 py-2.5 text-[15px] font-semibold whitespace-nowrap text-ink/80 transition hover:bg-lilac-50 hover:text-brand">
              {t(c.key)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function isActive(item, loc) {
  if (item.to === '/') return loc.pathname === '/'
  if (item.to) return loc.pathname.startsWith(item.to.split('?')[0])
  return item.children.some((c) => loc.pathname.startsWith(c.to.split('?')[0]))
}

export default function Header() {
  const { t, tr } = useLang()
  const { user, profile } = useAuth()
  const initials = (profile?.full_name || user?.email || '?')
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  const loc = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [drawer, setDrawer] = useState(false)
  const [openSub, setOpenSub] = useState(null)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => setDrawer(false), [loc.pathname, loc.search])
  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setDrawer(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [drawer])

  return (
    <>
    <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur transition-shadow ${scrolled ? 'shadow-[0_4px_20px_rgba(58,27,120,0.08)]' : ''}`}>
      <div className="container-x flex h-[72px] items-center justify-between gap-4 lg:h-20">
        <Logo />

        <nav className="hidden items-center xl:flex" aria-label={t('menu')}>
          {NAV.map((item) =>
            item.children ? (
              <Dropdown key={item.key} item={item} active={isActive(item, loc)} />
            ) : (
              <NavLink
                key={item.key}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive: a }) =>
                  `relative rounded-lg px-2.5 py-2 text-[15px] font-semibold whitespace-nowrap transition hover:text-violet 2xl:px-3 ${
                    a ? 'text-brand after:absolute after:inset-x-2.5 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-violet' : 'text-ink/80'
                  }`
                }
              >
                {t(item.key)}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LangMenu />
          </div>
          {user ? (
            <Link
              to="/cabinet"
              className="hidden h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-violet text-sm font-extrabold text-white transition hover:opacity-90 sm:flex"
              aria-label={tr('Shaxsiy kabinet', 'Личный кабинет')}
              title={tr('Shaxsiy kabinet', 'Личный кабинет')}
            >
              {initials}
            </Link>
          ) : (
            <Link
              to="/login"
              className="hidden h-11 w-11 items-center justify-center rounded-xl border border-lilac-200 text-brand transition hover:bg-brand hover:text-white sm:flex"
              aria-label={t('login')}
              title={t('login')}
            >
              <LogIn className="h-5 w-5" />
            </Link>
          )}
          <button
            type="button"
            onClick={() => setDrawer(true)}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-lilac-50 text-brand transition hover:bg-lilac-100 xl:hidden"
            aria-label={t('menu')}
            aria-expanded={drawer}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>

      {/* Mobil menyu (header'dan tashqarida: backdrop-blur fixed joylashuvni buzmasligi uchun) */}
      <div className={`fixed inset-0 z-50 xl:hidden ${drawer ? 'visible' : 'invisible'}`} aria-hidden={!drawer}>
        <div className={`absolute inset-0 bg-brand-900/40 backdrop-blur-sm transition-opacity ${drawer ? 'opacity-100' : 'opacity-0'}`} onClick={() => setDrawer(false)} />
        <aside
          className={`absolute top-0 left-0 flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-white p-5 shadow-2xl transition-transform duration-300 ${drawer ? 'translate-x-0' : '-translate-x-full'}`}
          role="dialog"
          aria-modal="true"
          aria-label={t('menu')}
        >
          <div className="flex items-start justify-between gap-3">
            <Logo />
            <button type="button" onClick={() => setDrawer(false)} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lilac-50 text-brand" aria-label={tr('Yopish', 'Закрыть')}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <Link to={user ? '/cabinet' : '/login'} className="btn-primary mt-6 w-full">
            <UserRound className="h-4 w-4" /> {user ? tr('Shaxsiy kabinet', 'Личный кабинет') : t('login')}
          </Link>
          <div className="mt-3">
            <LangSwitch full />
          </div>
          <p className="mt-6 mb-2 font-lato text-lg font-bold text-ink">{t('menu')}</p>
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.key} className="border-b border-lilac-100 last:border-0">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpenSub(openSub === item.key ? null : item.key)}
                      aria-expanded={openSub === item.key}
                      className="flex w-full items-center justify-between py-3.5 text-left text-base font-semibold text-ink/85"
                    >
                      {t(item.key)}
                      <ChevronDown className={`h-5 w-5 text-muted transition-transform ${openSub === item.key ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`grid transition-all duration-300 ${openSub === item.key ? 'grid-rows-[1fr] pb-2' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        {item.children.map((c) => (
                          <Link key={c.key} to={c.to} className="block rounded-lg py-2.5 pl-4 text-[15px] text-muted hover:bg-lilac-50 hover:text-brand">
                            {t(c.key)}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <NavLink to={item.to} end={item.to === '/'} className={({ isActive: a }) => `block py-3.5 text-base font-semibold ${a ? 'text-brand' : 'text-ink/85'}`}>
                    {t(item.key)}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  )
}
