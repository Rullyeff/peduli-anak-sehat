import React, { useState, useEffect } from 'react';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import { Search, UserPlus, FileText, Play } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { adminLinks } from '@/constants/menuLinks';
import { AccountsTable } from '@/components/admin/dashboard/AccountsTable';
import { fetchAllSiswa } from '@/services/siswaService';
import { fetchAllGuru } from '@/services/guruService';
import { Siswa } from '@/types/siswa';
import { Guru } from '@/types/guru';

interface Account {
  id: string;
  nama: string;
  role: 'siswa' | 'guru';
  kelas?: string;
  bidang_studi?: string;
  wali_kelas?: string;
  nomor_kontak?: string;
  created_at: string;
}

const DashboardAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('semua');
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statistics, setStatistics] = useState({
    totalSiswa: 0,
    totalGuru: 0,
    totalAccounts: 0,
  });

  useEffect(() => {
    loadAccountsData();
  }, []);

  const loadAccountsData = async () => {
    try {
      setIsLoading(true);
      const [siswaData, guruData] = await Promise.all([
        fetchAllSiswa(),
        fetchAllGuru()
      ]);

      // Transform data untuk AccountsTable
      const siswaAccounts: Account[] = siswaData.map((siswa: Siswa) => ({
        id: siswa.id,
        nama: siswa.nama,
        role: 'siswa' as const,
        kelas: siswa.kelas,
        nomor_kontak: siswa.nomor_kontak || undefined,
        created_at: siswa.created_at,
      }));

      const guruAccounts: Account[] = guruData.map((guru: Guru) => ({
        id: guru.id,
        nama: guru.nama,
        role: 'guru' as const,
        bidang_studi: guru.bidang_studi || undefined,
        wali_kelas: guru.wali_kelas || undefined,
        nomor_kontak: guru.nomor_kontak || undefined,
        created_at: guru.created_at,
      }));

      const allAccounts = [...siswaAccounts, ...guruAccounts];
      setAccounts(allAccounts);

      // Update statistics
      setStatistics({
        totalSiswa: siswaData.length,
        totalGuru: guruData.length,
        totalAccounts: allAccounts.length,
      });
    } catch (error) {
      console.error('Error fetching accounts data:', error);
      toast.error('Gagal memuat data akun');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditAccount = (account: Account) => {
    if (account.role === 'siswa') {
      window.location.href = '/dashboard/admin/siswa';
    } else {
      window.location.href = '/dashboard/admin/guru';
    }
  };

  const handleDeleteAccount = async (id: string, role: string) => {
    if (confirm(`Anda yakin ingin menghapus akun ${role} ini?`)) {
      try {
        // Implementasi delete akan ditambahkan sesuai kebutuhan
        toast.success(`Akun ${role} berhasil dihapus`);
        loadAccountsData();
      } catch (error) {
        console.error('Error deleting account:', error);
        toast.error(`Gagal menghapus akun ${role}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarDashboard role="admin" links={adminLinks} />

      <div className="flex-1 p-4 pt-6 sm:p-6 lg:p-8 ml-0 md:ml-64">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
            <p className="text-gray-600">Selamat datang, Admin PEDULIKECIL</p>
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <Input 
                placeholder="Cari akun..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button className="bg-kesehatan-kuning hover:bg-kesehatan-kuning/90 flex gap-2">
              <UserPlus size={16} />
              <span>Kelola Akun</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Akun</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold">{statistics.totalAccounts}</p>
                <span className="text-sm text-green-600 font-medium">
                  Aktif
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {statistics.totalSiswa} siswa, {statistics.totalGuru} guru
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Akun Siswa</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold">{statistics.totalSiswa}</p>
                <span className="text-sm text-blue-600 font-medium">
                  Terdaftar
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Dari berbagai kelas
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Akun Guru</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold">{statistics.totalGuru}</p>
                <span className="text-sm text-green-600 font-medium">
                  Aktif
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Dengan berbagai bidang studi
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Daftar Akun Pengguna</CardTitle>
            <CardDescription>
              Lihat dan kelola akun guru dan siswa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="semua">Semua Akun ({statistics.totalAccounts})</TabsTrigger>
                <TabsTrigger value="siswa">Siswa ({statistics.totalSiswa})</TabsTrigger>
                <TabsTrigger value="guru">Guru ({statistics.totalGuru})</TabsTrigger>
              </TabsList>
            </Tabs>

            <AccountsTable
              accounts={accounts}
              isLoading={isLoading}
              searchTerm={searchTerm}
              activeTab={activeTab}
              onEdit={handleEditAccount}
              onDelete={handleDeleteAccount}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Akses Cepat</CardTitle>
            <CardDescription>
              Kelola berbagai aspek sistem dengan mudah
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => window.location.href = '/dashboard/admin/siswa'}
              >
                <UserPlus size={24} />
                <span>Kelola Siswa</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => window.location.href = '/dashboard/admin/guru'}
              >
                <UserPlus size={24} />
                <span>Kelola Guru</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => window.location.href = '/dashboard/admin/video'}
              >
                <Play size={24} />
                <span>Kelola Video</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col gap-2"
                onClick={() => window.location.href = '/dashboard/admin/laporan'}
              >
                <FileText size={24} />
                <span>Lihat Laporan</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardAdmin;
