# 🚀 Quick Reference Guide - Enhanced Registration System

## **⚡ Quick Setup (Copy/Paste Commands)**

```bash
# Step 1: Generate Prisma client
cd server
npx prisma generate

# Step 2: Run migration to update database schema
npx prisma migrate dev --name add_user_roles_and_reviews

# Step 3: Backup old seed and copy new seed
cp prisma/seed.js prisma/seed.js.bak
cp prisma/seed-new.js prisma/seed.js

# Step 4: Seed the database with test data
npx prisma db seed

# Step 5: Restart servers (kill current ones first)
# In terminal 1 (server):
npm run dev

# In terminal 2 (client):
cd ../client
npm run dev
```

---

## **🔑 Test Accounts (Copy Full Email/Password)**

| Role         | Email         | Password    | Specialization   | Rating           |
| ------------ | ------------- | ----------- | ---------------- | ---------------- |
| **Provider** | john@fx.com   | password123 | Web Developer    | ⭐⭐⭐⭐⭐ (5.0) |
| **Provider** | sarah@fx.com  | password123 | Graphic Designer | ⭐⭐⭐⭐ (4.9)   |
| **Provider** | mike@fx.com   | password123 | Digital Marketer | ⭐⭐⭐⭐ (4.7)   |
| **Provider** | emily@fx.com  | password123 | Content Writer   | ⭐⭐⭐⭐ (4.6)   |
| **Provider** | david@fx.com  | password123 | Mobile Developer | ⭐⭐⭐⭐ (4.9)   |
| **Provider** | james@fx.com  | password123 | Video Editor     | ⭐⭐⭐⭐ (4.8)   |
| **Buyer**    | alice@fx.com  | password123 | Small Business   | —                |
| **Buyer**    | robert@fx.com | password123 | Startup          | —                |
| **Buyer**    | lisa@fx.com   | password123 | Marketing        | —                |
| **Buyer**    | linda@fx.com  | password123 | E-commerce       | —                |

---

## **🧪 Testing Checklist**

### **Test 1: Role Selection Flow**

- [ ] Click "Join" on homepage
- [ ] Role selection modal appears
- [ ] See "🛒 Service Buyer" and "💼 Service Provider" cards
- [ ] Click on a role - modal updates
- [ ] Form progresses to registration

### **Test 2: Provider Registration**

- [ ] Sign up as new provider
- [ ] Fill in email and password
- [ ] Submit
- [ ] Redirects to `/seller` dashboard
- [ ] Dashboard shows "Become a Seller" welcome page

### **Test 3: Buyer Registration**

- [ ] Sign up as new buyer
- [ ] Submit registration
- [ ] Redirects to `/buyer` dashboard
- [ ] Dashboard shows empty state or profile

### **Test 4: Provider Login**

- [ ] Login with john@fx.com / password123
- [ ] Redirects to `/seller` dashboard
- [ ] See gigs listed (from seed data)
- [ ] See earnings stats
- [ ] Rating shows ⭐⭐⭐⭐⭐

### **Test 5: Buyer Login**

- [ ] Login with alice@fx.com / password123
- [ ] Redirects to `/buyer` dashboard
- [ ] See order history from seed data
- [ ] Orders show COMPLETED status

### **Test 6: Leave Review**

- [ ] Login as buyer (alice@fx.com)
- [ ] Go to `/search`
- [ ] Find gig from provider (john@fx.com)
- [ ] Click gig details
- [ ] Leave review with rating
- [ ] Provider's rating updates on profile

### **Test 7: Navigation**

- [ ] Click "Explore" in NavBar → `/search`
- [ ] Click "Become a Seller" → `/seller`
- [ ] Click "X Business" → `/`
- [ ] All links work correctly

---

## **🛠️ Common Debugging Commands**

### **View Database State (Prisma Studio)**

```bash
cd server
npx prisma studio
```

- Opens visual database browser
- See all users, gigs, orders, reviews
- Edit data directly
- Filter by userType: "provider" or "buyer"

### **Check Seed Data Was Created**

```bash
# In Prisma Studio, run query:
SELECT COUNT(*) FROM "User" WHERE "userType" = 'provider'
```

Should return: **6 providers**

```bash
SELECT COUNT(*) FROM "User" WHERE "userType" = 'buyer'
```

Should return: **4 buyers**

### **Verify Auth Endpoint Works**

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123",
    "userType": "buyer"
  }'
