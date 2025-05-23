
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Info, Baby } from 'lucide-react';
import EducationCard from './EducationCard';

const EducationSection = () => {
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Edukasi Reproduksi untuk Anak SD</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Materi edukasi yang disampaikan dengan cara yang sesuai usia untuk membantu anak-anak memahami tubuh mereka dengan cara yang sehat
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <EducationCard
            borderColorClass="border-teal-100"
            hoverColorClass="hover:border-teal-300"
            bgColorClass="bg-teal-100"
            iconColorClass="text-teal-600"
            Icon={Baby}
            title="Mengenal Tubuh Kita"
            description="Pembelajaran tentang bagian tubuh dengan nama yang tepat dan fungsinya masing-masing, membangun dasar pemahaman yang sehat."
            buttonColorClass="text-teal-600"
            buttonBorderClass="border-teal-300"
            buttonHoverClass="hover:bg-teal-50"
          />

          <EducationCard
            borderColorClass="border-purple-100"
            hoverColorClass="hover:border-purple-300"
            bgColorClass="bg-purple-100"
            iconColorClass="text-purple-600"
            Icon={Info}
            title="Batasan Pribadi"
            description="Memahami konsep persetujuan, privasi tubuh, dan bagaimana menyampaikan ketidaknyamanan secara tepat kepada orang dewasa."
            buttonColorClass="text-purple-600"
            buttonBorderClass="border-purple-300"
            buttonHoverClass="hover:bg-purple-50"
          />

          <EducationCard
            borderColorClass="border-amber-100"
            hoverColorClass="hover:border-amber-300"
            bgColorClass="bg-amber-100"
            iconColorClass="text-amber-600"
            Icon={BookOpen}
            title="Pertumbuhan & Perkembangan"
            description="Pengetahuan tentang tahapan tumbuh kembang dan perubahan tubuh yang akan terjadi saat beranjak remaja."
            buttonColorClass="text-amber-600"
            buttonBorderClass="border-amber-300"
            buttonHoverClass="hover:bg-amber-50"
          />
        </div>

        <div className="mt-12 text-center">
          <Button asChild className="bg-teal-600 hover:bg-teal-700 rounded-full px-8">
            <Link to="/artikel-edukasi" className="flex items-center gap-2">
              Akses Semua Materi Edukasi
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
