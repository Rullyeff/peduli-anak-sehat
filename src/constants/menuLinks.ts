
import { 
  Home, 
  ClipboardList, 
  MessageSquare, 
  History, 
  Activity,
  Users,
  FileText,
  Bell
} from 'lucide-react';

export const siswaLinks = [
  {
    title: 'Beranda',
    href: '/dashboard/siswa',
    icon: <Home size={18} />
  },
  {
    title: 'Isi Data Kesehatan',
    href: '/dashboard/siswa/data-kesehatan',
    icon: <ClipboardList size={18} />
  },
  {
    title: 'Keluhan Kesehatan',
    href: '/dashboard/siswa/keluhan',
    icon: <MessageSquare size={18} />
  },
  {
    title: 'Riwayat Kesehatan',
    href: '/dashboard/siswa/riwayat',
    icon: <History size={18} />
  },
  {
    title: 'Statistik',
    href: '/dashboard/siswa/statistik',
    icon: <Activity size={18} />
  }
];

export const guruLinks = [
  {
    title: 'Beranda',
    href: '/dashboard/guru',
    icon: <Home size={18} />
  },
  {
    title: 'Daftar Siswa',
    href: '/dashboard/guru/siswa',
    icon: <Users size={18} />
  },
  {
    title: 'Tanggapan Keluhan',
    href: '/dashboard/guru/keluhan',
    icon: <MessageSquare size={18} />
  },
  {
    title: 'Laporan Kesehatan',
    href: '/dashboard/guru/laporan',
    icon: <FileText size={18} />
  },
  {
    title: 'Pemberitahuan',
    href: '/dashboard/guru/pemberitahuan',
    icon: <Bell size={18} />
  }
];

export const adminLinks = [
  {
    title: 'Beranda',
    href: '/dashboard/admin',
    icon: <Home size={18} />
  },
  {
    title: 'Kelola Siswa',
    href: '/dashboard/admin/siswa',
    icon: <Users size={18} />
  },
  {
    title: 'Kelola Guru',
    href: '/dashboard/admin/guru',
    icon: <Users size={18} />
  },
  {
    title: 'Laporan Lengkap',
    href: '/dashboard/admin/laporan',
    icon: <FileText size={18} />
  },
  {
    title: 'Pengaturan',
    href: '/dashboard/admin/pengaturan',
    icon: <Bell size={18} />
  }
];
