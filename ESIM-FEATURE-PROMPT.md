# Промт для Claude Code: реалізувати каталог і продаж eSIM

Скопіюй усе, що нижче лінії, у новий проект як завдання для Claude Code.

---

Реалізуй повний функціонал каталогу та продажу eSIM (туристичні дата-плани) — від лістингу країн до видачі QR-коду активації. Працюй у поточному стеку проекту (Next.js App Router, React, TypeScript, Tailwind). **Перед написанням коду прочитай актуальні гайди Next.js у `node_modules/next/dist/docs/`** — API міг змінитися відносно того, що ти пам'ятаєш.

Ключова архітектурна ідея: **бекенд не потрібен.** Увесь каталог генерується детерміновано з локального сіду країн, а реальний партнерський API (напр. Yesim/Airalo) підключається через тонкий типізований «шов» із fallback на локальні дані. Це дозволяє повністю відрендерити магазин у dev без ключів.

## 1. Доменні типи (`src/lib/types.ts`)

```ts
export type RegionId = "europe" | "asia" | "americas" | "middle-east" | "africa" | "oceania";

export interface Region {
  id: RegionId; name: string; blurb: string;
  countryCount: number; fromPrice: number; coords: string;
}

export interface Country {
  slug: string;      // ISO alpha-2 lowercase — для URL
  name: string;
  iso3: string;      // ISO alpha-3, напр. JPN
  dialCode: string;  // +81
  flag: string;      // emoji
  region: RegionId;
  coords: string;    // "35.6762° N · 139.6503° E"
  networks: string[];
  speeds: ("4G" | "5G")[];
  popular?: boolean;
  bestseller?: boolean;
  fromPrice: number; // кешована мінімальна ціна плану — для карток
}

export interface Plan {
  id: string;              // `${slug}-${gb|unl}-${days}`
  countrySlug: string;
  dataGb: number | null;   // null = unlimited
  unlimited?: boolean;
  validityDays: number;
  price: number;
  network: string;
  speed: "4G" | "5G";
  badge?: "BESTSELLER" | "NEW" | "UNLIMITED";
}

export type CurrencyCode = "USD" | "EUR" | "GBP";
```

## 2. Каталог країн (`src/lib/data/countries.ts`)

- Оголоси компактний інтерфейс `Seed` (`slug, name, iso3, dial, flag, region, lat, lon, nets: [string, string] | [string], price, g5?, pop?, best?`).
- Створи масив `SEED` країн, згрупованих коментарями по регіонах. Наповни щонайменше 60–130 країн (Європа, Азія, Америки, Близький Схід, Африка, Океанія). Кожна: реальні координати (lat/lon), 1–2 оператори, базова ціна ~$4–7, прапор-emoji.
- Функція `coord(lat, lon)` форматує координати у вигляд `"35.6762° N · 139.6503° E"`.
- Експортуй `countries: Country[]`, побудований з `SEED` (speeds = `g5 ? ["4G","5G"] : ["4G"]`).
- Побудуй `Map` по slug і експортуй хелпери:
  - `getCountry(slug)`
  - `popularCountries()` (де `popular`)
  - `countriesByRegion(region)`
  - `searchCountries(query, limit = 6)` — фільтр по `name`/`iso3`/`slug` (case-insensitive); порожній запит повертає популярні.

## 3. Генерація планів (`src/lib/data/plans.ts`)

- `TEMPLATES` — масив без ціни/мережі: `1GB/7д`, `3GB/30д (BESTSELLER)`, `5GB/30д`, `10GB/30д`, `20GB/30д`, `Unlimited/10д (UNLIMITED)`.
- `priceFor(base, template)`: unlimited → `base * 6.2`; інакше `base + base * 0.62 * (gb-1) * dayFactor`, де `dayFactor = days >= 30 ? 1.15 : 1`. Округляй до 2 знаків.
- `buildPlans(country)`: для кожного шаблону — `id = \`${slug}-${unl?'unl':gb}-${days}\``, `speed = country.speeds.includes("5G") ? "5G" : "4G"`, `network = country.networks[0]`. Якщо країна `bestseller`, познач другий план бейджем `BESTSELLER`.
- Експортуй: `plansFor(slug)`, `getPlan(id)` (slug = `id.split("-")[0]`), `formatData({dataGb, unlimited})` → `"Unlimited"` або `"N GB"`.

