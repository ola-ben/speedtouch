# Supabase backend — setup

This folder holds the SQL that creates the database your front-end talks to.
Once configured, the admin can sign in at `/admin/login` and add/edit/delete
products through the dashboard. Public pages will read those products live.

## 1. Create a Supabase project
1. Go to <https://supabase.com> and create a free project.
2. Wait for provisioning (~2 minutes).

## 2. Run the schema
1. Open **SQL Editor** in the Supabase dashboard.
2. Paste the contents of [`schema.sql`](./schema.sql) and run.
3. (Optional) Paste [`seed.sql`](./seed.sql) and run to insert the 12 demo products.

This creates the `products` table, RLS policies (public read, authenticated
write), and the `product-images` storage bucket.

## 3. Add environment variables
Copy `.env.example` to `.env` in the project root and fill in:

```
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

Find both values in Supabase → **Project Settings → API**.

On Vercel, add the same two variables under **Project → Settings → Environment
Variables** so production builds can talk to Supabase.

## 4. Create your admin user
1. Supabase dashboard → **Authentication → Users → Add user**.
2. Use email + password (uncheck "Send invitation" if you want to set the
   password yourself).
3. Visit `/admin/login` on your site and sign in with that email + password.

That's it. Anyone with a Supabase account in this project is treated as an
admin. To restrict further, add a `profiles` table with a `role` column and
update the RLS policies to check `role = 'admin'`.

## 5. Going further
- **Public products migration**: the front-end currently reads from
  `src/data/products.js`. To switch the public listing to Supabase, replace
  the imports of `products` with `useProducts()` (from `src/lib/products.js`).
- **Order capture**: extend `schema.sql` with an `orders` table and write to
  it from `CheckoutPage.jsx` once the user is happy with the cart flow.
- **Real auth gate**: lock `/admin/*` to a specific email allowlist by
  customising `ProtectedAdminRoute.jsx`.
