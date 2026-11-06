import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Search, Newspaper, Filter, RotateCcw, CalendarDays, Eye, ArrowLeft, Share2 } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { PageBanner, Empty, Pagination } from '../components/UI.jsx'
import { NewsCard } from '../components/Cards.jsx'
import Cover from '../components/Cover.jsx'
import { NEWS, NEWS_CATEGORIES, newsById, formatDate } from '../data/news.js'
import NotFound from './NotFound.jsx'

const PER_PAGE = 6

export function NewsList() {
  const { t, L } = useLang()
  const [q, setQ] = useState('')
  const [draft, setDraft] = useState({ from: '', to: '', cat: 'all' })
  const [applied, setApplied] = useState(draft)
  const [page, setPage] = useState(1)

  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return NEWS.filter((n) => {
      if (s && !(n.title + ' ' + n.excerpt).toLowerCase().includes(s)) return false
      if (applied.cat !== 'all' && n.category !== applied.cat) return false
      if (applied.from && n.date < applied.from) return false
      if (applied.to && n.date > applied.to) return false
      return true
    })
  }, [q, applied])
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE))
  const cur = Math.min(page, pages)
  const shown = list.slice((cur - 1) * PER_PAGE, cur * PER_PAGE)

  return (
    <>
      <PageBanner title={t('news')} icon={Newspaper} crumbs={[{ label: t('about') }]} />
      <div className="container-x mt-8 grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0">
          <label className="relative block">
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
              className="input !rounded-2xl !py-3.5 !pl-12 shadow-[0_2px_14px_rgba(58,27,120,0.05)]"
            />
          </label>
          <div className="mt-5">
            {shown.length ? (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {shown.map((n) => (
                  <NewsCard key={n.id} item={n} />
                ))}
              </div>
            ) : (
              <Empty />
            )}
          </div>
          <Pagination page={cur} pages={pages} onChange={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
        </div>

        <aside className="order-first min-w-0 lg:order-none">
          <form
            className="card p-5 lg:sticky lg:top-28"
            onSubmit={(e) => {
              e.preventDefault()
              setApplied(draft)
              setPage(1)
            }}
          >
            <p className="flex items-center gap-2 font-lato text-lg font-bold">
              <Filter className="h-5 w-5 text-violet" /> {t('filter')}
            </p>
            <p className="mt-4 text-sm font-semibold text-ink/80">{t('period')}</p>
            <div className="mt-2 grid grid-cols-2 gap-2 lg:grid-cols-1">
              <label className="text-xs text-muted">
                {t('from')}
                <input type="date" className="input mt-1" value={draft.from} onChange={(e) => setDraft({ ...draft, from: e.target.value })} />
              </label>
              <label className="text-xs text-muted">
                {t('to')}
                <input type="date" className="input mt-1" value={draft.to} min={draft.from || undefined} onChange={(e) => setDraft({ ...draft, to: e.target.value })} />
              </label>
            </div>
            <label className="mt-4 block text-sm font-semibold text-ink/80">
              {t('category')}
              <select className="input mt-2" value={draft.cat} onChange={(e) => setDraft({ ...draft, cat: e.target.value })}>
                <option value="all">{t('all')}</option>
                {Object.entries(NEWS_CATEGORIES).map(([k, c]) => (
                  <option key={k} value={k}>
                    {L(c)}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="btn-primary mt-5 w-full">
              <Filter className="h-4 w-4" /> {t('applyFilter')}
            </button>
            <button
              type="button"
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold text-muted transition hover:bg-lilac-50 hover:text-brand"
              onClick={() => {
                const empty = { from: '', to: '', cat: 'all' }
                setDraft(empty)
                setApplied(empty)
                setQ('')
                setPage(1)
              }}
            >
              <RotateCcw className="h-4 w-4" /> {t('clearFilter')}
            </button>
          </form>
        </aside>
      </div>
    </>
  )
}

export function NewsDetail() {
  const { id } = useParams()
  const { t, L } = useLang()
  const item = newsById(id)
  const [copied, setCopied] = useState(false)
  if (!item) return <NotFound />
  const cat = NEWS_CATEGORIES[item.category]
  const CatIcon = cat.icon
  const share = async () => {
    const url = window.location.href
    try {
      if (navigator.share) await navigator.share({ title: item.title, url })
      else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch {
      /* foydalanuvchi bekor qildi */
    }
  }
  return (
    <>
      <PageBanner title={t('news')} icon={Newspaper} crumbs={[{ label: t('about') }]} />
      <div className="container-x mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
        <article className="card min-w-0 p-4 sm:p-7">
          <Link to="/news" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-violet">
            <ArrowLeft className="h-4 w-4" /> {t('back')}
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
            <span className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-white" style={{ background: cat.color }}>
              <CatIcon className="h-3.5 w-3.5" /> {L(cat)}
            </span>
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-4 w-4 text-violet" /> {formatDate(item.date)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Eye className="h-4 w-4 text-violet" /> {item.views} {t('views')}
            </span>
          </div>
          <h2 className="mt-3 font-lato text-2xl leading-tight font-bold sm:text-3xl">{item.title}</h2>
          <Cover image={item.image} tone={cat.tone} icon={cat.icon} iconSize="h-24 w-24" alt={item.title} className="mt-5 aspect-[16/9] rounded-2xl" />
          <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-ink/85">
            {item.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <button type="button" onClick={share} className="btn-soft mt-8">
            <Share2 className="h-4 w-4" /> {copied ? 'Havola nusxalandi' : t('share')}
          </button>
        </article>
        <aside>
          <div className="card p-5 lg:sticky lg:top-28">
            <p className="font-lato text-lg font-bold">{t('latestNews')}</p>
            <ul className="mt-4 space-y-4">
              {NEWS.filter((n) => n.id !== item.id)
                .slice(0, 5)
                .map((n) => {
                  const c = NEWS_CATEGORIES[n.category]
                  return (
                    <li key={n.id}>
                      <Link to={`/news/${n.id}`} className="group flex gap-3">
                        <Cover image={n.image} tone={c.tone} icon={c.icon} iconSize="h-7 w-7" className="h-16 w-20 shrink-0 rounded-xl" alt="" />
                        <span className="min-w-0">
                          <span className="line-clamp-2 text-sm font-bold group-hover:text-brand-700">{n.title}</span>
                          <span className="mt-1 block text-xs text-muted">{formatDate(n.date)}</span>
                        </span>
                      </Link>
                    </li>
                  )
                })}
            </ul>
          </div>
        </aside>
      </div>
    </>
  )
}
