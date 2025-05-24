
import { 
  Home, 
  ClipboardList, 
  MessageSquare, 
  History, 
  Activity,
  Users,
  FileText,
  Bell,
  Settings,
  Play
} from 'lucide-react';
import { NavLink } from '@/types';

export const siswaLinks: NavLink[] = [
  {
    title: 'Beranda',
    href: '/dashboard/siswa',
    icon: Home
  },
  {
    title: 'Isi Data Kesehatan',
    href: '/dashboard/siswa/data-kesehatan',
    icon: ClipboardList
  },
  {
    title: 'Keluhan Kesehatan',
    href: '/dashboard/siswa/keluhan',
    icon: MessageSquare
  },
  {
    title: 'Riwayat Kesehatan',
    href: '/dashboard/siswa/riwayat',
    icon: History
  },
  {
    title: 'Statistik',
    href: '/dashboard/siswa/statistik',
    icon: Activity
  }
];

export const guruLinks: NavLink[] = [
  {
    title: 'Beranda',
    href: '/dashboard/guru',
    icon: Home
  },
  {
    title: 'Daftar Siswa',
    href: '/dashboard/guru/siswa',
    icon: Users
  },
  {
    title: 'Tanggapan Keluhan',
    href: '/dashboard/guru/keluhan',
    icon: MessageSquare
  },
  {
    title: 'Laporan Kesehatan',
    href: '/dashboard/guru/laporan',
    icon: FileText
  },
  {
    title: 'Pemberitahuan',
    href: '/dashboard/guru/pemberitahuan',
    icon: Bell
  },
  {
    title: 'Kelola Video',
    href: '/dashboard/guru/video',
    icon: Play
  }
];

export const adminLinks: NavLink[] = [
  {
    title: 'Beranda',
    href: '/dashboard/admin',
    icon: Home
  },
  {
    title: 'Kelola Siswa',
    href: '/dashboard/admin/siswa',
    icon: Users
  },
  {
    title: 'Kelola Guru',
    href: '/dashboard/admin/guru',
    icon: Users
  },
  {
    title: 'Kelola Video',
    href: '/dashboard/admin/video',
    icon: Play
  },
  {
    title: 'Laporan Lengkap',
    href: '/dashboard/admin/laporan',
    icon: FileText
  },
  {
    title: 'Pengaturan',
    href: '/dashboard/admin/pengaturan',
    icon: Settings
  }
];
