import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Slider = dynamic(() => import("react-slick"), { ssr: false });
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PopularServices = () => {
  const router = useRouter();

  const popularServices = [
    // === Handyman Services (Tunis) ===
    {
      title: "Plomberie",
      icon: "🔧",
      desc: "Fuites, robinetterie, chauffe-eau - Tunis",
    },
    {
      title: "Électricité",
      icon: "⚡",
      desc: "Pannes, installation, éclairage - Tunis",
    },
    {
      title: "Mécanique Auto",
      icon: "🚗",
      desc: "Réparation, vidange, diagnostic",
    },
    {
      title: "Menuiserie",
      icon: "🪚",
      desc: "Meubles, portes, fenêtres",
    },
    {
      title: "Peinture & Décoration",
      icon: "🎨",
      desc: "Intérieur, extérieur",
    },
    {
      title: "Climatisation",
      icon: "❄️",
      desc: "Installation & réparation",
    },
    {
      title: "Nettoyage à Domicile",
      icon: "🧼",
      desc: "Appartement, villa, bureau",
    },
    {
      title: "Jardinage",
      icon: "🌳",
      desc: "Taille, arrosage, entretien",
    },
    {
      title: "Déménagement",
      icon: "📦",
      desc: "Transport & aide au déménagement",
    },
    {
      title: "Maçonnerie & Béton",
      icon: "🧱",
      desc: "Construction, réparation, finition",
    },

    // === Freelance Services ===
    {
      title: "Web Development",
      icon: "💻",
      desc: "Custom websites & apps",
    },
    {
      title: "Graphic Design",
      icon: "🎨",
      desc: "Logos, banners, UI/UX",
    },
    {
      title: "Digital Marketing",
      icon: "📈",
      desc: "SEO, social media",
    },
    {
      title: "Content Writing",
      icon: "✍️",
      desc: "Blogs, copywriting",
    },
    {
      title: "Video Editing",
      icon: "🎥",
      desc: "YouTube, ads, reels",
    },
    {
      title: "Mobile App Dev",
      icon: "📱",
      desc: "iOS, Android, React Native",
    },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleServiceClick = (title) => {
    router.push(`/search?q=${encodeURIComponent(title)}`);
  };

  return (
    <div className="mx-6 md:mx-20 my-6 md:my-12">
      <h2 className="text-2xl md:text-4xl mb-3 md:mb-5 text-[#404145] font-bold">
        Popular Services
      </h2>
      <Slider {...settings}>
        {popularServices.map(({ title, icon, desc }) => (
          <div key={title} className="p-4">
            <div
              className="relative cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl rounded-lg overflow-hidden group bg-gradient-to-br from-gray-100 to-gray-200 h-64"
              onClick={() => handleServiceClick(title)}
            >
              {/* Icon */}
              <div className="absolute top-4 right-4 text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                {icon}
              </div>

              {/* Content */}
              <div className="flex flex-col justify-between h-full p-5 relative z-10">
                <div>
                  <h6 className="font-bold text-lg md:text-xl text-gray-800 group-hover:text-blue-600 transition-colors">
                    {title}
                  </h6>
                </div>
                <div>
                  <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors line-clamp-2">
                    {desc}
                  </p>
                  <button className="mt-3 text-blue-600 font-semibold text-sm group-hover:text-blue-800 transition-colors hover:underline">
                    Learn More →
                  </button>
                </div>
              </div>

              {/* Background overlay on hover */}
              <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PopularServices;
