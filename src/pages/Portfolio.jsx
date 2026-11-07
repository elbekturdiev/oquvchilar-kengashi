import { Link } from 'react-router-dom'
import { ArrowLeft, CalendarDays, MapPin, Globe2, UserRound, Trophy, Music, BadgeCheck, Award, Compass, ScrollText, Brain, Download, Printer, GraduationCap } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { usePageTitle } from '../components/UI.jsx'

function FakeQR() {
  // dekorativ QR (namuna) — haqiqiy tizimda o'quvchi profiliga havola bo'ladi
  const n = 21
  const cells = []
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const finder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13)
      if (finder) continue
      if (((x * 7 + y * 13 + x * y) % 5) < 2) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />)
    }
  const F = ({ x, y }) => (
    <g transform={`translate(${x} ${y})`}>
      <rect width="7" height="7" />
      <rect x="1" y="1" width="5" height="5" fill="#fff" />
      <rect x="2" y="2" width="3" height="3" />
    </g>
  )
  return (
    <svg viewBox="-1 -1 23 23" className="h-20 w-20" fill="#020a0c" aria-hidden="true">
      <rect x="-1" y="-1" width="23" height="23" fill="#fff" />
      {cells}
      <F x={0} y={0} />
      <F x={14} y={0} />
      <F x={0} y={14} />
    </svg>
  )
}

