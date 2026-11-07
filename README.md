# O‘quvchilar kengashi — Andijon viloyati

React + Vite + Tailwind CSS asosidagi sayt. Kelajak markazlari saytidagi tuzilma asosida, Andijon viloyati O‘quvchilar kengashi uchun yasalgan.

## Ishga tushirish

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # tayyor fayllar dist/ papkasida
```

## Vercel’ga joylash

1. Loyihani GitHub’ga yuklang.
2. Vercel → **Add New Project** → repozitoriyni tanlang (Framework: **Vite**).
3. `vercel.json` allaqachon bor, shuning uchun `/news/...` kabi sahifalar yangilanganda ham 404 bermaydi.

## Ma’lumotlarni o‘zgartirish (hammasi `src/data/` ichida)

| Fayl | Nima bor |
|---|---|
| `site.js` | **Telefon, e-mail, manzil, ijtimoiy tarmoqlar, xarita koordinatasi**, tumanlar ro‘yxati. Bir marta o‘zgartirsangiz, sayt bo‘ylab hamma joyda yangilanadi. |
| `stats.js` | Bosh sahifa va To‘garaklar sahifasidagi statistika |
| `news.js` | Yangiliklar (sarlavha, sana, matn, turkum, rasm) |
| `clubs.js` | To‘garaklar ro‘yxati |
| `directions.js` | To‘garak yo‘nalishlari |

Hozirgi ma’lumotlar **namuna**: ularni haqiqiylari bilan almashtiring.

### Rasm qo‘shish
Rasmni `public/images/news/` (yoki `public/images/clubs/`) papkasiga joylang va yangilik/to‘garakka `image: '/images/news/rasm.jpg'` deb yozing. Rasm berilmasa, kartada avtomatik rangli muqova chiqadi.

### Tarjima
Interfeys matnlari (`src/i18n.jsx`) o‘zbek va rus tillarida. Yangilik va to‘garak matnlari hozircha faqat o‘zbek tilida.

## Sahifalar
`/` bosh sahifa · `/news` · `/news/:id` · `/clubs` · `/clubs/:id` · `/schedule` · `/centers` · `/leadership` · `/contacts` · `/student-council` · `/school-counselors` · `/portfolio` · `/login`

## Kirish tizimi (Supabase)

- Ro‘yxatdan o‘tish, kirish, parolni tiklash (`/reset-password`), shaxsiy kabinet (`/cabinet`): profil, arizalarim, parolni o‘zgartirish.
- “Ariza qoldirish” formasi arizalarni `applications` jadvaliga yozadi. Admin kabinetida barcha arizalarni ko‘rish, holatini o‘zgartirish va CSV’ga yuklab olish mumkin.
- Baza sxemasi: `supabase/schema.sql` (Supabase → SQL Editor’da bir marta ishga tushiriladi).
- Ulanish sozlamalari: `src/lib/supabase.js` (yoki Vercel’da `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
- O‘zingizni admin qilish uchun SQL fayl oxiridagi buyruqni ishlating.
