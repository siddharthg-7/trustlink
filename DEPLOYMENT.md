# TrustLink Deployment Guide

## 🚀 Quick Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Step 1: Prepare Your Repository

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in with GitHub
2. **Click "New Project"**
3. **Import your repository**
4. **Configure environment variables:**
   - `DATABASE_URL` - Use a PostgreSQL database (see Database Setup below)
   - `JWT_SECRET` - Generate a secure random string
   - `NEXTAUTH_URL` - Your Vercel deployment URL
   - `NEXTAUTH_SECRET` - Generate a secure random string
   - `AI_VERIFICATION_API_URL` - (Optional) Your AI service URL

5. **Click "Deploy"**

### Step 3: Set Up Production Database

**Option A: Vercel Postgres (Recommended)**
1. In your Vercel project, go to "Storage"
2. Click "Create Database" → "Postgres"
3. Copy the connection string to `DATABASE_URL`

**Option B: External Database (Railway, Supabase, etc.)**
- Use Railway, Supabase, or Neon for PostgreSQL
- Copy the connection string to `DATABASE_URL in Vercel`

### Step 4: Run Database Migrations

After deployment, run migrations:

```bash
# Install Vercel CLI
npm i -g vercel

# Link your project
vercel link

# Run migrations
npx prisma migrate deploy
```

Or use Vercel's deployment hooks to run migrations automatically.

## 🗄️ Database Setup for Production

### Using Supabase (Free Tier Available)

1. **Create account at [supabase.com](https://supabase.com)**
2. **Create a new project**
3. **Get connection string** from Settings → Database
4. **Update Prisma schema** to use PostgreSQL:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

5. **Run migrations:**
   ```bash
   npm run db:generate
   npx prisma migrate dev --name init
   ```

### Using Railway

1. **Create account at [railway.app](https://railway.app)**
2. **Create new project → Add PostgreSQL**
3. **Copy connection string**
4. **Update environment variables**

### Using Neon (Serverless Postgres)

1. **Create account at [neon.tech](https://neon.tech)**
2. **Create new project**
3. **Copy connection string**
4. **Update environment variables**

## 🤖 Deploy AI Service (Optional)

### Option 1: Railway

1. **Create new service** in Railway
2. **Connect your repository**
3. **Set root directory** to `ai-service`
4. **Add start command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Deploy**

### Option 2: Render

1. **Create new Web Service** in Render
2. **Connect repository**
3. **Set root directory:** `ai-service`
4. **Build command:** `pip install -r requirements.txt`
5. **Start command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. **Deploy**

### Option 3: Fly.io

1. **Install Fly CLI:** `curl -L https://fly.io/install.sh | sh`
2. **Create fly.toml** in `ai-service` directory
3. **Deploy:** `fly deploy`

## 📝 Environment Variables Checklist

Make sure these are set in your deployment platform:

### Required
- ✅ `DATABASE_URL` - PostgreSQL connection string
- ✅ `JWT_SECRET` - Random secure string (32+ characters)
- ✅ `NEXTAUTH_SECRET` - Random secure string (32+ characters)

### Optional
- `NEXTAUTH_URL` - Your deployment URL (auto-set by Vercel)
- `AI_VERIFICATION_API_URL` - AI service URL if using

## 🔧 Post-Deployment Steps

1. **Run database migrations:**
   ```bash
   npx prisma migrate deploy
   ```

2. **Create admin user:**
   - Use the registration endpoint
   - Update role to ADMIN in database

3. **Test the application:**
   - Visit your deployment URL
   - Create a test post
   - Verify all features work

## 🐛 Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check if database allows connections from Vercel IPs
- Ensure SSL is enabled (add `?sslmode=require` to connection string)

### Build Errors
- Check Node.js version (should be 18+)
- Verify all dependencies are in `package.json`
- Check build logs in Vercel dashboard

### Migration Issues
- Run `npx prisma generate` before deploying
- Ensure Prisma Client is generated
- Check database permissions

## 🔒 Security Checklist

- [ ] Use strong, unique `JWT_SECRET` and `NEXTAUTH_SECRET`
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Use environment variables for all secrets
- [ ] Enable database SSL
- [ ] Set up proper CORS if needed
- [ ] Review and update security headers

## 📊 Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Error Tracking**: Consider adding Sentry
- **Database Monitoring**: Use your database provider's dashboard

## 🔄 Continuous Deployment

Vercel automatically deploys on every push to main branch. For other branches:
- Preview deployments are created automatically
- Merge to main to deploy to production

## 📱 Custom Domain

1. **In Vercel dashboard**, go to Settings → Domains
2. **Add your domain**
3. **Update DNS records** as instructed
4. **Update `NEXTAUTH_URL`** if needed

---

**Need help?** Check the [Vercel Documentation](https://vercel.com/docs) or open an issue.

