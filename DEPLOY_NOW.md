# 🚀 Deploy TrustLink Now!

## Current Status: Ready to Deploy ✅

Your TrustLink application is ready for deployment. Follow these steps:

## Option 1: Deploy to Vercel (Recommended - 5 minutes)

### Step 1: Commit and Push to GitHub

```bash
# Commit all changes
git add .
git commit -m "Ready for deployment"

# Create GitHub repository (if not done)
# Go to github.com and create a new repository named "trustlink"

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/trustlink.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Vercel

1. **Go to [vercel.com/new](https://vercel.com/new)**
2. **Sign in with GitHub**
3. **Import your repository** (select the trustlink repo)
4. **Configure Project:**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

5. **Add Environment Variables:**
   Click "Environment Variables" and add:
   
   ```
   DATABASE_URL=your-postgres-url-here
   JWT_SECRET=your-secret-here
   NEXTAUTH_SECRET=your-secret-here
   ```
   
   **Generate secrets:**
   ```bash
   # Run these in your terminal:
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

6. **Click "Deploy"**

### Step 3: Set Up Database

**While Vercel is deploying:**

1. **Option A: Vercel Postgres (Easiest)**
   - In Vercel project → Storage tab
   - Click "Create Database" → "Postgres"
   - Copy the connection string
   - Update `DATABASE_URL` in Environment Variables

2. **Option B: Supabase (Free)**
   - Go to [supabase.com](https://supabase.com)
   - Create account → New Project
   - Settings → Database → Connection String
   - Copy "URI" connection string
   - Update `DATABASE_URL` in Vercel

### Step 4: Update Schema for PostgreSQL

After getting PostgreSQL URL:

1. **Update `prisma/schema.prisma`:**
   Change line 9 from:
   ```prisma
   provider = "sqlite"
   ```
   To:
   ```prisma
   provider = "postgresql"
   ```

2. **Commit and push:**
   ```bash
   git add prisma/schema.prisma
   git commit -m "Update to PostgreSQL"
   git push
   ```

3. **Run migrations:**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Link project
   vercel link
   
   # Pull environment
   vercel env pull
   
   # Run migrations
   npx prisma migrate dev --name init
   npx prisma migrate deploy
   ```

### Step 5: Create Admin User

After deployment:

1. **Register a user** via the registration page
2. **Update role to ADMIN** in database:
   - Use Prisma Studio: `npx prisma studio`
   - Or use your database admin panel
   - Find your user and set `role` to `ADMIN`

## Option 2: Deploy to Railway

1. **Go to [railway.app](https://railway.app)**
2. **New Project → Deploy from GitHub**
3. **Select your repository**
4. **Add PostgreSQL** service
5. **Set environment variables**
6. **Deploy!**

## Option 3: Deploy to Render

1. **Go to [render.com](https://render.com)**
2. **New → Web Service**
3. **Connect GitHub repository**
4. **Build settings:**
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. **Add PostgreSQL database**
6. **Set environment variables**
7. **Deploy!**

## ✅ Post-Deployment Checklist

- [ ] Application is accessible
- [ ] Database is connected
- [ ] Can register new users
- [ ] Can create posts
- [ ] Admin dashboard works
- [ ] Environment variables are set
- [ ] HTTPS is enabled (automatic on Vercel)

## 🆘 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Prisma Docs**: https://www.prisma.io/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment

## 🎉 Success!

Once deployed, your TrustLink app will be live at:
`https://your-project.vercel.app`

---

**Quick Commands:**
```bash
# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate NextAuth secret  
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

