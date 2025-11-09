# 🚀 Fresh Vercel Deployment Guide

## ✅ Pre-Deployment Checklist

Before deploying, make sure you have:
- [x] Code pushed to GitHub
- [ ] GitHub repository created
- [ ] Vercel account ready

## 📋 Step-by-Step Deployment

### Step 1: Verify Your Code is Ready

Your code is already committed and ready. Verify with:
```bash
git status
```

If you need to push to GitHub:
```bash
git push origin main
```

### Step 2: Create New Vercel Project

1. **Go to [vercel.com/new](https://vercel.com/new)**
2. **Sign in with GitHub**
3. **Click "Add New..." → "Project"**
4. **Import your repository:**
   - Search for `trustlink` or `siddharthg-7/trustlink`
   - Click "Import"

### Step 3: Configure Project Settings

**Project Settings:**
- **Framework Preset:** Next.js (auto-detected) ✅
- **Root Directory:** `./` (default) ✅
- **Build Command:** Leave default (we use `vercel-build` script) ✅
- **Output Directory:** `.next` (default) ✅
- **Install Command:** `npm install` (default) ✅

**⚠️ IMPORTANT: Do NOT click Deploy yet!**

### Step 4: Add Environment Variables FIRST

**Before deploying, add these environment variables:**

Go to **"Environment Variables"** section and add:

**1. DATABASE_URL (Temporary for build)**
```
Name: DATABASE_URL
Value: file:./dev.db
Environment: ☑ Production ☑ Preview ☑ Development
```
*This is temporary - we'll update it after deployment*

**2. JWT_SECRET**
```
Name: JWT_SECRET
Value: 7abdc3c36e4af02a7e31caf26bafeac958f3cf40c0a55a241487bed1efcba880
Environment: ☑ Production ☑ Preview ☑ Development
```

**3. NEXTAUTH_SECRET**
```
Name: NEXTAUTH_SECRET
Value: 8f08518cafdb53ed1670c38035b1d8a7808d9ddff618b60ae4ecc01c4d91180d
Environment: ☑ Production ☑ Preview ☑ Development
```

**Click "Save" for each variable**

### Step 5: Deploy

Now click **"Deploy"** button.

The build should succeed because:
- ✅ `DATABASE_URL` is set (even if temporary)
- ✅ `vercel-build` script will run `prisma generate && next build`
- ✅ All environment variables are configured

### Step 6: Wait for Build

Monitor the build logs. It should:
1. ✅ Install dependencies
2. ✅ Run `vercel-build` script
3. ✅ Generate Prisma Client
4. ✅ Build Next.js app
5. ✅ Deploy successfully

### Step 7: Set Up Production Database

**After successful deployment:**

**Option A: Vercel Postgres (Recommended)**

1. In your Vercel project dashboard, go to **"Storage"** tab
2. Click **"Create Database"**
3. Select **"Postgres"**
4. Name: `trustlink-db`
5. Region: Choose closest to you
6. Click **"Create"**
7. Once created, go to **"Settings"** → **"Connection String"**
8. Copy the **"URI"** connection string
9. Go to **"Environment Variables"**
10. **Update** `DATABASE_URL` with the PostgreSQL connection string
11. **Redeploy** (Vercel will auto-redeploy when env vars change)

**Option B: Supabase (Free Alternative)**

1. Go to [supabase.com](https://supabase.com) and create account
2. Click **"New Project"**
3. Fill in details and create project
4. Go to **Settings** → **Database** → **Connection string** → **URI**
5. Copy the connection string
6. Update `DATABASE_URL` in Vercel
7. Redeploy

### Step 8: Update Schema for PostgreSQL

1. **Update `prisma/schema.prisma`:**
   - Change line 9 from: `provider = "sqlite"`
   - To: `provider = "postgresql"`

2. **Commit and push:**
   ```bash
   git add prisma/schema.prisma
   git commit -m "Update to PostgreSQL for production"
   git push
   ```

3. **Vercel will automatically redeploy**

### Step 9: Run Database Migrations

**Via Vercel CLI:**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link to project
vercel link

# Pull environment
vercel env pull .env.local

# Generate Prisma Client
npx prisma generate

# Create and run migrations
npx prisma migrate dev --name init
npx prisma migrate deploy
```

### Step 10: Create Admin User

1. **Visit your deployed site:** `https://your-project.vercel.app`
2. **Click "Sign Up"** and create an account
3. **Update role to ADMIN:**

   ```bash
   # Pull environment
   vercel env pull .env.local
   
   # Open Prisma Studio
   npx prisma studio
   ```
   
   - Opens at `http://localhost:5555`
   - Find your user in `User` table
   - Change `role` from `USER` to `ADMIN`
   - Save

## ✅ Success Checklist

- [ ] Project deployed to Vercel
- [ ] Build succeeded
- [ ] Environment variables added
- [ ] Database created (PostgreSQL)
- [ ] DATABASE_URL updated to PostgreSQL
- [ ] Schema updated to PostgreSQL
- [ ] Migrations run successfully
- [ ] Site is accessible
- [ ] Can register user
- [ ] Can create posts
- [ ] Admin user created

## 🎉 Done!

Your TrustLink app is now live!

## 🔑 Your Secrets (Keep Safe)

```
JWT_SECRET=7abdc3c36e4af02a7e31caf26bafeac958f3cf40c0a55a241487bed1efcba880
NEXTAUTH_SECRET=8f08518cafdb53ed1670c38035b1d8a7808d9ddff618b60ae4ecc01c4d91180d
```

## 🆘 Troubleshooting

**Build fails with DATABASE_URL error?**
- Make sure you added DATABASE_URL before deploying
- Use `file:./dev.db` as temporary value

**Prisma generate fails?**
- Check DATABASE_URL is set
- Verify vercel-build script exists in package.json

**Database connection fails?**
- Verify DATABASE_URL format is correct
- Check database allows connections from Vercel
- Ensure schema is updated to PostgreSQL

---

**Ready? Start with Step 2 above!** 🚀

