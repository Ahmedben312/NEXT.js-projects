import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const featuredProfessionals = [
  {
    title: "Professional Plumbing Services - Tunis",
    userId: "professional-1",
    category: "Plumbing",
    description:
      "Expert plumbing services for all your residential and commercial needs. Leak repairs, pipe installation, and more.",
    price: 50,
    rating: 4.9,
    deliveryTime: 1,
    features: [
      "Same day service",
      "Emergency available",
      "10 years experience",
    ],
    images: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop",
    ],
  },
  {
    title: "Electrical Repair & Installation - Expert Electrician",
    userId: "professional-2",
    category: "Electrical",
    description:
      "Professional electrical services including rewiring, fixture installation, circuit breaker repairs, and safety inspections.",
    price: 60,
    rating: 4.8,
    deliveryTime: 1,
    features: [
      "Licensed professional",
      "24/7 emergency",
      "12 years experience",
    ],
    images: [
      "https://images.unsplash.com/photo-1621905167918-48416bd8575a?w=400&h=300&fit=crop",
    ],
  },
  {
    title: "Carpentry & Woodwork - Custom Furniture & Repairs",
    userId: "professional-3",
    category: "Carpentry",
    description:
      "Expert carpentry services including furniture repair, custom woodwork, shelf installation, and structural repairs.",
    price: 55,
    rating: 4.7,
    deliveryTime: 2,
    features: ["Custom designs", "Quality materials", "8 years experience"],
    images: [
      "https://images.unsplash.com/photo-1599027528316-40db92f57def?w=400&h=300&fit=crop",
    ],
  },
  {
    title: "House Painting Services - Interior & Exterior",
    userId: "professional-4",
    category: "Painting",
    description:
      "Professional painting services for your home or office. Interior, exterior, and specialized finishes available.",
    price: 45,
    rating: 4.6,
    deliveryTime: 2,
    features: ["High-quality paint", "Fast service", "5 years experience"],
    images: [
      "https://images.unsplash.com/photo-1581092162562-40038f96f313?w=400&h=300&fit=crop",
    ],
  },
  {
    title: "AC Maintenance & Repair - Climate Control Expert",
    userId: "professional-5",
    category: "Climatisation",
    description:
      "Professional air conditioning maintenance, repair, and installation. Keep your home comfortable year-round.",
    price: 65,
    rating: 4.9,
    deliveryTime: 1,
    features: ["Quick diagnosis", "Genuine parts", "15 years experience"],
    images: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=300&fit=crop",
    ],
  },
  {
    title: "Deep Cleaning & Maintenance Services",
    userId: "professional-6",
    category: "Cleaning",
    description:
      "Thorough cleaning services for homes and offices. Professional team with eco-friendly products.",
    price: 40,
    rating: 4.8,
    deliveryTime: 1,
    features: ["Eco-friendly products", "Insured team", "3 years experience"],
    images: [
      "https://images.unsplash.com/photo-1581578731548-c64695c952952?w=400&h=300&fit=crop",
    ],
  },
];

async function seedFeaturedProfessionals() {
  try {
    console.log("Starting to seed featured professionals...");

    // First, create professional users
    for (let i = 0; i < featuredProfessionals.length; i++) {
      const prof = featuredProfessionals[i];

      // Create or update user
      const user = await prisma.user.upsert({
        where: { email: `professional${i + 1}@marketplace.com` },
        update: {},
        create: {
          username: `professional_${i + 1}`,
          email: `professional${i + 1}@marketplace.com`,
          password: "hashed_password_here", // In real app, hash this
          userType: "provider",
          specialization: prof.category,
          yearsExperience: Math.floor(Math.random() * 15) + 1,
          rating: prof.rating,
          totalReviews: Math.floor(Math.random() * 50) + 10,
          isProfileCompleted: true,
          country: "Tunisia",
        },
      });

      // Create gig for professional
      const gig = await prisma.gig.create({
        data: {
          title: prof.title,
          userId: user.id,
          category: prof.category,
          description: prof.description,
          price: prof.price,
          deliveryTime: prof.deliveryTime,
          features: prof.features,
          images: prof.images,
          rating: prof.rating,
          featured: true,
        },
      });

      console.log(`✓ Created professional ${i + 1}: ${prof.title}`);
    }

    console.log("\n✓ Successfully seeded featured professionals!");
  } catch (error) {
    console.error("Error seeding professionals:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run seeding
seedFeaturedProfessionals().catch((error) => {
  console.error(error);
  process.exit(1);
});