```

Expected response:

```json
{
  "user": {
    "id": "...",
    "email": "test@example.com",
    "userType": "buyer"
  },
  "jwt": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### **Check JWT Token Contents**

```bash
# Go to https://jwt.io
# Paste JWT token from login response
# Verify it contains: email and userId
```

---

## **📊 Database Queries (Using Prisma Client)**

### **Get All Providers with Ratings**

```javascript
const providers = await prisma.user.findMany({
  where: { userType: "provider" },
  include: { gigs: true, reviews: true },
});

console.log(
  providers.map((p) => ({
    name: p.username,
    rating: p.rating,
    totalReviews: p.totalReviews,
    specialization: p.specialization,
  })),
);
```

### **Get Reviews for a Provider**

```javascript
const reviews = await prisma.review.findMany({
  where: {
    gig: {
      userId: "provider_id_here",
    },
  },
  include: { gig: true },
});
```

### **Update Provider Rating (Auto-done on review)**

```javascript
// This happens automatically when review is created
// Review service should:
const review = await prisma.review.create({
  data: { rating, title, comment, gigId },
});

// Then update provider:
const avgRating = await prisma.review.aggregate({
  where: { gig: { userId: providerId } },
  _avg: { rating: true },
  _count: true,
});

await prisma.user.update({
  where: { id: providerId },
  data: {
    rating: avgRating._avg.rating || 0,
    totalReviews: avgRating._count,
  },
});
```

---

## **🐛 Common Issues & Solutions**

### **Issue 1: "userType is not defined" in Frontend**

**Problem:** State not updated after login
**Solution:**

```javascript
// Make sure AuthWrapper sends userType:
const payload = {
  ...values,
  userType: userRole || "buyer", // ← Must be included
};
```

**Check in Redux:**

```javascript
console.log(userInfo); // Should have: { ...user, userType: "provider" }
```

---

### **Issue 2: Role Modal Not Showing**

**Problem:** Show signup but no role selection
**Solution:**

1. Check `showRoleModal` is true in state
2. Verify AuthWrapper `step === "role"` branch
3. Clear browser cache and restart

```javascript
// In AuthWrapper, trace the flow:
console.log("step:", step); // Should be "role" on signup
console.log("showRoleModal:", showRoleModal); // Should be true
```

---

### **Issue 3: Provider Routing to Buyer Dashboard**

**Problem:** Provider logs in but goes to `/buyer`
**Solution:**
Check routing logic after login:

```javascript
// Should check userInfo.userType:
if (userInfo?.userType === "provider") {
  navigate("/seller");
} else if (userInfo?.userType === "buyer") {
  navigate("/buyer");
}
```

---

### **Issue 4: Reviews Not Updating Provider Rating**

**Problem:** Left review but provider rating unchanged
**Solution:**
Verify review controller updates user:

```javascript
// After creating review, must update User:
await User.findByIdAndUpdate(providerId, {
  $set: {
    rating: newAvgRating,
    totalReviews: reviewCount,
  },
});
```

---

### **Issue 5: Seed Data Not Showing**

**Problem:** Ran `npx prisma db seed` but no data
**Solution:**

```bash
# Check if seed file is correct:
ls -la server/prisma/seed.js

# Verify it's the new one:
grep "john@fx.com" server/prisma/seed.js

# Try resetting and seeding:
npx prisma migrate reset  # ⚠️ WARNING: Deletes all data
npx prisma db seed
```

---

## **🎨 UI Elements Reference**

### **Role Selection Cards**

```
┌─────────────────────────────────┐     ┌─────────────────────────────────┐
│        🛒 Service Buyer         │     │    💼 Service Provider          │
├─────────────────────────────────┤     ├─────────────────────────────────┤
│ Find and hire skilled            │     │ Offer your skills and earn      │
│ freelancers for your projects    │     │ money from clients              │
│                                 │     │                                 │
│  [  Select Buyer  ]             │     │  [ Select Provider ]            │
└─────────────────────────────────┘     └─────────────────────────────────┘
```

### **Provider Profile Card**

```
┌──────────────────────────────────┐
│  👤 John Developer               │
├──────────────────────────────────┤
│  💼 Web Developer                │
│  📅 5 Years Experience           │
│  ⭐ 5.0 (12 reviews)             │
│  💬 "Excellent work!" - Alice    │
│  💬 "Professional!" - Bob        │
└──────────────────────────────────┘
```

---

## **📝 Environment Variables Check**

### **Server (.env)**

```
MONGO_URI=mongodb://...
JWT_SECRET=your_secret_key
PORT=5000
```

### **Client (.env.local)**

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Make sure both are set before running servers!

---

## **🚨 Emergency Reset (If Something Breaks)**

```bash
# Option 1: Full database reset
cd server
npx prisma migrate reset
npx prisma db seed

# Option 2: Restore backup and re-migrate
git checkout server/prisma/schema.prisma
npm uninstall @prisma/client
npm install @prisma/client

# Option 3: Start fresh MongoDB
# (Delete local .env and restart with new connection)
```

---

## **✨ Next Steps After Testing**

Once everything works:

1. **Customize provider fields** → Add portfolio, certifications, etc.
2. **Enhanced reviews system** → Add images to reviews, response from providers
3. **Rating badges** → Show badges like "Top Rated" if rating > 4.8
4. **Email notifications** → Notify when order received or review left
5. **Search filters** → Filter gigs by provider rating
6. **Provider analytics** → Chart showing earnings over time

---

**Happy testing! 🎉 If anything breaks, check this guide first!**
