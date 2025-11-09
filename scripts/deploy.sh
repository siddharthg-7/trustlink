#!/bin/bash

# TrustLink Deployment Script
# This script helps prepare the project for deployment

echo "🚀 TrustLink Deployment Preparation"
echo "===================================="

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found"
    echo "Creating .env.example template..."
    cat > .env.example << EOF
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-change-in-production"
AI_VERIFICATION_API_URL="http://localhost:8000"
EOF
    echo "✅ Created .env.example"
    echo "Please create .env file with your production values"
fi

# Generate Prisma Client
echo "📦 Generating Prisma Client..."
npm run db:generate

# Build the project
echo "🏗️  Building Next.js application..."
npm run build

echo "✅ Build complete!"
echo ""
echo "Next steps:"
echo "1. Push your code to GitHub/GitLab/Bitbucket"
echo "2. Deploy to Vercel (recommended) or your preferred platform"
echo "3. Set up PostgreSQL database"
echo "4. Configure environment variables"
echo "5. Run database migrations: npx prisma migrate deploy"
echo ""
echo "See DEPLOYMENT.md for detailed instructions"

