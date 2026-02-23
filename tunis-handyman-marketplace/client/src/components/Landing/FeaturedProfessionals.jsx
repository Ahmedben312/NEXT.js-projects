import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useFeaturedGigs } from "../../hooks/useGigs";

const FeaturedProfessionals = () => {
  const router = useRouter();
  const { gigs: professionals, loading } = useFeaturedGigs(6);

  const handleProfessionalClick = (gigId) => {
    router.push(`/gig/${gigId}`);
  };

  return (
    <section className="py-16 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Meet Featured Professionals
          </h2>
          <p className="text-gray-600 text-lg">
            Connect with our top-rated handyman professionals
          </p>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading professionals...</p>
          </div>
        ) : professionals.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No featured professionals found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {professionals.map((gig) => (
              <div
                key={gig._id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                onClick={() => handleProfessionalClick(gig._id)}
              >
                {/* Service Image */}
                <div className="relative h-48 bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
                  {gig.images && gig.images.length > 0 ? (
                    <Image
                      src={gig.images[0]}
                      alt={gig.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-white text-6xl">🔧</div>
                  )}
                </div>

                {/* Professional Info */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">
                        {gig.title}
                      </h3>
                      <p className="text-sm text-gray-600">{gig.category}</p>
                    </div>
                    <span className="text-yellow-400 font-semibold">
                      ★ {gig.rating || 4.8}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {gig.description || "Professional handyman services"}
                  </p>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-emerald-600 font-bold text-lg">
                        ${gig.price}
                      </p>
                      <p className="text-xs text-gray-500">
                        {gig.deliveryTime} days
                      </p>
                    </div>
                    <button className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition-colors duration-300 text-sm font-semibold">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <button
            className="bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 transition-colors duration-300 font-semibold"
            onClick={() => router.push("/search")}
          >
            Browse All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProfessionals;
