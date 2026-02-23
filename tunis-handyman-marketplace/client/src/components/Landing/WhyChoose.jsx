import React from "react";

const WhyChoose = () => {
  const features = [
    {
      icon: () => <span className="text-emerald-500">✓</span>,
      title: "Verified Professionals",
      description:
        "Every professional is thoroughly vetted and background-checked",
    },
    {
      icon: () => <span className="text-emerald-500">📍</span>,
      title: "Local Services in Tunis",
      description: "Find reliable professionals right in your neighborhood",
    },
    {
      icon: () => <span className="text-emerald-500">⏱️</span>,
      title: "Quick Response",
      description: "Get responses from professionals within hours, not days",
    },
    {
      icon: () => <span className="text-emerald-500">🔒</span>,
      title: "Secure Transactions",
      description: "Your payments are protected with our secure escrow system",
    },
    {
      icon: () => <span className="text-emerald-500">📞</span>,
      title: "24/7 Customer Support",
      description: "We're here to help anytime you need us",
    },
    {
      icon: () => <span className="text-emerald-500">📱</span>,
      title: "Easy Mobile Experience",
      description: "Book professionals on the go from your mobile device",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text */}
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
              Why Choose Our Marketplace?
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              We're committed to connecting you with the best handyman
              professionals in Tunis. Our platform makes it easy to find, hire,
              and manage your projects safely and securely.
            </p>

            <div className="space-y-4">
              {[
                "✨ 500+ verified professionals",
                "🏆 Average 4.8 star rating",
                "💯 100% satisfaction guarantee",
                "🔒 Secure payment protection",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <button className="mt-8 bg-emerald-500 text-white px-8 py-3 rounded-lg hover:bg-emerald-600 transition-colors duration-300 font-semibold">
              Get Started Now
            </button>
          </div>

          {/* Right side - Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-slate-50 rounded-lg p-6 border border-gray-100 hover:border-emerald-300 hover:shadow-md transition-all duration-300"
                >
                  <Icon />
                  <h3 className="font-bold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
