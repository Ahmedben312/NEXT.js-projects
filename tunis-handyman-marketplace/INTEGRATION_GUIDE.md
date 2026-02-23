# Tunis Handyman Marketplace - Integration Guide

## 🎯 What's New

Your marketplace has been enhanced with:

✅ **Modern Landing Page Design** - Professional UI with 7 new sections
✅ **Database Schema Updates** - Added `featured` and `rating` fields to Gig model
✅ **Custom API Hooks** - Reusable React hooks for fetching data
✅ **Seed Data Script** - Pre-populated professionals for testing
✅ **Updated Backend Endpoints** - Support for featured gigs and filtering

---

## 📋 Setup Instructions

### Step 1: Run Database Migration

The Gig model has been updated with new fields (`featured` and `rating`). Push the schema to MongoDB:

```bash
cd server
npx prisma db push --accept-data-loss
```

This updates your MongoDB schema with the new fields.

### Step 2: Seed Featured Professionals

Add sample professional data to your database:

```bash
cd server
node prisma/seed-featured.js
```

This creates 6 featured professionals across different categories:

- Plumbing (Ahmed - 4.9★)
- Electrical (Expert Electrician - 4.8★)
- Carpentry (Custom Furniture - 4.7★)
- Painting (House Painting - 4.6★)
- AC/Climatisation (Climate Control - 4.9★)
- Cleaning (Deep Cleaning - 4.8★)

### Step 3: Start Backend Server

Make sure your server is running:

```bash
cd server
npm run dev  # or your configured start command
```

Default backend URL: `http://localhost:5000`

### Step 4: Start Frontend Application

```bash
cd client
npm run dev
```

Frontend runs on: `http://localhost:3000`

---

## 📁 New Files Created

### Frontend Components

- `client/src/components/Landing/HeroBanner.jsx` - Updated with Tunis marketplace focus
- `client/src/components/Landing/FeaturedProfessionals.jsx` - Display top-rated professionals
- `client/src/components/Landing/HowItWorks.jsx` - 4-step process guide
- `client/src/components/Landing/WhyChoose.jsx` - 6 key benefits section
- `client/src/components/Landing/MessagingDemo.jsx` - Chat interaction showcase
- `client/src/components/Landing/TrustStats.jsx` - Trust metrics and statistics

### Frontend Utilities

- `client/src/hooks/useGigs.js` - Custom hooks:
  - `useFeaturedGigs()` - Fetch featured professionals
  - `useGigsByCategory()` - Get gigs by service type
  - `useCategories()` - Fetch all service categories
  - `useGigDetails()` - Get individual gig details
  - `useSearchGigs()` - Search functionality
  - `useProfessionalsBySpecialization()` - Filter by specialization

- `client/src/utils/apiGigs.js` - API utility functions for gig operations

### Backend Files

- `server/prisma/seed-featured.js` - Database seeding script
- Updated `server/controllers/GigController.js` - Enhanced search with featured support
- Updated `server/prisma/schema.prisma` - New Gig fields

### Updated Files

- `client/src/pages/index.js` - Landing page now uses all new components

---

## 🔌 API Endpoints Reference

### Get Featured Professionals

```
GET /api/gig/search?featured=true&limit=6
```

Response: `{ gigs: [...] }`

### Search Gigs

```
GET /api/gig/search?q=plumbing
GET /api/gig/search?category=Electrical
```

### Get Single Gig

```
GET /api/gig/getGigById/:gigId
```

### Get All Categories

```
GET /api/category/get
```

---

## 🎨 Design Color Scheme

The new design uses a professional, clean color palette:

- **Primary Brand Color**: Emerald-500 (`#10b981`)
- **Hover State**: Emerald-600 (`#059669`)
- **Dark Backgrounds**: Slate-900 (`#0f172a`)
- **Text**: Slate-900 for dark text, Gray-600 for secondary
- **Accents**: Emerald-400 for highlights

All Tailwind classes are used for consistency with your existing design.

---

## 🧪 Testing Checklist

### Homepage

- [ ] Hero section displays with "Tunis Handyman Services" messaging
- [ ] Popular services buttons (Plumbing, Electrical, Carpentry, Painting)
- [ ] Featured professionals load and display with ratings
- [ ] All 6 sections load without errors

### Featured Professionals Section

- [ ] 6 professional cards display
- [ ] Each card shows: name, category, rating, price, delivery time
- [ ] Click "View" button navigates to gig detail page
- [ ] "Browse All Services" button navigates to search page

### How It Works Section

- [ ] 4 steps display correctly
- [ ] Step numbers and icons display
- [ ] Benefit cards show verification, payment, and quality info

