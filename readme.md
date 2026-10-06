# CRAFTGUARD

A photo-led cultural storytelling platform for Kasuti and Ilkal craft traditions with a respectful marketplace layer.

## 🎯 Project Vision

CRAFTGUARD documents and presents Kasuti and Ilkal craft traditions through:
- Large editorial photography
- Artisan-led stories
- Craft-process documentation
- Curated product discovery
- Transparent product provenance
- A quiet "Make an Offer" flow

## 🏗️ Tech Stack

### Frontend
- **React 18** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **AOS** (Animate On Scroll) for animations
- **React Helmet Async** for SEO
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **PostgreSQL** database
- **Prisma** ORM
- **JWT** authentication
- **Bcrypt** password hashing
- **Nodemailer** for notifications
- **Winston** for logging

## 📁 Project Structure

```
craftguard/
├── client/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── index.css
│       ├── lib/aos-init.js
│       ├── hooks/useReducedMotion.js
│       ├── components/
│       │   ├── layout/Header.jsx
│       │   ├── layout/Footer.jsx
│       │   ├── layout/Layout.jsx
│       │   ├── layout/SkipLink.jsx
│       │   └── editorial/
│       │       ├── Hero.jsx
│       │       ├── EditorialSection.jsx
│       │       ├── ArtisanFeature.jsx
│       │       ├── PullQuote.jsx
│       │       └── CraftTeaser.jsx
│       └── pages/
│           ├── Home.jsx
│           ├── Kasuti.jsx
│           ├── Ilkal.jsx
│           ├── Gallery.jsx
│           ├── Product.jsx
│           ├── About.jsx
│           ├── Login.jsx
│           └── NotFound.jsx
└── server/
    ├── package.json
    ├── .env.example
    ├── prisma/schema.prisma
    └── src/
        ├── server.js
        ├── app.js
        ├── middleware/errorHandler.js
        └── routes/
            ├── index.js
            └── health.routes.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Installation

#### 1. Clone and Setup

```bash
cd craftguard

# Setup backend
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials and secrets

# Setup frontend
cd ../frontend
npm install
```

#### 2. Database Setup

```bash
# In backend directory
npx prisma generate
npx prisma migrate dev --name init
```

#### 3. Seed Database (Optional)

```bash
# Create seed file in backend/prisma/seed.js
# Then run:
npx prisma db seed
```

#### 4. Start Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📱 Routes & Pages

### Public Routes
- `/` - Homepage with editorial hero
- `/kasuti` - Kasuti craft story
- `/ilkal` - Ilkal craft story
- `/gallery` - Product gallery with filters
- `/product/:slug` - Product detail page
- `/about` - About CRAFTGUARD
- `/contact` - Contact information
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/accessibility` - Accessibility statement

### Protected Routes
- `/login` - Artisan/admin login
- `/artisan/dashboard` - Artisan offer management
- `/admin` - Admin dashboard

## 🎨 Design System

### Colors
- **Backgrounds**: Warm neutrals (craft-white, craft-cream, craft-beige)
- **Typography**: Dark charcoal (craft-charcoal, craft-graphite)
- **Accents**: Muted natural tones (craft-rust, craft-indigo, craft-terracotta)

### Typography
- **Display/Serif**: Playfair Display (headings, editorial)
- **Body/Sans**: Inter (UI, body text, metadata)

### Responsive Breakpoints
- Small: 0–639px
- Medium: 640–1023px
- Large: 1024–1439px
- Wide: 1440px+

## 🔐 User Roles & Permissions

| Capability | Visitor | Buyer | Artisan | Editor | Admin |
|------------|---------|-------|---------|--------|-------|
| View stories | ✅ | ✅ | ✅ | ✅ | ✅ |
| View products | ✅ | ✅ | ✅ | ✅ | ✅ |
| Submit offer | ✅ | ✅ | ✅ | ✅ | ✅ |
| Manage profile | ❌ | ✅ | ✅ | ❌ | ✅ |
| Manage products | ❌ | ❌ | ✅ | ✅ | ✅ |
| Publish stories | ❌ | ❌ | ❌ | ✅ | ✅ |
| Manage all offers | ❌ | ❌ | Limited | ✅ | ✅ |
| Manage users | ❌ | ❌ | ❌ | ❌ | ✅ |

## 📦 Key Features

### Editorial Experience
- Full-screen hero with photography
- Long-scroll story pages (scrollytelling)
- Responsive image system with lazy loading
- AOS animations with reduced-motion support
- Semantic HTML structure

### Gallery
- Curated product grid
- Craft type filter
- Availability filter
- Sort options (featured, price, newest)
- Responsive layout

### Product Pages
- Image gallery with thumbnails
- Complete product metadata
- Story and provenance
- Technical details
- Offer action

### Offer Workflow
- Buyer submits offer with form validation
- Email confirmation
- Artisan views pending offers
- Accept/reject/counter actions
- Status tracking
- Audit trail

### Accessibility (WCAG 2.2 AA)
- Semantic HTML
- Keyboard navigation
- Focus management
- Skip links
- ARIA labels
- Color contrast
- Reduced motion support
- Screen reader testing

### SEO
- Meta tags per page
- Open Graph support
- Structured data
- Sitemap
- Readable URLs
- Server-side rendering ready



## 📊 Performance Targets

- Fast First Contentful Paint (FCP)
- Minimal Cumulative Layout Shift (CLS)
- Responsive interaction during scroll
- Optimized image loading
- Code splitting by route

## 🔒 Security

- Password hashing with bcrypt
- JWT authentication
- HTTP-only cookies
- CSRF protection
- Rate limiting
- Input validation
- SQL injection prevention
- XSS prevention

## 📧 Environment Variables

### Backend (.env)
```env
DATABASE_URL="postgresql://..."
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
SESSION_SECRET=your-secret
JWT_SECRET=your-secret
BCRYPT_ROUNDS=10
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🚢 Deployment

### Build for Production

```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build
```

### Database Migration

```bash
npx prisma migrate deploy
```

### Start Production Server

```bash
# Backend
npm start

# Frontend (serve static files from backend or use CDN)
```

## 📝 Content Management

### Adding a Story
1. Create in Prisma Studio or admin dashboard
2. Add story sections with images
3. Set published = true
4. Verify on /kasuti or /ilkal

### Adding a Product
1. Upload media assets
2. Create product with metadata
3. Associate with artisan
4. Set availability status
5. Publish

### Managing Offers
1. Artisan logs in
2. Views pending offers in dashboard
3. Accepts, rejects, or counters
4. System updates product status
5. Buyer receives notification

## ✅ Launch Checklist

- [ ] All editorial pages responsive
- [ ] Hero images optimized
- [ ] Kasuti and Ilkal stories complete
- [ ] Gallery filters working
- [ ] Product pages complete
- [ ] Image gallery keyboard accessible
- [ ] Offer form validated
- [ ] Email notifications working
- [ ] Accessibility audit passed
- [ ] Performance targets met
- [ ] Security review complete
- [ ] Backup system tested
- [ ] Rollback procedure documented

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Run tests
4. Submit pull request

## 📄 License

Copyright © 2026 CRAFTGUARD. All rights reserved.

## 📞 Support

For questions or issues, contact: hello@craftguard.com

---

**Built with respect for tradition and makers.**