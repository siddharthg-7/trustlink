# 🚀 Automated Vercel Deployment Guide

## ✅ What's Already Done

- ✅ Code is committed locally
- ✅ Secrets generated and saved
- ✅ All files ready for deployment

## 📋 Your Generated Secrets (SAVE THESE!)

```
JWT_SECRET=7abdc3c36e4af02a7e31caf26bafeac958f3cf40c0a55a241487bed1efcba880
NEXTAUTH_SECRET=8f08518cafdb53ed1670c38035b1d8a7808d9ddff618b60ae4ecc01c4d91180d
```

## 🎯 Step-by-Step Deployment

### Step 1: Create GitHub Repository

1. **Go to [github.com/new](https://github.com/new)**
2. **Repository name:** `trustlink`
3. **Description:** "TrustLink - Smart Verification Hub"
4. **Visibility:** Public or Private (your choice)
5. **⚠️ IMPORTANT:** Do NOT check:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
6. **Click "Create repository"**

### Step 2: Push Code to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Your repository URL (update if different)
git remote set-url origin https://github.com/siddharthg-7/trustlink.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

1. **Go to [vercel.com/new](https://vercel.com/new)**
2. **Sign in with GitHub** (use the same GitHub account)
3. **Click "Import"** next to your `trustlink` repository
4. **Project Settings:**
   - Framework: Next.js (auto-detected) ✅
   - Root Directory: `./` ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `.next` ✅

5. **Click "Deploy"** (don't add env vars yet - we'll do that after)

### Step 4: Add Environment Variables

**After deployment starts:**

1. **Go to your project** → **Settings** → **Environment Variables**
2. **Add these 3 variables:**

   **Variable 1:**
   ```
   Name: JWT_SECRET
   Value: 7abdc3c36e4af02a7e31caf26bafeac958f3cf40c0a55a241487bed1efcba880
   Environment: ☑ Production ☑ Preview ☑ Development
   ```

   **Variable 2:**
   ```
   Name: NEXTAUTH_SECRET
   Value: 8f08518cafdb53ed1670c38035b1d8a7808d9ddff618b60ae4ecc01c4d91180d
   Environment: ☑ Production ☑ Preview ☑ Development
   ```

   **Variable 3 (we'll add this after creating database):**
   ```
   Name: DATABASE_URL
   Value: [will be added in next step]
   Environment: ☑ Production ☑ Preview ☑ Development
   ```

3. **Click "Save"** for each variable

### Step 5: Set Up Database

**Option A: Vercel Postgres (Easiest - Recommended)**

1. In Vercel project dashboard, click **"Storage"** tab
2. Click **"Create Database"**
3. Select **"Postgres"**
4. Name: `trustlink-db`
5. Region: Choose closest to you
6. Click **"Create"** (takes ~30 seconds)
7. Once created:
   - Go to **"Settings"** tab
   - Scroll to **"Connection String"**
   - Copy the **"URI"** connection string
8. Go to **"Environment Variables"** in Settings
9. Add/Update `DATABASE_URL` with the connection string
10. **Redeploy** (Vercel will auto-redeploy when you save env vars)

**Option B: Supabase (Free Alternative)**

1. Go to [supabase.com](https://supabase.com) and sign up
2. Click **"New Project"**
3. Fill in:
   - Name: `trustlink`
   - Database Password: (create a strong password - save it!)
   - Region: Choose closest
4. Click **"Create new project"** (takes 2 minutes)
5. Go to **Settings** → **Database**
6. Find **"Connection string"** section
7. Copy the **"URI"** connection string (starts with `postgresql://`)
8. Add to Vercel as `DATABASE_URL`

### Step 6: Update Schema for PostgreSQL

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

### Step 7: Run Database Migrations

**Via Vercel CLI (Recommended):**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link to project (select your project)
vercel link

# Pull environment
vercel env pull .env.local

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init
npx prisma migrate deploy
```

**Or via Vercel Dashboard:**

1. Go to **Settings** → **Build & Development Settings**
2. Update **Build Command** to:
   ```
   npm run build && npx prisma migrate deploy
   ```
3. Click **Save**
4. Go to **Deployments** → Click **"Redeploy"**

### Step 8: Create Admin User

1. **Visit your deployed site:** `https://your-project.vercel.app`
2. **Click "Sign Up"** and create an account
3. **Update role to ADMIN:**

   **Via Prisma Studio:**
   ```bash
   vercel env pull .env.local
   npx prisma studio
   ```
   - Opens browser at `http://localhost:5555`
   - Find your user in the `User` table
   - Click on your user
   - Change `role` from `USER` to `ADMIN`
   - Click **Save**

## ✅ Verification Checklist

- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Environment variables added
- [ ] Database created and connected
- [ ] Schema updated to PostgreSQL
- [ ] Migrations run successfully
- [ ] Site is accessible
- [ ] Can register new user
- [ ] Can create posts
- [ ] Admin user created

## 🎉 Success!

Your TrustLink app is now live at: `https://your-project.vercel.app`

## 📝 Quick Commands Reference

```bash
# Push to GitHub
git push -u origin main

# Link Vercel project
vercel link

# Pull environment
vercel env pull .env.local

# Run migrations
npx prisma migrate deploy

# Open Prisma Studio
npx prisma studio
```

## 🆘 Need Help?

- **GitHub repo not found?** Make sure you created it first
- **Build fails?** Check environment variables are set
- **Database error?** Verify DATABASE_URL is correct
- **Can't access admin?** Make sure you updated user role

---

**Your Secrets (Keep Safe):**
- JWT_SECRET: `7abdc3c36e4af02a7e31caf26bafeac958f3cf40c0a55a241487bed1efcba880`
- NEXTAUTH_SECRET: `8f08518cafdb53ed1670c38035b1d8a7808d9ddff618b60ae4ecc01c4d91180d`