function Block({ title, icon: Icon, rows, color = 'text-orange bg-orange/10', children }) {
  return (
    <section className="card p-5 sm:p-6">
      <h2 className="flex items-center gap-2.5 font-lato text-lg font-bold">
        <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${color}`}>
          <Icon className="h-4.5 w-4.5" />
        </span>
        {title}
      </h2>
      <dl className="mt-4 divide-y divide-lilac-100">
        {rows.map(([k, v, badge]) => (
          <div key={k} className="flex flex-col gap-0.5 py-2.5 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <dt className="text-muted">{k}</dt>
            <dd className="font-semibold sm:text-right">
              {badge ? <span className={`inline-block rounded-lg px-2 py-0.5 text-xs font-bold ${badge}`}>{v}</span> : v}
            </dd>
          </div>
        ))}
      </dl>
      {children}
    </section>
  )
}

export default function Portfolio() {
  const { t, tr } = useLang()
  usePageTitle(t('portfolio'))
  const ok = 'bg-emerald-500/15 text-emerald-700'
  return (
    <div className="container-x mt-6 sm:mt-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link to="/" className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 text-sm font-semibold shadow-sm hover:text-brand">
          <ArrowLeft className="h-4 w-4" /> {t('back')}
        </Link>
        <button type="button" className="btn-soft" onClick={() => window.print()}>
          <Printer className="h-4 w-4" /> {tr('Chop etish', 'Печать')}
        </button>
      </div>

      <section className="card mt-4 flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-7">
        <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-lilac-100 text-violet">
          <UserRound className="h-12 w-12" />
        </span>
        <div className="min-w-0 flex-1">
          <span className="rounded-full bg-lilac-100 px-3 py-1 text-[11px] font-extrabold tracking-wider text-brand-700 uppercase">{tr('O‘quvchi ijtimoiy portfoliosi', 'Социальное портфолио учащегося')}</span>
          <h1 className="mt-2 font-lato text-2xl font-bold uppercase sm:text-3xl">{tr('O‘quvchi ism familiyasi', 'Имя и фамилия учащегося')}</h1>
          <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-ink/75">
            <li className="flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4 text-violet" /> {tr('10-sinf', '10 класс')}
            </li>
            <li className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4 text-violet" /> {tr('Tug‘ilgan sanasi', 'Дата рождения')}: <b>__.__.____</b>
            </li>
            <li className="flex items-center gap-1.5">
              <UserRound className="h-4 w-4 text-violet" /> {tr('Jinsi', 'Пол')}: <b>—</b>
            </li>
            <li className="flex items-center gap-1.5">
              <Globe2 className="h-4 w-4 text-violet" /> {tr('Fuqaroligi', 'Гражданство')}: <b>{tr('O‘zbekiston', 'Узбекистан')}</b>
            </li>
          </ul>
          <p className="mt-2 flex items-start gap-1.5 text-sm text-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-violet" /> {tr('Andijon viloyati, Andijon shahri, ___ MFY, ___ ko‘chasi, __-uy', 'Андижанская область, г. Андижан, махалля ___, ул. ___, д. __')}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden -rotate-6 rounded-xl border border-violet/40 bg-lilac-50 px-3 py-2 text-xs font-bold text-brand-700 italic md:block">
            {tr('Kelajak sizdan', 'Будущее за вами')}
            <br />— {tr('yangi qadam!', 'новый шаг!')}
          </span>
          <div className="text-center">
            <div className="rounded-xl border border-lilac-200 p-1.5">
              <FakeQR />
            </div>
            <p className="mt-1 text-[11px] text-muted">{tr('Tasdiqlangan QR kod', 'Подтверждённый QR-код')}</p>
          </div>
        </div>
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Block
          title={tr('Ijtimoiy loyihalar va ko‘rik-tanlovlar', 'Социальные проекты и конкурсы')}
          icon={Trophy}
          rows={[
            [tr('Tanlov nomi', 'Название конкурса'), tr('Iqtidor maktab ansambli', 'Школьный ансамбль «Iqtidor»')],
            [tr('Jamoa rahbari', 'Руководитель команды'), tr('F.I.Sh.', 'Ф.И.О.')],
            [tr('Hudud va shahar', 'Регион и город'), tr('Andijon viloyati, Andijon shahri', 'Андижанская область, г. Андижан')],
            [tr('Ta’lim muassasasi', 'Учебное заведение'), tr('__-son maktab', 'Школа №__')],
            [tr('Jamoa va ishtirokchilar', 'Команда и участники'), tr('“Navo” jamoasi (8 nafar a’zo)', 'Команда «Navo» (8 участников)')],
            [tr('O‘quv yili', 'Учебный год'), '2025–2026'],
            [tr('Ijodiy yo‘nalishi', 'Творческое направление'), tr('Doira ijrochiligi', 'Игра на дойре'), 'bg-lilac-100 text-brand'],
            [tr('Egallagan o‘rni', 'Занятое место'), tr('1-o‘rin (G‘olib)', '1 место (победитель)'), ok],
            [tr('Diplom turi va mukofot', 'Диплом и награда'), tr('Xorijiy ta’lim sayohati', 'Образовательная поездка за рубеж')],
          ]}
        >
          <button type="button" className="btn-soft mt-4 w-full">
            <Download className="h-4 w-4" /> {tr('Tasdiqlovchi hujjat (Foto / PDF)', 'Подтверждающий документ (фото / PDF)')}
          </button>
        </Block>
        <div className="space-y-5">
          <Block
            title={tr('To‘garaklardagi faol ishtiroki (Kelajak markazi va maktab)', 'Участие в кружках (центр «Kelajak» и школа)')}
            icon={Music}
            color="text-orange bg-orange/10"
            rows={[
              [tr('To‘garak yo‘nalishi', 'Направление кружка'), tr('Milliy cholg‘u asboblari (Doira ansambli)', 'Национальные инструменты (ансамбль дойристов)')],
              [tr('To‘garak turi va nomi', 'Тип и название кружка'), tr('Ijodiy to‘garak — “Yosh doirachilar”', 'Творческий кружок «Юные дойристы»')],
              [tr('Ishtirok holati', 'Статус участия'), tr('Faol qatnashchi (100% davomat)', 'Активный участник (100% посещаемость)'), ok],
              [tr('Qo‘shimcha to‘garak', 'Дополнительный кружок'), tr('Raqamli savodxonlik va IT asoslari', 'Цифровая грамотность и основы ИТ')],
              [tr('To‘garak turi', 'Тип кружка'), tr('Kelajak markazi to‘garagi (haftasiga 3 kun)', 'Кружок центра «Kelajak» (3 дня в неделю)')],
            ]}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Block
              title={tr('Milliy sertifikat', 'Национальный сертификат')}
              icon={BadgeCheck}
              color="text-emerald-600 bg-emerald-500/10"
              rows={[
                [tr('Yo‘nalish / fan', 'Направление / предмет'), tr('San’at (Musiqa)', 'Искусство (музыка)')],
                [tr('Darajasi', 'Уровень'), tr('A (a’lo)', 'A (отлично)')],
                [tr('Natijasi', 'Результат'), tr('94 / 100 ball', '94 / 100 баллов')],
              ]}
            />
            <Block
              title={tr('Xorijiy sertifikat', 'Зарубежный сертификат')}
              icon={Award}
              color="text-sky bg-sky/10"
              rows={[
                [tr('Dastur', 'Программа'), tr('Xalqaro yoshlar forumi', 'Международный молодёжный форум')],
                [tr('Sertifikat turi', 'Тип сертификата'), tr('Xalqaro ishtirokchi', 'Международный участник')],
                [tr('Holati', 'Статус'), tr('Tasdiqlangan', 'Подтверждён'), ok],
              ]}
            />
          </div>
        </div>
        <Block
          title={tr('Kasblarga qiziqishi', 'Профессиональные интересы')}
          icon={Compass}
          color="text-violet bg-violet/15"
          rows={[
            [tr('Qiziqqan fani', 'Любимый предмет'), tr('Adabiyot va tillar', 'Литература и языки')],
            [tr('Tanlagan yo‘nalish', 'Выбранное направление'), tr('Pedagogika va tilshunoslik', 'Педагогика и лингвистика')],
            [tr('Kelgusi reja', 'Планы'), tr('Oliy ta’lim muassasasida o‘qish', 'Учёба в вузе')],
          ]}
        />
        <Block
          title={tr('Shahodatnoma', 'Свидетельство')}
          icon={ScrollText}
          color="text-brand bg-lilac-100"
          rows={[
            [tr('Sinfi', 'Класс'), tr('10-sinf', '10 класс')],
            [tr('Seriya va raqam', 'Серия и номер'), 'AA _______'],
            [tr('Berilgan sana', 'Дата выдачи'), tr('2026-yil', '2026 г.')],
          ]}
        />
        <div className="lg:col-span-2">
          <Block
            title={tr('Fan olimpiadalari va intellektual tanlovlar', 'Предметные олимпиады и интеллектуальные конкурсы')}
            icon={Brain}
            color="text-pink-600 bg-pink-500/10"
            rows={[
              [tr('Olimpiada nomi', 'Название олимпиады'), tr('Umumta’lim fanlari va ijodiy yo‘nalishlar olimpiadasi', 'Олимпиада по общеобразовательным предметам и творческим направлениям')],
              [tr('Bosqich va yo‘nalish', 'Этап и направление'), tr('Shahar bosqichi — 1-o‘rin (G‘olib)', 'Городской этап — 1 место (победитель)')],
              [tr('O‘quv yili va natija', 'Учебный год и результат'), tr('2025/2026 o‘quv yili · Viloyat bosqichiga yo‘llanma', '2025/2026 учебный год · путёвка на областной этап')],
            ]}
          />
        </div>
      </div>

      <p className="mt-8 rounded-3xl bg-brand px-6 py-8 text-center font-lato text-xl font-bold text-white sm:text-2xl">
        {tr('“Bilim, iqtidor va faollik — yorug‘ kelajak sari eng ishonchli yo‘l!”', '«Знания, талант и активность — самый верный путь к светлому будущему!»')}
      </p>
    </div>
  )
}
