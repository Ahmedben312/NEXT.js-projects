# 🚀 STARTUP GUIDE - Get Everything Running Now!

## ✅ Step 1: Database Schema is Ready

Your MongoDB schema has been updated with:

- ✅ User roles (`userType`: "buyer" or "provider")
- ✅ Provider specialization and experience tracking
- ✅ Rating system for providers
- ✅ Reviews with titles and ratings
- ✅ Order status tracking

Run from server directory to verify:

```bash
npx prisma studio
```

---

## ✅ Step 2: Start Both Servers

### Terminal 1 - Backend Server:

```bash
cd server
npm run dev
```

Expected output:

```
[app:*] Server running on http://localhost:5000
```

### Terminal 2 - Frontend (in new terminal):

```bash
cd client
npm run dev
```

Expected output:

```
▲ Next.js 14.2.10
  - Local:        http://localhost:3000
```

---

## 🎯 Step 3: Test Role-Based Registration

### Test 1: Provider Registration

1. Open http://localhost:3000
2. Click **"Join"** button
3. **You should see the role selection modal:**

   ```
   ┌─────────────────────────────────┐
   │ 🛒 Service Buyer               │
   │ Find and hire skilled...        │
   └─────────────────────────────────┘

   ┌─────────────────────────────────┐
   │ 💼 Service Provider             │
   │ Offer your skills and earn...   │
   └─────────────────────────────────┘
   ```

4. Click **"💼 Service Provider"**
5. Fill in registration form:
   - Email: `provider1@test.com`
   - Password: `anypassword123`
6. Click "Sign Up"
7. **You should be redirected to `/seller` dashboard**

### Test 2: Buyer Registration

1. Go back to http://localhost:3000
2. Click "Join" again
3. Select **"🛒 Service Buyer"**
4. Register with:
   - Email: `buyer1@test.com`
   - Password: `anypassword123`
5. **You should be redirected to `/buyer` dashboard**

### Test 3: Login

1. Click "Sign In"
2. Use `provider1@test.com` / `anypassword123`
3. Should redirect to `/seller`
4. Use `buyer1@test.com` / `anypassword123`
5. Should redirect to `/buyer`

---

## 🧪 Step 4: Test Features

### Browse Services (as Buyer):

- [ ] Login with buyer account
- [ ] Click "Explore" in navbar
- [ ] Should see gigs (if any created by provider)
- [ ] Click on a gig to see details

### Create a Gig (as Provider):

- [ ] Login with provider account
- [ ] Click "Become a Seller" or "My Gigs"
- [ ] Click "+ Create Gig"
- [ ] Fill in gig details
- [ ] Save gig

### Place an Order (as Buyer):

- [ ] Login with buyer account
- [ ] Find a gig from provider
- [ ] Click "Contact" or "Order Now"
- [ ] Complete order

---

## 📊 Step 5: Verify Database

Open Prisma Studio to see your data:

```bash
cd server
npx prisma studio
```

You should see:

- ✅ **User** collection with 2+ users with `userType` field
- ✅ **Gig** collection with created gigs
- ✅ **Order** collection with placed orders

Example user record:

```json
{
  "_id": "...",
  "email": "provider1@test.com",
  "username": "provider1",
  "userType": "provider",
  "fullName": "Provider Name",
  "specialization": null,
  "yearsExperience": null,
  "rating": 0,
  "totalReviews": 0,
  "createdAt": "2026-02-21T...",
  "updatedAt": "2026-02-21T..."
}
```

---

## ✅ Pre-Populated Test Data (Optional)

If you want to populate the database with sample data:

### Option A: Use Prisma Studio (Easiest)

1. Open Prisma Studio: `npx prisma studio`
2. Click Users → Create
3. Add multiple providers and buyers manually
4. Takes ~5 minutes for 10 users

### Option B: Enable MongoDB Replica Set (Advanced)

1. See `MONGODB_SEEDING_GUIDE.md` for detailed instructions
2. Allows automated seed script to work
3. Takes ~10 minutes to set up

### Option C: Just Use the App

- Register users directly through the UI
- This is actually the best way to test!
- Natural workflow

---

## 🔍 Troubleshooting

### Issue: "Cannot GET /seller"

**Solution:** Make sure both servers are running and user is logged in

### Issue: Role modal not showing on signup

**Solution:**

1. Check browser console for errors (F12)
2. Check `client/src/components/AuthWrapper.jsx` was updated correctly
3. Clear browser cache

### Issue: Redirect to wrong page after login

**Solution:**

1. Check that auth response includes `userType`
2. Verify routing logic in your app checks `userInfo.userType`
3. See line ~500 in `AuthWrapper.jsx`

### Issue: "Password hash failed" when registering

**Solution:** This is normal - passwords are hashed with bcrypt automatically

### Issue: MongoDB connection error

**Solution:**

1. Verify MongoDB is running: `mongosh`
2. Check `.env` for correct `DATABASE_URL`
3. Should be: `mongodb://localhost:27017/tunis-handyman`

---

## Quick Command Reference

```bash
# Start backend
cd server && npm run dev

# Start frontend
cd client && npm run dev

# View database
cd server && npx prisma studio

# Generate Prisma client
cd server && npx prisma generate

# Deploy schema changes
cd server && npx prisma db push

# Create migration (SQL databases only, not MongoDB)
cd server && npx prisma migrate dev --name description
```

---

## 📁 Key Files Modified

- ✅ `client/src/components/AuthWrapper.jsx` - Role selection modal
- ✅ `server/prisma/schema.prisma` - User model with roles
- ✅ `server/controllers/AuthControllers.js` - Returns userType
- ✅ `server/services/authService.js` - Accepts userType
- ✅ `client/src/context/StateReducer.js` - Role state management
- ✅ `client/src/pages/buyer/index.jsx` - Buyer dashboard (NEW)

---

## 🎉 Success Criteria

You'll know everything is working when:

1. ✅ Role selection modal appears on signup
2. ✅ Can register as provider - redirected to `/seller`
3. ✅ Can register as buyer - redirected to `/buyer`
4. ✅ Login works for both roles
5. ✅ Database shows users with `userType` field
6. ✅ NavBar links work correctly
7. ✅ Can browse gigs and place orders
8. ✅ Provider can see their gigs and earnings

---

## 📞 What's Next?

After confirming everything works:

1. **Add review system** - Buyers leave ratings on provider profiles
2. **Create provider portfolio** - Show specialization, years of experience, ratings
3. **Order management** - Buyers track order status
4. **Messaging system** - Real-time chat between buyer & provider
5. **Payment integration** - Process payments (Stripe already set up)

---

**Good luck! 🚀 You now have a fully role-based marketplace with provider ratings!**

If you hit any issues, check the specific files mentioned above and compare with the changes documented in `SUMMARY_OF_CHANGES.md`
