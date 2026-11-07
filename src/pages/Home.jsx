import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, GraduationCap } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { StatIcon } from '../components/Brand.jsx'
import { Carousel, SectionHeader, usePageTitle } from '../components/UI.jsx'
import { NewsCard, ClubCard } from '../components/Cards.jsx'
import Cover from '../components/Cover.jsx'
import { Lightning, Zigzag, Squiggle, Burst, Arrows, Smile, Bubble, Figure } from '../components/Doodles.jsx'
import { HOME_STATS, TOP_DIRECTIONS, fmt } from '../data/stats.js'
import { directionById } from '../data/directions.js'
import { NEWS } from '../data/news.js'
import { CLUBS } from '../data/clubs.js'

function HeroTabs({ tab, setTab }) {
  const { t } = useLang()
  const tabs = [
    { id: 'centers', label: t('tabCenters'), icon: Star },
    { id: 'special', label: t('tabSpecial'), icon: GraduationCap },
  ]
  return (
    <div className="relative mx-auto flex w-full max-w-[720px] items-stretch gap-1 rounded-2xl border border-lilac-200 bg-white/70 p-1 shadow-sm backdrop-blur" role="tablist">
      <span
        className="absolute top-1 bottom-1 rounded-xl bg-white shadow-md shadow-brand/10 transition-all duration-300 ease-out"
        style={{ left: tab === 'centers' ? 4 : 'calc(50% + 2px)', width: 'calc(50% - 6px)' }}
        aria-hidden="true"
      />
      {tabs.map(({ id, label, icon: Icon }) => {
        const active = tab === id
        return (
          <button
            key={id}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => setTab(id)}
            className={`relative z-10 flex w-1/2 min-w-0 items-center justify-center gap-2 rounded-xl px-2 py-2.5 text-center transition-colors sm:px-3 ${active ? 'text-brand' : 'text-muted hover:text-brand'}`}
          >
            {active ? (
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
            ) : (
              <Icon className="hidden h-4 w-4 shrink-0 sm:block" />
            )}
            <span className="text-[11px] leading-tight font-extrabold tracking-wide uppercase sm:text-sm">{label}</span>
          </button>
        )
      })}
    </div>
  )
}

function Hero({ tab, setTab }) {
  const { t, tr, lang } = useLang()
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-page">
      {/* bezaklar — kompyuterda to'liq, mobilda kichik va kamroq */}
      <div className="pointer-events-none absolute inset-0 z-0 mx-auto max-w-[1480px]" aria-hidden="true">
        <Lightning className="floaty absolute top-4 left-[3%] w-8 sm:top-10 sm:left-[6%] sm:w-12 lg:w-14" />
        <Figure className="floaty-slow absolute top-[20%] left-[2%] hidden w-40 lg:block xl:left-[4%]" color="#f04848" prop="brush" lines={lang === 'ru' ? ['#Будущее', 'в наших', 'руках'] : ['#Kelajak', 'o‘z', 'qo‘limizda']} />
        <Smile className="floaty absolute top-[48%] left-[2%] w-7 sm:top-[44%] sm:left-[7%] sm:w-11 lg:left-[15%]" />
        <Squiggle className="absolute top-[36%] left-[19%] hidden w-36 2xl:block" />
        <Figure className="floaty-slow absolute bottom-[16%] left-[2%] hidden w-44 md:block xl:left-[5%]" color="#3a1b78" prop="rocket" lines={lang === 'ru' ? ['К НОВЫМ', 'РУБЕЖАМ'] : ['YANGI', 'MARRALAR', 'SARI']} />
        <Arrows className="absolute top-[30%] right-[17%] hidden w-24 2xl:block" />
        <Burst className="absolute top-[28%] left-[20%] hidden w-16 2xl:block" />
        <Figure className="floaty absolute top-4 right-[2%] hidden w-44 md:block xl:right-[4%]" color="#6cb520" prop="thumb" flip lines={lang === 'ru' ? ['К ВЕРШИНАМ', 'ЗНАНИЙ'] : ['BILIM SARI', 'YUKSALISH']} />
        <Bubble text={lang === 'ru' ? ['Каждый', 'день —', 'новый шаг'] : undefined} className="floaty absolute top-[46%] right-[1%] w-10 sm:top-[40%] sm:right-[8%] sm:w-14 lg:right-[14%] lg:w-16" />
        <Zigzag className="absolute top-[50%] right-[3%] hidden w-14 md:block lg:w-16" />
        <Figure className="floaty-slow absolute right-[2%] bottom-[16%] hidden w-44 md:block xl:right-[5%]" color="#7c5cf0" prop="scope" flip lines={lang === 'ru' ? ['К НОВЫМ', 'МЕЧТАМ'] : ['YANGI', 'ORZULAR', 'SARI']} />
      </div>

      <div className="relative isolate z-10 container-x pt-6 sm:pt-10">
        <HeroTabs tab={tab} setTab={setTab} />
        <h1 className="fade-up mx-auto mt-5 max-w-3xl text-center font-lato text-[28px] leading-[1.15] font-bold text-brand sm:mt-7 sm:text-4xl md:text-5xl lg:text-[52px]">
          {t('heroTitle')}
        </h1>

        <div className="relative mx-auto mt-3 max-w-[900px] sm:mt-5">
          {/* konsentrik doiralar — markazi rasm pastida, sarlavhaga tegmaydi */}
          <div className="absolute bottom-0 left-1/2 -z-10 flex aspect-square w-[min(1000px,135vw)] -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-lilac-50" aria-hidden="true">
            <div className="flex h-[88%] w-[88%] items-center justify-center rounded-full bg-lilac-100">
              <div className="flex h-[86%] w-[86%] items-center justify-center rounded-full bg-lilac-200">
                <div className="h-[84%] w-[84%] rounded-full bg-lilac-300" />
              </div>
            </div>
          </div>
          <img
            src="/images/hero-close.webp"
            alt={tr('O‘quvchilar kengashi a’zolari', 'Члены Совета учащихся')}
            width="1190"
            height="660"
            fetchPriority="high"
            className="fade-up relative mx-auto h-auto w-full max-w-[820px] sm:w-[92%]"
          />
        </div>
      </div>
    </section>
  )
}

