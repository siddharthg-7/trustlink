#!/bin/bash

# TrustLink Vercel Deployment Preparation Script

echo "🚀 Preparing TrustLink for Vercel Deployment"
echo "============================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating .env.example..."
    cat > .env << EOF
DATABASE_URL="file:./dev.db"
JWT_SECRET="7abdc3c36e4af02a7e31caf26bafeac958f3cf40c0a55a241487bed1efcba880"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="8f08518cafdb53ed1670c38035b1d8a7808d9ddff618b60ae4ecc01c4d91180d"
AI_VERIFICATION_API_URL="http://localhost:8000"
EOF
    echo "✅ Created .env file"
fi

# Check git status
echo ""
echo "📦 Checking Git status..."
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes. Committing now..."
    git add .
    git commit -m "Prepare for Vercel deployment"
    echo "✅ Changes committed"
else
    echo "✅ All changes committed"
fi

# Check if remote exists
echo ""
echo "🔗 Checking Git remote..."
if git remote | grep -q origin; then
    echo "✅ Git remote 'origin' exists"
    git remote -v
else
    echo "⚠️  No Git remote found"
    echo ""
    echo "To add your GitHub repository, run:"
    echo "  git remote add origin https://github.com/YOUR_USERNAME/trustlink.git"
    echo "  git branch -M main"
    echo "  git push -u origin main"
fi

echo ""
echo "✅ Preparation complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Push to GitHub (if not done): git push -u origin main"
echo "2. Go to https://vercel.com/new"
echo "3. Import your repository"
echo "4. Add environment variables (see VERCEL_DEPLOY_STEPS.md)"
echo "5. Deploy!"
echo ""
echo "📖 See VERCEL_DEPLOY_STEPS.md for detailed instructions"