### Messaging Demo

- [ ] Chat interface shows sample conversation
- [ ] Message styling works (own messages vs. professional messages)
- [ ] Input field and send button are interactive

### Trust Stats

- [ ] Stats cards display with icons
- [ ] Numbers show correctly
- [ ] CTA buttons are clickable

### Database Integration

- [ ] Professional users created with correct userType
- [ ] Gigs associated with professionals
- [ ] Ratings displayed correctly
- [ ] Featured flag set properly

---

## 🔧 Troubleshooting

### "Featured professionals not loading"

1. Verify backend is running: `http://localhost:5000/api/gig/search?featured=true`
2. Check seed script ran successfully
3. Verify database connection in `.env`

### "TypeScript errors in hooks"

- Ensure you're using the hooks correctly:
  ```javascript
  const { gigs, loading, error } = useFeaturedGigs(6);
  ```

### "Styling looks off"

- Verify Tailwind CSS is configured in `client/tailwind.config.js`
- Clear build cache: `rm -rf .next` then `npm run dev`

### "Schema push failed"

```bash
# Push schema again (safe for MongoDB)
npx prisma db push --accept-data-loss

# Check connection to MongoDB
npx prisma studio

# Reset and re-seed data (caution: removes all data!)
npx prisma db seed
node prisma/seed-featured.js
```

---

## 📝 Next Steps

### Phase 2: Enhanced Features

- [ ] Add professional profile pages
- [ ] Implement real messaging system using sockets
- [ ] Add photo gallery to professional profiles
- [ ] Create provider dashboard with analytics
- [ ] Add ratings and review system UI

### Phase 3: Advanced Features

- [ ] Location-based service discovery
- [ ] Real-time notifications
- [ ] Payment processing integration
- [ ] Advanced search filters
- [ ] Email notifications for messages

---

## 🚀 Performance Optimization Tips

1. **Image Optimization**: Consider using Next.js Image component for all images
2. **Lazy Loading**: Components load on-demand using dynamic imports
3. **Caching**: Implement React Query for API response caching
4. **Database**: Add indexes on `featured`, `category`, `rating` fields for faster searches

---

## 📞 Support Features

All components are built with proper error handling:

- Loading states for all API calls
- User-friendly error messages
- Graceful fallbacks when data is unavailable

---

## ✨ Design System

The landing page follows a consistent design system:

**Typography**: Consistent font sizes and weights across sections
**Spacing**: 16px base unit used throughout (gap-4, p-6, etc.)
**Shadows**: Subtle hover effects on interactive elements
**Animations**: Smooth transitions on all interactive elements
**Responsive**: Mobile-first design, tested on all screen sizes

---

## 📊 Database Schema Changes

### Gig Model (Updated)

```prisma
model Gig {
  id           String    @id @default(auto()) @map("_id") @db.ObjectId
  title        String
  description  String
  category     String
  deliveryTime Int
  revisions    Int
  features     String[]
  price        Float
  shortDesc    String
  createdAt    DateTime  @default(now())
  images       String[]
  rating       Float     @default(0)      // NEW: Professional rating
  featured     Boolean   @default(false)  // NEW: Featured flag
  createdBy    User?     @relation(fields: [userId], references: [id])
  userId       String    @db.ObjectId
  orders       Order[]
  reviews      Reviews[]
}
```

---

## 🎓 Code Examples

### Using Featured Gigs Hook

```javascript
import { useFeaturedGigs } from "../../hooks/useGigs";

const MyComponent = () => {
  const { gigs, loading, error } = useFeaturedGigs(6);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading professionals</p>;

  return (
    <div>
      {gigs.map((gig) => (
        <div key={gig._id}>{gig.title}</div>
      ))}
    </div>
  );
};
```

### Creating a Featured Gig

```javascript
// In backend, when user creates a gig:
const gig = await prisma.gig.create({
  data: {
    title: "Professional Plumbing",
    category: "Plumbing",
    price: 50,
    rating: 4.9,
    featured: true, // Mark as featured
    // ... other fields
  },
});
```

---

## 📱 Mobile Responsiveness

All new components are fully responsive:

- Mobile: Single column layouts
- Tablet: 2-column grids
- Desktop: Multi-column grids with full width

---

## 🔐 Security Notes

The database seed script creates test accounts with placeholder passwords.
**Before production, ensure to:**

1. Hash all passwords using bcrypt
2. Validate all user inputs
3. Implement rate limiting on API endpoints
4. Add CORS configuration
5. Use HTTPS in production

---

For questions or issues, check the CMS documentation or test the endpoints directly using Postman.
