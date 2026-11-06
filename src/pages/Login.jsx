import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Info, LogIn } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { usePageTitle } from '../components/UI.jsx'

export default function Login() {
  const { t } = useLang()
  usePageTitle(t('login'))
  const [show, setShow] = useState(false)
  const [msg, setMsg] = useState(false)
  return (
    <div className="container-x grid min-h-[70vh] items-center gap-10 py-10 lg:grid-cols-2">
      <div className="relative hidden overflow-hidden rounded-3xl bg-brand p-10 text-white lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(161,139,239,.5),transparent_55%)]" />
        <img src="/images/logo-white.webp" alt="" className="relative w-44" />
        <p className="relative mt-8 max-w-sm font-lato text-3xl leading-tight font-bold">Tashabbus, bilim va liderlik maydoniga xush kelibsiz!</p>
        <img src="/images/hero.webp" alt="" className="relative mt-8 w-full max-w-md" />
      </div>
      <form
        className="card mx-auto w-full max-w-md p-6 sm:p-8"
        onSubmit={(e) => {
          e.preventDefault()
          setMsg(true)
        }}
      >
        <h1 className="font-lato text-2xl font-bold">{t('login')}</h1>
        <p className="mt-1 text-sm text-muted">Kengash a’zolari, maslahatchilar va administratorlar uchun</p>
        <label className="mt-6 block text-sm font-semibold">
          Login
          <input required autoComplete="username" className="input mt-1" placeholder="Login yoki telefon raqam" />
        </label>
        <label className="mt-4 block text-sm font-semibold">
          Parol
          <span className="relative mt-1 block">
            <input required type={show ? 'text' : 'password'} autoComplete="current-password" className="input !pr-11" placeholder="••••••••" />
            <button type="button" onClick={() => setShow((v) => !v)} className="absolute top-1/2 right-3 -translate-y-1/2 text-muted hover:text-brand" aria-label={show ? 'Parolni yashirish' : 'Parolni ko‘rsatish'}>
              {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </span>
        </label>
        {msg && (
          <p className="mt-4 flex gap-2 rounded-xl bg-lilac-50 p-3 text-sm text-brand" role="status">
            <Info className="mt-0.5 h-4 w-4 shrink-0" /> Shaxsiy kabinet tez orada ishga tushadi. Hozircha bu sahifa namuna.
          </p>
        )}
        <button type="submit" className="btn-primary mt-6 w-full !py-3">
          <LogIn className="h-4 w-4" /> {t('login')}
        </button>
        <Link to="/" className="mt-3 block text-center text-sm font-semibold text-muted hover:text-brand">
          {t('toHome')}
        </Link>
      </form>
    </div>
  )
}
