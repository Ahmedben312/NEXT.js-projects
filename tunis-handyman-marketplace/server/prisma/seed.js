import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createHash = (str) => `hashed_${str.substring(0, 10)}_${Date.now()}`;

async function main() {
  console.log("🌱 Starting database seed...\n");

  // Test connection
  try {
    const count = await prisma.user.count();
    console.log(`✓ Connected to MongoDB (${count} existing users)\n`);
  } catch (e) {
    console.error("❌ Connection failed:", e.message);
    process.exit(1);
  }

  try {
    await prisma.messages.deleteMany({});
    await prisma.reviews.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.gig.deleteMany({});
    await prisma.user.deleteMany({});
    console.log("✓ Database cleared\n");
  } catch (e) {
    console.log("ℹ Skipped clearing (may be empty or unsupported)\n");
  }

  console.log("👨‍💼 Creating providers...");

  const providers = [
    { email: "john@fx.com", name: "John Doe", spec: "Web Development", yrs: 5, rating: 5.0 },
    { email: "sarah@fx.com", name: "Sarah Wilson", spec: "Graphic Design", yrs: 7, rating: 4.9 },
    { email: "mike@fx.com", name: "Mike Chen", spec: "Digital Marketing", yrs: 6, rating: 4.7 },
    { email: "emily@fx.com", name: "Emily Rodriguez", spec: "Content Writing", yrs: 4, rating: 4.6 },
    { email: "david@fx.com", name: "David Kim", spec: "Mobile Development", yrs: 8, rating: 4.9 },
    { email: "james@fx.com", name: "James Wilson", spec: "Video Editing", yrs: 6, rating: 4.8 },
  ];

  const providerRecs = [];
  for (const p of providers) {
    const user = await prisma.user.create({
      data: {
        email: p.email,
        password: createHash("password123"),
        username: p.email.split("@")[0],
        fullName: p.name,
        userType: "provider",
        specialization: p.spec,
        yearsExperience: p.yrs,
        rating: p.rating,
        totalReviews: 1,
        isProfileInfoSet: true,
      },
    });
    providerRecs.push(user);
  }

  console.log(`✓ Created ${providerRecs.length} providers\n`);

  console.log("👥 Creating buyers...");

  const buyerEmails = ["alice@fx.com", "robert@fx.com", "lisa@fx.com", "linda@fx.com"];
  const buyerRecs = [];

  for (const email of buyerEmails) {
    const user = await prisma.user.create({
      data: {
        email,
        password: createHash("password123"),
        username: email.split("@")[0],
        fullName: email.split("@")[0].toUpperCase(),
        userType: "buyer",
        isProfileInfoSet: true,
      },
    });
    buyerRecs.push(user);
  }

  console.log(`✓ Created ${buyerRecs.length} buyers\n`);

  console.log("💼 Creating gigs...");

  const gigs = [
    { title: "React Website Development", desc: "Build modern React website", price: 500, userId: providerRecs[0].id },
    { title: "Logo Design", desc: "Professional logo design", price: 300, userId: providerRecs[1].id },
    { title: "SEO Optimization", desc: "Optimize for search engines", price: 400, userId: providerRecs[2].id },
    { title: "Blog Writing", desc: "Professional blog posts", price: 150, userId: providerRecs[3].id },
    { title: "Mobile App Dev", desc: "React Native app development", price: 1500, userId: providerRecs[4].id },
    { title: "Video Editing", desc: "Professional video editing", price: 350, userId: providerRecs[5].id },
  ];

  const gigRecs = [];
  for (const g of gigs) {
    const gig = await prisma.gig.create({
      data: {
        title: g.title,
        description: g.desc,
        category: "Services",
        price: g.price,
        deliveryTime: 7,
        revisions: 3,
        features: [g.title],
        shortTitle: g.title,
        shortDesc: g.desc,
        images: [],
        userId: g.userId,
      },
    });
    gigRecs.push(gig);
  }

  console.log(`✓ Created ${gigRecs.length} gigs\n`);

  console.log("📦 Creating orders...");

  const orders = [
    { gigId: gigRecs[0].id, buyer: buyerRecs[0], seller: providerRecs[0], status: "completed" },
    { gigId: gigRecs[1].id, buyer: buyerRecs[1], seller: providerRecs[1], status: "completed" },
    { gigId: gigRecs[2].id, buyer: buyerRecs[2], seller: providerRecs[2], status: "in_progress" },
    { gigId: gigRecs[3].id, buyer: buyerRecs[3], seller: providerRecs[3], status: "completed" },
  ];

  for (const o of orders) {
    await prisma.order.create({
      data: {
        gigId: o.gigId,
        title: gigRecs[orders.indexOf(o)].title,
        price: gigRecs[orders.indexOf(o)].price,
        img: "",
        seller: o.seller.username,
        buyer: o.buyer.username,
        sellerId: o.seller.id,
        buyerId: o.buyer.id,
        isCompleted: o.status === "completed",
        status: o.status,
      },
    });
  }

  console.log(`✓ Created ${orders.length} orders\n`);

  console.log("⭐ Creating reviews...");

  const reviews = [
    { gigId: gigRecs[0].id, rating: 5, reviewer: buyerRecs[0].id, title: "Excellent!" },
    { gigId: gigRecs[1].id, rating: 5, reviewer: buyerRecs[1].id, title: "Amazing work!" },
    { gigId: gigRecs[2].id, rating: 4, reviewer: buyerRecs[2].id, title: "Great service" },
    { gigId: gigRecs[3].id, rating: 5, reviewer: buyerRecs[3].id, title: "Perfect content" },
    { gigId: gigRecs[4].id, rating: 5, reviewer: buyerRecs[3].id, title: "Professional dev" },
    { gigId: gigRecs[5].id, rating: 4, reviewer: buyerRecs[2].id, title: "Good editing" },
  ];

  for (const r of reviews) {
    await prisma.reviews.create({
      data: {
        gigId: r.gigId,
        rating: r.rating,
        title: r.title,
        comment: `Great work on the project!`,
        reviewerId: r.reviewer,
      },
    });
  }

  console.log(`✓ Created ${reviews.length} reviews\n`);

  console.log("═════════════════════════════════════════════");
  console.log("✅ Database seeded successfully!\n");
  console.log("🔐 TEST ACCOUNTS (password: password123):");
  console.log("\n   PROVIDERS:");
  console.log("   • john@fx.com - Web Developer ⭐5.0");
  console.log("   • sarah@fx.com - Graphic Designer ⭐4.9");
  console.log("   • mike@fx.com - Digital Marketing ⭐4.7");
  console.log("   • emily@fx.com - Content Writing ⭐4.6");
  console.log("   • david@fx.com - Mobile Dev ⭐4.9");
  console.log("   • james@fx.com - Video Editing ⭐4.8");
  console.log("\n   BUYERS:");
  console.log("   • alice@fx.com");
  console.log("   • robert@fx.com");
  console.log("   • lisa@fx.com");
  console.log("   • linda@fx.com");
  console.log("\n═════════════════════════════════════════════\n");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("✓ Done!");
  })
  .catch(async (e) => {
    console.error("❌ Error:", e.message);
    await prisma.$disconnect();
    process.exit(1);
  });
