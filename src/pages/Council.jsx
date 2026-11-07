import { Link } from 'react-router-dom'
import {
  Send, Users2, Compass, Crown, CheckCircle2, GraduationCap, Drama, Cpu, Dumbbell, Leaf, Clapperboard, HeartHandshake, Plane, FileText, Mic2, Globe2, Briefcase, Medal, Flag, ShieldCheck, Lightbulb, Check,
} from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { usePageTitle } from '../components/UI.jsx'

const DIRS = [
  [{ uz: 'Ta’lim', ru: 'Образование' }, { uz: 'Bilim, iqtidor, o‘zaro yordam va innovatsion yondashuv.', ru: 'Знания, таланты, взаимопомощь и инновационный подход.' }, GraduationCap, '#2563eb', '#dbeafe'],
  [{ uz: 'Madaniyat', ru: 'Культура' }, { uz: 'Ijod, meros va an’anaviy qadriyatlarni yuksaltirish.', ru: 'Творчество, наследие и развитие традиционных ценностей.' }, Drama, '#ea580c', '#ffedd5'],
  [{ uz: 'IT va sun’iy intellekt', ru: 'ИТ и искусственный интеллект' }, { uz: 'Raqamli yechimlar, texnologiya va innovatsion g‘oyalar.', ru: 'Цифровые решения, технологии и инновационные идеи.' }, Cpu, '#7c3aed', '#ede9fe'],
  [{ uz: 'Sport', ru: 'Спорт' }, { uz: 'Sog‘lom turmush, jismoniy faollik va jamoaviy ruh.', ru: 'Здоровый образ жизни, физическая активность и командный дух.' }, Dumbbell, '#059669', '#d1fae5'],
  [{ uz: 'Ekologiya', ru: 'Экология' }, { uz: 'Tabiatni asrash, barqaror yashash va yashil maktab.', ru: 'Защита природы, устойчивое развитие и «зелёная школа».' }, Leaf, '#16a34a', '#dcfce7'],
  [{ uz: 'Media va axborot', ru: 'Медиа и информация' }, { uz: 'Axborot madaniyati, ommaviy aloqa va ijodiy kontent.', ru: 'Информационная культура, коммуникации и творческий контент.' }, Clapperboard, '#db2777', '#fce7f3'],
  [{ uz: 'Ijtimoiy tashabbus', ru: 'Социальные инициативы' }, { uz: 'O‘quvchilar g‘oya va tashabbuslarini qo‘llab-quvvatlash, ezgu ishlarga yo‘naltirish.', ru: 'Поддержка идей и инициатив учащихся, вовлечение в добрые дела.' }, HeartHandshake, '#9333ea', '#f3e8ff'],
]

const OPPS = [
  ['TOP 20', { uz: 'Faol o‘quvchilar uchun har yili xorijga ta’lim sayohati tashkil etiladi.', ru: 'Для активных учащихся ежегодно организуется образовательная поездка за рубеж.' }, Plane],
  ['TOP 100', { uz: 'O‘quvchilarga Respublika “Kelajak” markazi tomonidan tavsiyanoma xatlari beriladi.', ru: 'Республиканский центр «Kelajak» выдаёт учащимся рекомендательные письма.' }, FileText],
  [{ uz: 'Milliy liderlar forumi', ru: 'Форум национальных лидеров' }, { uz: 'Har yili 20-noyabr kuni Respublika darajasida “Milliy liderlar forumi” o‘tkaziladi.', ru: 'Ежегодно 20 ноября проводится республиканский «Форум национальных лидеров».' }, Mic2],
  [{ uz: '“O‘zbekiston uchun hamjamiyat!”', ru: '«Сообщество для Узбекистана!»' }, { uz: 'Bitiruvchilar hamjamiyat tarkibiga kiritiladi va ular uchun yaratilgan imkoniyatlardan foydalanadi.', ru: 'Выпускники входят в сообщество и пользуются созданными для них возможностями.' }, Globe2],
  [{ uz: 'Amaliyot', ru: 'Стажировка' }, { uz: 'Davlat tashkilotlarida amaliyot o‘tash uchun imkoniyat yaratiladi.', ru: 'Создаются возможности для стажировки в государственных организациях.' }, Briefcase],
  [{ uz: 'Rag‘batlantirish', ru: 'Поощрение' }, { uz: 'Tuman (shahar), hududiy va Respublika bosqichlarida munosib natija ko‘rsatgan o‘quvchilar e’tirof etiladi.', ru: 'Учащиеся, показавшие достойные результаты на районном, областном и республиканском этапах, получают признание.' }, Medal],
]

