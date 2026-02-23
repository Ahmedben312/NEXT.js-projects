import prisma from "../prisma/client.js";
import { apiLog } from "../utils/logger.js";

// In-memory categories (can be migrated to database if needed)
const predefinedCategories = [
  // Handyman Services
  {
    id: "plumbing",
    name: "Plomberie",
    icon: "🔧",
    desc: "Fuites, robinetterie, chauffe-eau",
  },
  {
    id: "electrical",
    name: "Électricité",
    icon: "⚡",
    desc: "Pannes, installation, éclairage",
  },
  {
    id: "auto-mechanic",
    name: "Mécanique Auto",
    icon: "🚗",
    desc: "Réparation, vidange, diagnostic",
  },
  {
    id: "carpentry",
    name: "Menuiserie",
    icon: "🪚",
    desc: "Meubles, portes, fenêtres",
  },
  {
    id: "painting",
    name: "Peinture & Décoration",
    icon: "🎨",
    desc: "Intérieur, extérieur",
  },
  {
    id: "ac-repair",
    name: "Climatisation",
    icon: "❄️",
    desc: "Installation & réparation",
  },
  {
    id: "cleaning",
    name: "Nettoyage à Domicile",
    icon: "🧼",
    desc: "Appartement, villa, bureau",
  },
  {
    id: "gardening",
    name: "Jardinage",
    icon: "🌳",
    desc: "Taille, arrosage, entretien",
  },
  {
    id: "moving",
    name: "Déménagement",
    icon: "📦",
    desc: "Transport & aide au déménagement",
  },
  {
    id: "masonry",
    name: "Maçonnerie & Béton",
    icon: "🧱",
    desc: "Construction, réparation, finition",
  },

  // Freelance Services
  {
    id: "web-dev",
    name: "Web Development",
    icon: "💻",
    desc: "Custom websites & apps",
  },
  {
    id: "graphic-design",
    name: "Graphic Design",
    icon: "🎨",
    desc: "Logos, banners, UI/UX",
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    icon: "📈",
    desc: "SEO, social media",
  },
  {
    id: "content-writing",
    name: "Content Writing",
    icon: "✍️",
    desc: "Blogs, copywriting",
  },
  {
    id: "video-editing",
    name: "Video Editing",
    icon: "🎥",
    desc: "YouTube, ads, reels",
  },
  {
    id: "mobile-app",
    name: "Mobile App Dev",
    icon: "📱",
    desc: "iOS, Android, React Native",
  },
  {
    id: "seo",
    name: "SEO Services",
    icon: "🔍",
    desc: "Google ranking, optimization",
  },
  {
    id: "social-media",
    name: "Social Media Management",
    icon: "📱",
    desc: "Content, engagement, growth",
  },
];

let customCategories = [];

export const getAllCategories = async (req, res, next) => {
  try {
    const allCategories = [...predefinedCategories, ...customCategories];
    apiLog(`Fetched ${allCategories.length} categories`);
    return res.status(200).json({
      categories: allCategories,
      total: allCategories.length,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error.");
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    let category = predefinedCategories.find((cat) => cat.id === categoryId);
    if (!category) {
      category = customCategories.find((cat) => cat.id === categoryId);
    }

    if (!category) {
      return res.status(404).send("Category not found.");
    }

    apiLog(`Fetched category: ${categoryId}`);
    return res.status(200).json({ category });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error.");
  }
};

export const getGigsByCategory = async (req, res, next) => {
  try {
    const { categoryName } = req.params;

    const gigs = await prisma.gig.findMany({
      where: { category: categoryName },
      include: {
        createdBy: { select: { username: true, profileImage: true } },
        reviews: true,
      },
    });

    apiLog(`Fetched ${gigs.length} gigs for category: ${categoryName}`);
    return res.status(200).json({
      category: categoryName,
      gigs,
      total: gigs.length,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error.");
  }
};

export const addCustomCategory = async (req, res, next) => {
  try {
    if (!req.userId) {
      return res.status(401).send("Authentication required.");
    }

    const { id, name, icon, desc } = req.body;

    if (!id || !name || !icon || !desc) {
      return res
        .status(400)
        .send("All fields (id, name, icon, desc) are required.");
    }

    // Check if category already exists
    const exists = [...predefinedCategories, ...customCategories].some(
      (cat) => cat.id === id,
    );
    if (exists) {
      return res.status(400).send("Category ID already exists.");
    }

    const newCategory = { id, name, icon, desc, createdBy: req.userId };
    customCategories.push(newCategory);

    apiLog(`Added custom category: ${name}`);
    return res.status(201).json({
      message: "Category added successfully",
      category: newCategory,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error.");
  }
};

export const deleteCustomCategory = async (req, res, next) => {
  try {
    if (!req.userId) {
      return res.status(401).send("Authentication required.");
    }

    const { categoryId } = req.params;

    // Cannot delete predefined categories
    if (predefinedCategories.some((cat) => cat.id === categoryId)) {
      return res.status(400).send("Cannot delete predefined categories.");
    }

    const index = customCategories.findIndex((cat) => cat.id === categoryId);
    if (index === -1) {
      return res.status(404).send("Category not found.");
    }

    const deletedCategory = customCategories.splice(index, 1)[0];
    apiLog(`Deleted category: ${categoryId}`);

    return res.status(200).json({
      message: "Category deleted successfully",
      category: deletedCategory,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error.");
  }
};

export const searchCategories = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).send("Search query 'q' is required.");
    }

    const search = q.toLowerCase();
    const allCategories = [...predefinedCategories, ...customCategories];

    const results = allCategories.filter(
      (cat) =>
        cat.name.toLowerCase().includes(search) ||
        cat.desc.toLowerCase().includes(search),
    );

    apiLog(`Category search: "${q}" returned ${results.length} results`);
    return res.status(200).json({
      query: q,
      results,
      total: results.length,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error.");
  }
};
