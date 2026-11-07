import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useLocation, useSearchParams } from 'react-router-dom'
import { UserRound, ClipboardList, ShieldCheck, LogOut, Inbox, Loader2, Trash2, Save, Users, Search, Download, RefreshCw } from 'lucide-react'
import { useLang } from '../i18n.jsx'
import { useAuth, authError } from '../auth.jsx'
import { supabase } from '../lib/supabase.js'
import { usePageTitle } from '../components/UI.jsx'
import { DISTRICTS } from '../data/site.js'
import { ROLES, Alert, PasswordInput } from './Login.jsx'

const STATUS = {
  new: { uz: 'Ko‘rib chiqilmoqda', ru: 'На рассмотрении', c: 'bg-amber-500/15 text-amber-700' },
  accepted: { uz: 'Qabul qilindi', ru: 'Принята', c: 'bg-emerald-500/15 text-emerald-700' },
  rejected: { uz: 'Rad etildi', ru: 'Отклонена', c: 'bg-red-500/10 text-red-600' },
}

const fmtDate = (iso, lang) =>
  new Date(iso).toLocaleString(lang === 'ru' ? 'ru-RU' : 'uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })

function Profile() {
  const { tr, L, t } = useLang()
  const auth = useAuth()
  const p = auth.profile || {}
  const [f, setF] = useState({ full_name: p.full_name || '', phone: p.phone || '', district: p.district || '', school: p.school || '', grade: p.grade || '' })
  const [msg, setMsg] = useState(null)
  const [busy, setBusy] = useState(false)
  useEffect(() => {
    setF({ full_name: p.full_name || '', phone: p.phone || '', district: p.district || '', school: p.school || '', grade: p.grade || '' })
  }, [p.full_name, p.phone, p.district, p.school, p.grade])
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const save = async (e) => {
    e.preventDefault()
    setBusy(true)
    setMsg(null)
    const { error } = await auth.updateProfile({ ...f, full_name: f.full_name.trim() })
    setBusy(false)
    setMsg(error ? { type: 'error', text: authError(error, tr) } : { type: 'success', text: tr('Ma’lumotlar saqlandi.', 'Данные сохранены.') })
  }
  return (
    <form onSubmit={save} className="space-y-4">
      <h2 className="font-lato text-xl font-bold">{tr('Shaxsiy ma’lumotlar', 'Личные данные')}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-semibold sm:col-span-2">
          {tr('F.I.Sh.', 'Ф.И.О.')}
          <input required minLength={3} value={f.full_name} onChange={set('full_name')} className="input mt-1" />
        </label>
        <label className="block text-sm font-semibold">
          E-mail
          <input value={auth.user.email} disabled className="input mt-1 !bg-lilac-50 text-muted" />
        </label>
        <label className="block text-sm font-semibold">
          {tr('Rol', 'Роль')}
          <input value={L(ROLES[p.role] || ROLES.student)} disabled className="input mt-1 !bg-lilac-50 text-muted" />
        </label>
        <label className="block text-sm font-semibold">
          {t('phone')}
          <input type="tel" value={f.phone} onChange={set('phone')} className="input mt-1" placeholder="+998 __ ___ __ __" />
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
        <label className="block text-sm font-semibold">
          {tr('Maktab', 'Школа')}
          <input value={f.school} onChange={set('school')} className="input mt-1" />
        </label>
        {p.role === 'student' && (
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
      {msg && <Alert type={msg.type}>{msg.text}</Alert>}
      <button type="submit" disabled={busy} className="btn-primary">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} {tr('Saqlash', 'Сохранить')}
      </button>
    </form>
  )
}

function useApplications(all) {
  const auth = useAuth()
  const [rows, setRows] = useState(null)
  const [error, setError] = useState('')
  const load = useCallback(async () => {
    setError('')
    let q = supabase.from('applications').select('*').order('created_at', { ascending: false }).limit(500)
    if (!all) q = q.eq('user_id', auth.user.id)
    const { data, error: e } = await q
    if (e) setError(e.message)
    setRows(data || [])
  }, [all, auth.user?.id])
  useEffect(() => {
    load()
  }, [load])
  return { rows, setRows, error, reload: load }
}

function MyApplications() {
  const { tr, L, lang } = useLang()
  const { rows, setRows, error } = useApplications(false)
  const cancel = async (id) => {
    if (!window.confirm(tr('Arizani bekor qilasizmi?', 'Отменить заявку?'))) return
    const { error: e } = await supabase.from('applications').delete().eq('id', id)
    if (!e) setRows(rows.filter((r) => r.id !== id))
  }
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-lato text-xl font-bold">{tr('Mening arizalarim', 'Мои заявки')}</h2>
        <Link to="/clubs" className="btn-soft">
          {tr('Yangi ariza', 'Новая заявка')}
        </Link>
      </div>
      {error && <div className="mt-4"><Alert>{error}</Alert></div>}
      {rows === null ? (
        <p className="mt-6 flex items-center gap-2 text-sm text-muted">
          <Loader2 className="h-4 w-4 animate-spin" /> {tr('Yuklanmoqda…', 'Загрузка…')}
        </p>
      ) : rows.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-2xl bg-lilac-50 px-6 py-12 text-center">
          <Inbox className="h-10 w-10 text-violet" />
          <p className="mt-3 font-bold">{tr('Hozircha arizalar yo‘q', 'Заявок пока нет')}</p>
          <p className="mt-1 text-sm text-muted">{tr('To‘garaklar sahifasidan “Ariza qoldirish” tugmasini bosing.', 'Нажмите «Оставить заявку» на странице кружков.')}</p>
        </div>
      ) : (
        <ul className="mt-5 space-y-3">
          {rows.map((r) => {
            const s = STATUS[r.status] || STATUS.new
            return (
              <li key={r.id} className="flex flex-col gap-3 rounded-2xl border border-lilac-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <Link to={`/clubs/${r.club_id}`} className="font-lato text-lg font-bold hover:text-brand-700">
                    {r.club_name}
                  </Link>
                  <p className="text-sm text-muted">{r.org}</p>
                  <p className="mt-1 text-xs text-muted">
                    {r.student_name} · {fmtDate(r.created_at, lang)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-lg px-2.5 py-1 text-xs font-bold whitespace-nowrap ${s.c}`}>{L(s)}</span>
                  {r.status === 'new' && (
                    <button type="button" onClick={() => cancel(r.id)} className="rounded-lg p-2 text-muted transition hover:bg-red-500/10 hover:text-red-600" aria-label={tr('Bekor qilish', 'Отменить')} title={tr('Bekor qilish', 'Отменить')}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function AllApplications() {
  const { tr, L, lang } = useLang()
  const { rows, setRows, error, reload } = useApplications(true)
  const [q, setQ] = useState('')
  const [st, setSt] = useState('all')
  const list = useMemo(() => {
    const s = q.trim().toLowerCase()
    return (rows || []).filter((r) => (st === 'all' || r.status === st) && (!s || `${r.student_name} ${r.club_name} ${r.phone} ${r.school}`.toLowerCase().includes(s)))
  }, [rows, q, st])
  const setStatus = async (id, status) => {
    const { error: e } = await supabase.from('applications').update({ status }).eq('id', id)
    if (!e) setRows(rows.map((r) => (r.id === id ? { ...r, status } : r)))
  }
  const csv = () => {
    const head = ['Sana', 'O‘quvchi', 'Sinf', 'Telefon', 'Maktab', 'To‘garak', 'Tashkilot', 'Holat']
    const lines = list.map((r) => [fmtDate(r.created_at, lang), r.student_name, r.grade, r.phone, r.school, r.club_name, r.org, L(STATUS[r.status])].map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','))
    const blob = new Blob(['﻿' + [head.join(','), ...lines].join('\n')], { type: 'text/csv;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `arizalar-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(a.href)
  }
  const counts = useMemo(() => Object.fromEntries(Object.keys(STATUS).map((k) => [k, (rows || []).filter((r) => r.status === k).length])), [rows])
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-lato text-xl font-bold">{tr('Barcha arizalar', 'Все заявки')}</h2>
        <div className="flex gap-2">
          <button type="button" onClick={reload} className="btn-soft !px-3" aria-label={tr('Yangilash', 'Обновить')}>
            <RefreshCw className="h-4 w-4" />
          </button>
          <button type="button" onClick={csv} disabled={!list.length} className="btn-soft">
            <Download className="h-4 w-4" /> Excel (CSV)
          </button>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {Object.entries(STATUS).map(([k, s]) => (
          <div key={k} className="rounded-xl bg-lilac-50 p-3">
            <p className="text-xs text-muted">{L(s)}</p>
            <p className="text-xl font-extrabold">{counts[k] ?? 0}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <label className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-violet" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} className="input !pl-10" placeholder={tr('Ism, telefon, to‘garak…', 'Имя, телефон, кружок…')} />
        </label>
        <select value={st} onChange={(e) => setSt(e.target.value)} className="input sm:!w-52">
          <option value="all">{tr('Barcha holatlar', 'Все статусы')}</option>
          {Object.entries(STATUS).map(([k, s]) => (
            <option key={k} value={k}>
              {L(s)}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="mt-4"><Alert>{error}</Alert></div>}
      {rows === null ? (
        <p className="mt-6 flex items-center gap-2 text-sm text-muted">
          <Loader2 className="h-4 w-4 animate-spin" /> {tr('Yuklanmoqda…', 'Загрузка…')}
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto rounded-2xl border border-lilac-100">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-lilac-50 text-left text-brand">
              <tr>
                {[tr('Sana', 'Дата'), tr('O‘quvchi', 'Учащийся'), tr('Telefon', 'Телефон'), tr('To‘garak', 'Кружок'), tr('Holat', 'Статус')].map((h) => (
                  <th key={h} className="px-3 py-2.5 font-bold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((r) => (
                <tr key={r.id} className="border-t border-lilac-100 align-top">
                  <td className="px-3 py-2.5 text-xs whitespace-nowrap text-muted">{fmtDate(r.created_at, lang)}</td>
                  <td className="px-3 py-2.5">
                    <b>{r.student_name}</b>
                    <span className="block text-xs text-muted">
                      {[r.grade && `${r.grade}-${tr('sinf', 'класс')}`, r.school].filter(Boolean).join(' · ')}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <a href={`tel:${r.phone.replace(/[^\d+]/g, '')}`} className="hover:text-brand">
                      {r.phone}
                    </a>
                  </td>
                  <td className="px-3 py-2.5">
                    {r.club_name}
                    <span className="block text-xs text-muted">{r.org}</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <select value={r.status} onChange={(e) => setStatus(r.id, e.target.value)} className={`rounded-lg border-0 px-2 py-1 text-xs font-bold ${STATUS[r.status]?.c}`}>
                      {Object.entries(STATUS).map(([k, s]) => (
                        <option key={k} value={k}>
                          {L(s)}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
              {!list.length && (
                <tr>
                  <td colSpan={5} className="px-3 py-10 text-center text-muted">
                    {tr('Arizalar topilmadi', 'Заявки не найдены')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function Security() {
  const { tr } = useLang()
  const auth = useAuth()
  const [p1, setP1] = useState('')
  const [p2, setP2] = useState('')
  const [msg, setMsg] = useState(null)
  const [busy, setBusy] = useState(false)
  const submit = async (e) => {
    e.preventDefault()
    setMsg(null)
    if (p1.length < 8 || !/\d/.test(p1) || !/[a-zA-Zа-яА-Я]/.test(p1)) return setMsg({ type: 'error', text: tr('Parol kamida 8 belgi, harf va raqamdan iborat bo‘lsin.', 'Пароль: минимум 8 символов, буквы и цифры.') })
    if (p1 !== p2) return setMsg({ type: 'error', text: tr('Parollar bir xil emas.', 'Пароли не совпадают.') })
    setBusy(true)
    const { error } = await auth.updatePassword(p1)
    setBusy(false)
    if (error) setMsg({ type: 'error', text: authError(error, tr) })
    else {
      setMsg({ type: 'success', text: tr('Parol yangilandi.', 'Пароль обновлён.') })
      setP1('')
      setP2('')
    }
  }
  return (
    <form onSubmit={submit} className="max-w-md space-y-4">
      <h2 className="font-lato text-xl font-bold">{tr('Parolni o‘zgartirish', 'Смена пароля')}</h2>
      <label className="block text-sm font-semibold">
        {tr('Yangi parol', 'Новый пароль')}
        <PasswordInput value={p1} onChange={setP1} autoComplete="new-password" minLength={8} />
      </label>
      <label className="block text-sm font-semibold">
        {tr('Parolni takrorlang', 'Повторите пароль')}
        <PasswordInput value={p2} onChange={setP2} autoComplete="new-password" />
      </label>
      {msg && <Alert type={msg.type}>{msg.text}</Alert>}
      <button type="submit" disabled={busy} className="btn-primary">
        {busy && <Loader2 className="h-4 w-4 animate-spin" />} {tr('Saqlash', 'Сохранить')}
      </button>
    </form>
  )
}

export default function Cabinet() {
  const { tr, L } = useLang()
  const auth = useAuth()
  const loc = useLocation()
  const [params, setParams] = useSearchParams()
  usePageTitle(tr('Shaxsiy kabinet', 'Личный кабинет'))
  if (auth.loading)
    return (
      <div className="container-x flex min-h-[50vh] items-center justify-center text-muted">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    )
  if (!auth.user) return <Navigate to="/login" replace state={{ from: loc.pathname + loc.search }} />

  const tabs = [
    ['profile', tr('Profil', 'Профиль'), UserRound],
    ['applications', tr('Arizalarim', 'Мои заявки'), ClipboardList],
    ...(auth.isAdmin ? [['admin', tr('Barcha arizalar', 'Все заявки'), Users]] : []),
    ['security', tr('Xavfsizlik', 'Безопасность'), ShieldCheck],
  ]
  const tab = tabs.some(([k]) => k === params.get('tab')) ? params.get('tab') : 'profile'
  const name = auth.profile?.full_name || auth.user.email
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="container-x mt-6 grid gap-5 sm:mt-8 lg:grid-cols-[280px_1fr]">
      <aside className="card h-fit p-5 lg:sticky lg:top-28">
        <div className="flex items-center gap-3">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-violet text-lg font-extrabold text-white">{initials}</span>
          <span className="min-w-0">
            <span className="block truncate font-lato text-lg font-bold">{name}</span>
            <span className="block text-xs font-bold text-violet">{L(ROLES[auth.profile?.role] || ROLES.student)}</span>
          </span>
        </div>
        <nav className="no-scrollbar mt-5 flex gap-1 overflow-x-auto lg:flex-col" aria-label={tr('Kabinet bo‘limlari', 'Разделы кабинета')}>
          {tabs.map(([k, label, Icon]) => (
            <button
              key={k}
              type="button"
              onClick={() => setParams(k === 'profile' ? {} : { tab: k }, { replace: true })}
              aria-current={tab === k ? 'page' : undefined}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-bold whitespace-nowrap transition ${tab === k ? 'bg-lilac-100 text-brand' : 'text-ink/70 hover:bg-lilac-50 hover:text-brand'}`}
            >
              <Icon className="h-4.5 w-4.5" /> {label}
            </button>
          ))}
          <button type="button" onClick={auth.signOut} className="flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-bold whitespace-nowrap text-red-600 transition hover:bg-red-500/10">
            <LogOut className="h-4.5 w-4.5" /> {tr('Chiqish', 'Выйти')}
          </button>
        </nav>
      </aside>
      <section className="card min-w-0 p-5 sm:p-7">
        {tab === 'profile' && <Profile />}
        {tab === 'applications' && <MyApplications />}
        {tab === 'admin' && auth.isAdmin && <AllApplications />}
        {tab === 'security' && <Security />}
      </section>
    </div>
  )
}
