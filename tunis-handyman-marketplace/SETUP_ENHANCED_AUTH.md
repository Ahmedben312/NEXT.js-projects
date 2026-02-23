# ⚡ Implementation Steps - Enhanced Registration System

Complete these steps in order to activate the role-based registration:

## 🎯 Phase 1: Database Schema Update

```bash
cd server

# Step 1: Generate Prisma client
npx prisma generate

# Step 2: Create migration
npx prisma migrate dev --name add_user_roles_and_reviews

# If you want to force reset (clears all data):
# npx prisma db push --force-reset
```

✅ **Result:** Database updated with new fields and tables

---

## 🎯 Phase 2: Verify Backend Updates

The following files have been updated automatically:

✅ `server/services/authService.js`

- Now accepts `userType` in registration

✅ `server/controllers/AuthControllers.js`

- Returns `userType` in auth responses

---

## 🎯 Phase 3: Verify Frontend Updates

The following files have been updated automatically:

✅ `client/src/context/constants.js`

- Added role-based reducer cases

✅ `client/src/context/StateReducer.js`

- Added role state management
- Added role modal state

✅ `client/src/components/AuthWrapper.jsx`

- Role selection modal on signup
- Multi-step registration process
- Shows role-specific messages

---

## 🎯 Phase 4: Set Up Test Data

```bash
cd server

# Copy new seed file
cp prisma/seed-new.js prisma/seed.js

# Run seed
npx prisma db seed

# Or if that fails:
node prisma/seed.js
```

✅ **Creates:** 6 providers, 4 buyers, 6 gigs, reviews, and orders

---

## 🎯 Phase 5: Restart Everything

```bash
# Terminal 1 - Kill and restart server
cd server
# Press Ctrl+C to stop
npm run dev

# Terminal 2 - Kill and restart client (new terminal)
cd client
# Press Ctrl+C to stop
npm run dev
```

---

## 🧪 Test Immediately

### Test 1: Role Selection

1. Go to http://localhost:3000
2. Click "Join" button
3. ✅ You should see role selection (🛒 Buyer / 💼 Provider)

### Test 2: Provider Account

```
Email: john@fx.com
Password: password123
Role: Service Provider
```

### Test 3: Buyer Account

```
Email: alice@fx.com
Password: password123
Role: Service Buyer
```

---

## 📋 Database Content

After seeding, you have:

| Type              | Count | Items                                             |
| ----------------- | ----- | ------------------------------------------------- |
| Users (Providers) | 6     | john, sarah, mike, emily, david, james            |
| Users (Buyers)    | 4     | alice, robert, lisa, linda                        |
| Gigs              | 6     | Web Dev, Logo Design, SEO, Writing, Mobile, Video |
| Orders            | 4     | With statuses: completed/in_progress              |
| Reviews           | 6     | With ratings 4-5 stars                            |

---

## ⚠️ Troubleshooting

### Issue: Migrations don't work

```bash
cd server
rm -rf node_modules/.prisma
npx prisma generate
npx prisma migrate deploy
```

### Issue: Seed fails

```bash
npx prisma db push --force-reset
node prisma/seed.js
```

### Issue: Can't see role selection on signup

- Hard refresh: **Ctrl + Shift + R**
- Check browser console: **F12**
- Restart client: **Ctrl+C then npm run dev**

### Issue: Tests accounts not working

- Verify seed ran successfully
- Open Prisma Studio: `npx prisma studio`
- Check if users exist in database

---

## ✅ Success Indicators

When setup is complete, you'll see:

- ✅ **Role modal** on signup ("Service Buyer" or "Service Provider")
- ✅ **Can login** with test accounts
- ✅ **Different experience** based on user role
- ✅ **Provider ratings** displayed on profiles
- ✅ **Review system** works (leave reviews, update ratings)
- ✅ **Buyer and Seller dashboards** functional

---

## 🚀 You're Ready!

The enhanced registration system is now active with:

- Role-based authentication
- Provider profiles with ratings
- Review system with titles and comments
- Test data for immediate testing
- Full multi-step registration flow

**Start by testing the role selection! 🎉**
