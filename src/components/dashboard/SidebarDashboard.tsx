
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { LogOut, Menu, X, CircleUser, Calendar, Bell } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { LucideIcon } from 'lucide-react';
import { NavLink } from '@/types';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SidebarProps {
  role: 'siswa' | 'guru' | 'admin';
  links: NavLink[];
}

const SidebarDashboard = ({ role, links }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // Example notification count
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();

  // User display information (in a real app, would come from auth)
  const [user, setUser] = useState({
    name: role === 'siswa' ? 'Akbar Maulana' : role === 'guru' ? 'Budi Santoso' : 'Admin Sekolah',
    avatar: null,
    role: role === 'siswa' ? 'Siswa Kelas 6A' : role === 'guru' ? 'Guru Matematika' : 'Administrator',
  });

  const handleLogout = () => {
    toast.success('Berhasil keluar dari sistem');
    navigate('/login');
  };

  const handleRoleSwitch = (newRole: string) => {
    // In a real app, this would involve permissions check
    if (newRole === 'siswa') {
      navigate('/dashboard/siswa');
      toast('Beralih ke akun Siswa');
    } else if (newRole === 'guru') {
      navigate('/dashboard/guru');
      toast('Beralih ke akun Guru');
    } else if (newRole === 'admin') {
      navigate('/dashboard/admin');
      toast('Beralih ke akun Admin');
    }
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

        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                <CircleUser className="text-gray-500" size={20} />
              </div>
              <div className="ml-3">
                <p className="font-medium text-sm">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bell size={18} className="relative">
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </Bell>
                  <span className="sr-only">Notifikasi</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <div className="flex flex-col">
                    <span className="font-medium">Hasil kesehatan baru</span>
                    <span className="text-xs text-gray-500">2 jam yang lalu</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col">
                    <span className="font-medium">Keluhan baru menunggu</span>
                    <span className="text-xs text-gray-500">1 hari yang lalu</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col">
                    <span className="font-medium">Dokumen kesehatan baru</span>
                    <span className="text-xs text-gray-500">3 hari yang lalu</span>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-3 flex">
            <Button 
              variant="outline"
              size="sm"
              className={cn(
                "flex-1 text-xs h-8 border-dashed",
                role !== 'siswa' ? 'border-kesehatan-biru text-kesehatan-biru' : 'bg-kesehatan-biru text-white hover:bg-kesehatan-biru/90'
              )}
              disabled={role === 'siswa'}
              onClick={() => handleRoleSwitch('siswa')}
            >
              Siswa
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className={cn(
                "flex-1 text-xs h-8 border-dashed",
                role !== 'guru' ? 'border-kesehatan-hijau text-kesehatan-hijau' : 'bg-kesehatan-hijau text-white hover:bg-kesehatan-hijau/90'
              )}
              disabled={role === 'guru'}
              onClick={() => handleRoleSwitch('guru')}
            >
              Guru
            </Button>
            <Button 
              variant="outline"
              size="sm"
              className={cn(
                "flex-1 text-xs h-8 border-dashed",
                role !== 'admin' ? 'border-kesehatan-kuning text-kesehatan-kuning' : 'bg-kesehatan-kuning text-white hover:bg-kesehatan-kuning/90'
              )}
              disabled={role === 'admin'}
              onClick={() => handleRoleSwitch('admin')}
            >
              Admin
            </Button>
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
