import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Home, SearchX, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { useAuth } from '../auth.jsx'
import { supabase } from '../lib/supabase.js'

export function usePageTitle(title) {
  const { t } = useLang()
  useEffect(() => {
    document.title = title ? `${title} — ${t('brandName')}` : `${t('brandName')} — ${t('brandTop')}`
  }, [title, t])
}

const squares = [
  'top-6 right-[30%] h-4 w-4 bg-sky',
  'top-14 right-[27%] h-3 w-3 bg-sun',
  'bottom-8 right-[33%] h-3.5 w-3.5 bg-orange',
  'top-4 right-[22%] h-2.5 w-2.5 bg-violet',
  'bottom-5 right-[24%] h-2.5 w-2.5 bg-sky',
]

// Ichki sahifalar uchun binafsha banner. `icon` — sahifa mavzusiga mos ikonka.
export function PageBanner({ title, icon: Icon, crumbs = [], photo = '/images/girl.webp' }) {
  const { t } = useLang()
  usePageTitle(title)
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(161,139,239,0.45),transparent_45%)]" />
      {squares.map((c, i) => (
        <span key={i} className={`absolute hidden rotate-12 rounded-[3px] md:block ${c}`} />
      ))}
      <div className="relative container-x flex min-h-[150px] items-center justify-between gap-6 py-8 md:min-h-[190px]">
        <div className="min-w-0">
          <nav aria-label={t('breadcrumb')} className="flex flex-wrap items-center gap-1.5 text-sm text-white/80">
            <Link to="/" className="flex items-center gap-1 transition hover:text-white" aria-label={t('home')}>
              <Home className="h-4 w-4 text-sky-300" />
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 opacity-60" />
                {c.to ? (
                  <Link to={c.to} className="hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
              </span>
            ))}
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            <span className="font-semibold text-white">{title}</span>
          </nav>
          <h1 className="mt-3 font-lato text-3xl font-bold break-words sm:text-4xl md:text-[44px] md:leading-tight">{title}</h1>
        </div>
        <div className="relative hidden h-[170px] w-[300px] shrink-0 md:block">
          <img src={photo} alt="" className="absolute right-0 bottom-[-32px] h-[200px] w-auto object-contain object-bottom drop-shadow-xl" />
          {Icon && (
            <div className="absolute top-1/2 left-2 flex h-24 w-24 -translate-y-1/2 items-center justify-center rounded-full border-[6px] border-white bg-sky shadow-lg">
              <Icon className="h-10 w-10 text-white" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export function SectionHeader({ title, to, eyebrow, children }) {
  const { t } = useLang()
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && <span className="mb-2 inline-block rounded-full bg-lilac-100 px-3 py-1 text-xs font-bold tracking-wider text-brand-700 uppercase">{eyebrow}</span>}
        <h2 className="font-lato text-2xl font-bold text-ink sm:text-3xl">{title}</h2>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        {children}
        {to && (
          <Link to={to} className="btn-soft !px-3.5 !py-2" aria-label={`${title}: ${t('more')}`}>
            <span className="hidden sm:inline">{t('more')}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  )
}

// Gorizontal karusel: strelkalar, sichqoncha/barmoq bilan surish, chekkada xiralashish
export function Carousel({ children, label }) {
  const { t } = useLang()
  const ref = useRef(null)
  const [edge, setEdge] = useState({ start: true, end: false })
  const update = () => {
    const el = ref.current
    if (!el) return
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 })
  }
  useEffect(() => {
    update()
    const el = ref.current
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const go = (dir) => {
    const el = ref.current
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' })
  }
  const btn =
    'absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand shadow-lg shadow-brand/15 ring-1 ring-lilac-100 transition hover:bg-brand hover:text-white disabled:pointer-events-none disabled:opacity-0 sm:flex'
  return (
    <div className="relative" role="region" aria-label={label}>
      <button type="button" className={`${btn} -left-3`} onClick={() => go(-1)} disabled={edge.start} aria-label={t('prev')}>
        <ChevronLeft className="h-5 w-5" />
      </button>
      <div
        ref={ref}
        onScroll={update}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-3 sm:-mx-1 sm:scroll-px-1 sm:px-1"
      >
        {children}
      </div>
      <button type="button" className={`${btn} -right-3`} onClick={() => go(1)} disabled={edge.end} aria-label={t('next')}>
        <ChevronRight className="h-5 w-5" />
      </button>
      <div className={`pointer-events-none absolute top-0 right-0 bottom-3 hidden w-16 bg-gradient-to-l from-page to-transparent transition-opacity sm:block ${edge.end ? 'opacity-0' : 'opacity-100'}`} />
    </div>
  )
}

export function Empty() {
  const { t } = useLang()
  return (
    <div className="card flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lilac-100 text-brand">
        <SearchX className="h-8 w-8" />
      </div>
      <p className="mt-4 font-lato text-lg font-bold">{t('nothing')}</p>
      <p className="mt-1 text-sm text-muted">{t('nothingHint')}</p>
    </div>
  )
}

export function Pagination({ page, pages, onChange }) {
  const { t } = useLang()
  if (pages <= 1) return null
  return (
    <nav className="mt-8 flex items-center justify-center gap-1.5" aria-label={t('pages')}>
      <button type="button" className="btn-soft !px-3" disabled={page === 1} onClick={() => onChange(page - 1)} aria-label={t('prev')}>
        <ChevronLeft className="h-4 w-4" />
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
          className={`h-10 min-w-10 rounded-xl px-3 text-sm font-bold transition ${p === page ? 'bg-brand text-white' : 'bg-white text-brand hover:bg-lilac-100'}`}
        >
          {p}
        </button>
      ))}
      <button type="button" className="btn-soft !px-3" disabled={page === pages} onClick={() => onChange(page + 1)} aria-label={t('next')}>
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}

