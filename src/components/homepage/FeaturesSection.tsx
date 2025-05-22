
import React from 'react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Fitur Utama Platform</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            PEDULIKECIL menyediakan berbagai fitur untuk memudahkan pemantauan kesehatan anak secara menyeluruh
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            borderColorClass="border-kesehatan-biru-muda"
            hoverColorClass="hover:border-kesehatan-biru"
            bgColorClass="bg-kesehatan-biru-muda"
            iconColorClass="text-kesehatan-biru"
            icon={
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
            title="Pencatatan Data Kesehatan"
            description="Siswa dapat mencatat data kesehatan harian seperti suhu tubuh, berat badan, dan tinggi badan secara mudah."
          />

          <FeatureCard
            borderColorClass="border-kesehatan-hijau-muda"
            hoverColorClass="hover:border-kesehatan-hijau"
            bgColorClass="bg-kesehatan-hijau-muda"
            iconColorClass="text-kesehatan-hijau"
            icon={
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="Komunikasi Dua Arah"
            description="Komunikasi langsung antara siswa dan guru untuk tanggapan cepat terhadap keluhan kesehatan."
          />

          <FeatureCard
            borderColorClass="border-kesehatan-kuning-muda"
            hoverColorClass="hover:border-kesehatan-kuning"
            bgColorClass="bg-kesehatan-kuning-muda"
            iconColorClass="text-kesehatan-kuning"
            icon={
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            title="Analisis Data Kesehatan"
            description="Melihat tren kesehatan siswa dalam bentuk grafik dan laporan yang mudah dipahami."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
