import { PrismaClient } from "@prisma/client";
import { hash, genSalt } from "bcrypt";

const prisma = new PrismaClient();

// Helper function to generate password hash
const generatePassword = async (password) => {
  const salt = await genSalt();
  return await hash(password, salt);
};

async function main() {
  console.log("🌱 Starting to seed database...");

  // Clear existing data (without transaction for MongoDB compatibility)
  try {
    await prisma.messages.deleteMany({});
  } catch (e) {
    console.log("✓ Messages cleared (or empty)");
  }

  try {
    await prisma.reviews.deleteMany({});
  } catch (e) {
    console.log("✓ Reviews cleared (or empty)");
  }

  try {
    await prisma.order.deleteMany({});
  } catch (e) {
    console.log("✓ Orders cleared (or empty)");
  }

  try {
    await prisma.gig.deleteMany({});
  } catch (e) {
    console.log("✓ Gigs cleared (or empty)");
  }

  try {
    await prisma.user.deleteMany({});
  } catch (e) {
    console.log("✓ Users cleared (or empty)");
  }

  console.log("🧹 Cleared existing data");

  // Create Users - SERVICE PROVIDERS (SELLERS)
  const providers = await Promise.all([
    prisma.user.create({
      data: {
        email: "john@fx.com",
        password: await generatePassword("password123"),
        username: "johndoefx",
        fullName: "John Doe",
        description:
          "Professional web developer with 5+ years of experience in React, Node.js, and modern web technologies.",
        profileImage:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        userType: "provider",
        specialization: "Web Development",
        yearsExperience: 5,
        rating: 4.8,
        totalReviews: 42,
        isProfileInfoSet: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "sarah@fx.com",
        password: await generatePassword("password123"),
        username: "sarahwilsonfx",
        fullName: "Sarah Wilson",
        description:
          "Creative graphic designer specializing in brand identity, logos, and digital marketing materials.",
        profileImage:
          "https://images.unsplash.com/photo-1494790108755-2616b612b1c0?w=400&h=400&fit=crop&crop=face",
        userType: "provider",
        specialization: "Graphic Design",
        yearsExperience: 7,
        rating: 4.9,
        totalReviews: 63,
        isProfileInfoSet: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "mike@fx.com",
        password: await generatePassword("password123"),
        username: "mikechenfx",
        fullName: "Mike Chen",
        description:
          "Digital marketing expert with expertise in SEO, social media marketing, and content strategy.",
        profileImage:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        userType: "provider",
        specialization: "Digital Marketing",
        yearsExperience: 6,
        rating: 4.7,
        totalReviews: 38,
        isProfileInfoSet: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "emily@fx.com",
        password: await generatePassword("password123"),
        username: "emilyrodriguezfx",
        fullName: "Emily Rodriguez",
        description:
          "Professional content writer and copywriter with expertise in blog posts, web copy, and marketing content.",
        profileImage:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        userType: "provider",
        specialization: "Content Writing",
        yearsExperience: 4,
        rating: 4.6,
        totalReviews: 31,
        isProfileInfoSet: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "david@fx.com",
        password: await generatePassword("password123"),
        username: "davidkimfx",
        fullName: "David Kim",
        description:
          "Mobile app developer specializing in React Native and Flutter development for iOS and Android.",
        profileImage:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
        userType: "provider",
        specialization: "Mobile Development",
        yearsExperience: 8,
        rating: 4.9,
        totalReviews: 55,
        isProfileInfoSet: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "james@fx.com",
        password: await generatePassword("password123"),
        username: "jameswilsonfx",
        fullName: "James Wilson",
        description:
          "Expert video editor and motion graphics artist with a passion for storytelling.",
        profileImage:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
        userType: "provider",
        specialization: "Video & Animation",
        yearsExperience: 6,
        rating: 4.8,
        totalReviews: 44,
        isProfileInfoSet: true,
      },
    }),
  ]);

  // Create Users - SERVICE BUYERS
  const buyers = await Promise.all([
    prisma.user.create({
      data: {
        email: "alice@fx.com",
        password: await generatePassword("password123"),
        username: "alicejohnsonfx",
        fullName: "Alice Johnson",
        description: "Small business owner looking for digital solutions.",
        profileImage:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
        userType: "buyer",
        isProfileInfoSet: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "robert@fx.com",
        password: await generatePassword("password123"),
        username: "robertbrownfx",
        fullName: "Robert Brown",
        description: "Startup founder seeking creative and technical services.",
        profileImage:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
        userType: "buyer",
        isProfileInfoSet: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "lisa@fx.com",
        password: await generatePassword("password123"),
        username: "lisagarciafx",
        fullName: "Lisa Garcia",
        description: "Marketing manager at a growing company.",
        profileImage:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
        userType: "buyer",
        isProfileInfoSet: true,
      },
    }),
    prisma.user.create({
      data: {
        email: "linda@fx.com",
        password: await generatePassword("password123"),
        username: "lindamartinezfx",
        fullName: "Linda Martinez",
        description:
          "E-commerce entrepreneur looking for branding and dev work.",
        profileImage:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=face",
        userType: "buyer",
        isProfileInfoSet: true,
      },
    }),
  ]);

  console.log(
    `✅ Created ${providers.length} service providers and ${buyers.length} buyers`,
  );

  // Create Gigs
  const gigs = await Promise.all([
    prisma.gig.create({
      data: {
        title: "Build a responsive React website",
        description:
          "I will build a fully responsive React website with modern design and smooth animations. Includes React Hooks, Context API, and integration with backend APIs.",
        category: "Programming & Tech",
        deliveryTime: 14,
        revisions: 3,
        features: [
          "Responsive Design",
          "React Hooks",
          "API Integration",
          "SEO Ready",
        ],
        price: 500,
        shortDesc: "Professional React website development",
        images: [
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=350&fit=crop",
        ],
        userId: providers[0].id,
      },
    }),
    prisma.gig.create({
      data: {
        title: "Professional logo design for your brand",
        description:
          "I will create a unique and memorable logo for your brand. Includes multiple design concepts, unlimited revisions, and source files in various formats.",
        category: "Graphic Design",
        deliveryTime: 7,
        revisions: 5,
        features: [
          "Multiple Concepts",
          "Unlimited Revisions",
          "Source Files",
          "Brand Guidelines",
        ],
        price: 300,
        shortDesc: "Custom logo design",
        images: [
          "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=350&fit=crop",
        ],
        userId: providers[1].id,
      },
    }),
    prisma.gig.create({
      data: {
        title: "SEO optimization and keyword research",
        description:
          "I will optimize your website for search engines and create a comprehensive SEO strategy. Includes keyword research, on-page optimization, and backlink analysis.",
        category: "Digital Marketing",
        deliveryTime: 10,
        revisions: 2,
        features: [
          "Keyword Research",
          "On-Page SEO",
          "Technical Audit",
          "Competitor Analysis",
        ],
        price: 400,
        shortDesc: "Complete SEO optimization",
        images: [
          "https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=350&fit=crop",
        ],
        userId: providers[2].id,
      },
    }),
    prisma.gig.create({
      data: {
        title: "Write engaging blog posts and articles",
        description:
          "I will write high-quality, SEO-optimized blog posts and articles on any topic. Each article is well-researched, engaging, and tailored to your audience.",
        category: "Writing & Translation",
        deliveryTime: 5,
        revisions: 3,
        features: [
          "SEO Optimized",
          "1000+ words",
          "Original Content",
          "Plagiarism-Free",
        ],
        price: 150,
        shortDesc: "Professional blog writing",
        images: [
          "https://images.unsplash.com/photo-1455465814006-e51df1bdc82f?w=500&h=350&fit=crop",
        ],
        userId: providers[3].id,
      },
    }),
    prisma.gig.create({
      data: {
        title: "Build a mobile app with React Native",
        description:
          "I will develop a cross-platform mobile app using React Native. The app will work on both iOS and Android with native performance.",
        category: "Programming & Tech",
        deliveryTime: 21,
        revisions: 2,
        features: [
          "iOS & Android",
          "Native Performance",
          "Push Notifications",
          "Integration Ready",
        ],
        price: 1500,
        shortDesc: "Cross-platform mobile app development",
        images: [
          "https://images.unsplash.com/photo-1512941691920-afbb247b6e0c?w=500&h=350&fit=crop",
        ],
        userId: providers[4].id,
      },
    }),
    prisma.gig.create({
      data: {
        title: "Professional video editing and motion graphics",
        description:
          "I will edit your videos professionally with premium transitions, color grading, and motion graphics. Perfect for YouTube, TikTok, and marketing videos.",
        category: "Video & Animation",
        deliveryTime: 7,
        revisions: 3,
        features: [
          "4K Editing",
          "Motion Graphics",
          "Color Grading",
          "Sound Design",
        ],
        price: 350,
        shortDesc: "Professional video editing",
        images: [
          "https://images.unsplash.com/photo-1533928298208-27ff322dd3d7?w=500&h=350&fit=crop",
        ],
        userId: providers[5].id,
      },
    }),
  ]);

  console.log(`✅ Created ${gigs.length} gigs`);

  // Create Orders
  const orders = await Promise.all([
    prisma.order.create({
      data: {
        buyerId: buyers[0].id,
        gigId: gigs[0].id,
        paymentIntent: "pi_" + Math.random().toString(36).substr(2, 9),
        isCompleted: true,
        status: "completed",
        price: 500,
      },
    }),
    prisma.order.create({
      data: {
        buyerId: buyers[1].id,
        gigId: gigs[1].id,
        paymentIntent: "pi_" + Math.random().toString(36).substr(2, 9),
        isCompleted: true,
        status: "completed",
        price: 300,
      },
    }),
    prisma.order.create({
      data: {
        buyerId: buyers[2].id,
        gigId: gigs[2].id,
        paymentIntent: "pi_" + Math.random().toString(36).substr(2, 9),
        isCompleted: false,
        status: "in_progress",
        price: 400,
      },
    }),
    prisma.order.create({
      data: {
        buyerId: buyers[3].id,
        gigId: gigs[3].id,
        paymentIntent: "pi_" + Math.random().toString(36).substr(2, 9),
        isCompleted: true,
        status: "completed",
        price: 150,
      },
    }),
  ]);

  console.log(`✅ Created ${orders.length} orders`);

  // Create Reviews with ratings and comments
  const reviews = await Promise.all([
    prisma.reviews.create({
      data: {
        rating: 5,
        title: "Excellent Work!",
        comment:
          "John delivered an outstanding React website. The code quality is excellent and the design is modern. Highly recommended!",
        gigId: gigs[0].id,
        reviewerId: buyers[0].id,
      },
    }),
    prisma.reviews.create({
      data: {
        rating: 5,
        title: "Amazing Logo Design",
        comment:
          "Sarah created a beautiful logo that perfectly represents my brand. Very professional and understood my vision immediately.",
        gigId: gigs[1].id,
        reviewerId: buyers[1].id,
      },
    }),
    prisma.reviews.create({
      data: {
        rating: 4,
        title: "Great SEO Expertise",
        comment:
          "Mike provided comprehensive SEO analysis. Website traffic improved significantly after his optimization work.",
        gigId: gigs[2].id,
        reviewerId: buyers[2].id,
      },
    }),
    prisma.reviews.create({
      data: {
        rating: 5,
        title: "Outstanding Content",
        comment:
          "Emily wrote engaging blog posts that our audience loved. Delivery was quick and quality exceeded expectations.",
        gigId: gigs[3].id,
        reviewerId: buyers[3].id,
      },
    }),
    // Additional reviews for better ratings display
    prisma.reviews.create({
      data: {
        rating: 5,
        title: "Professional Developer",
        comment:
          "John is extremely professional and delivers quality code on time. I would hire him again.",
        gigId: gigs[0].id,
        reviewerId: buyers[3].id,
      },
    }),
    prisma.reviews.create({
      data: {
        rating: 4,
        title: "Good Design Skills",
        comment:
          "Sarah's designs are creative and modern. Would recommend for any branding project.",
        gigId: gigs[1].id,
        reviewerId: buyers[2].id,
      },
    }),
  ]);

  console.log(`✅ Created ${reviews.length} reviews`);

  // Update provider ratings and review counts
  await prisma.user.update({
    where: { id: providers[0].id },
    data: {
      totalReviews: 2,
      rating: 5.0,
    },
  });

  await prisma.user.update({
    where: { id: providers[1].id },
    data: {
      totalReviews: 2,
      rating: 4.5,
    },
  });

  console.log("✅ Updated provider ratings");

  console.log("✅ Seeding completed successfully!");
  console.log(`
  📊 Database seeded with:
  - ${providers.length} service providers
  - ${buyers.length} service buyers
  - ${gigs.length} gigs across different categories
  - ${orders.length} orders (completed and in-progress)
  - ${reviews.length} reviews
  
  🔐 Test login credentials:
  
  **SERVICE PROVIDERS (Sellers):**
  - john@fx.com / password123 (Web Developer - 5✭)
  - sarah@fx.com / password123 (Graphic Designer - 4.5✭)
  - mike@fx.com / password123 (Digital Marketer)
  - emily@fx.com / password123 (Content Writer)
  - david@fx.com / password123 (Mobile Developer)
  - james@fx.com / password123 (Video Editor)
  
  **SERVICE BUYERS:**
  - alice@fx.com / password123 (Small Business Owner)
  - robert@fx.com / password123 (Startup Founder)
  - lisa@fx.com / password123 (Marketing Manager)
  - linda@fx.com / password123 (E-commerce Owner)
  `);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
