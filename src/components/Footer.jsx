import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import { SocialIcon } from './Brand.jsx'
import { useLang } from '../i18n.jsx'
import { SITE } from '../data/site.js'

const links = [
  ['home', '/'],
  ['clubs', '/clubs'],
  ['schedule', '/schedule'],
  ['news', '/news'],
  ['centers', '/centers'],
  ['council', '/student-council'],
  ['counselors', '/school-counselors'],
  ['portfolio', '/portfolio'],
  ['leadership', '/leadership'],
  ['contacts', '/contacts'],
]

function Skyline() {
  // Sharqona me'morchilik siluetlari (gumbaz, minora, ravoq) — dekor
  return (
    <svg viewBox="0 0 1440 220" preserveAspectRatio="xMidYMax slice" className="pointer-events-none absolute inset-x-0 bottom-0 h-[220px] w-full text-white/[0.06]" aria-hidden="true">
      <g fill="currentColor">
        <rect x="0" y="180" width="1440" height="40" />
        <path d="M60 180V120h18v-8a12 12 0 0 1 24 0v8h18v60Z" />
        <rect x="150" y="60" width="16" height="120" />
        <path d="M146 60h24l-12-22Z" />
        <path d="M190 180v-70a50 50 0 0 1 100 0v70Z" />
        <circle cx="240" cy="54" r="6" />
        <rect x="236" y="56" width="8" height="10" />
        <path d="M310 180v-50h120v50Z" />
        <path d="M330 130a40 30 0 0 1 80 0Z" />
        <rect x="450" y="40" width="18" height="140" />
        <path d="M446 40h26l-13-26Z" />
        <path d="M500 180v-90h160v90Z" />
        <path d="M530 90a50 50 0 0 1 100 0Z" />
        <rect x="690" y="100" width="70" height="80" />
        <path d="M690 100a35 35 0 0 1 70 0Z" />
        <rect x="790" y="20" width="20" height="160" />
        <path d="M786 20h28l-14-24Z" />
        <path d="M840 180v-60h200v60Z" />
        <path d="M870 120a70 55 0 0 1 140 0Z" />
        <circle cx="940" cy="58" r="7" />
        <rect x="1070" y="70" width="16" height="110" />
        <path d="M1066 70h24l-12-22Z" />
        <path d="M1110 180v-80a45 45 0 0 1 90 0v80Z" />
        <path d="M1220 180v-40h100v40Z" />
        <path d="M1240 140a30 26 0 0 1 60 0Z" />
        <rect x="1350" y="50" width="18" height="130" />
        <path d="M1346 50h26l-13-24Z" />
        <path d="M1390 180v-60h50v60Z" />
      </g>
    </svg>
  )
}

export default function Footer() {
  const { t, L, tr } = useLang()
  const year = new Date().getFullYear()
  return (
    <footer className="relative mt-20 overflow-hidden bg-brand text-white">
      <Skyline />
      <div className="relative container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.1fr_1.3fr_1.2fr]">
        <div>
          <Link to="/" aria-label={t('brandName')}>
            <img src="/images/logo-white.webp" alt={`${t('brandTop')} ${t('brandName')}`} width="674" height="454" className="h-auto w-48" />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
            {tr('“Tengdosh-tengdoshga” tamoyili asosida o‘quvchilarni qo‘shimcha ta’limga jalb etuvchi tizim.', 'Система вовлечения учащихся в дополнительное образование по принципу «равный — равному».')}
          </p>
        </div>

        <div>
          <h3 className="font-lato text-lg font-bold text-sun">{t('sections')}</h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {links.map(([k, to]) => (
              <li key={k}>
                <Link to={to} className="text-sm text-white/85 transition hover:text-white hover:underline">
                  {t(k)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-lato text-lg font-bold text-sun">{t('contact')}</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={SITE.phoneHref} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 transition hover:bg-white/20">
                <Phone className="h-4 w-4 shrink-0" /> {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2 break-all transition hover:bg-white/20">
                <Mail className="h-4 w-4 shrink-0" /> {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-2 rounded-xl bg-white/10 px-3.5 py-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {L(SITE.address)}
            </li>
            <li className="flex items-center gap-2 px-1 text-white/70">
              <Clock className="h-4 w-4" /> {tr('Du–Sh', 'Пн–Сб')}: {SITE.workHours}
            </li>
          </ul>
          <div className="mt-5 flex gap-2">
            {Object.entries(SITE.socials).map(([name, href]) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 transition hover:bg-white hover:text-brand"
              >
                <SocialIcon name={name} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-sm text-white/70 sm:flex-row">
          <p>
            © {year} {tr('Andijon viloyati O‘quvchilar kengashi', 'Совет учащихся Андижанской области')}. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
