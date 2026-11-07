import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn, UserPlus, Mail, AlertCircle, CheckCircle2, KeyRound, ArrowLeft, Loader2 } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { useAuth, authError } from '../auth.jsx'
import { usePageTitle } from '../components/UI.jsx'
import { DISTRICTS } from '../data/site.js'

export const ROLES = {
  student: { uz: 'O‘quvchi', ru: 'Учащийся' },
  parent: { uz: 'Ota-ona', ru: 'Родитель' },
  counselor: { uz: 'Maktab maslahatchisi', ru: 'Школьный консультант' },
  admin: { uz: 'Administrator', ru: 'Администратор' },
}

export function Alert({ type = 'error', children }) {
  const ok = type === 'success'
  const Icon = ok ? CheckCircle2 : AlertCircle
  return (
    <p role={ok ? 'status' : 'alert'} className={`flex gap-2 rounded-xl p-3 text-sm ${ok ? 'bg-emerald-500/10 text-emerald-800' : 'bg-red-500/10 text-red-700'}`}>
      <Icon className="mt-0.5 h-4 w-4 shrink-0" /> <span>{children}</span>
    </p>
  )
}

export function PasswordInput({ value, onChange, autoComplete, placeholder = '••••••••', minLength }) {
  const { tr } = useLang()
  const [show, setShow] = useState(false)
  return (
    <span className="relative mt-1 block">
      <input
        required
        type={show ? 'text' : 'password'}
        autoComplete={autoComplete}
        minLength={minLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="input !pr-11"
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted hover:text-brand"
        aria-label={show ? tr('Parolni yashirish', 'Скрыть пароль') : tr('Parolni ko‘rsatish', 'Показать пароль')}
      >
        {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </span>
  )
}

const strong = (p) => p.length >= 8 && /[a-zA-Zа-яА-Я]/.test(p) && /\d/.test(p)

function Side() {
  const { tr } = useLang()
  return (
    <div className="relative hidden overflow-hidden rounded-3xl bg-brand p-10 text-white lg:block">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(161,139,239,.5),transparent_55%)]" />
      <img src="/images/logo-white.webp" alt="" className="relative w-44" />
      <p className="relative mt-8 max-w-sm font-lato text-3xl leading-tight font-bold">
        {tr('Tashabbus, bilim va liderlik maydoniga xush kelibsiz!', 'Добро пожаловать в пространство инициатив, знаний и лидерства!')}
      </p>
      <ul className="relative mt-6 space-y-2 text-sm text-white/80">
        <li>✓ {tr('To‘garaklarga onlayn ariza berish', 'Онлайн-заявки в кружки')}</li>
        <li>✓ {tr('Arizalaringiz holatini kuzatish', 'Отслеживание статуса заявок')}</li>
        <li>✓ {tr('Shaxsiy kabinet va profil', 'Личный кабинет и профиль')}</li>
      </ul>
      <img src="/images/hero-close.webp" alt="" className="relative mt-8 w-full max-w-md" />
    </div>
  )
}