## 4. Резолвер для checkout (`src/lib/data/summary.ts`)

- Інтерфейс `PlanSummary` (`id, title, flag, coords, data, days, network, speed, price`).
- `GLOBAL: Record<string, {data, days, price}>` — 4 глобальні плани (`global-1-7`, `global-3-30`, `global-10-30`, `global-unl-15`).
- `resolvePlanSummary(id)`: якщо `id` починається з `global-` → віддай глобальний summary (title `"Global plan · 130+ countries"`, flag 🌍); інакше знайди план+країну через `getPlan`/`getCountry`.
- `fallbackSummary()` — дефолтний план (напр. другий план Японії) для checkout без параметра.

## 5. Шар API з fallback (`src/lib/api/client.ts`)

- `import "server-only";`
- Читай `process.env.PROVIDER_API_URL` та `PROVIDER_API_KEY`. `isLive() = Boolean(url && key)`.
- Приватний `call<T>(path, init)` — fetch з `Authorization: Bearer`, `next: { revalidate: 3600 }`, кидає помилку на `!res.ok`.
- `fetchCountries()` / `fetchPlans(slug)` — у live-режимі викликають API, **у catch падають назад на локальний каталог** (`countries` / `plansFor(slug)`).
- Інтерфейс `OrderResult` (`orderId, qrCode, activationCode, smdpAddress`).
- `createOrder(planId, email)`: у live — POST `/orders` з `cache: "no-store"`; інакше **детерміновий мок**: `activationCode = \`LPA:1$smdp.<brand>.io$${planId.toUpperCase()}-${Date.now().toString(36).toUpperCase()}\``, `qrCode = activationCode`, `orderId = \`ORD-${Date.now().toString(36).toUpperCase()}\``.

## 6. Пошук — ARIA combobox (`src/components/search/DestinationSearch.tsx`)

Клієнтський компонент. Пропси: `size?: "md"|"lg"`, `placeholder?`, `autoFocus?`, `className?`.
- `useMemo(() => searchCountries(query, 6), [query])`.
- Повний `role="combobox"` + `role="listbox"`/`option`: клавіатурна навігація (ArrowUp/Down, Enter вибирає, Escape закриває), `aria-activedescendant`, `aria-expanded`.
- Вибір країни → `router.push(\`/destinations/${slug}\`)`; onBlur закриває з невеликою затримкою (~120мс), щоб встиг спрацювати click.
- Кожен рядок: прапор, name, `iso3 · dialCode`, `from <ціна>`. Порожній запит показує заголовок «Popular destinations».
- Розмір `lg` — це герой на головній (більше поле, підсвітка).

## 7. Лістинг країн (`/destinations`)

- Server-компонент сторінки віддає `countries` у клієнтський `DestinationsExplorer`.
- **`DestinationsExplorer`**: локальний стан `region: RegionId | "all"` + текстовий `q`. Таби-фільтри по регіонах (`role="tablist"`) + текстове поле. `useMemo` фільтрує по регіону та `name`/`iso3`. Грід `DestinationCard`. Порожній стан: «No destinations match "…"».
- **`DestinationCard`**: прапор, назва, `from <ціна>`, лінк на `/destinations/[slug]`.

## 8. Сторінка країни (`/destinations/[country]/page.tsx`)

- `generateStaticParams()` з усіх країн; `generateMetadata` з назвою/описом/canonical/OG.
- У сторінці: `getCountry(slug)` (інакше `notFound()`), `plans = await fetchPlans(slug)`.
- Хедер: прапор, `<h1>{name} eSIM</h1>`, рядок `iso3 · dialCode · coords`, бейджі (instant delivery, coverage, region), картка «Coverage & network» (оператори, швидкості, регіон, активація).
- `PlanGrid` (грід `PlanCard`) + `DataCalculator` + блок сумісності пристроїв.
- JSON-LD (Product/Breadcrumb) для SEO.

