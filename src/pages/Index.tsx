import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, BookOpen, Info, Child } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
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

      {/* Fitur Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Fitur Utama Platform</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              PEDULIKECIL menyediakan berbagai fitur untuk memudahkan pemantauan kesehatan anak secara menyeluruh
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 border-kesehatan-biru-muda hover:border-kesehatan-biru transition-colors duration-300">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-kesehatan-biru-muda flex items-center justify-center">
                  <svg className="h-8 w-8 text-kesehatan-biru" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">Pencatatan Data Kesehatan</h3>
                <p className="text-gray-600 text-center">
                  Siswa dapat mencatat data kesehatan harian seperti suhu tubuh, berat badan, dan tinggi badan secara mudah.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-kesehatan-hijau-muda hover:border-kesehatan-hijau transition-colors duration-300">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-kesehatan-hijau-muda flex items-center justify-center">
                  <svg className="h-8 w-8 text-kesehatan-hijau" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">Komunikasi Dua Arah</h3>
                <p className="text-gray-600 text-center">
                  Komunikasi langsung antara siswa dan guru untuk tanggapan cepat terhadap keluhan kesehatan.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-kesehatan-kuning-muda hover:border-kesehatan-kuning transition-colors duration-300">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-kesehatan-kuning-muda flex items-center justify-center">
                  <svg className="h-8 w-8 text-kesehatan-kuning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">Analisis Data Kesehatan</h3>
                <p className="text-gray-600 text-center">
                  Melihat tren kesehatan siswa dalam bentuk grafik dan laporan yang mudah dipahami.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Edukasi Reproduksi Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Edukasi Reproduksi untuk Anak SD</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Materi edukasi yang disampaikan dengan cara yang sesuai usia untuk membantu anak-anak memahami tubuh mereka dengan cara yang sehat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-teal-100 hover:border-teal-300 transition-colors duration-300">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-teal-100 flex items-center justify-center">
                  <Child className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">Mengenal Tubuh Kita</h3>
                <p className="text-gray-600 text-center mb-4">
                  Pembelajaran tentang bagian tubuh dengan nama yang tepat dan fungsinya masing-masing, membangun dasar pemahaman yang sehat.
                </p>
                <div className="text-center">
                  <Button variant="outline" size="sm" className="text-teal-600 border-teal-300 hover:bg-teal-50">
                    Pelajari Lebih Lanjut
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100 hover:border-purple-300 transition-colors duration-300">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 flex items-center justify-center">
                  <Info className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">Batasan Pribadi</h3>
                <p className="text-gray-600 text-center mb-4">
                  Memahami konsep persetujuan, privasi tubuh, dan bagaimana menyampaikan ketidaknyamanan secara tepat kepada orang dewasa.
                </p>
                <div className="text-center">
                  <Button variant="outline" size="sm" className="text-purple-600 border-purple-300 hover:bg-purple-50">
                    Pelajari Lebih Lanjut
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-amber-100 hover:border-amber-300 transition-colors duration-300">
              <CardContent className="pt-6">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-100 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">Pertumbuhan & Perkembangan</h3>
                <p className="text-gray-600 text-center mb-4">
                  Pengetahuan tentang tahapan tumbuh kembang dan perubahan tubuh yang akan terjadi saat beranjak remaja.
                </p>
                <div className="text-center">
                  <Button variant="outline" size="sm" className="text-amber-600 border-amber-300 hover:bg-amber-50">
                    Pelajari Lebih Lanjut
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link to="/artikel-edukasi" className="flex items-center gap-2">
                Akses Semua Materi Edukasi
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Peran Pengguna */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Peran Pengguna</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              PEDULIKECIL mendukung tiga peran pengguna dengan akses dan fitur yang berbeda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-kesehatan-biru/20 flex items-center justify-center">
                <svg className="h-10 w-10 text-kesehatan-biru" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">Siswa</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-kesehatan-biru" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Mencatat data kesehatan harian</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-kesehatan-biru" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Melaporkan keluhan kesehatan</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-kesehatan-biru" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Melihat riwayat kesehatan pribadi</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-kesehatan-hijau/20 flex items-center justify-center">
                <svg className="h-10 w-10 text-kesehatan-hijau" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">Guru</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-kesehatan-hijau" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Memantau data kesehatan siswa</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-kesehatan-hijau" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Menanggapi keluhan kesehatan</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-kesehatan-hijau" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Membuat laporan kesehatan kelas</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-kesehatan-kuning/20 flex items-center justify-center">
                <svg className="h-10 w-10 text-kesehatan-kuning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4 text-gray-800">Admin</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-kesehatan-kuning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Mengelola seluruh akun pengguna</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-kesehatan-kuning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Akses ke statistik kesehatan</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-kesehatan-kuning" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Konfigurasi sistem secara menyeluruh</span>
                </li>
              </ul>
            </div>
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

      {/* CTA Section */}
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
    </Layout>
  );
};

export default Index;
