import { Link } from 'react-router-dom'
import {
  Send, Users2, Compass, Crown, CheckCircle2, GraduationCap, Drama, Cpu, Dumbbell, Leaf, Clapperboard, HeartHandshake, Plane, FileText, Mic2, Globe2, Briefcase, Medal, Flag, ShieldCheck, Lightbulb, Check,
} from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { usePageTitle } from '../components/UI.jsx'

const DIRS = [
  ['Ta’lim', 'Bilim, iqtidor, o‘zaro yordam va innovatsion yondashuv.', GraduationCap, '#2563eb', '#dbeafe'],
  ['Madaniyat', 'Ijod, meros va an’anaviy qadriyatlarni yuksaltirish.', Drama, '#ea580c', '#ffedd5'],
  ['IT va sun’iy intellekt', 'Raqamli yechimlar, texnologiya va innovatsion g‘oyalar.', Cpu, '#7c3aed', '#ede9fe'],
  ['Sport', 'Sog‘lom turmush, jismoniy faollik va jamoaviy ruh.', Dumbbell, '#059669', '#d1fae5'],
  ['Ekologiya', 'Tabiatni asrash, barqaror yashash va yashil maktab.', Leaf, '#16a34a', '#dcfce7'],
  ['Media va axborot', 'Axborot madaniyati, ommaviy aloqa va ijodiy kontent.', Clapperboard, '#db2777', '#fce7f3'],
  ['Ijtimoiy tashabbus', 'O‘quvchilar g‘oya va tashabbuslarini qo‘llab-quvvatlash, ezgu ishlarga yo‘naltirish.', HeartHandshake, '#9333ea', '#f3e8ff'],
]

const OPPS = [
  ['TOP 20', 'Faol o‘quvchilar uchun har yili xorijga ta’lim sayohati tashkil etiladi.', Plane],
  ['TOP 100', 'O‘quvchilarga Respublika “Kelajak” markazi tomonidan tavsiyanoma xatlari beriladi.', FileText],
  ['Milliy liderlar forumi', 'Har yili 20-noyabr kuni Respublika darajasida “Milliy liderlar forumi” o‘tkaziladi.', Mic2],
  ['“O‘zbekiston uchun hamjamiyat!”', 'Bitiruvchilar hamjamiyat tarkibiga kiritiladi va ular uchun yaratilgan imkoniyatlardan foydalanadi.', Globe2],
  ['Amaliyot', 'Davlat tashkilotlarida amaliyot o‘tash uchun imkoniyat yaratiladi.', Briefcase],
  ['Rag‘batlantirish', 'Tuman (shahar), hududiy va Respublika bosqichlarida munosib natija ko‘rsatgan o‘quvchilar e’tirof etiladi.', Medal],
]

const GOALS = [
  ['Vatanparvar', 'Ona Vatanga muhabbat, uning ravnaqi uchun mardlik, fidoyilik, birdamlik va halollik tuyg‘ularini o‘quvchilarda shakllantirish.', Flag],
  ['Mas’uliyatli', 'O‘quvchilarda o‘z qarorlari va xatti-harakatlariga javobgarlik, vazifalarni o‘z vaqtida bajarish, vaqtni samarali taqsimlash va jamoa manfaatlarini hisobga olish fazilatlarini shakllantirish.', ShieldCheck],
  ['Kadrlarni tayyorlash', 'Bilimli, kreativ, keng fikrlaydigan, kompetent, mustaqil va o‘z fikriga ega o‘quvchilarni tarbiyalash.', Lightbulb],
]

const TASKS = [
  'o‘quvchilarda Yangi O‘zbekiston islohotlariga daxldorlik hissini oshirish;',
  'o‘quvchilarda vatanparvarlik ruhida muhabbat va sadoqat, milliy g‘urur, faxr va iftixor tuyg‘ularini yuksaltirish;',
  'o‘quvchilar tashabbuslarini ilgari surish va qo‘llab-quvvatlash;',
  'o‘quvchilarni qo‘shimcha ta’lim muassasalariga jalb etishda faol ishtirok etish;',
  'ta’lim sifatiga o‘quvchi nuqtai nazarini kiritish;',
  'ijtimoiy, ekologik, madaniy va sport loyihalarini amalga oshirish;',
  'maktab jamoasi, ma’muriyat va o‘quvchilar o‘rtasida ochiq muloqot ko‘prigini yaratish;',
  'o‘quvchilar portfoliolarini boyitishga yordam beruvchi tadbirlarni tashkil etish;',
  'inklyuziv muhitni qo‘llab-quvvatlash va o‘quvchilarning psixologik farovonligini mustahkamlash.',
]

const Eyebrow = ({ children }) => <span className="inline-block rounded-full bg-lilac-100 px-3 py-1 text-xs font-extrabold tracking-wider text-brand-700 uppercase">{children}</span>

