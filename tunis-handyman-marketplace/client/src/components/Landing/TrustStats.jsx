import React, { useEffect, useState, useMemo } from "react";
import { FaUsers, FaStar, FaCheckCircle, FaHandshake } from "react-icons/fa6";

const TrustStats = () => {
  const [stats, setStats] = useState({
    professionals: 500,
    projects: 12500,
    satisfaction: 98,
    rating: 4.8,
  });

  const stats_data = useMemo(
    () => [
      {
        icon: FaUsers,
        number: stats.professionals,
        label: "Active Professionals",
        suffix: "+",
      },
      {
        icon: FaCheckCircle,
        number: stats.projects,
        label: "Projects Completed",
        suffix: "+",
      },
      {
        icon: FaHandshake,
        number: stats.satisfaction,
        label: "Client Satisfaction",
        suffix: "%",
      },
      {
        icon: FaStar,
        number: stats.rating,
        label: "Average Rating",
        suffix: "★",
      },
    ],
    [stats],
  );

  return (
    <section className="py-16 px-6 md:px-20 bg-gradient-to-r from-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-gray-300 text-lg">
            Join our growing community of satisfied customers and professionals
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats_data &&
            stats_data.map((stat, index) => {
              const Icon = stat?.icon;
              if (!Icon || typeof Icon !== "function") {
                return null;
              }
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300"
                >
                  <Icon className="text-emerald-400 text-4xl mx-auto mb-4" />
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.number}
                    <span className="text-emerald-400 text-3xl">
                      {stat.suffix}
                    </span>
                  </div>
                  <p className="text-gray-300">{stat.label}</p>
                </div>
              );
            })}
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "🔒 Secure Payments",
              description:
                "Industry-leading encryption protects your financial information",
            },
            {
              title: "✓ Verified Professionals",
              description:
                "Every professional is verified and actively reviewed",
            },
            {
              title: "⚖️ Fair Dispute Resolution",
              description: "Our team ensures fair outcomes for both parties",
            },
          ].map((badge, index) => (
            <div
              key={index}
              className="bg-emerald-500/20 border border-emerald-400/30 rounded-lg p-6"
            >
              <h3 className="text-white font-bold mb-2">{badge.title}</h3>
              <p className="text-gray-200 text-sm">{badge.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to Get Started?
            </h3>
            <p className="text-gray-300 mb-6">
              Join thousands of satisfied customers who have found their perfect
              professionals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                Find a Professional
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Become a Professional
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStats;
