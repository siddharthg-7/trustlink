# TrustLink Setup Guide

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-super-secret-jwt-key-change-in-production"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret-change-in-production"
   AI_VERIFICATION_API_URL="http://localhost:8000"
   ```

3. **Initialize the database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Optional: AI Verification Service

If you want to use the AI verification service:

1. **Navigate to the AI service directory**
   ```bash
   cd ai-service
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Start the AI service**
   ```bash
   python main.py
   ```

   The service will run on `http://localhost:8000`

4. **Update your `.env` file**
   
   Make sure `AI_VERIFICATION_API_URL="http://localhost:8000"` is set.

## Creating Your First Admin User

After setting up the database, you can create an admin user using Prisma Studio:

1. **Open Prisma Studio**
   ```bash
   npm run db:studio
   ```

2. **Create a user** in the User table with:
   - `email`: Your email
   - `password`: (hashed - use the register endpoint first, then update role)
   - `role`: `ADMIN`

   Or use the API:
   ```bash
   # First register
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@example.com","password":"password123","name":"Admin"}'
   
   # Then manually update the role to ADMIN in Prisma Studio
   ```

## Database Management

- **View database**: `npm run db:studio`
- **Generate Prisma Client**: `npm run db:generate`
- **Push schema changes**: `npm run db:push`
- **Create migration**: `npm run db:migrate`

## Troubleshooting

### Database Issues
- If you get database errors, try deleting `dev.db` and running `npm run db:push` again
- Make sure `DATABASE_URL` in `.env` points to `file:./dev.db`

### Port Already in Use
- Change the port in `package.json` scripts or use `PORT=3001 npm run dev`

### AI Service Not Working
- The app will work without the AI service (uses default scores)
- Make sure the AI service is running if you want real verification
- Check `AI_VERIFICATION_API_URL` in `.env`

## Production Deployment

1. **Update environment variables** with production values
2. **Change database** from SQLite to PostgreSQL or MySQL
3. **Update `DATABASE_URL`** in `.env`
4. **Run migrations**: `npm run db:migrate`
5. **Build**: `npm run build`
6. **Start**: `npm start`

## Next Steps

- Create your first post
- Explore the admin dashboard (if you're an admin)
- Customize the AI verification service
- Add more features from the roadmap

