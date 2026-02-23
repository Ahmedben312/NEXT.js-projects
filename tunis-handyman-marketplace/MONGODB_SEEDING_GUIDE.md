# 🚀 Database Seeding - MongoDB Replica Set Setup

## ⚠️ Issue: MongoDB Transactions Not Supported

Your local MongoDB instance doesn't have transactions enabled, which Prisma requires for seeding. **This is normal for local development.**

---

## ✅ Solution 1: Use Prisma Studio (Recommended for Quick Testing)

Instead of automated seeding, manually add test data through Prisma Studio:

```bash
cd server
npx prisma studio
```

This opens a visual database browser. You can:
1. Navigate to the **User** collection
2. Click "+ Create" to add new users
3. Fill in the form with test data

**Test accounts to create manually:**

| Email | Password | Type | Specialization |
|-------|----------|------|---|
| john@fx.com | password123 | provider | Web Development |
| alice@fx.com | password123 | buyer | - |

---

## ✅ Solution 2: Test Registration In-App (Easiest)

Simply use the application to register as different users:

1. **Start both servers:**
   ```bash
   # Terminal 1: Server
   cd server && npm run dev
   
   # Terminal 2: Client
   cd client && npm run dev
   ```

2. **In the browser, click "Join"**
   - Select "Service Provider" role
   - Register with: `provider1@test.com / password123`

3. **Create another account as Buyer:**
   - Select "Service Buyer" role
   - Register with: `buyer1@test.com / password123`

4. **That's it!** The backend automatically:
   - Hashes the password securely
   - Stores the `userType` in the database
   - Routes you to the correct dashboard

---

## ✅ Solution 3: Set Up MongoDB Replica Set (Advanced)

If you want automated seeding to work, set up MongoDB as a replica set:

### On Windows (with MongoDB installed):

```bash
# Stop existing MongoDB
net stop MongoDB

# Start with replica set
mongod --replSet rs0
```

In another terminal:

```bash
mongosh
```

Then run:

```javascript
rs.initiate()
```

Wait for replica set to initialize, then restart seeding:

```bash
cd server
npx prisma db seed
```

---

## 📋 What Each Solution Provides

| Solution | Setup Time | Effort | Works Now? |
|----------|-----------|--------|-----------|
| Prisma Studio | 1 minute | ⭐ Very Easy | ✅ Yes |
| In-App Registration | 5 minutes | ⭐ Very Easy | ✅ Yes |
| Replica Set | 10 minutes | ⭐⭐ Medium | ✅ Yes |

---

## 🎯 Recommended Path

**For immediate testing:**

1. Start both servers (`npm run dev` in each terminal)
2. Go to `http://localhost:3000`
3. Click "Join" and test the role selection modal
4. Register as provider, then as buyer
5. Test the flow end-to-end

This validates that your entire system works without needing pre-loaded data!

---

## 🔍 Verify It's Working

After registering at least one user:

```bash
cd server
npx prisma studio
```

You should see your newly registered user in the User collection with `userType` field set correctly.

---

## ✅ Next Steps

Choose one of the solutions above, then:

1. **Register a provider account** - should redirect to `/seller`
2. **Register a buyer account** - should redirect to `/buyer`
3. **Test the role selection modal** - should appear on signup
4. **Check database** - use Prisma Studio to verify data

That's it! The role-based system is live! 🎉
