
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import RoleCard from './RoleCard';

const RolesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Peran Pengguna</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            PEDULIKECIL mendukung tiga peran pengguna dengan akses dan fitur yang berbeda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <RoleCard
            iconBgClass="bg-kesehatan-biru/20"
            iconClass="text-kesehatan-biru"
            iconSvg={
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
            title="Siswa"
            features={[
              "Mencatat data kesehatan harian",
              "Melaporkan keluhan kesehatan",
              "Melihat riwayat kesehatan pribadi"
            ]}
            checkmarkColor="text-kesehatan-biru"
          />

          <RoleCard
            iconBgClass="bg-kesehatan-hijau/20"
            iconClass="text-kesehatan-hijau"
            iconSvg={
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            }
            title="Guru"
            features={[
              "Memantau data kesehatan siswa",
              "Menanggapi keluhan kesehatan",
              "Membuat laporan kesehatan kelas"
            ]}
            checkmarkColor="text-kesehatan-hijau"
          />

          <RoleCard
            iconBgClass="bg-kesehatan-kuning/20"
            iconClass="text-kesehatan-kuning"
            iconSvg={
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="Admin"
            features={[
              "Mengelola seluruh akun pengguna",
              "Akses ke statistik kesehatan",
              "Konfigurasi sistem secara menyeluruh"
            ]}
            checkmarkColor="text-kesehatan-kuning"
          />
        </div>

        <div className="text-center mt-12">
          <Button asChild className="bg-kesehatan-biru hover:bg-kesehatan-biru/90">
            <Link to="/login" className="flex items-center gap-2">
              Mulai Menggunakan Platform
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RolesSection;