const GOALS = [
  [{ uz: 'Vatanparvar', ru: 'Патриотизм' }, { uz: 'Ona Vatanga muhabbat, uning ravnaqi uchun mardlik, fidoyilik, birdamlik va halollik tuyg‘ularini o‘quvchilarda shakllantirish.', ru: 'Формирование у учащихся любви к Родине, мужества, самоотверженности, сплочённости и честности ради её процветания.' }, Flag],
  [{ uz: 'Mas’uliyatli', ru: 'Ответственность' }, { uz: 'O‘quvchilarda o‘z qarorlari va xatti-harakatlariga javobgarlik, vazifalarni o‘z vaqtida bajarish, vaqtni samarali taqsimlash va jamoa manfaatlarini hisobga olish fazilatlarini shakllantirish.', ru: 'Воспитание ответственности за свои решения и поступки, своевременного выполнения задач, умения распределять время и учитывать интересы команды.' }, ShieldCheck],
  [{ uz: 'Kadrlarni tayyorlash', ru: 'Подготовка кадров' }, { uz: 'Bilimli, kreativ, keng fikrlaydigan, kompetent, mustaqil va o‘z fikriga ega o‘quvchilarni tarbiyalash.', ru: 'Воспитание образованных, креативных, широко мыслящих, компетентных и самостоятельных учащихся со своим мнением.' }, Lightbulb],
]

const TASKS = [
  { uz: 'o‘quvchilarda Yangi O‘zbekiston islohotlariga daxldorlik hissini oshirish;', ru: 'повышать у учащихся чувство сопричастности к реформам Нового Узбекистана;' },
  { uz: 'o‘quvchilarda vatanparvarlik ruhida muhabbat va sadoqat, milliy g‘urur, faxr va iftixor tuyg‘ularini yuksaltirish;', ru: 'воспитывать в духе патриотизма любовь и преданность, национальную гордость;' },
  { uz: 'o‘quvchilar tashabbuslarini ilgari surish va qo‘llab-quvvatlash;', ru: 'выдвигать и поддерживать инициативы учащихся;' },
  { uz: 'o‘quvchilarni qo‘shimcha ta’lim muassasalariga jalb etishda faol ishtirok etish;', ru: 'активно участвовать в привлечении учащихся в учреждения дополнительного образования;' },
  { uz: 'ta’lim sifatiga o‘quvchi nuqtai nazarini kiritish;', ru: 'учитывать мнение учащихся в вопросах качества образования;' },
  { uz: 'ijtimoiy, ekologik, madaniy va sport loyihalarini amalga oshirish;', ru: 'реализовывать социальные, экологические, культурные и спортивные проекты;' },
  { uz: 'maktab jamoasi, ma’muriyat va o‘quvchilar o‘rtasida ochiq muloqot ko‘prigini yaratish;', ru: 'выстраивать открытый диалог между коллективом школы, администрацией и учащимися;' },
  { uz: 'o‘quvchilar portfoliolarini boyitishga yordam beruvchi tadbirlarni tashkil etish;', ru: 'организовывать мероприятия, обогащающие портфолио учащихся;' },
  { uz: 'inklyuziv muhitni qo‘llab-quvvatlash va o‘quvchilarning psixologik farovonligini mustahkamlash.', ru: 'поддерживать инклюзивную среду и психологическое благополучие учащихся.' },
]

const Eyebrow = ({ children }) => <span className="inline-block rounded-full bg-lilac-100 px-3 py-1 text-xs font-extrabold tracking-wider text-brand-700 uppercase">{children}</span>

