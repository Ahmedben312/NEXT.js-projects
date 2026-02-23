import React from "react";
import { MdCheckCircle } from "react-icons/md";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Post Your Request",
      description:
        "Tell us what you need. Our professionals will respond with offers.",
      icon: "📋",
    },
    {
      number: "02",
      title: "Review Offers",
      description:
        "Compare offers from multiple verified professionals in your area.",
      icon: "👀",
    },
    {
      number: "03",
      title: "Hire & Collaborate",
      description:
        "Choose the best professional and start your project with secure payment.",
      icon: "🤝",
    },
    {
      number: "04",
      title: "Pay & Review",
      description:
        "Release payment and share your experience. Build trust in our community.",
      icon: "⭐",
    },
  ];

  return (
    <section className="py-16 px-6 md:px-20 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg">
            Simple, secure, and transparent process from start to finish
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step card */}
              <div className="bg-white rounded-xl p-6 h-full border border-gray-100 hover:border-emerald-300 transition-colors duration-300">
                {/* Number background */}
                <div className="text-6xl font-bold text-emerald-100 mb-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="text-5xl mb-4">{step.icon}</div>

                {/* Title */}
                <h3 className="font-bold text-lg text-slate-900 mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector line (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-emerald-400 to-transparent"></div>
              )}
            </div>
          ))}
        </div>

        {/* Benefits section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Verified Professionals",
              description:
                "All professionals are verified and background-checked for your safety",
            },
            {
              title: "Secure Payments",
              description:
                "Your money is protected until you're satisfied with the work",
            },
            {
              title: "Guaranteed Quality",
              description: "If you're not satisfied, we'll make it right",
            },
          ].map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 border border-gray-100"
            >
              <div className="flex items-start gap-3">
                <MdCheckCircle className="text-emerald-500 text-2xl flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">
                    {benefit.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
