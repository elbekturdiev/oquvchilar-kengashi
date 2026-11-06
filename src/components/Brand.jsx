import { Link } from 'react-router-dom'
import { useLang } from '../i18n.jsx'

export function Logo({ white = false, className = '' }) {
  const { t } = useLang()
  return (
    <Link to="/" className={`group flex shrink-0 items-center gap-2.5 ${className}`} aria-label={`${t('brandTop')} ${t('brandName')}`}>
      <img
        src="/images/logo-icon.webp"
        alt=""
        width="48"
        height="45"
        className={`h-10 w-auto transition-transform duration-500 group-hover:rotate-[30deg] sm:h-11 ${white ? 'brightness-0 invert' : ''}`}
      />
      <span className="flex flex-col leading-none">
        <span className={`font-brand text-[10px] font-extrabold tracking-[0.12em] uppercase sm:text-[11px] ${white ? 'text-lilac' : 'text-brand-700'}`}>
          {t('brandTop')}
        </span>
        <span className={`mt-1 font-brand text-[15px] font-extrabold tracking-wide uppercase sm:text-[17px] ${white ? 'text-white' : 'text-brand'}`}>
          {t('brandName')}
        </span>
      </span>
    </Link>
  )
}

const paths = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  telegram: <path d="M21.5 4.5 2.8 11.7c-.9.4-.9 1.5.1 1.8l4.6 1.4 1.8 5.5c.2.7 1.1.9 1.6.4l2.6-2.4 4.8 3.5c.6.4 1.4.1 1.6-.6l3.2-15.4c.2-.9-.7-1.7-1.6-1.4ZM9.6 14.6l8.2-6.9" />,
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10 9.2 5 2.8-5 2.8Z" fill="currentColor" />
    </>
  ),
  facebook: <path d="M14.5 8.5H16V5.6c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.4-3.7 3.9v2.1H7.7v3.2h2.4V21h3V14.7h2.4l.4-3.2h-2.8V9.7c0-.9.3-1.2 1.4-1.2Z" />,
}

export function SocialIcon({ name, className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

// Rangli ikonka (statistika kartalari uchun) — asl saytdagi duotone uslubida
export function StatIcon({ name, className = 'h-12 w-12' }) {
  const common = { viewBox: '0 0 48 48', className, 'aria-hidden': true }
  if (name === 'building')
    return (
      <svg {...common}>
        <rect x="7" y="10" width="34" height="32" rx="3" fill="#a18bef" />
        <rect x="14" y="4" width="20" height="38" rx="3" fill="#6d4fd8" />
        <circle cx="24" cy="13" r="4.5" fill="#fff" />
        <circle cx="24" cy="13" r="2" fill="#6d4fd8" />
        <rect x="18" y="22" width="12" height="2.6" rx="1.3" fill="#fff" />
        <rect x="18" y="28" width="12" height="2.6" rx="1.3" fill="#fff" />
        <rect x="21.5" y="34" width="5" height="8" rx="1" fill="#fff" />
        <rect x="9.5" y="16" width="3" height="2" rx="1" fill="#fff" opacity=".8" />
        <rect x="9.5" y="22" width="3" height="2" rx="1" fill="#fff" opacity=".8" />
        <rect x="35.5" y="16" width="3" height="2" rx="1" fill="#fff" opacity=".8" />
        <rect x="35.5" y="22" width="3" height="2" rx="1" fill="#fff" opacity=".8" />
        <rect x="4" y="41" width="40" height="3" rx="1.5" fill="#3a1b78" />
      </svg>
    )
  if (name === 'cap')
    return (
      <svg {...common}>
        <path d="M11 22v10c0 4 6 8 13 8s13-4 13-8V22Z" fill="#cfc3ff" />
        <path d="M24 8 3 18l21 10 21-10Z" fill="#a18bef" />
        <path d="M24 8 3 18l21 10 21-10Z" fill="url(#g)" opacity=".5" />
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0" stopColor="#fff" stopOpacity=".6" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    )
  if (name === 'bag')
    return (
      <svg {...common}>
        <path d="M18 12a6 6 0 0 1 12 0" fill="none" stroke="#f59e0b" strokeWidth="3.5" />
        <rect x="6" y="12" width="36" height="30" rx="9" fill="#fbb81c" />
        <rect x="6" y="28" width="36" height="14" rx="7" fill="#fde2a6" />
        <rect x="18" y="25" width="12" height="4" rx="2" fill="#fff" />
      </svg>
    )
  return (
    <svg {...common}>
      <circle cx="14" cy="17" r="5.5" fill="#cfc3ff" />
      <circle cx="34" cy="17" r="5.5" fill="#cfc3ff" />
      <ellipse cx="14" cy="34" rx="10" ry="6" fill="#cfc3ff" />
      <ellipse cx="34" cy="34" rx="10" ry="6" fill="#cfc3ff" />
      <circle cx="24" cy="14" r="7" fill="#5b33c9" />
      <ellipse cx="24" cy="34" rx="12" ry="7.5" fill="#3a1b78" />
    </svg>
  )
}