function Stats({ tab }) {
  const { t } = useLang()
  return (
    <div className="relative z-10 container-x -mt-8 sm:-mt-20">
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {HOME_STATS[tab].map((s) => (
          <div key={s.key} className="card fade-up p-4 sm:p-6">
            <StatIcon name={s.icon} className="h-10 w-10 sm:h-14 sm:w-14" />
            <p className="mt-3 text-2xl font-extrabold tracking-tight text-ink sm:mt-4 sm:text-[32px]">{fmt(s.value)}</p>
            <p className="mt-1 text-xs leading-snug text-muted sm:text-sm">{t(s.key)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Directions({ tab }) {
  const { t, L } = useLang()
  return (
    <section className="container-x mt-16 sm:mt-20">
      <SectionHeader title={t('topDirections')} to={tab === 'special' ? '/clubs?tab=special' : '/clubs'} />
      <Carousel label={t('topDirections')}>
        {TOP_DIRECTIONS[tab].map(({ id, count }) => {
          const d = directionById(id)
          return (
            <Link
              key={id}
              to={`/clubs?${tab === 'special' ? 'tab=special&' : ''}dir=${id}`}
              className="group relative w-[72%] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[300px]"
            >
              <Cover tone={d.tone} icon={d.icon} iconSize="h-20 w-20" className="aspect-[4/3]" alt={L(d)}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="font-lato text-xl leading-tight font-bold">{L(d)}</p>
                  <p className="mt-1 text-sm text-white/85">
                    {fmt(count)} {t('clubsWord')}
                  </p>
                </div>
              </Cover>
            </Link>
          )
        })}
      </Carousel>
    </section>
  )
}

export default function Home() {
  const { t } = useLang()
  usePageTitle(null)
  const [tab, setTab] = useState('centers')
  const clubs = CLUBS.filter((c) => c.kind === tab && c.featured).concat(CLUBS.filter((c) => c.kind === tab && !c.featured)).slice(0, 8)
  return (
    <>
      <Hero tab={tab} setTab={setTab} />
      <Stats tab={tab} />
      <Directions tab={tab} />

      <section className="container-x mt-16 sm:mt-20">
        <SectionHeader title={t('news')} to="/news" />
        <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {NEWS.slice(0, 6).map((n) => (
            <NewsCard key={n.id} item={n} />
          ))}
        </div>
        <div className="sm:hidden">
          <Carousel label={t('news')}>
            {NEWS.slice(0, 6).map((n) => (
              <NewsCard key={n.id} item={n} className="w-[85%] shrink-0 snap-start" />
            ))}
          </Carousel>
        </div>
      </section>

      <section className="container-x mt-16 sm:mt-20">
        <SectionHeader title={tab === 'special' ? t('clubsSpecial') : t('clubsCenters')} to={tab === 'special' ? '/clubs?tab=special' : '/clubs'} />
        <Carousel label={t('clubs')}>
          {clubs.map((c) => (
            <ClubCard key={c.id} club={c} className="w-[78%] shrink-0 snap-start sm:w-[290px]" />
          ))}
        </Carousel>
      </section>
    </>
  )
}