export default function Login() {
  const { t, tr, L } = useLang()
  const auth = useAuth()
  const nav = useNavigate()
  const loc = useLocation()
  const initial = loc.pathname === '/register' ? 'register' : loc.pathname === '/forgot-password' ? 'forgot' : 'login'
  const [mode, setMode] = useState(initial)
  usePageTitle(mode === 'register' ? tr('Ro‘yxatdan o‘tish', 'Регистрация') : mode === 'forgot' ? tr('Parolni tiklash', 'Восстановление пароля') : t('login'))
  const [f, setF] = useState({ email: '', password: '', password2: '', full_name: '', role: 'student', phone: '', district: '', school: '', grade: '' })
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const [ok, setOk] = useState('')
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const back = loc.state?.from || '/cabinet'

  useEffect(() => setMode(initial), [initial])
  useEffect(() => {
    if (auth.user && mode !== 'forgot') nav(back, { replace: true })
  }, [auth.user, mode, nav, back])

  const go = (m) => {
    setErr('')
    setOk('')
    nav(m === 'register' ? '/register' : m === 'forgot' ? '/forgot-password' : '/login', { replace: true, state: loc.state })
  }

  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    setOk('')
    if (mode === 'register') {
      if (!strong(f.password)) return setErr(tr('Parol kamida 8 belgidan iborat bo‘lib, harf va raqam qatnashishi kerak.', 'Пароль: минимум 8 символов, буквы и цифры.'))
      if (f.password !== f.password2) return setErr(tr('Parollar bir xil emas.', 'Пароли не совпадают.'))
    }
    setBusy(true)
    try {
      if (mode === 'login') {
        const { error } = await auth.signIn(f.email.trim(), f.password)
        if (error) setErr(authError(error, tr))
      } else if (mode === 'register') {
        const { full_name, role, phone, district, school, grade } = f
        const { data, error } = await auth.signUp(f.email.trim(), f.password, { full_name: full_name.trim(), role, phone, district, school, grade })
        if (error) setErr(authError(error, tr))
        else if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0)
          setErr(tr('Bu e-mail bilan allaqachon ro‘yxatdan o‘tilgan.', 'Этот e-mail уже зарегистрирован.'))
        else if (!data?.session)
          setOk(tr(`Deyarli tayyor! ${f.email} manziliga tasdiqlash xati yubordik. Xatdagi havolani bosing, keyin tizimga kiring.`, `Почти готово! Мы отправили письмо на ${f.email}. Перейдите по ссылке, затем войдите.`))
      } else {
        const { error } = await auth.sendReset(f.email.trim())
        if (error) setErr(authError(error, tr))
        else setOk(tr('Agar bu e-mail ro‘yxatdan o‘tgan bo‘lsa, parolni tiklash havolasi yuborildi. Pochtangizni (va “Spam” papkasini) tekshiring.', 'Если этот e-mail зарегистрирован, мы отправили ссылку для сброса пароля. Проверьте почту (и папку «Спам»).'))
      }
    } finally {
      setBusy(false)
    }
  }

  const Btn = mode === 'register' ? UserPlus : mode === 'forgot' ? Mail : LogIn

  return (
    <div className="container-x grid min-h-[70vh] items-center gap-10 py-10 lg:grid-cols-2">
      <Side />
      <div className="card mx-auto w-full max-w-md p-6 sm:p-8">
        {mode !== 'forgot' ? (
          <div className="grid grid-cols-2 gap-1 rounded-2xl bg-lilac-50 p-1" role="tablist">
            {[
              ['login', t('login')],
              ['register', tr('Ro‘yxatdan o‘tish', 'Регистрация')],
            ].map(([m, label]) => (
              <button key={m} type="button" role="tab" aria-selected={mode === m} onClick={() => go(m)} className={`rounded-xl py-2.5 text-sm font-bold transition ${mode === m ? 'bg-white text-brand shadow-sm' : 'text-muted hover:text-brand'}`}>
                {label}
              </button>
            ))}
          </div>
        ) : (
          <button type="button" onClick={() => go('login')} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-violet">
            <ArrowLeft className="h-4 w-4" /> {t('login')}
          </button>
        )}

        <form className="mt-6 space-y-4" onSubmit={submit} noValidate={false}>
          <div>
            <h1 className="font-lato text-2xl font-bold">
              {mode === 'register' ? tr('Yangi hisob yaratish', 'Создать аккаунт') : mode === 'forgot' ? tr('Parolni tiklash', 'Восстановление пароля') : tr('Hisobingizga kiring', 'Войдите в аккаунт')}
            </h1>
            <p className="mt-1 text-sm text-muted">
              {mode === 'forgot'
                ? tr('E-mailingizni kiriting — parolni yangilash havolasini yuboramiz.', 'Введите e-mail — мы пришлём ссылку для смены пароля.')
                : tr('O‘quvchilar, ota-onalar va maktab maslahatchilari uchun', 'Для учащихся, родителей и школьных консультантов')}
            </p>
          </div>

          {!auth.isConfigured && <Alert>{authError({ message: 'not_configured' }, tr)}</Alert>}

          {mode === 'register' && (
            <>
              <label className="block text-sm font-semibold">
                {tr('F.I.Sh.', 'Ф.И.О.')}
                <input required minLength={3} autoComplete="name" value={f.full_name} onChange={set('full_name')} className="input mt-1" placeholder={tr('Ism Familiya', 'Имя Фамилия')} />
              </label>
              <label className="block text-sm font-semibold">
                {tr('Kim sifatida?', 'Кто вы?')}
                <select value={f.role} onChange={set('role')} className="input mt-1">
                  {['student', 'parent', 'counselor'].map((r) => (
                    <option key={r} value={r}>
                      {L(ROLES[r])}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}

          <label className="block text-sm font-semibold">
            E-mail
            <input required type="email" autoComplete="email" value={f.email} onChange={set('email')} className="input mt-1" placeholder="pochta@example.com" />
          </label>

          {mode !== 'forgot' && (
            <label className="block text-sm font-semibold">
              <span className="flex items-center justify-between">
                {tr('Parol', 'Пароль')}
                {mode === 'login' && (
                  <button type="button" onClick={() => go('forgot')} className="text-xs font-semibold text-brand-700 hover:text-violet">
                    {tr('Parolni unutdingizmi?', 'Забыли пароль?')}
                  </button>
                )}
              </span>
              <PasswordInput value={f.password} onChange={(v) => setF({ ...f, password: v })} autoComplete={mode === 'register' ? 'new-password' : 'current-password'} minLength={mode === 'register' ? 8 : undefined} />
              {mode === 'register' && <span className="mt-1 block text-xs font-normal text-muted">{tr('Kamida 8 belgi, harf va raqam.', 'Минимум 8 символов, буквы и цифры.')}</span>}
            </label>
          )}

          {mode === 'register' && (
            <>
              <label className="block text-sm font-semibold">
                {tr('Parolni takrorlang', 'Повторите пароль')}
                <PasswordInput value={f.password2} onChange={(v) => setF({ ...f, password2: v })} autoComplete="new-password" />
              </label>
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-sm font-semibold">
                  {t('phone')}
                  <input type="tel" inputMode="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} className="input mt-1" placeholder="+998 __ ___ __ __" />
                </label>
                <label className="block text-sm font-semibold">
                  {tr('Hudud', 'Район')}
                  <select value={f.district} onChange={set('district')} className="input mt-1">
                    <option value="">{t('chooseDistrict')}</option>
                    {DISTRICTS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {L(d)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {f.role !== 'parent' && (
                <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
                  <label className="block text-sm font-semibold">
                    {tr('Maktab', 'Школа')}
                    <input value={f.school} onChange={set('school')} className="input mt-1" placeholder={tr('Masalan: 12-son maktab', 'Например: школа №12')} />
                  </label>
                  {f.role === 'student' && (
                    <label className="block text-sm font-semibold">
                      {tr('Sinf', 'Класс')}
                      <select value={f.grade} onChange={set('grade')} className="input mt-1">
                        <option value="">—</option>
                        {Array.from({ length: 11 }, (_, i) => (
                          <option key={i} value={String(i + 1)}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                </div>
              )}
            </>
          )}

          {err && <Alert>{err}</Alert>}
          {ok && <Alert type="success">{ok}</Alert>}

          <button type="submit" disabled={busy || !auth.isConfigured} className="btn-primary w-full !py-3">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Btn className="h-4 w-4" />}
            {mode === 'register' ? tr('Ro‘yxatdan o‘tish', 'Зарегистрироваться') : mode === 'forgot' ? tr('Havola yuborish', 'Отправить ссылку') : t('login')}
          </button>
          <Link to="/" className="block text-center text-sm font-semibold text-muted hover:text-brand">
            {t('toHome')}
          </Link>
        </form>
      </div>
    </div>
  )
}

// Pochtadagi havola orqali kelganda yangi parol o'rnatish
export function ResetPassword() {
  const { tr } = useLang()
  const auth = useAuth()
  const nav = useNavigate()
  usePageTitle(tr('Yangi parol', 'Новый пароль'))
  const [p1, setP1] = useState('')
  const [p2, setP2] = useState('')
  const [err, setErr] = useState('')
  const [done, setDone] = useState(false)
  const [busy, setBusy] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    setErr('')
    if (!strong(p1)) return setErr(tr('Parol kamida 8 belgi, harf va raqamdan iborat bo‘lsin.', 'Пароль: минимум 8 символов, буквы и цифры.'))
    if (p1 !== p2) return setErr(tr('Parollar bir xil emas.', 'Пароли не совпадают.'))
    setBusy(true)
    const { error } = await auth.updatePassword(p1)
    setBusy(false)
    if (error) setErr(authError(error, tr))
    else {
      setDone(true)
      setTimeout(() => nav('/cabinet', { replace: true }), 1800)
    }
  }
  return (
    <div className="container-x flex min-h-[70vh] items-center justify-center py-10">
      <form className="card w-full max-w-md space-y-4 p-6 sm:p-8" onSubmit={submit}>
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lilac-100 text-brand">
          <KeyRound className="h-6 w-6" />
        </span>
        <h1 className="font-lato text-2xl font-bold">{tr('Yangi parol o‘rnatish', 'Установите новый пароль')}</h1>
        {auth.loading ? (
          <p className="text-sm text-muted">{tr('Tekshirilmoqda…', 'Проверяем…')}</p>
        ) : !auth.user ? (
          <>
            <Alert>{tr('Havola eskirgan yoki noto‘g‘ri. Parolni tiklashni qaytadan so‘rang.', 'Ссылка устарела или неверна. Запросите сброс пароля ещё раз.')}</Alert>
            <Link to="/forgot-password" className="btn-primary w-full">
              {tr('Qayta so‘rash', 'Запросить снова')}
            </Link>
          </>
        ) : done ? (
          <Alert type="success">{tr('Parol yangilandi! Kabinetga o‘tilmoqda…', 'Пароль обновлён! Переходим в кабинет…')}</Alert>
        ) : (
          <>
            <label className="block text-sm font-semibold">
              {tr('Yangi parol', 'Новый пароль')}
              <PasswordInput value={p1} onChange={setP1} autoComplete="new-password" minLength={8} />
            </label>
            <label className="block text-sm font-semibold">
              {tr('Parolni takrorlang', 'Повторите пароль')}
              <PasswordInput value={p2} onChange={setP2} autoComplete="new-password" />
            </label>
            {err && <Alert>{err}</Alert>}
            <button type="submit" disabled={busy} className="btn-primary w-full !py-3">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />} {tr('Saqlash', 'Сохранить')}
            </button>
          </>
        )}
      </form>
    </div>
  )
}