## 9. Картка плану (`src/components/cards/PlanCard.tsx`)

Пропси `{ plan: Plan; country: Country; featured?: boolean }`. Показує: хедер із країною+бейджем, блок даних (`Data`, `Validity`, `Network` = `speed · network`, `Price`), CTA-лінк:

```tsx
<Link href={{ pathname: "/checkout", query: { plan: plan.id } }}>Get this plan</Link>
```

`featured` (коли `badge === "BESTSELLER"`) виділяється візуально. Підпис: «Instant QR delivery · Works on 4G/5G».

## 10. Калькулятор даних (`src/components/destination/DataCalculator.tsx`)

Клієнтський віджет «скільки даних мені треба»: слайдер днів (1–30) + чекбокси звичок (`maps 0.15`, `chat 0.1`, `social 0.4`, `video 1.2` GB/день). Рахує `needGb = max(0.5, perDay * days)`, підбирає найменший план, що покриває потребу (`unlimited` завжди підходить), і показує рекомендацію + прогрес-бар (cap 20 GB).

## 11. Глобальні плани (`/plans/global`)

Статична сторінка з 4 планами з `summary.ts` GLOBAL. Кожна картка → `/checkout?plan=global-…`. Список переваг (130+ країн, instant QR, top up тощо).

## 12. Checkout (`/checkout`)

**Сторінка (`app/checkout/page.tsx`)** — server: `planId = searchParams.plan`, `plan = resolvePlanSummary(planId) ?? fallbackSummary()`. Якщо є авторизація — передай `account = { email, balanceCents }`. `robots: { index: false }`.

**`CheckoutFlow`** (клієнт) з машиною станів `"form" | "processing" | "done"`:
- Guest checkout: email + поля картки (мок), чекбокс згоди з умовами.
- Для залогінених — таби методу оплати: **card** або **balance** (з балансу, якщо `balanceCents >= priceCents`).
- Submit → server action `placeOrder(planId, email)` або `payWithBalance(planId)`.
- Права колонка — `OrderTicket` (summary плану).
- Після успіху — екран **Delivery**: галочка, `orderId`, QR-код, блок SM-DP+ / activation code з кнопкою «Copy», кроки встановлення, лінки «View in My eSIMs» / «Add another destination».

**QR (`src/components/checkout/QrCode.tsx`)** — клієнт, бібліотека `qrcode`: `QRCode.toDataURL(value, { margin:1, width:size*2, errorCorrectionLevel:"M" })` у `useEffect`, рендер у `<img>`.

## 13. Server actions (`app/checkout/actions.ts`)

`"use server";`

- `placeOrder(planId, email)`: валідація → `createOrder` → (опційно) `persistOrder` у БД → (опційно) `sendInvoice` (email + PDF-інвойс) → повертає `OrderResult`.
- `payWithBalance(planId)`: лише для залогінених і за наявності БД. Резолвить ціну, робить **умовний UPDATE** балансу (`WHERE balance_cents >= price` + `RETURNING` — щоб гонка не пішла в мінус), видає eSIM; **якщо видача провалилась — повертає кошти**. Тоді persist + invoice. Повертає `{ ok, error?, order? }`.
- Persist/invoice — **best-effort**: їхній збій НЕ ламає видачу вже виданої eSIM (обгорни в try/catch, лише логуй).

## Що НЕ реалізовувати без окремого запиту
Авторизацію, БД, надсилання пошти й генерацію PDF роби опційними за прапорцем наявності БД/SMTP — весь основний флоу (каталог → пошук → країна → план → checkout → QR) має працювати повністю на моці без жодного зовнішнього сервісу.

## Порядок реалізації
1. Типи → сід країн → генерація планів → summary → API-шов.
2. Пошук + лістинг + картка країни/плану.
3. Checkout (мок createOrder) + QR-екран.
4. Глобальні плани, калькулятор, SEO-метадані.
5. (Опційно) persist у БД, інвойс, оплата з балансу.

Наприкінці запусти `next dev`, пройди флоу в браузері: пошук країни → сторінка країни → «Get this plan» → checkout → підтвердь, що з'являється QR-код і activation code.
