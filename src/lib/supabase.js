import { createClient } from '@supabase/supabase-js'

// Supabase ulanishi. Bu ikki qiymat ochiq (public) — maxfiy emas, xavfsizlikni bazadagi RLS qoidalari ta'minlaydi.
// Vercel'da VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY o'zgaruvchilari berilsa, ular ustun turadi.
const FALLBACK_URL = 'https://drbzaxwifznodlivynly.supabase.co'
const FALLBACK_KEY = 'sb_publishable_RmsQo7bQ0g7yFdlAYP2skQ_kU72J_qo'

const url = import.meta.env.VITE_SUPABASE_URL || FALLBACK_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_KEY

export const isConfigured = Boolean(url && key)
export const supabase = isConfigured
  ? createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } })
  : null
