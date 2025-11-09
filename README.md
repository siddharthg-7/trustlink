# TrustLink – A Smart Verification Hub

**TrustLink** is an intelligent web application designed to verify and filter online content such as internship opportunities, promotional offers, and potential scam reports. It functions as a centralized community hub where users can post, review, and validate online opportunities through an AI-assisted verification system and community-driven trust model.

## 🎯 Core Features

- **User Authentication**: Email/password and Google OAuth support
- **Role-Based Access**: Admin, Verifier, and General User roles
- **Post Management**: Create, edit, and manage posts in three categories:
  - 🔵 **Promotions** (Blue)
  - 🌸 **Internships** (Pink)
  - 🔴 **Scam Reports** (Red)
- **AI Verification**: Automated link authenticity and scam detection
- **Community Trust System**: Upvote/downvote posts with trust meter
- **Reporting System**: Flag suspicious content for admin review
- **Admin Dashboard**: Manage posts, users, and reports
- **Search & Filter**: Advanced search with category and tag filtering
- **Dark/Light Mode**: User preference theme switching

## 🚀 Quick Deploy

**Want to deploy immediately?** See [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) for a 5-minute deployment guide.

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- SQLite (included with Prisma)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd trustlink
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   **IMPORTANT**: Create a `.env` file in the root directory with the following content:
   ```env
   DATABASE_URL="file:./dev.db"
   JWT_SECRET="your-super-secret-jwt-key-change-in-production"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret-change-in-production"
   AI_VERIFICATION_API_URL="http://localhost:8000"
   ```
   
   You can copy `.env.example` if it exists, or create the file manually. **This step is required before running database commands.**

4. **Initialize the database**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
trustlink/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/        # Authentication endpoints
│   │   ├── posts/       # Post management endpoints
│   │   └── admin/       # Admin endpoints
│   ├── admin/           # Admin dashboard page
│   ├── create/          # Create post page
│   ├── login/           # Login page
│   ├── register/        # Registration page
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── Header.tsx       # Navigation header
│   └── PostCard.tsx     # Post card component
├── lib/                 # Utility libraries
│   ├── prisma.ts        # Prisma client
│   ├── auth.ts          # Authentication utilities
│   └── utils.ts         # Helper functions
├── prisma/
│   └── schema.prisma    # Database schema
└── public/              # Static assets
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, TailwindCSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT tokens
- **UI Components**: Lucide React icons
- **Validation**: Zod

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Posts
- `GET /api/posts` - Get all posts (with filters)
- `POST /api/posts` - Create new post
- `GET /api/posts/[id]` - Get post by ID
- `DELETE /api/posts/[id]` - Delete post
- `POST /api/posts/[id]/vote` - Vote on post
- `POST /api/posts/[id]/report` - Report post

### Admin
- `GET /api/admin/stats` - Get dashboard statistics
- `POST /api/admin/posts/[id]/approve` - Approve flagged post
- `POST /api/admin/posts/[id]/reject` - Reject flagged post

## 🎨 Design System

### Color Palette
- **Promotions**: Blue (#4A90E2)
- **Internships**: Pink (#FF8CC6)
- **Scam Reports**: Red (#FF4E4E)

### Typography
- Font: Inter (via Next.js)

## 🔐 User Roles

1. **ADMIN**: Full access to all features, can approve/reject posts
2. **VERIFIER**: Can verify posts and contribute to AI model
3. **USER**: Can create posts, vote, and report content

## 🚧 Future Enhancements

- [ ] Chrome extension for instant scam detection
- [ ] Browser plugin for WhatsApp/Telegram link verification
- [ ] AI chatbot assistant ("TrustBot")
- [ ] Reputation-based rewards for verifiers
- [ ] Institution-level dashboards
- [ ] Machine learning model integration
- [ ] File upload verification
- [ ] Email notifications
- [ ] Analytics dashboard with graphs

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For contributions, please contact the project maintainers.

## 📧 Contact

For questions or support, please open an issue or contact the development team.

---

**TrustLink** – Empowering users to stay safe, stay informed, and stay smart online.
