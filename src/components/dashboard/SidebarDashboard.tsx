
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { LogOut, Menu, X } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { LucideIcon } from 'lucide-react';

interface SidebarProps {
  role: 'siswa' | 'guru' | 'admin';
  links: {
    title: string;
    href: string;
    icon: LucideIcon;
  }[];
}

const SidebarDashboard = ({ role, links }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    toast.success('Berhasil keluar dari sistem');
    navigate('/login');
  };

  // Warna berdasarkan role
  const roleColors = {
    siswa: 'from-kesehatan-biru to-kesehatan-biru-muda',
    guru: 'from-kesehatan-hijau to-kesehatan-hijau-muda',
    admin: 'from-kesehatan-kuning to-kesehatan-kuning-muda'
  };

  let roleName = '';
  if (role === 'siswa') roleName = 'Siswa';
  else if (role === 'guru') roleName = 'Guru';
  else roleName = 'Admin';

  return (
    <>
      {/* Mobile sidebar toggle button */}
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 p-2 rounded-md bg-white z-50 shadow-md border border-gray-200"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 bg-white border-r border-gray-200 w-64 flex flex-col transition-transform duration-300 z-40 shadow-lg",
        isMobile && (isOpen ? "translate-x-0" : "-translate-x-full")
      )}>
        <div className={`p-4 bg-gradient-to-r ${roleColors[role]} text-white`}>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-xl">PK</span>
            </div>
            <div>
              <h2 className="text-lg font-bold">PEDULIKECIL</h2>
              <p className="text-sm opacity-90">Dashboard {roleName}</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <nav className="p-4 space-y-1">
            {links.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link
                  key={index}
                  to={link.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
                    location.pathname === link.href
                      ? role === 'siswa' 
                        ? "bg-kesehatan-biru/10 text-kesehatan-biru font-medium"
                        : role === 'guru'
                          ? "bg-kesehatan-hijau/10 text-kesehatan-hijau font-medium"
                          : "bg-kesehatan-kuning/10 text-kesehatan-kuning font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  <Icon size={18} />
                  <span>{link.title}</span>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t border-gray-200">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-100 justify-start gap-2"
          >
            <LogOut size={18} />
            <span>Keluar</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default SidebarDashboard;
