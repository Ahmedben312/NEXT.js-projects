import HeroBanner from "../components/Landing/HeroBanner";
import FeaturedProfessionals from "../components/Landing/FeaturedProfessionals";
import HowItWorks from "../components/Landing/HowItWorks";
import WhyChoose from "../components/Landing/WhyChoose";
import MessagingDemo from "../components/Landing/MessagingDemo";
import TrustStats from "../components/Landing/TrustStats";
import PopularServices from "../components/Landing/PopularServices";
import React from "react";
import AuthWrapper from "../components/AuthWrapper";
import { useStateProvider } from "../context/StateContext";

const Index = () => {
  const [{ showLoginModal, showSignupModal }] = useStateProvider();
  return (
    <div>
      <HeroBanner />
      <FeaturedProfessionals />
      <HowItWorks />
      <WhyChoose />
      <MessagingDemo />
      <PopularServices />
      <TrustStats />
      {(showLoginModal || showSignupModal) && (
        <AuthWrapper type={showLoginModal ? "login" : "signup"} />
      )}
    </div>
  );
};

export default Index;
