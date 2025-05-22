
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-kesehatan-biru to-kesehatan-hijau py-16 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Mari Pantau Kesehatan Anak Sekolah Bersama</h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto">
          Bergabunglah dengan PEDULIKECIL untuk memastikan kesehatan optimal siswa sekolah dasar di Indonesia
        </p>
        <Button asChild variant="secondary" size="lg">
          <Link to="/login">Masuk ke Dashboard</Link>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
