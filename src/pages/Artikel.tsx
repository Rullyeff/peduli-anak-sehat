
import React from 'react';
import { Link } from 'react-router-dom';

// Halaman artikel dengan struktur HTML dan CSS sederhana
const Artikel = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-kesehatan-biru to-kesehatan-hijau flex items-center justify-center">
              <span className="text-white font-bold text-xl">PK</span>
            </div>
            <h1 className="ml-3 text-xl font-bold text-gray-900">PEDULIKECIL</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-gray-600 hover:text-kesehatan-biru">Beranda</Link></li>
              <li><Link to="/artikel" className="text-kesehatan-biru font-medium border-b-2 border-kesehatan-biru">Artikel</Link></li>
              <li><Link to="/login" className="text-gray-600 hover:text-kesehatan-biru">Masuk</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Banner */}
      <div className="bg-gradient-to-r from-kesehatan-biru to-kesehatan-hijau text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Artikel Kesehatan untuk Si Kecil</h2>
          <p className="text-xl max-w-3xl mx-auto">Temukan artikel dan tips kesehatan terbaru untuk menjaga kesehatan anak</p>
        </div>
      </div>

      {/* Daftar Artikel */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Artikel 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-kesehatan-biru/20 flex items-center justify-center">
              <span className="text-4xl">📝</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Pentingnya Sarapan untuk Anak Sekolah</h3>
              <p className="text-gray-600 mb-4">Sarapan adalah bagian penting untuk menjaga performa anak di sekolah. Temukan menu sarapan sehat dan bergizi untuk si kecil.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">10 Mei 2023</span>
                <Link to="#" className="text-kesehatan-biru hover:underline">Baca selengkapnya</Link>
              </div>
            </div>
          </div>

          {/* Artikel 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-kesehatan-hijau/20 flex items-center justify-center">
              <span className="text-4xl">🥗</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Nutrisi Penting untuk Tumbuh Kembang Anak</h3>
              <p className="text-gray-600 mb-4">Kenali berbagai nutrisi penting yang dibutuhkan anak-anak untuk tumbuh kembang optimal dan cara memenuhinya.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">5 Juni 2023</span>
                <Link to="#" className="text-kesehatan-biru hover:underline">Baca selengkapnya</Link>
              </div>
            </div>
          </div>

          {/* Artikel 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-kesehatan-kuning/20 flex items-center justify-center">
              <span className="text-4xl">💤</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Tips Menjaga Pola Tidur Sehat untuk Anak</h3>
              <p className="text-gray-600 mb-4">Pola tidur yang baik sangat penting untuk kesehatan anak. Simak tips untuk membantu anak tidur dengan nyenyak.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">20 Juli 2023</span>
                <Link to="#" className="text-kesehatan-biru hover:underline">Baca selengkapnya</Link>
              </div>
            </div>
          </div>

          {/* Artikel 4 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-kesehatan-biru/20 flex items-center justify-center">
              <span className="text-4xl">🏃‍♂️</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Aktivitas Fisik yang Menyenangkan untuk Anak</h3>
              <p className="text-gray-600 mb-4">Berbagai ide aktivitas fisik yang menyenangkan untuk anak-anak agar tetap aktif dan sehat setiap hari.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">8 Agustus 2023</span>
                <Link to="#" className="text-kesehatan-biru hover:underline">Baca selengkapnya</Link>
              </div>
            </div>
          </div>

          {/* Artikel 5 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-kesehatan-hijau/20 flex items-center justify-center">
              <span className="text-4xl">🧠</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Meningkatkan Kecerdasan Emosional Anak</h3>
              <p className="text-gray-600 mb-4">Cara membantu anak mengembangkan kecerdasan emosional yang baik untuk bekal masa depannya.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">15 September 2023</span>
                <Link to="#" className="text-kesehatan-biru hover:underline">Baca selengkapnya</Link>
              </div>
            </div>
          </div>

          {/* Artikel 6 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-kesehatan-kuning/20 flex items-center justify-center">
              <span className="text-4xl">🦷</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Merawat Kesehatan Gigi dan Mulut Anak</h3>
              <p className="text-gray-600 mb-4">Tips dan trik untuk menjaga kesehatan gigi dan mulut anak agar terhindar dari masalah gigi berlubang.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">3 Oktober 2023</span>
                <Link to="#" className="text-kesehatan-biru hover:underline">Baca selengkapnya</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">PEDULIKECIL</h3>
              <p className="text-gray-300">Aplikasi pemantauan kesehatan untuk anak sekolah yang memudahkan orang tua dan guru dalam menjaga kesehatan anak.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Tautan</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Beranda</Link></li>
                <li><Link to="/artikel" className="text-gray-300 hover:text-white">Artikel</Link></li>
                <li><Link to="/login" className="text-gray-300 hover:text-white">Masuk</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Kontak</h3>
              <p className="text-gray-300">Email: info@pedulikecil.id</p>
              <p className="text-gray-300">Telepon: +62 123 456 789</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-300">&copy; 2023 PEDULIKECIL. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Artikel;
