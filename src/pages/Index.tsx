
import React from 'react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/homepage/HeroSection';
import FeaturesSection from '@/components/homepage/FeaturesSection';
import EducationSection from '@/components/homepage/EducationSection';
import RolesSection from '@/components/homepage/RolesSection';
import CTASection from '@/components/homepage/CTASection';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      {/* Fitur Section */}
      <FeaturesSection />

      {/* Edukasi Reproduksi Section */}
      <EducationSection />

      {/* Peran Pengguna */}
      <RolesSection />

      {/* CTA Section */}
      <CTASection />
    </Layout>
  );
};

export default Index;