export function Modal({ open, onClose, title, children }) {
  const { tr } = useLang()
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 bg-brand-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fade-up relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="font-lato text-xl font-bold">{title}</h3>
          <button type="button" onClick={onClose} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lilac-50 text-brand" aria-label={tr('Yopish', 'Закрыть')}>
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

// To'garakka ariza formasi — Supabase'dagi `applications` jadvaliga yoziladi
export function ApplyModal({ club, onClose }) {
  const { t, tr, L } = useLang()
  const auth = useAuth()
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const p = auth.profile
  const prefill = p && p.role === 'student'
  const [f, setF] = useState({ student_name: '', grade: '', phone: '', school: '' })
  useEffect(() => {
    setSent(false)
    setErr('')
    setF({
      student_name: prefill ? p.full_name || '' : '',
      grade: prefill ? p.grade || '' : '',
      phone: p?.phone || '',
      school: prefill ? p.school || '' : '',
    })
  }, [club, prefill, p])
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    if (!supabase) return setErr(tr('Ariza qabul qilish tizimi hali sozlanmagan. Telefon orqali bog‘laning.', 'Приём заявок ещё не настроен. Свяжитесь по телефону.'))
    setBusy(true)
    const { error } = await supabase.from('applications').insert({
      user_id: auth.user?.id ?? null,
      club_id: club.id,
      club_name: L(club.name),
      org: L(club.org),
      student_name: f.student_name.trim(),
      grade: f.grade,
      phone: f.phone.trim(),
      school: f.school.trim(),
    })
    setBusy(false)
    if (error) setErr(tr('Arizani yuborib bo‘lmadi. Qayta urinib ko‘ring.', 'Не удалось отправить заявку. Попробуйте ещё раз.'))
    else setSent(true)
  }
  return (
    <Modal open={!!club} onClose={onClose} title={`${t('apply')}: ${club ? L(club.name) : ''}`}>
      {sent ? (
        <div className="py-6 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
          <p className="mt-3 font-lato text-lg font-bold">{tr('Arizangiz qabul qilindi!', 'Заявка принята!')}</p>
          <p className="mt-1 text-sm text-muted">{tr('Tez orada to‘garak rahbari siz bilan bog‘lanadi.', 'Руководитель кружка скоро свяжется с вами.')}</p>
          {auth.user ? (
            <Link to="/cabinet?tab=applications" className="btn-primary mt-6" onClick={onClose}>
              {tr('Arizalarimni ko‘rish', 'Мои заявки')}
            </Link>
          ) : (
            <p className="mt-4 text-xs text-muted">
              {tr('Ariza holatini kuzatish uchun', 'Чтобы следить за статусом заявки,')}{' '}
              <Link to="/register" className="font-bold text-brand underline" onClick={onClose}>
                {tr('ro‘yxatdan o‘ting', 'зарегистрируйтесь')}
              </Link>
              .
            </p>
          )}
          <button type="button" className="btn-soft mt-3" onClick={onClose}>
            {tr('Yopish', 'Закрыть')}
          </button>
        </div>
      ) : (
        <form className="space-y-3" onSubmit={submit}>
          <p className="rounded-xl bg-lilac-50 px-3.5 py-2.5 text-sm text-brand">{club && L(club.org)}</p>
          <label className="block text-sm font-semibold">
            {tr('O‘quvchining F.I.Sh.', 'Ф.И.О. учащегося')}
            <input required minLength={2} maxLength={120} value={f.student_name} onChange={set('student_name')} className="input mt-1" placeholder={tr('Ism Familiya', 'Имя Фамилия')} />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm font-semibold">
              {tr('Sinfi', 'Класс')}
              <select required className="input mt-1" value={f.grade} onChange={set('grade')}>
                <option value="" disabled>
                  {tr('Tanlang', 'Выберите')}
                </option>
                {Array.from({ length: 11 }, (_, i) => (
                  <option key={i} value={String(i + 1)}>
                    {i + 1}-{tr('sinf', 'класс')}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-semibold">
              {t('phone')}
              <input required type="tel" inputMode="tel" pattern="[0-9+()\s-]{9,30}" value={f.phone} onChange={set('phone')} className="input mt-1" placeholder="+998 __ ___ __ __" />
            </label>
          </div>
          <label className="block text-sm font-semibold">
            {tr('Maktabi', 'Школа')}
            <input className="input mt-1" value={f.school} onChange={set('school')} placeholder={tr('Masalan: 12-son maktab', 'Например: школа №12')} />
          </label>
          {err && (
            <p role="alert" className="flex gap-2 rounded-xl bg-red-500/10 p-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {err}
            </p>
          )}
          <button type="submit" disabled={busy} className="btn-primary w-full !py-3">
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} {tr('Yuborish', 'Отправить')}
          </button>
          {!auth.user && (
            <p className="text-center text-xs text-muted">
              <Link to="/login" className="font-bold text-brand underline" onClick={onClose}>
                {t('login')}
              </Link>{' '}
              — {tr('ma’lumotlaringiz avtomatik to‘ldiriladi', 'данные заполнятся автоматически')}
            </p>
          )}
        </form>
      )}
    </Modal>
  )
}