export default function Council() {
  const { t, tr, L } = useLang()
  usePageTitle(t('council'))
  return (
    <div className="container-x mt-6 sm:mt-8">
      {/* Hero */}
      <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-lilac-50 to-lilac-200 p-6 shadow-[0_2px_14px_rgba(58,27,120,0.06)] sm:p-8">
          <span className="absolute top-6 right-6 z-10 hidden -rotate-3 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-brand italic shadow md:inline-flex">
            {tr('Bizning maktab — bizning kelajagimiz!', 'Наша школа — наше будущее!')} <Send className="h-3.5 w-3.5" />
          </span>
          <div className="grid items-end gap-4 md:grid-cols-[1.15fr_1fr]">
            <div className="relative z-10 pb-2">
              <Eyebrow>{t('council')}</Eyebrow>
              <h1 className="mt-4 font-lato text-3xl leading-tight font-bold text-ink sm:text-4xl lg:text-[42px]">
                {tr('O‘quvchilar kengashi — ', 'Совет учащихся — ')}
                <span className="text-violet">{tr('tashabbus, bilim va liderlik', 'пространство инициатив, знаний и лидерства')}</span>
                {tr(' maydoni', '')}
              </h1>
              <p className="mt-4 max-w-md text-[15px] text-ink/75">{tr('“Tengdosh-tengdoshga” tamoyili asosida qo‘shimcha ta’lim muhitini shakllantiruvchi tizim.', 'Система, формирующая среду дополнительного образования по принципу «равный — равному».')}</p>
            </div>
            <img src="/images/hero.webp" alt={tr('O‘quvchilar kengashi a’zolari', 'Члены Совета учащихся')} className="pointer-events-none mx-auto -mb-6 w-[85%] max-w-[400px] sm:-mb-8 md:mt-10 md:w-full" />
          </div>
          <div className="relative z-10 grid gap-3 sm:grid-cols-3">
            {[
              [tr('7 asosiy yo‘nalish', '7 основных направлений'), tr('Faol va dolzarb yo‘nalishlar', 'Активные и актуальные направления'), Compass],
              [tr('100% o‘quvchi tashabbusi', '100% инициатива учащихся'), tr('Loyihalar o‘quvchilar tomonidan', 'Проекты создают сами учащиеся'), Users2],
              [tr('Hududiy integratsiya', 'Региональная интеграция'), tr('Maktabdan tashqari keng imkoniyatlar', 'Широкие возможности вне школы'), Globe2],
            ].map(([a, b, Icon]) => (
              <div key={a} className="flex items-center gap-3 rounded-2xl bg-white/95 p-3.5 shadow-sm backdrop-blur">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lilac-100 text-brand">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm leading-tight font-extrabold">{a}</span>
                  <span className="mt-0.5 block text-xs text-muted">{b}</span>
                </span>
              </div>
            ))}
          </div>
        </section>

        <aside className="card relative overflow-hidden p-6">
          <div className="absolute -right-10 -bottom-10 h-40 w-40 rotate-45 rounded-3xl bg-lilac-100" aria-hidden="true" />
          <div className="relative flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lilac-100 text-brand">
              <Crown className="h-5 w-5" />
            </span>
            <h2 className="font-lato text-xl font-bold">{tr('Kelajak lideri', 'Лидер будущего')}</h2>
          </div>
          <p className="relative mt-4 text-sm leading-relaxed text-ink/75">
            {tr(
              'Kelajak lideri — O‘quvchilar kengashini boshqaradi, muammolarga yechim topadi va g‘oyalarni amalga oshiradi. Kreativ, chet tilida erkin so‘zlashuvchi lider!',
              'Лидер будущего руководит Советом учащихся, находит решения проблем и воплощает идеи. Креативный лидер, свободно говорящий на иностранном языке!',
            )}
          </p>
          <ul className="relative mt-4 space-y-2.5">
            {[
              tr('Tashabbuskor va lider', 'Инициативность и лидерство'),
              tr('Maktab maslahatchilari bilan hamkorlik', 'Сотрудничество со школьными консультантами'),
              tr('O‘quvchilar muammolarini o‘rganish', 'Изучение проблем учащихся'),
              tr('Yechimlar ishlab chiqishda faol ishtirok', 'Активное участие в разработке решений'),
              tr('Yoshlarni ilhomlantirish va mentorlik qilish', 'Вдохновение и наставничество'),
            ].map((x) => (
              <li key={x} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-violet" /> {x}
              </li>
            ))}
          </ul>
          <Link to="/news/kelajak-lideri-tanlovi" className="btn-primary relative mt-6 w-full">
            {tr('Tanlovga ariza berish', 'Подать заявку на конкурс')}
          </Link>
        </aside>
      </div>

      {/* Yo'nalishlar */}
      <section className="mt-14">
        <Eyebrow>{tr('Yo‘nalishlar', 'Направления')}</Eyebrow>
        <h2 className="mt-3 font-lato text-2xl font-bold sm:text-3xl">{tr('O‘quvchilar kengashining 7 asosiy yo‘nalishi', '7 основных направлений Совета учащихся')}</h2>
        <p className="mt-1 text-sm text-muted">{tr('Har bir yo‘nalish — yangi imkoniyatlar sari qadam!', 'Каждое направление — шаг к новым возможностям!')}</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {DIRS.map(([title, text, Icon, c, bg], i) => (
            <div key={title.uz} className="group rounded-2xl border border-white p-4 shadow-[0_2px_14px_rgba(58,27,120,0.06)] transition hover:-translate-y-1" style={{ background: `linear-gradient(180deg, ${bg}, #fff 70%)` }}>
              <span className="text-sm font-extrabold" style={{ color: c }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="mx-auto mt-3 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg transition group-hover:scale-110" style={{ background: c, boxShadow: `0 10px 24px ${c}40` }}>
                <Icon className="h-8 w-8" />
              </span>
              <h3 className="mt-4 font-lato text-base leading-tight font-bold">{L(title)}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{L(text)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Imkoniyatlar */}
      <section className="mt-14">
        <Eyebrow>{tr('Imkoniyatlar', 'Возможности')}</Eyebrow>
        <h2 className="mt-3 font-lato text-2xl font-bold sm:text-3xl">{tr('O‘quvchilar kengashi imkoniyatlari', 'Возможности Совета учащихся')}</h2>
        <p className="mt-1 text-sm text-muted">{tr('Faollik, tashabbus va natija — siz uchun real imkoniyatlar!', 'Активность, инициатива и результат — реальные возможности для вас!')}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {OPPS.map(([title, text, Icon]) => (
            <div key={L(title)} className="card p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lilac-100 text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-lato text-base font-bold">{L(title)}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{L(text)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Maqsadlar + Vazifalar */}
      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        <section className="card p-6 sm:p-7">
          <Eyebrow>{tr('Maqsadlar', 'Цели')}</Eyebrow>
          <h2 className="mt-3 font-lato text-2xl font-bold">{tr('O‘quvchilar kengashining maqsadlari', 'Цели Совета учащихся')}</h2>
          <div className="mt-5 space-y-3">
            {GOALS.map(([title, text, Icon]) => (
              <div key={title.uz} className="flex gap-4 rounded-2xl bg-lilac-50 p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-lato font-bold">{L(title)}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink/70">{L(text)}</span>
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="card p-6 sm:p-7">
          <Eyebrow>{tr('Vazifalar', 'Задачи')}</Eyebrow>
          <h2 className="mt-3 font-lato text-2xl font-bold">{tr('Kengash quyidagi vazifalarni bajaradi:', 'Совет выполняет следующие задачи:')}</h2>
          <ul className="mt-5 space-y-3">
            {TASKS.map(L).map((x) => (
              <li key={x} className="flex gap-3 text-[15px] leading-relaxed text-ink/80">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lilac-100 text-brand">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {x.charAt(0).toUpperCase() + x.slice(1)}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
