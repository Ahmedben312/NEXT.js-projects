# 🚀 Enhanced Registration System Setup Guide

This guide explains the new role-based registration system and how to set it up with test data.

## 📋 What's New

### 1. **Role-Based Registration**

- Users now select between **Service Buyer** or **Service Provider** during signup
- Different user types have different features and dashboards
- User roles are stored in the database for access control

### 2. **Enhanced User Model**

- Added `userType` field (buyer/provider)
- Added provider fields: `specialization`, `yearsExperience`
- Added rating system: `rating`, `totalReviews`
- Added timestamp tracking: `updatedAt`

### 3. **Improved Reviews System**

- Reviews now include a `title` field
- Better integration with provider ratings
- Review system tracks provider reputation

## 🔧 Setup Instructions

### Step 1: Update Database Schema

Run the Prisma migration to update your database:

```bash
cd server
npx prisma migrate dev --name add_user_roles
```

If you get errors about existing data, you can:

```bash
npx prisma db push --force-reset
```

### Step 2: Seed Database with Test Data

Replace the old seed file with the new enhanced one:

```bash
# Copy the new seed file
cp prisma/seed-new.js prisma/seed.js

# Run the seed
npx prisma db seed
```

This creates:

- **6 Service Providers** with different specializations and ratings
- **4 Service Buyers** with different backgrounds
- **6 Gigs** across different service categories
- **4 Completed Orders** and **review data**
- All with realistic ratings and reviews

### Step 3: Restart the Application

```bash
# Terminal 1: Start Server
cd server
npm run dev

# Terminal 2: Start Client
cd client
npm run dev
```

## 🧪 Test Accounts

### Service Providers (Sellers)

| Email | Password | Specialization | Rating |
|-------|----------||----------|--------|
| john@fx.com | password123 | Web Development | ⭐⭐⭐⭐⭐ |
| sarah@fx.com | password123 | Graphic Design | ⭐⭐⭐⭐✨ |
| mike@fx.com | password123 | Digital Marketing | - |
| emily@fx.com | password123 | Content Writing | - |
| david@fx.com | password123 | Mobile Development | - |
| james@fx.com | password123 | Video & Animation | - |

### Service Buyers (Buyers)

| Email         | Password    | Background           |
| ------------- | ----------- | -------------------- |
| alice@fx.com  | password123 | Small Business Owner |
| robert@fx.com | password123 | Startup Founder      |
| lisa@fx.com   | password123 | Marketing Manager    |
| linda@fx.com  | password123 | E-commerce Owner     |

## 🎯 How It Works

### Registration Flow

1. **User clicks "Join"** → Role selection modal appears

   ```
   Choose your account type:
   🛒 Service Buyer
   💼 Service Provider
   ```

2. **Select role** → Registration form appears with role info

3. **Fill details** → Email, password, and auto-detected user type

4. **Success** → User redirected with role-based dashboard access

### Login Flow

1. User clicks "Sign in"
2. Standard login form
3. System automatically detects user role from database
4. Redirected to appropriate dashboard

## 📊 Key Features by Role

### Service Provider Features

- Create and manage gigs
- View provider dashboard with earnings
- See client reviews and ratings
- Message with buyers
- Track orders

### Service Buyer Features

- Browse and search gigs
- Place orders
- Leave reviews for providers
- Message with providers
- Track order history

## 🔍 Testing the System

### Test 1: Provider Registration

1. Go to home page, click "Join"
2. Select "💼 Service Provider"
3. Create account with provider role
4. You can now create gigs

### Test 2: Buyer Registration

1. Go to home page, click "Join"
2. Select "🛒 Service Buyer"
3. Create account with buyer role
4. You can browse and buy gigs

### Test 3: Try Test Accounts

1. Click "Sign in"
2. Use any test account credentials above
3. Each has different roles and data

### Test 4: Reviews System

1. Login as a buyer
2. Complete a gig/order
3. Leave a review with a title, comment, and rating (1-5)
4. Provider's rating updates automatically

## 📁 Modified Files

### Backend

- `server/prisma/schema.prisma` - Updated User model
- `server/services/authService.js` - User type support in registration
- `server/controllers/AuthControllers.js` - Return userType on login
- `server/prisma/seed-new.js` - Enhanced test data

### Frontend

- `client/src/components/AuthWrapper.jsx` - Role selection step
- `client/src/context/StateReducer.js` - Role state management
- `client/src/context/constants.js` - New reducer cases

## 🐛 Troubleshooting

### "User signup requires userType" error

- Make sure you've updated the schema and run migrations
- Clear your database and reseed

### Seed command fails

- Delete `node_modules/.prisma` folder
- Run `npx prisma generate`
- Try seeding again

### Still seeing old data

- Run `npx prisma db push --force-reset`
- This will clear all data and recreate schema
- Then seed with new data

## 🚀 Next Steps

1. ✅ **Users can now register as providers or buyers**
2. ✅ **Providers have reviews and ratings**
3. ✅ **Test data is available**

You can now:

- Test the role-based registration flow
- Try different user types
- See how providers are rated
- Test the full booking flow

## 📞 Support

If you encounter any issues:

1. Check that all migrations ran: `npx prisma migrate deploy`
2. Verify test data: `npx prisma studio` (opens database viewer)
3. Check console errors in VS Code terminal
4. Ensure both server and client are running on correct ports (5000, 3000)

---

**Happy testing! 🎉**
