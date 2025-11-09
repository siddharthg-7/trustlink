# 🚀 Vercel Deployment - Step by Step

## ✅ Step 1: Code is Ready (DONE)
Your code is committed and ready!

## 📦 Step 2: Push to GitHub

### If you don't have a GitHub repository yet:

1. **Go to [github.com](https://github.com) and sign in**
2. **Click the "+" icon → "New repository"**
3. **Repository name:** `trustlink`
4. **Make it Public or Private** (your choice)
5. **Don't initialize with README** (we already have one)
6. **Click "Create repository"**

### Then run these commands:

```bash
# Add your GitHub repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/trustlink.git
git branch -M main
git push -u origin main
```

**Or if you already have a remote:**
```bash
git push -u origin main
```

## 🌐 Step 3: Deploy to Vercel

### 3.1 Go to Vercel
1. **Open [vercel.com/new](https://vercel.com/new)**
2. **Sign in with GitHub** (use the same GitHub account)

### 3.2 Import Repository
1. **Click "Import"** next to your `trustlink` repository
2. **Or search for "trustlink"** in the repository list

### 3.3 Configure Project
- **Framework Preset:** Next.js (auto-detected) ✅
- **Root Directory:** `./` (default) ✅
- **Build Command:** `npm run build` (default) ✅
- **Output Directory:** `.next` (default) ✅

**Click "Deploy"** (we'll add environment variables after)

### 3.4 Add Environment Variables

**After the first deployment starts, go to:**
1. **Project Settings** → **Environment Variables**
2. **Add these variables:**

```
Name: JWT_SECRET
Value: 7abdc3c36e4af02a7e31caf26bafeac958f3cf40c0a55a241487bed1efcba880
Environment: Production, Preview, Development (select all)

Name: NEXTAUTH_SECRET  
Value: 8f08518cafdb53ed1670c38035b1d8a7808d9ddff618b60ae4ecc01c4d91180d
Environment: Production, Preview, Development (select all)
```

**Click "Save" for each**

### 3.5 Set Up Database

**Option A: Vercel Postgres (Easiest)**

1. In your Vercel project dashboard, go to **"Storage"** tab
2. Click **"Create Database"** → Select **"Postgres"**
3. Choose a name (e.g., "trustlink-db")
4. Select a region (closest to you)
5. Click **"Create"**
6. Once created, go to **"Settings"** → **"Connection String"**
7. Copy the connection string
8. Go to **Environment Variables** and add:
   ```
   Name: DATABASE_URL
   Value: [paste the connection string]
   Environment: Production, Preview, Development (select all)
   ```

**Option B: Supabase (Free Alternative)**

1. Go to [supabase.com](https://supabase.com) and create account
2. Click **"New Project"**
3. Fill in:
   - Name: `trustlink`
   - Database Password: (create a strong password)
   - Region: (choose closest)
4. Click **"Create new project"** (takes 2 minutes)
5. Go to **Settings** → **Database**
6. Find **"Connection string"** → **"URI"**
7. Copy the connection string
8. Add to Vercel Environment Variables as `DATABASE_URL`

### 3.6 Update Schema for PostgreSQL

After setting up the database:

1. **Update `prisma/schema.prisma`:**
   - Change line 9 from `provider = "sqlite"` 
   - To: `provider = "postgresql"`

2. **Commit and push:**
   ```bash
   git add prisma/schema.prisma
   git commit -m "Update to PostgreSQL for production"
   git push
   ```

3. **Vercel will automatically redeploy**

### 3.7 Run Database Migrations

**Option 1: Via Vercel CLI (Recommended)**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Link to your project
vercel link

# Pull environment variables
vercel env pull .env.local

# Run migrations
npx prisma migrate dev --name init
npx prisma migrate deploy
```

**Option 2: Via Vercel Dashboard**

1. Go to your project → **Settings** → **Build & Development Settings**
2. Add to **Build Command:**
   ```
   npm run build && npx prisma migrate deploy
   ```
3. **Save** and **Redeploy**

### 3.8 Create Admin User

After deployment:

1. **Visit your deployed site:** `https://your-project.vercel.app`
2. **Click "Sign Up"** and create an account
3. **Update role to ADMIN:**
   
   **Via Prisma Studio:**
   ```bash
   vercel env pull .env.local
   npx prisma studio
   ```
   - Find your user
   - Change `role` from `USER` to `ADMIN`
   - Save

   **Or via Database:**
   - Connect to your database
   - Update the `User` table
   - Set `role = 'ADMIN'` for your user

## ✅ Step 4: Verify Deployment

1. ✅ Visit your site: `https://your-project.vercel.app`
2. ✅ Test registration
3. ✅ Test login
4. ✅ Create a post
5. ✅ Test voting
6. ✅ Access admin dashboard (if you're admin)

## 🎉 Done!

Your TrustLink app is now live!

## 📝 Quick Reference

**Your Generated Secrets:**
- JWT_SECRET: `7abdc3c36e4af02a7e31caf26bafeac958f3cf40c0a55a241487bed1efcba880`
- NEXTAUTH_SECRET: `8f08518cafdb53ed1670c38035b1d8a7808d9ddff618b60ae4ecc01c4d91180d`

**Important Files:**
- Environment variables saved in: `.env.production.example`
- This guide: `VERCEL_DEPLOY_STEPS.md`

## 🆘 Troubleshooting

**Build fails?**
- Check that all environment variables are set
- Verify DATABASE_URL is correct
- Check build logs in Vercel dashboard

**Database connection fails?**
- Verify DATABASE_URL format
- Check database allows connections from Vercel
- Ensure schema is updated to PostgreSQL

**Can't access admin?**
- Make sure you updated your user role to ADMIN
- Clear browser cache and cookies
- Try logging out and back in

