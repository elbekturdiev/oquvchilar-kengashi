import { Link } from 'react-router-dom'
import { CalendarDays, ChevronRight, Eye, MapPin, Phone, Clock } from 'lucide-react'
import Cover from './Cover.jsx'
import { useLang } from '../i18n.jsx'
import { NEWS_CATEGORIES, formatDate } from '../data/news.js'
import { directionById } from '../data/directions.js'
import { districtById, mapLink } from '../data/site.js'
import { formatSum } from '../data/clubs.js'

export function NewsCard({ item, className = '' }) {
  const { t, L } = useLang()
  const cat = NEWS_CATEGORIES[item.category]
  const CatIcon = cat.icon
  return (
    <article className={`group card flex flex-col p-3 transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(58,27,120,0.12)] ${className}`}>
      <Link to={`/news/${item.id}`} className="block" tabIndex={-1} aria-hidden="true">
        <Cover image={item.image} tone={cat.tone} icon={cat.icon} alt={item.title} className="aspect-[16/9] rounded-xl">
          <span
            className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-white shadow"
            style={{ background: cat.color }}
          >
            <CatIcon className="h-3.5 w-3.5" /> {L(cat)}
          </span>
        </Cover>
      </Link>
      <div className="flex flex-1 flex-col px-1.5 pt-3 pb-1">
        <div className="flex items-center justify-between text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5 text-violet" />
            <time dateTime={item.date}>{formatDate(item.date)}</time>
          </span>
          <span className="inline-flex items-center gap-1" title={t('views')}>
            <Eye className="h-3.5 w-3.5 text-violet" /> {item.views}
          </span>
        </div>
        <h3 className="mt-2 line-clamp-2 font-lato text-[17px] leading-snug font-bold text-ink">
          <Link to={`/news/${item.id}`} className="transition hover:text-brand-700">
            {item.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{item.excerpt}</p>
        <Link to={`/news/${item.id}`} className="btn-soft mt-4 w-full sm:mt-auto sm:translate-y-0">
          {t('readMore')} <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}

export function ClubCard({ club, className = '' }) {
  const { t, L } = useLang()
  const dir = directionById(club.direction)
  return (
    <article className={`group card flex flex-col p-3 transition hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(58,27,120,0.12)] ${className}`}>
      <Cover image={club.image} tone={dir.tone} icon={dir.icon} alt={club.name} className="aspect-[4/3] rounded-xl">
        <span className="absolute bottom-2.5 left-2.5 max-w-[85%] truncate rounded-lg bg-white/95 px-2 py-1 text-xs font-bold text-brand shadow">{L(dir)}</span>
      </Cover>
      <div className="flex flex-1 flex-col px-1 pt-3">
        <p className="text-sm font-bold text-violet">
          {formatSum(club.price)} {t('sum')}
          <span className="font-semibold text-muted"> / oy</span>
        </p>
        <h3 className="mt-1 line-clamp-1 font-lato text-lg font-bold">{club.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs font-semibold text-ink/70" title={club.org}>
          {club.org}
        </p>
        <p className="mt-2 line-clamp-2 text-xs text-muted">
          <span className="text-ink/50">{t('address')}:</span> {club.address}
        </p>
        <Link to={`/clubs/${club.id}`} className="btn-soft mt-4 w-full sm:mt-auto">
          {t('moreInfo')} <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}

// Ro'yxat ko'rinishidagi to'garak kartasi
export function ClubRow({ club, onApply, onSelect, selected }) {
  const { t, L } = useLang()
  const dir = directionById(club.direction)
  const dist = districtById(club.district)
  return (
    <article
      className={`group card flex flex-col gap-4 p-3 transition sm:flex-row ${selected ? 'ring-2 ring-violet' : 'hover:shadow-[0_12px_30px_rgba(58,27,120,0.10)]'}`}
    >
      <Cover image={club.image} tone={dir.tone} icon={dir.icon} iconSize="h-12 w-12" alt={club.name} className="aspect-[16/10] shrink-0 rounded-xl sm:aspect-auto sm:h-auto sm:w-52" />
      <div className="flex min-w-0 flex-1 flex-col py-1 pr-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="font-lato text-xl font-bold">{club.name}</h3>
          <span className="max-w-full rounded-lg bg-lilac-50 px-2.5 py-1 text-xs font-bold text-brand">{L(dist)}</span>
        </div>
        <p className="mt-1 text-sm font-semibold text-ink/70">{club.org}</p>
        <ul className="mt-2 space-y-1.5 text-sm text-ink/80">
          <li className="flex items-start gap-1.5">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-violet" />
            <span>
              {club.address}{' '}
              <a href={mapLink(club.lat, club.lng)} target="_blank" rel="noreferrer" className="font-semibold text-brand-700 underline underline-offset-2 hover:text-violet">
                {t('onMap')}
              </a>
            </span>
          </li>
          <li className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <span className="inline-flex items-center gap-1.5">
              <Phone className="h-4 w-4 text-violet" />
              <a href={`tel:${club.phone.replace(/[^\d+]/g, '')}`} className="hover:text-brand">
                {club.phone}
              </a>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-violet" /> {club.days.join(', ')} · {club.time}
            </span>
          </li>
          <li className="text-muted">
            {t('direction')}: <span className="font-semibold text-ink/80">{L(dir)}</span>
          </li>
        </ul>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-lg font-extrabold text-violet">
            {formatSum(club.price)} {t('sum')}
          </p>
          <div className="flex flex-wrap gap-2">
            {onSelect && (
              <button type="button" className="btn-soft" onClick={() => onSelect(club)} aria-pressed={selected}>
                {t('schedule')}
              </button>
            )}
            {onApply && (
              <button type="button" className="btn-soft !bg-orange/15 !text-orange hover:!bg-orange hover:!text-white" onClick={() => onApply(club)}>
                {t('apply')}
              </button>
            )}
            <Link to={`/clubs/${club.id}`} className="btn-primary">
              {t('moreInfo')} <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