export default function Council() {
  const { t } = useLang()
  usePageTitle(t('council'))
  return (
    <div className="container-x mt-6 sm:mt-8">
      {/* Hero */}
      <div className="grid gap-5 lg:grid-cols-[1fr_380px]">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-lilac-50 to-lilac-200 p-6 shadow-[0_2px_14px_rgba(58,27,120,0.06)] sm:p-8">
          <span className="absolute top-6 right-6 z-10 hidden -rotate-3 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-brand italic shadow md:inline-flex">
            Bizning maktab — bizning kelajagimiz! <Send className="h-3.5 w-3.5" />
          </span>
          <div className="grid items-end gap-4 md:grid-cols-[1.15fr_1fr]">
            <div className="relative z-10 pb-2">
              <Eyebrow>{t('council')}</Eyebrow>
              <h1 className="mt-4 font-lato text-3xl leading-tight font-bold text-ink sm:text-4xl lg:text-[42px]">
                O‘quvchilar kengashi — <span className="text-violet">tashabbus, bilim va liderlik</span> maydoni
              </h1>
              <p className="mt-4 max-w-md text-[15px] text-ink/75">“Tengdosh-tengdoshga” tamoyili asosida qo‘shimcha ta’lim muhitini shakllantiruvchi tizim.</p>
            </div>
            <img src="/images/hero.webp" alt="O‘quvchilar kengashi a’zolari" className="pointer-events-none mx-auto -mb-6 w-[85%] max-w-[400px] sm:-mb-8 md:mt-10 md:w-full" />
          </div>
          <div className="relative z-10 grid gap-3 sm:grid-cols-3">
            {[
              ['7 asosiy yo‘nalish', 'Faol va dolzarb yo‘nalishlar', Compass],
              ['100% o‘quvchi tashabbusi', 'Loyihalar o‘quvchilar tomonidan', Users2],
              ['Hududiy integratsiya', 'Maktabdan tashqari keng imkoniyatlar', Globe2],
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
            <h2 className="font-lato text-xl font-bold">Kelajak lideri</h2>
          </div>
          <p className="relative mt-4 text-sm leading-relaxed text-ink/75">
            Kelajak lideri — O‘quvchilar kengashini boshqaradi, muammolarga yechim topadi va g‘oyalarni amalga oshiradi. Kreativ, chet tilida erkin so‘zlashuvchi lider!
          </p>
          <ul className="relative mt-4 space-y-2.5">
            {['Tashabbuskor va lider', 'Maktab maslahatchilari bilan hamkorlik', 'O‘quvchilar muammolarini o‘rganish', 'Yechimlar ishlab chiqishda faol ishtirok', 'Yoshlarni ilhomlantirish va mentorlik qilish'].map((x) => (
              <li key={x} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-violet" /> {x}
              </li>
            ))}
          </ul>
          <Link to="/news/kelajak-lideri-tanlovi" className="btn-primary relative mt-6 w-full">
            Tanlovga ariza berish
          </Link>
        </aside>
      </div>

      {/* Yo'nalishlar */}
      <section className="mt-14">
        <Eyebrow>Yo‘nalishlar</Eyebrow>
        <h2 className="mt-3 font-lato text-2xl font-bold sm:text-3xl">O‘quvchilar kengashining 7 asosiy yo‘nalishi</h2>
        <p className="mt-1 text-sm text-muted">Har bir yo‘nalish — yangi imkoniyatlar sari qadam!</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {DIRS.map(([title, text, Icon, c, bg], i) => (
            <div key={title} className="group rounded-2xl border border-white p-4 shadow-[0_2px_14px_rgba(58,27,120,0.06)] transition hover:-translate-y-1" style={{ background: `linear-gradient(180deg, ${bg}, #fff 70%)` }}>
              <span className="text-sm font-extrabold" style={{ color: c }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="mx-auto mt-3 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg transition group-hover:scale-110" style={{ background: c, boxShadow: `0 10px 24px ${c}40` }}>
                <Icon className="h-8 w-8" />
              </span>
              <h3 className="mt-4 font-lato text-base leading-tight font-bold">{title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Imkoniyatlar */}
      <section className="mt-14">
        <Eyebrow>Imkoniyatlar</Eyebrow>
        <h2 className="mt-3 font-lato text-2xl font-bold sm:text-3xl">O‘quvchilar kengashi imkoniyatlari</h2>
        <p className="mt-1 text-sm text-muted">Faollik, tashabbus va natija — siz uchun real imkoniyatlar!</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {OPPS.map(([title, text, Icon]) => (
            <div key={title} className="card p-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-lilac-100 text-brand">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-lato text-base font-bold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Maqsadlar + Vazifalar */}
      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        <section className="card p-6 sm:p-7">
          <Eyebrow>Maqsadlar</Eyebrow>
          <h2 className="mt-3 font-lato text-2xl font-bold">O‘quvchilar kengashining maqsadlari</h2>
          <div className="mt-5 space-y-3">
            {GOALS.map(([title, text, Icon]) => (
              <div key={title} className="flex gap-4 rounded-2xl bg-lilac-50 p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block font-lato font-bold">{title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-ink/70">{text}</span>
                </span>
              </div>
            ))}
          </div>
        </section>
        <section className="card p-6 sm:p-7">
          <Eyebrow>Vazifalar</Eyebrow>
          <h2 className="mt-3 font-lato text-2xl font-bold">Kengash quyidagi vazifalarni bajaradi:</h2>
          <ul className="mt-5 space-y-3">
            {TASKS.map((x) => (
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
