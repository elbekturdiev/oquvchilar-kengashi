import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { supabase, isConfigured } from './lib/supabase.js'

const AuthCtx = createContext(null)

const notConfigured = () => ({ error: { message: 'not_configured' } })

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(isConfigured)
  const [recovery, setRecovery] = useState(false)

  const loadProfile = useCallback(async (user) => {
    if (!user) return setProfile(null)
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle()
    setProfile(data ?? { id: user.id, full_name: user.user_metadata?.full_name ?? '', role: 'student' })
  }, [])

  useEffect(() => {
    if (!isConfigured) return
    let alive = true
    supabase.auth.getSession().then(async ({ data }) => {
      if (!alive) return
      setSession(data.session)
      await loadProfile(data.session?.user)
      setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      setSession(s)
      if (event === 'PASSWORD_RECOVERY') setRecovery(true)
      // profilni keyingi tsiklda yuklash (Supabase tavsiyasi: callback ichida await qilmaslik)
      setTimeout(() => loadProfile(s?.user), 0)
    })
    return () => {
      alive = false
      sub.subscription.unsubscribe()
    }
  }, [loadProfile])

  const origin = typeof window !== 'undefined' ? window.location.origin : ''

  const api = {
    isConfigured,
    loading,
    session,
    user: session?.user ?? null,
    profile,
    recovery,
    isAdmin: profile?.role === 'admin',
    signIn: (email, password) => (isConfigured ? supabase.auth.signInWithPassword({ email, password }) : notConfigured()),
    signUp: (email, password, meta) =>
      isConfigured
        ? supabase.auth.signUp({ email, password, options: { data: meta, emailRedirectTo: `${origin}/cabinet` } })
        : notConfigured(),
    signOut: async () => {
      if (isConfigured) await supabase.auth.signOut()
      setProfile(null)
    },
    sendReset: (email) => (isConfigured ? supabase.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/reset-password` }) : notConfigured()),
    updatePassword: async (password) => {
      if (!isConfigured) return notConfigured()
      const r = await supabase.auth.updateUser({ password })
      if (!r.error) setRecovery(false)
      return r
    },
    updateProfile: async (patch) => {
      if (!isConfigured || !session) return notConfigured()
      const r = await supabase.from('profiles').update(patch).eq('id', session.user.id).select().single()
      if (!r.error) setProfile(r.data)
      return r
    },
  }
  return <AuthCtx.Provider value={api}>{children}</AuthCtx.Provider>
}

export const useAuth = () => useContext(AuthCtx)

// Supabase xato xabarlarini foydalanuvchiga tushunarli tilga o'girish
export function authError(err, tr) {
  const m = (err?.message || '').toLowerCase()
  if (m === 'not_configured') return tr('Kirish tizimi hali sozlanmagan. Administratorga murojaat qiling.', 'Система входа ещё не настроена. Обратитесь к администратору.')
  if (m.includes('invalid login')) return tr('E-mail yoki parol noto‘g‘ri.', 'Неверный e-mail или пароль.')
  if (m.includes('email not confirmed')) return tr('E-mail hali tasdiqlanmagan. Pochtangizdagi havolani bosing.', 'E-mail ещё не подтверждён. Перейдите по ссылке из письма.')
  if (m.includes('already registered') || m.includes('already been registered')) return tr('Bu e-mail bilan allaqachon ro‘yxatdan o‘tilgan.', 'Этот e-mail уже зарегистрирован.')
  if (m.includes('password should be') || m.includes('weak')) return tr('Parol juda oddiy: kamida 8 belgi, harf va raqam ishlating.', 'Слишком простой пароль: минимум 8 символов, буквы и цифры.')
  if (m.includes('rate limit') || m.includes('too many') || m.includes('security purposes')) return tr('Juda ko‘p urinish. Birozdan keyin qayta urinib ko‘ring.', 'Слишком много попыток. Попробуйте чуть позже.')
  if (m.includes('same') && m.includes('password')) return tr('Yangi parol eskisidan farq qilishi kerak.', 'Новый пароль должен отличаться от старого.')
  if (m.includes('fetch') || m.includes('network')) return tr('Internet aloqasini tekshiring.', 'Проверьте подключение к интернету.')
  return tr('Xatolik yuz berdi. Qayta urinib ko‘ring.', 'Произошла ошибка. Попробуйте ещё раз.') + (err?.message ? ` (${err.message})` : '')
}
