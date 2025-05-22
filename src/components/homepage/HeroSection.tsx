
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="hero-pattern py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 md:pr-8">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
              Pemantauan Kesehatan <span className="text-kesehatan-biru">Anak Sekolah</span> yang Terintegrasi
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Platform untuk memantau kesehatan anak SD secara menyeluruh. Terhubung langsung antara siswa, guru, dan administrator untuk memastikan kesehatan optimal anak-anak Indonesia.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-kesehatan-biru hover:bg-kesehatan-biru/90">
                <Link to="/login">Masuk ke Dashboard</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-kesehatan-biru text-kesehatan-biru hover:bg-kesehatan-biru/10">
                <Link to="/tentang">Pelajari Lebih Lanjut</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0">
            <img 
              src="https://img.freepik.com/free-vector/doctor-examining-patient-clinic-illustrated_23-2148856559.jpg?w=900&t=st=1714963425~exp=1714964025~hmac=83a7be9f60c31382e06580de138fdbcc6a5b9d2a36f45f958f1206d5f25d3fe5" 
              alt="Ilustrasi Kesehatan Anak" 
              className="w-full max-w-lg mx-auto rounded-lg shadow-lg animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
