# 🚀 Quick Deploy Guide

## Deploy to Vercel in 5 Minutes

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/trustlink.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. **Add Environment Variables:**
   ```
   DATABASE_URL=your-postgres-connection-string
   JWT_SECRET=generate-random-32-char-string
   NEXTAUTH_SECRET=generate-random-32-char-string
   ```
4. Click **Deploy**

### Step 3: Set Up Database

**Option A: Vercel Postgres (Easiest)**
- In Vercel project → Storage → Create Postgres
- Copy connection string to `DATABASE_URL`

**Option B: Supabase (Free)**
- Go to [supabase.com](https://supabase.com)
- Create project → Get connection string
- Update `DATABASE_URL` in Vercel

### Step 4: Update Schema for PostgreSQL

After setting up PostgreSQL, update `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // Change from "sqlite"
  url      = env("DATABASE_URL")
}
```

Then run:
```bash
npx prisma migrate dev --name init
```

### Step 5: Run Migrations

In Vercel dashboard:
- Go to your project → Settings → Build & Development Settings
- Add build command: `npm run build && npx prisma migrate deploy`

Or run manually via Vercel CLI:
```bash
vercel env pull
npx prisma migrate deploy
```

## 🎉 Done!

Your app is now live! Visit your Vercel URL.

## Generate Secrets

```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate NEXTAUTH_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

