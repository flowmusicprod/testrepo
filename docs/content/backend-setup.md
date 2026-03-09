# DE'JERI Backend Setup (Supabase + Stripe + Resend)

## Environment Variables
Set these in `apps/web/.env.local`:

- `DEJERI_ADMIN_PASSPHRASE`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `BRAND_CONTACT_EMAIL`

## Supabase Tables
Run this SQL in Supabase:

```sql
create table if not exists contact_submissions (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  submitted_at timestamptz not null default now()
);

create table if not exists orders (
  id bigint generated always as identity primary key,
  stripe_payment_intent_id text unique not null,
  sku text not null,
  product_name text not null,
  quantity int not null,
  amount_cents int not null,
  customer_email text,
  status text not null,
  paid_at timestamptz
);

create table if not exists collaboration_applications (
  id bigint generated always as identity primary key,
  full_name text not null,
  email text not null,
  interest_type text not null,
  portfolio_link text,
  notes text not null,
  submitted_at timestamptz not null default now()
);
```

## Stripe Webhook
Point Stripe webhook endpoint to:

- `https://<your-domain>/api/stripe/webhook`

Listen for:

- `payment_intent.succeeded`
- `payment_intent.payment_failed`
