# 🔧 Environment Setup Guide

## 📋 Overview

Your application needs proper environment configuration to run. We've created `.env` files for both server and client. Follow this guide to set them up.

---

## 🗄️ Database Setup (MongoDB)

### Option 1: Local MongoDB (Recommended for Development)

#### Windows:

1. Download MongoDB Community Edition: https://www.mongodb.com/try/download/community
2. Install it with MongoDB Compass (included)
3. MongoDB runs automatically on `mongodb://localhost:27017`
4. Use the default value in `.env`

#### Mac:

```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community
```

#### Linux (Ubuntu):

```bash
# Install MongoDB
sudo apt-get install -y mongodb

# Start MongoDB
sudo systemctl start mongodb
```

---

### Option 2: MongoDB Atlas (Cloud - Free Tier)

1. Go to https://www.mongodb.com/atlas/database
2. Sign up for free account
3. Create a new cluster (free tier available)
4. Click "Connect" → "Compass"
5. Copy the connection string
6. Update `DATABASE_URL` in `.env`:

```
DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/tunis-handyman
```

Replace with your actual credentials and cluster name.

---

## 🔑 Required Environment Variables

### Server `.env` (server/.env)

```env
# ✅ REQUIRED
DATABASE_URL=mongodb://localhost:27017/tunis-handyman

# Optional but recommended
JWT_SECRET=your_jwt_secret_key_change_this_in_production
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

# Optional
STRIPE_SECRET_KEY=sk_test_your_key
```

### Client `.env.local` (client/.env.local)

```env
# ✅ REQUIRED
NEXT_PUBLIC_SERVER_URL=http://localhost:5000

# Optional
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_your_key
```

---

## ☁️ Optional Services Setup

### Cloudinary (Image Storage)

1. Sign up at https://cloudinary.com/
2. Get your API credentials from Dashboard
3. Update in `server/.env`:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Stripe (Payments)

1. Sign up at https://stripe.com/
2. Go to Dashboard → API Keys
3. Copy test keys
4. Update in both files with your keys

---

## 🚀 Quick Start After Setup

### Terminal 1 - Start MongoDB (if using local)

```bash
# Windows - should auto-start
# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongodb
```

### Terminal 2 - Start Server

```bash
cd server
npm install --legacy-peer-deps  # if not done
npm run dev
# Should see: "Server is listening at url: http://localhost:5000"
```

### Terminal 3 - Start Client

```bash
cd client
npm install  # if not done
npm run dev
# Should see: "ready - started server on 0.0.0.0:3000"
```

---

## ✅ Verification

### Check Server Running

```bash
curl http://localhost:5000/ping
# Should return: pong 🏓
```

### Check Database Connection

- Server logs should NOT show "DATABASE_URL is not set"
- Should see successful startup message

### Check Client Running

- Open http://localhost:3000 in browser
- Should load without errors

---

## 🆘 Common Issues

### Issue: "DATABASE_URL is not set"

**Solution:**

- Ensure `.env` file exists in `server/` directory
- Verify `DATABASE_URL` line is present and not commented
- Restart server: `npm run dev`

### Issue: Connection to MongoDB failed

**Solution:**

- If using local: Start MongoDB service
- If using Atlas: Check connection string is correct
- Verify username/password in connection string

### Issue: NEXT_PUBLIC_SERVER_URL error on client

**Solution:**

- Ensure `.env.local` exists in `client/` directory
- Verify `NEXT_PUBLIC_SERVER_URL=http://localhost:5000`
- Restart client: `npm run dev`

### Issue: Port 5000 already in use

**Solution:**

```bash
# Find what's using port 5000
# Windows
netstat -ano | findstr :5000

# Mac/Linux
lsof -i :5000

# Kill the process or change PORT in .env
PORT=5001
```

---

## 🔒 Security Notes

⚠️ **IMPORTANT FOR PRODUCTION:**

- Change `JWT_SECRET` to a strong random string
- Use strong Cloudinary credentials
- Use Stripe LIVE keys (not test keys)
- Never commit `.env` files to git
- Use `.env.example` for template in git

---

## 📝 Environment Variables Reference

| Variable                      | Location          | Required | Default      | Purpose            |
| ----------------------------- | ----------------- | -------- | ------------ | ------------------ |
| DATABASE_URL                  | server/.env       | ✅ Yes   | -            | MongoDB connection |
| JWT_SECRET                    | server/.env       | ❌ No    | "secert_jwt" | Token signing      |
| CLOUDINARY_CLOUD_NAME         | server/.env       | ❌ No    | -            | Image storage      |
| STRIPE_SECRET_KEY             | server/.env       | ❌ No    | -            | Payment processing |
| NEXT_PUBLIC_SERVER_URL        | client/.env.local | ✅ Yes   | -            | API endpoint       |
| NEXT_PUBLIC_STRIPE_PUBLIC_KEY | client/.env.local | ❌ No    | -            | Stripe frontend    |

---

## 🎯 Next Steps

1. **Set up MongoDB** - Use local or Atlas
2. **Update `.env` files** - With your database URL
3. **Start server** - `npm run dev`
4. **Start client** - `npm run dev`
5. **Test the app** - Visit http://localhost:3000

---

## 💡 Tips

- Bookmark MongoDB connection string for reference
- Keep test Stripe keys handy for testing
- Use same port in both `.env` files (5000 client/server)
- Check firewall if services won't connect

---

**You're all set! Start coding! 🚀**
