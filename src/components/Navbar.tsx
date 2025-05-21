
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-kesehatan-biru to-kesehatan-hijau flex items-center justify-center">
                  <span className="text-white font-bold text-xl">PK</span>
                </div>
                <span className="ml-2 text-xl font-bold text-kesehatan-biru">
                  PEDULI<span className="text-kesehatan-hijau">KECIL</span>
                </span>
              </div>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-kesehatan-biru">
                  Beranda
                </Link>
                <Link to="/tentang" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-kesehatan-biru">
                  Tentang
                </Link>
                <Link to="/artikel" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-kesehatan-biru">
                  Artikel Kesehatan
                </Link>
                <Link to="/kontak" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-kesehatan-biru">
                  Kontak
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Button asChild variant="default" className="bg-kesehatan-biru hover:bg-kesehatan-biru/90">
              <Link to="/login" className="flex items-center gap-2">
                <LogIn size={16} />
                <span>Masuk</span>
              </Link>
            </Button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-kesehatan-biru hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-kesehatan-biru"
              aria-expanded="false"
            >
              <span className="sr-only">Buka menu utama</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-kesehatan-biru hover:bg-gray-100">
              Beranda
            </Link>
            <Link to="/tentang" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-kesehatan-biru hover:bg-gray-100">
              Tentang
            </Link>
            <Link to="/artikel" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-kesehatan-biru hover:bg-gray-100">
              Artikel Kesehatan
            </Link>
            <Link to="/kontak" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-kesehatan-biru hover:bg-gray-100">
              Kontak
            </Link>
            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium bg-kesehatan-biru text-white hover:bg-kesehatan-biru/90 mt-4">
              <div className="flex items-center gap-2">
                <LogIn size={16} />
                <span>Masuk</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
